/* eslint-disable react-native/no-inline-styles */
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import Qs from 'qs';
import React, {
  forwardRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { Entypo,AntDesign,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';

const defaultStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    // borderRadius: 5,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    marginBottom: 5,
  },
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    minHeight: 44,
    flexDirection: 'row',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  description: {},
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
};

export const GooglePlacesAutocomplete = forwardRef((props, ref) => {
  let _results = [];
  let _requests = [];

  const hasNavigator = () => {
    if (navigator?.geolocation) {
      return true;
    } else {
      console.warn(
        'If you are using React Native v0.60.0+ you must follow these instructions to enable currentLocation: https://git.io/Jf4AR',
      );
      return false;
    }
  };

  const buildRowsFromResults = (results) => {
    let res = [];

    if (results.length === 0 || props.predefinedPlacesAlwaysVisible === true) {
      res = [
        ...props.predefinedPlaces.filter((place) => place?.description.length),
      ];

      if (props.currentLocation === true && hasNavigator()) {
        res.unshift({
          description: props.currentLocationLabel,
          isCurrentLocation: true,
        });
      }
    }

    res = res.map((place) => ({
      ...place,
      isPredefinedPlace: true,
    }));

    return [...res, ...results];
  };

  const getRequestUrl = (requestUrl) => {
    if (requestUrl) {
      if (requestUrl.useOnPlatform === 'all') {
        return requestUrl.url;
      }
      if (requestUrl.useOnPlatform === 'web') {
        return Platform.select({
          web: requestUrl.url,
          default: 'https://maps.googleapis.com/maps/api',
        });
      }
    } else {
      return 'https://maps.googleapis.com/maps/api';
    }
  };

  const getRequestHeaders = (requestUrl) => {
    return requestUrl?.headers || {};
  };

  const setRequestHeaders = (request, headers) => {
    Object.keys(headers).map((headerKey) =>
      request.setRequestHeader(headerKey, headers[headerKey]),
    );
  };

  const [stateText, setStateText] = useState('');
  const [dataSource, setDataSource] = useState(buildRowsFromResults([]));
  const [listViewDisplayed, setListViewDisplayed] = useState(
    props.listViewDisplayed === 'auto' ? false : props.listViewDisplayed,
  );
  const [url] = useState(getRequestUrl(props.requestUrl));

  const inputRef = useRef();

  useEffect(() => {
    // This will load the default value's search results after the view has
    // been rendered
    _handleChangeText(stateText);
    return () => {
      _abortRequests();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Update dataSource if props.predefinedPlaces changed
    setDataSource(buildRowsFromResults([]));
  }, [props.predefinedPlaces]);

  useImperativeHandle(ref, () => ({
    setAddressText: (address) => {
      setStateText(address);
    },
    getAddressText: () => stateText,
    blur: () => inputRef.current.blur(),
    focus: () => inputRef.current.focus(),
    isFocused: () => inputRef.current.isFocused(),
    clear: () => inputRef.current.clear(),
    getCurrentLocation,
  }));

  const requestShouldUseWithCredentials = () =>
    url === 'https://maps.googleapis.com/maps/api';

  const _abortRequests = () => {
    _requests.map((i) => i.abort());
    _requests = [];
  };

  const supportedPlatform = () => {
    if (Platform.OS === 'web' && !props.requestUrl) {
      console.warn(
        'This library cannot be used for the web unless you specify the requestUrl prop. See https://git.io/JflFv for more for details.',
      );
      return false;
    } else {
      return true;
    }
  };

  const getCurrentLocation = () => {
    let options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    };

    if (props.enableHighAccuracyLocation && Platform.OS === 'android') {
      options = {
        enableHighAccuracy: true,
        timeout: 20000,
      };
    }
    const getCurrentPosition =
      navigator.geolocation.getCurrentPosition ||
      navigator.geolocation.default.getCurrentPosition;

    getCurrentPosition &&
      getCurrentPosition(
        (position) => {
          if (props.nearbyPlacesAPI === 'None') {
            let currentLocation = {
              description: props.currentLocationLabel,
              geometry: {
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              },
            };

            _disableRowLoaders();
            props.onPress(currentLocation, currentLocation);
          } else {
            _requestNearby(position.coords.latitude, position.coords.longitude);
          }
        },
        (error) => {
          _disableRowLoaders();
          console.error(error.message);
        },
        options,
      );
  };

  const _onPress = (rowData) => {
    if (rowData.isPredefinedPlace !== true && props.fetchDetails === true) {
      if (rowData.isLoading === true) {
        // already requesting
        return;
      }

      Keyboard.dismiss();

      _abortRequests();

      // display loader
      _enableRowLoader(rowData);

      // fetch details
      const request = new XMLHttpRequest();
      _requests.push(request);
      request.timeout = props.timeout;
      request.ontimeout = props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          if (responseJSON.status === 'OK') {
            // if (_isMounted === true) {
            const details = responseJSON.result;
            _disableRowLoaders();
            _onBlur();

            setStateText(_renderDescription(rowData));

            delete rowData.isLoading;
            props.onPress(rowData, details);
            // }
          } else {
            _disableRowLoaders();

            if (props.autoFillOnNotFound) {
              setStateText(_renderDescription(rowData));
              delete rowData.isLoading;
            }

            if (!props.onNotFound) {
              console.warn(
                'google places autocomplete: ' + responseJSON.status,
              );
            } else {
              props.onNotFound(responseJSON);
            }
          }
        } else {
          _disableRowLoaders();

          if (!props.onFail) {
            console.warn(
              'google places autocomplete: request could not be completed or has been aborted',
            );
          } else {
            props.onFail('request could not be completed or has been aborted');
          }
        }
      };

      request.open(
        'GET',
        `${url}/place/details/json?` +
          Qs.stringify({
            key: props.query.key,
            placeid: rowData.place_id,
            language: props.query.language,
            ...props.GooglePlacesDetailsQuery,
          }),
      );

      request.withCredentials = requestShouldUseWithCredentials();
      setRequestHeaders(request, getRequestHeaders(props.requestUrl));

      request.send();
    } else if (rowData.isCurrentLocation === true) {
      // display loader
      _enableRowLoader(rowData);

      setStateText(_renderDescription(rowData));

      delete rowData.isLoading;
      getCurrentLocation();
    } else {
      setStateText(_renderDescription(rowData));

      _onBlur();
      delete rowData.isLoading;
      let predefinedPlace = _getPredefinedPlace(rowData);

      // sending predefinedPlace as details for predefined places
      props.onPress(predefinedPlace, predefinedPlace);
    }
  };

  const _enableRowLoader = (rowData) => {
    let rows = buildRowsFromResults(_results);
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].place_id === rowData.place_id ||
        (rows[i].isCurrentLocation === true &&
          rowData.isCurrentLocation === true)
      ) {
        rows[i].isLoading = true;
        setDataSource(rows);
        break;
      }
    }
  };

  const _disableRowLoaders = () => {
    // if (_isMounted === true) {
    for (let i = 0; i < _results.length; i++) {
      if (_results[i].isLoading === true) {
        _results[i].isLoading = false;
      }
    }

    setDataSource(buildRowsFromResults(_results));
    // }
  };

  const _getPredefinedPlace = (rowData) => {
    if (rowData.isPredefinedPlace !== true) {
      return rowData;
    }

    for (let i = 0; i < props.predefinedPlaces.length; i++) {
      if (props.predefinedPlaces[i].description === rowData.description) {
        return props.predefinedPlaces[i];
      }
    }

    return rowData;
  };

  const _filterResultsByTypes = (unfilteredResults, types) => {
    if (types.length === 0) return unfilteredResults;

    const results = [];
    for (let i = 0; i < unfilteredResults.length; i++) {
      let found = false;

      for (let j = 0; j < types.length; j++) {
        if (unfilteredResults[i].types.indexOf(types[j]) !== -1) {
          found = true;
          break;
        }
      }

      if (found === true) {
        results.push(unfilteredResults[i]);
      }
    }
    return results;
  };

  const _requestNearby = (latitude, longitude) => {
    _abortRequests();

    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== null &&
      longitude !== null
    ) {
      const request = new XMLHttpRequest();
      _requests.push(request);
      request.timeout = props.timeout;
      request.ontimeout = props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          _disableRowLoaders();

          if (typeof responseJSON.results !== 'undefined') {
            // if (_isMounted === true) {
            var results = [];
            if (props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
              results = _filterResultsByTypes(
                responseJSON.results,
                props.filterReverseGeocodingByTypes,
              );
            } else {
              results = responseJSON.results;
            }

            setDataSource(buildRowsFromResults(results));
            // }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            if (!props.onFail)
              console.warn(
                'google places autocomplete: ' + responseJSON.error_message,
              );
            else {
              props.onFail(responseJSON.error_message);
            }
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };

      let requestUrl = '';
      if (props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
        // your key must be allowed to use Google Maps Geocoding API
        requestUrl =
          `${url}/geocode/json?` +
          Qs.stringify({
            latlng: latitude + ',' + longitude,
            key: props.query.key,
            ...props.GoogleReverseGeocodingQuery,
          });
      } else {
        requestUrl =
          `${url}/place/nearbysearch/json?` +
          Qs.stringify({
            location: latitude + ',' + longitude,
            key: props.query.key,
            ...props.GooglePlacesSearchQuery,
          });
      }

      request.open('GET', requestUrl);

      request.withCredentials = requestShouldUseWithCredentials();
      setRequestHeaders(request, getRequestHeaders(props.requestUrl));

      request.send();
    } else {
      _results = [];
      setDataSource(buildRowsFromResults([]));
    }
  };

  const _request = (text) => {
    _abortRequests();
    if (supportedPlatform() && text && text.length >= props.minLength) {
      const request = new XMLHttpRequest();
      _requests.push(request);
      request.timeout = props.timeout;
      request.ontimeout = props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (typeof responseJSON.predictions !== 'undefined') {
            // if (_isMounted === true) {
            const results =
              props.nearbyPlacesAPI === 'GoogleReverseGeocoding'
                ? _filterResultsByTypes(
                    responseJSON.predictions,
                    props.filterReverseGeocodingByTypes,
                  )
                : responseJSON.predictions;

            _results = results;
            setDataSource(buildRowsFromResults(results));
            // }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            if (!props.onFail)
              console.warn(
                'google places autocomplete: ' + responseJSON.error_message,
              );
            else {
              props.onFail(responseJSON.error_message);
            }
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };

      if (props.preProcess) {
        setStateText(props.preProcess(text));
      }

      request.open(
        'GET',
        `${url}/place/autocomplete/json?input=` +
          encodeURIComponent(text) +
          '&' +
          Qs.stringify(props.query),
      );

      request.withCredentials = requestShouldUseWithCredentials();
      setRequestHeaders(request, getRequestHeaders(props.requestUrl));

      request.send();
    } else {
      _results = [];
      setDataSource(buildRowsFromResults([]));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceData = useMemo(() => debounce(_request, props.debounce), [
    props.query,
  ]);

  const _onChangeText = (text) => {
    setStateText(text);
    debounceData(text);
  };

  const _handleChangeText = (text) => {
    _onChangeText(text);

    const onChangeText = props?.textInputProps?.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  };

  const _getRowLoader = () => {
    return <ActivityIndicator animating={true} size='small' />;
  };

  const _renderRowData = (rowData, index) => {
    if (props.renderRow) {
      return props.renderRow(rowData, index);
    }

    return (
      <Text
        style={[
          props.suppressDefaultStyles ? {} : defaultStyles.description,
          props.styles.description,
          rowData.isPredefinedPlace
            ? props.styles.predefinedPlacesDescription
            : {},
        ]}
        numberOfLines={props.numberOfLines}
      >
        {_renderDescription(rowData)}
      </Text>
    );
  };

  const _renderDescription = (rowData) => {
    if (props.renderDescription) {
      return props.renderDescription(rowData);
    }

    return rowData.description || rowData.formatted_address || rowData.name;
  };

  const _renderLoader = (rowData) => {
    if (rowData.isLoading === true) {
      return (
        <View
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.loader,
            props.styles.loader,
          ]}
        >
          {_getRowLoader()}
        </View>
      );
    }

    return null;
  };

  const _renderRow = (rowData = {}, index) => {
    return (
      <ScrollView
        contentContainerStyle={
          props.isRowScrollable ? { minWidth: '100%' } : { width: '100%' }
        }
        scrollEnabled={props.isRowScrollable}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableHighlight
          style={
            props.isRowScrollable ? { minWidth: '100%' } : { width: '100%' }
          }
          onPress={() => _onPress(rowData)}
          underlayColor={props.listUnderlayColor || '#c8c7cc'}
        >
          <View
            style={[
              props.suppressDefaultStyles ? {} : defaultStyles.row,
              props.styles.row,
              rowData.isPredefinedPlace ? props.styles.specialItemRow : {},
            ]}
          >
            {_renderLoader(rowData)}
            {_renderRowData(rowData, index)}
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  };

  const _renderSeparator = (sectionID, rowID) => {
    if (rowID === dataSource.length - 1) {
      return null;
    }

    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={[
          props.suppressDefaultStyles ? {} : defaultStyles.separator,
          props.styles.separator,
        ]}
      />
    );
  };

  const isNewFocusInAutocompleteResultList = ({
    relatedTarget,
    currentTarget,
  }) => {
    if (!relatedTarget) return false;

    var node = relatedTarget.parentNode;

    while (node) {
      if (node.id === 'result-list-id') return true;
      node = node.parentNode;
    }

    return false;
  };

  const _onBlur = (e) => {
    if (e && isNewFocusInAutocompleteResultList(e)) return;

    if (!props.keepResultsAfterBlur) {
      setListViewDisplayed(false);
    }
    inputRef?.current?.blur();
  };

  const _onFocus = () => setListViewDisplayed(true);

  const _renderPoweredLogo = () => {
    if (!_shouldShowPoweredLogo()) {
      return null;
    }

    return (
      <View
        style={[
          props.suppressDefaultStyles ? {} : defaultStyles.row,
          defaultStyles.poweredContainer,
          props.styles.poweredContainer,
        ]}
      >
        <Image
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.powered,
            props.styles.powered,
          ]}
          resizeMode='contain'
          source={require('./images/powered_by_google_on_white.png')}
        />
      </View>
    );
  };

  const _shouldShowPoweredLogo = () => {
    if (!props.enablePoweredByContainer || dataSource.length === 0) {
      return false;
    }

    for (let i = 0; i < dataSource.length; i++) {
      let row = dataSource[i];

      if (
        !row.hasOwnProperty('isCurrentLocation') &&
        !row.hasOwnProperty('isPredefinedPlace')
      ) {
        return true;
      }
    }

    return false;
  };

  const _renderLeftButton = () => {
    if (props.renderLeftButton) {
      return props.renderLeftButton();
    }
  };

  const _renderRightButton = () => {
    if (props.renderRightButton) {
      return props.renderRightButton();
    }
  };

  const _getFlatList = () => {
    const keyGenerator = () => Math.random().toString(36).substr(2, 10);

    if (
      supportedPlatform() &&
      (stateText !== '' ||
        props.predefinedPlaces.length > 0 ||
        props.currentLocation === true) &&
      listViewDisplayed === true
    ) {
      return (
        <FlatList
          nativeID='result-list-id'
          scrollEnabled={!props.disableScroll}
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.listView,
            props.styles.listView,
          ]}
          data={dataSource}
          keyExtractor={keyGenerator}
          extraData={[dataSource, props]}
          ItemSeparatorComponent={_renderSeparator}
          renderItem={({ item, index }) => _renderRow(item, index)}
          ListEmptyComponent={
            stateText.length > props.minLength && props.listEmptyComponent
          }
          ListHeaderComponent={
            props.renderHeaderComponent &&
            props.renderHeaderComponent(stateText)
          }
          ListFooterComponent={_renderPoweredLogo}
          {...props}
        />
      );
    }

    return null;
  };

  let {
    onFocus,
    onBlur,
    onChangeText, // destructuring here stops this being set after onChangeText={_handleChangeText}
    clearButtonMode,
    InputComp,
    ...userProps
  } = props.textInputProps;
  const TextInputComp = InputComp || TextInput;
  return (
    <View
      style={[
        props.suppressDefaultStyles ? {} : defaultStyles.container,
        props.styles.container,
      ]}
      pointerEvents='box-none'
    >
      {!props.textInputHide && (
        <View
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.textInputContainer,
            props.styles.textInputContainer,
          ]}
        >
          {_renderLeftButton()}
          <View style={[props.styles.textInput,{flexDirection:'row'}]} >
            <View style={{height:45,width:45,backgroundColor:'white',flexDirection:'row',borderTopLeftRadius:8,borderBottomLeftRadius:8,}}>
              <Entypo style={{marginLeft:10,alignSelf:'center'}} name="location-pin" size={24} color="black" />
              <View style={{width:0.3,height:40,backgroundColor:'#a9a9a9',marginLeft:5}}/>
            </View>
          <TextInputComp
            ref={inputRef}
            style={[
              props.suppressDefaultStyles ? {} : defaultStyles.textInput,
              props.styles.textInput,
            ]}
            value={stateText}
            placeholder={props.placeholder}
            onFocus={
              onFocus
                ? () => {
                    _onFocus();
                    onFocus();
                  }
                : _onFocus
            }
            onBlur={
              onBlur
                ? (e) => {
                    _onBlur(e);
                    onBlur();
                  }
                : _onBlur
            }
            clearButtonMode={clearButtonMode || 'while-editing'}
            onChangeText={_handleChangeText}
            {...userProps}
          />
          </View>
          {_renderRightButton()}
        </View>
      )}
      {_getFlatList()}
      {props.children}
    </View>
  );
});

GooglePlacesAutocomplete.propTypes = {
  autoFillOnNotFound: PropTypes.bool,
  currentLocation: PropTypes.bool,
  currentLocationLabel: PropTypes.string,
  debounce: PropTypes.number,
  disableScroll: PropTypes.bool,
  enableHighAccuracyLocation: PropTypes.bool,
  enablePoweredByContainer: PropTypes.bool,
  fetchDetails: PropTypes.bool,
  filterReverseGeocodingByTypes: PropTypes.array,
  GooglePlacesDetailsQuery: PropTypes.object,
  GooglePlacesSearchQuery: PropTypes.object,
  GoogleReverseGeocodingQuery: PropTypes.object,
  isRowScrollable: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.oneOf(['never', 'always', 'handled']),
  listEmptyComponent: PropTypes.func,
  listUnderlayColor: PropTypes.string,
  // Must write it this way: https://stackoverflow.com/a/54290946/7180620
  listViewDisplayed: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]),
  keepResultsAfterBlur: PropTypes.bool,
  minLength: PropTypes.number,
  nearbyPlacesAPI: PropTypes.string,
  numberOfLines: PropTypes.number,
  onFail: PropTypes.func,
  onNotFound: PropTypes.func,
  onPress: PropTypes.func,
  onTimeout: PropTypes.func,
  placeholder: PropTypes.string,
  predefinedPlaces: PropTypes.array,
  predefinedPlacesAlwaysVisible: PropTypes.bool,
  preProcess: PropTypes.func,
  query: PropTypes.object,
  renderDescription: PropTypes.func,
  renderHeaderComponent: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
  renderRow: PropTypes.func,
  requestUrl: PropTypes.shape({
    url: PropTypes.string,
    useOnPlatform: PropTypes.oneOf(['web', 'all']),
    headers: PropTypes.objectOf(PropTypes.string),
  }),
  styles: PropTypes.object,
  suppressDefaultStyles: PropTypes.bool,
  textInputHide: PropTypes.bool,
  textInputProps: PropTypes.object,
  timeout: PropTypes.number,
};

GooglePlacesAutocomplete.defaultProps = {
  autoFillOnNotFound: false,
  currentLocation: false,
  currentLocationLabel: 'Current location',
  debounce: 0,
  disableScroll: false,
  enableHighAccuracyLocation: true,
  enablePoweredByContainer: true,
  fetchDetails: false,
  filterReverseGeocodingByTypes: [],
  GooglePlacesDetailsQuery: {},
  GooglePlacesSearchQuery: {
    rankby: 'distance',
    type: 'restaurant',
  },
  GoogleReverseGeocodingQuery: {},
  isRowScrollable: true,
  keyboardShouldPersistTaps: 'always',
  listUnderlayColor: '#c8c7cc',
  listViewDisplayed: 'auto',
  keepResultsAfterBlur: false,
  minLength: 0,
  nearbyPlacesAPI: 'GooglePlacesSearch',
  numberOfLines: 1,
  onFail: () => {},
  onNotFound: () => {},
  onPress: () => {},
  onTimeout: () => console.warn('google places autocomplete: request timeout'),
  placeholder: '',
  predefinedPlaces: [],
  predefinedPlacesAlwaysVisible: false,
  query: {
    key: 'missing api key',
    language: 'en',
    types: 'geocode',
  },
  styles: {},
  suppressDefaultStyles: false,
  textInputHide: false,
  textInputProps: {},
  timeout: 20000,
};

export default { GooglePlacesAutocomplete };

















import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Entypo,AntDesign,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';

const defaultItemValue = {
  name: '', id: 0
};

export default class SearchableDropDown extends Component {
  constructor(props) {
    super(props);
    this.renderTextInput = this.renderTextInput.bind(this);
    this.renderFlatList = this.renderFlatList.bind(this);
    this.searchedItems = this.searchedItems.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.state = {
      item: {},
      listItems: [],
      focus: false
    };
  }

  renderFlatList = () => {
    if (this.state.focus) {
      const flatListPorps = { ...this.props.listProps };
      const oldSupport = [
        { key: 'keyboardShouldPersistTaps', val: 'always' }, 
        { key: 'nestedScrollEnabled', val : false },
        { key: 'style', val : { ...this.props.itemsContainerStyle } },
        { key: 'data', val : this.state.listItems },
        { key: 'keyExtractor', val : (item, index) => index.toString() },
        { key: 'renderItem', val : ({ item, index }) => this.renderItems(item, index) },
      ];
      oldSupport.forEach((kv) => {
        if(!Object.keys(flatListPorps).includes(kv.key)) {
          flatListPorps[kv.key] = kv.val;
        } else {
          if(kv.key === 'style') {
            flatListPorps['style'] = kv.val;
          }
        }
      });
      return (
        <FlatList
          { ...flatListPorps }
        />
      );
    }
  };

  componentDidMount = () => {
    const listItems = this.props.items;
    const defaultIndex = this.props.defaultIndex;
    if (defaultIndex && listItems.length > defaultIndex) {
      this.setState({
        listItems,
        item: listItems[defaultIndex]
      });
    } else {
      this.setState({ listItems });
    }
  };

  searchedItems = searchedText => {
    let setSort = this.props.setSort;
    if (!setSort && typeof setSort !== 'function') {
        setSort = (item, searchedText) => { 
          return item.category_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1
        };
    }
    var ac = this.props.items.filter((item) => {
      return setSort(item, searchedText);
    });
    let item = {
      id: -1,
      name: searchedText
    };
    this.setState({ listItems: ac, item: item });
    const onTextChange = this.props.onTextChange || this.props.textInputProps.onTextChange || this.props.onChangeText || this.props.textInputProps.onChangeText;
    if (onTextChange && typeof onTextChange === 'function') {
      setTimeout(() => {
        onTextChange(searchedText);
      }, 0);
    }
  };

  renderItems = (item, index) => {
    if(this.props.multi && this.props.selectedItems && this.props.selectedItems.length > 0) {
      return (
          this.props.selectedItems.find(sitem => sitem.id === item.id) 
          ? 
          <TouchableOpacity style={{ ...this.props.itemStyle, flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text>{ item.category_name }</Text>
            </View>
            <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => setTimeout(() => { this.props.onRemoveItem(item, index) }, 0) } style={{ backgroundColor: '#f16d6b', alignItems: 'center', justifyContent: 'center', width: 25, height: 25, borderRadius: 100, marginLeft: 10}}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
         :
          <TouchableOpacity
          onPress={() => {
            this.setState({ item: item });
            setTimeout(() => {
              this.props.onItemSelect(item);
            }, 0);
          }}
          style={{ ...this.props.itemStyle, flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text>{ item.category_name }</Text>
            </View>
          </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={{ ...this.props.itemStyle }}
          onPress={() => {
            this.setState({ item: item, focus: false });
            Keyboard.dismiss();
            setTimeout(() => {
              this.props.onItemSelect(item);
              if (this.props.resetValue) {
                this.setState({ focus: true, item: defaultItemValue });
                this.input.focus();
              }
            }, 0);
          }}
        >
          { 
            this.props.selectedItems && this.props.selectedItems.length > 0 && this.props.selectedItems.find(x => x.id === item.id) 
            ?
              <Text style={{ ...this.props.itemTextStyle }}>{item.category_name}</Text>
            :
              <Text style={{ ...this.props.itemTextStyle }}>{item.category_name}</Text>
          }
        </TouchableOpacity>
      );
    }
  };

  renderListType = () => {
    return this.renderFlatList();
  };

  renderTextInput = () => {
    const textInputProps = { ...this.props.textInputProps };
    const oldSupport = [
      { key: 'ref', val: e => (this.input = e) }, 
      { key: 'onTextChange', val: (text) => { this.searchedItems(text) } }, 
      { key: 'underlineColorAndroid', val: this.props.underlineColorAndroid }, 
      { 
        key: 'onFocus', 
        val: () => {
          this.props.onFocus && this.props.onFocus()
          this.setState({
            focus: true,
            item: defaultItemValue,
            listItems: this.props.items
          });
        } 
      }, 
      {
        key: 'onBlur',
        val: () => {
          this.props.onBlur && this.props.onBlur(this);
          this.setState({ focus: false, item: this.props.selectedItems });
        }
      },
      {
        key: 'value',
        val: this.state.item ? this.state.item.category_name : ''
      },
      {
        key: 'style',
        val: { ...this.props.textInputStyle }
      },
      {
        key: 'placeholderTextColor',
        val: this.props.placeholderTextColor
      },
      {
        key: 'placeholder',
        val: this.props.placeholder
      }
    ];
    oldSupport.forEach((kv) => {
      if(!Object.keys(textInputProps).includes(kv.key)) {
        if(kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps['onChangeText'] = kv.val;
        } else {
          textInputProps[kv.key] = kv.val;
        }
      } else {
        if(kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps['onChangeText'] = kv.val;
        }
      }
    });
    return (
      <View style={{flexDirection:'row'}} >
        <View style={{height:35,backgroundColor:'white',flexDirection:'row',borderRadius:8}}>
          <MaterialCommunityIcons style={{marginLeft:5,alignSelf:'center'}} name="silverware-fork-knife" size={24} color="black" /> 
          <View style={{width:0.3,height:40,backgroundColor:'#a9a9a9',left:8}}/>
        </View>
      <TextInput
      { ...textInputProps }
      onBlur={(e) => {
        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
        if (this.props.textInputProps && this.props.textInputProps.onBlur) {
          this.props.textInputProps.onBlur(e);
        }
        this.setState({ focus: false, item: this.props.selectedItems });
      }
      }
      />
      </View>
    )
  }

  render = () => {
    return (
      <View
        keyboardShouldPersist="always"
        style={{ ...this.props.containerStyle }}
      >
        { this.renderSelectedItems() }
        { this.renderTextInput() }
        {this.renderListType()}
      </View>
    );
  };
  renderSelectedItems(){
    let items = this.props.selectedItems || [];
    if(items !== undefined && items.length > 0 && this.props.chip && this.props.multi){
     return  <View style={{flexDirection: 'row',  flexWrap: 'wrap', paddingBottom: 10, marginTop: 5 }}>
                 { items.map((item, index) => {
                     return (
                         <View key={index} style={{
                                 width: (item.category_name.length * 8) + 60,
                                 justifyContent: 'center',
                                 flex: 0,
                                 backgroundColor: '#eee',
                                 flexDirection: 'row',
                                 alignItems: 'center',
                                 margin: 5,
                                 padding: 8,
                                 borderRadius: 15,
                             }}>
                             <Text style={{ color: '#555' }}>{item.category_name}</Text>
                             <TouchableOpacity onPress={() => setTimeout(() => { this.props.onRemoveItem(item, index) }, 0) } style={{ backgroundColor: '#f16d6b', alignItems: 'center', justifyContent: 'center', width: 25, height: 25, borderRadius: 100, marginLeft: 10}}>
                                 <Text>X</Text>
                             </TouchableOpacity>
                         </View>
                 )
             }) 
         }
         </View>
    }
 }
}


<a href="search.php?keyword=M5H%202N3&amp;lat=43.653226&amp;long=-79.3831843&amp;country_code=CA&amp;city=Toronto&amp;province=ON&amp;address=280%20The%20PATH%20-%20City%20Hall" class="text-black">Toronto</a>
<a href="search.php?keyword=H3B%201X8&amp;lat=45.5016889&amp;long=-73.567256&amp;country_code=CA&amp;city=Montreal&amp;province=QC&amp;address=1120-1084%20Boulevard%20Robert-Bourassa" class="text-black">Montréal</a>
<a href="search.php?keyword=V6Z%202C5&amp;lat=49.2827291&amp;long=-123.1207375&amp;country_code=CA&amp;city=Vancouver&amp;province=BC&amp;address=800%20Robson%20Street" class="text-black">Vancouver</a>
<a href="search.php?keyword=K1P%201B1&amp;lat=45.4215296&amp;long=-75.69719309999999&amp;country_code=CA&amp;city=Ottawa&amp;province=ON&amp;address=100%20Albert%20Street" class="text-black">Ottawa</a>
<a href="search.php?keyword=T5J&amp;lat=53.5461245&amp;long=-113.4938229&amp;country_code=CA&amp;city=Edmonton&amp;province=AB&amp;address=10111%20104%20Avenue%20Northwest" class="text-black">Edmonton</a>
<a href="search.php?keyword=T2P&amp;lat=51.04473309999999&amp;long=-114.0718831&amp;country_code=CA&amp;city=Calgary&amp;province=AB&amp;address=2101%209%20Avenue%20Southwest" class="text-black">Calgary</a>
<a href="search.php?keyword=G1R%205M1&amp;lat=46.8138783&amp;long=-71.2079809&amp;country_code=CA&amp;city=Quebec%20City&amp;province=QC&amp;address=43%20Rue%20des%20Jardins" class="text-black">Québec City</a>
<a href="search.php?keyword=R3C%203X2&amp;lat=49.895136&amp;long=-97.13837439999999&amp;country_code=CA&amp;city=Winnipeg&amp;province=MB&amp;address=360-384%20Main%20Street" class="text-black">Winnipeg</a>
<a href="search.php?keyword=L8P&amp;lat=43.2557206&amp;long=-79.8711024&amp;country_code=CA&amp;city=Hamilton&amp;province=ON&amp;address=1%20MacNab%20Street%20South" class="text-black">Hamilton</a>
<a href="search.php?keyword=N6A&amp;lat=42.9849233&amp;long=-81.2452768&amp;country_code=CA&amp;city=London&amp;province=ON&amp;address=" class="text-black">London</a>


<a href="search.php?keyword=1150-228&amp;lat=38.7222524&amp;long=-9.1393366&amp;country_code=PT&amp;city=Lisbon&amp;province=Lisbon&amp;address=3%20Campo%20dos%20Mártires%20da%20Pátria" class="text-black">Lisbon</a>
<a href="search.php?keyword=4050&amp;lat=41.1579438&amp;long=-8.629105299999999&amp;country_code=PT&amp;city=Porto&amp;province=Porto%20District&amp;address=136%20Praça%20de%20Mouzinho%20de%20Albuquerque" class="text-black">Porto</a>
<a href="search.php?keyword=2700-651&amp;lat=38.7577603&amp;long=-9.224547399999999&amp;country_code=PT&amp;city=Amadora&amp;province=Lisbon&amp;address=73A%20Rua%20Elias%20Garcia" class="text-black">Amadora</a>
<a href="search.php?keyword=4700-041&amp;lat=41.5454486&amp;long=-8.426506999999999&amp;country_code=PT&amp;city=Braga&amp;province=Braga&amp;address=" class="text-black">Braga</a>
<a href="search.php?keyword=2900-557&amp;lat=38.5260437&amp;long=-8.8909328&amp;country_code=PT&amp;city=Setúbal%20Municipality&amp;province=Setubal&amp;address=13%20Avenida%20Mariano%20de%20Carvalho" class="text-black">Setubal</a>
<a href="search.php?keyword=3000&amp;lat=40.2033145&amp;long=-8.4102573&amp;country_code=PT&amp;city=Coimbra&amp;province=Coimbra%20District&amp;address=" class="text-black">Coimbra</a>
<a href="search.php?keyword=2745-144&amp;lat=38.7573981&amp;long=-9.2587453&amp;country_code=PT&amp;city=Queluz&amp;province=Lisbon&amp;address=219%20Avenida%20José%20Elias%20Garcia" class="text-black">Queluz</a>
<a href="search.php?keyword=9020-097&amp;lat=32.6669328&amp;long=-16.9240554&amp;country_code=PT&amp;city=Funchal&amp;province=Madeira&amp;address=6%20Caminho%20do%20Lombo%20Segundo" class="text-black">Funchal</a>
<a href="search.php?keyword=2735-210&amp;lat=38.7680333&amp;long=-9.2987836&amp;country_code=PT&amp;city=Agualva-Cacém&amp;province=Lisbon&amp;address=10%20Rua%20Afonso%20de%20Albuquerque" class="text-black">Cacém</a>
<a href="search.php?keyword=4430-396&amp;lat=41.1238759&amp;long=-8.611785099999999&amp;country_code=PT&amp;city=Vila%20Nova%20de%20Gaia&amp;province=Porto%20District&amp;address=571%20Rua%20do%20Marquês%20de%20Sá%20da%20Bandeira" class="text-black">Vila Nova de Gaia</a>


<a href="search.php?keyword=22056&amp;lat=32.5149469&amp;long=-117.0382471&amp;country_code=MX&amp;city=Tijuana&amp;province=B.C.&amp;address=3009%20Canon%20Zacatecas" class="text-black">Tijuana</a>
<a href="search.php?keyword=55023&amp;lat=19.6057728&amp;long=-99.03651119999999&amp;country_code=MX&amp;city=Ecatepec%20de%20Morelos&amp;province=Méx.&amp;address=" class="text-black">Ecatepec</a>
<a href="search.php?keyword=37000&amp;lat=21.1250077&amp;long=-101.6859605&amp;country_code=MX&amp;city=León&amp;province=Gto.&amp;address=166%20Avenida%20Miguel%20Alemán" class="text-black">Leon</a>
<a href="search.php?keyword=undefined&amp;lat=19.0414398&amp;long=-98.2062727&amp;country_code=MX&amp;city=Puebla&amp;province=Pue.&amp;address=517%20Calle%207%20Sur" class="text-black">Puebla</a>
<a href="search.php?keyword=undefined&amp;lat=31.6903638&amp;long=-106.4245478&amp;country_code=MX&amp;city=Ciudad%20Juárez&amp;province=Chih.&amp;address=6735%20Boulevard%20Teófilo%20Borunda" class="text-black">Ciudad Juarez</a>
<a href="search.php?keyword=44460&amp;lat=20.6596988&amp;long=-103.3496092&amp;country_code=MX&amp;city=Guadalajara&amp;province=Jal.&amp;address=1507%20Loma%20Mazamitla%20Sur" class="text-black">Guadalajara</a>
<a href="search.php?keyword=45029&amp;lat=20.6719563&amp;long=-103.416501&amp;country_code=MX&amp;city=Zapopan&amp;province=Jal.&amp;address=131%20Calle%20A%20las%20Cumbres" class="text-black">Zapopan</a>
<a href="search.php?keyword=64490&amp;lat=25.6866142&amp;long=-100.3161126&amp;country_code=MX&amp;city=Monterrey&amp;province=N.L.&amp;address=115%20General%20Carlos%20Diez%20Gutiérrez" class="text-black">Monterrey</a>
<a href="search.php?keyword=57000&amp;lat=19.3994934&amp;long=-98.9896643&amp;country_code=MX&amp;city=Ciudad%20Nezahualcóyotl&amp;province=Méx.&amp;address=224%20Calle%20Norteña" class="text-black">Ciudad Nezahualcoyotl</a>

<a href="search.php?keyword=13430&amp;lat=-6.2250138&amp;long=106.9004472&amp;country_code=ID&amp;city=East%20Jakarta&amp;province=Jakarta&amp;address=15%20Jalan%20Balai%20Rakyat%20I" class="text-black">East Jakarta</a>
<a href="search.php?keyword=60272&amp;lat=-7.2574719&amp;long=112.7520883&amp;country_code=ID&amp;city=Surabaya&amp;province=East%20Java&amp;address=No.18%20Jalan%20Kanginan%20I" class="text-black">Surabaya</a>
<a href="search.php?keyword=17145&amp;lat=-6.2382699&amp;long=106.9755726&amp;country_code=ID&amp;city=Bekasi&amp;province=West%20Java&amp;address=33%20Jalan%20Melur%205" class="text-black">Bekasi</a>
<a href="search.php?keyword=40112&amp;lat=-6.9174639&amp;long=107.6191228&amp;country_code=ID&amp;city=Bandung&amp;province=West%20Java&amp;address=115%20Jalan%20Gudang%20Selatan" class="text-black">Bandung</a>
<a href="search.php?keyword=undefined&amp;lat=3.5951956&amp;long=98.6722227&amp;country_code=ID&amp;city=Medan&amp;province=North%20Sumatra&amp;address=2a%20Jalan%20Kemiri" class="text-black">Medan</a>
<a href="search.php?keyword=11520&amp;lat=-6.167430899999999&amp;long=106.7637239&amp;country_code=ID&amp;city=West%20Jakarta&amp;province=Jakarta&amp;address=RT.2%20Jalan%20Kedoya%20Raya" class="text-black">West Jakarta</a>
<a href="search.php?keyword=12150&amp;lat=-6.2614927&amp;long=106.8105998&amp;country_code=ID&amp;city=South%20Jakarta&amp;province=Jakarta&amp;address=No.43%20Jalan%20Cempaka%20III" class="text-black">South Jakarta</a>
<a href="search.php?keyword=16435&amp;lat=-6.4024844&amp;long=106.7942405&amp;country_code=ID&amp;city=Depok&amp;province=West%20Java&amp;address=17-11%20Jalan%20Perumahan%20Depok%20Maharaja" class="text-black">Depok</a>
<a href="search.php?keyword=15111&amp;lat=-6.1701796&amp;long=106.6403236&amp;country_code=ID&amp;city=Tangerang&amp;province=Banten&amp;address=1%20Jalan%20Satria%20-%20Sudirman" class="text-black">Tangerang</a>
<a href="search.php?keyword=14240&amp;lat=-6.155405699999999&amp;long=106.8926634&amp;country_code=ID&amp;city=North%20Jakarta&amp;province=Jakarta&amp;address=" class="text-black">North Jakarta</a>


<a href="search.php?keyword=undefined&amp;lat=14.6760413&amp;long=121.0437003&amp;country_code=PH&amp;city=Quezon%20City&amp;province=NCR&amp;address=218%20Tandang%20Sora%20Avenue" class="text-black">Quezon City</a> 
<a href="search.php?keyword=1001&amp;lat=14.5995124&amp;long=120.9842195&amp;country_code=PH&amp;city=Manila&amp;province=NCR&amp;address=1001%20Quezon%20Boulevard" class="text-black">Manila</a>
<a href="search.php?keyword=undefined&amp;lat=14.7565784&amp;long=121.0449768&amp;country_code=PH&amp;city=Caloocan&amp;province=NCR&amp;address=107%20Camarin%20Road" class="text-black">Caloocan</a>
<a href="search.php?keyword=undefined&amp;lat=7.190708&amp;long=125.455341&amp;country_code=PH&amp;city=Davao%20City&amp;province=Davao%20Region&amp;address=" class="text-black">Davao City</a>
<a href="search.php?keyword=undefined&amp;lat=10.3156992&amp;long=123.8854366&amp;country_code=PH&amp;city=Cebu%20City&amp;province=Central%20Visayas&amp;address=1596%20V%20Rama%20Avenue" class="text-black">Cebu</a>
<a href="search.php?keyword=undefined&amp;lat=6.9214424&amp;long=122.0790267&amp;country_code=PH&amp;city=Zamboanga&amp;province=Zamboanga%20Peninsula&amp;address=96%20Veterans%20Avenue%20Ext." class="text-black">Zamboanga City</a>
<a href="search.php?keyword=undefined&amp;lat=14.5176184&amp;long=121.0508645&amp;country_code=PH&amp;city=Taguig&amp;province=NCR&amp;address=1630%20Bayani%20Road" class="text-black">Taguig</a>
<a href="search.php?keyword=undefined&amp;lat=14.5763768&amp;long=121.0851097&amp;country_code=PH&amp;city=Pasig&amp;province=NCR&amp;address=87-401%20Francisco%20Legaspi" class="text-black">Pasig</a>
<a href="search.php?keyword=undefined&amp;lat=8.4542363&amp;long=124.6318977&amp;country_code=PH&amp;city=Cagayan%20de%20Oro&amp;province=Northern%20Mindanao&amp;address=" class="text-black">Cagayan De Oro City</a>
<a href="search.php?keyword=1709&amp;lat=14.4793095&amp;long=121.0198229&amp;country_code=PH&amp;city=Parañaque&amp;province=NCR&amp;address=154%20Amity" class="text-black">Paranaque</a>


<a href="search.php?keyword=10200&amp;lat=13.7563309&amp;long=100.5017651&amp;country_code=TH&amp;city=Bangkok&amp;province=Bangkok&amp;address=78/3%20Dinso%20Road" class="text-black">Bangkok</a>
<a href="search.php?keyword=30000&amp;lat=14.9738493&amp;long=102.083652&amp;country_code=TH&amp;city=Nakhon%20Ratchasima&amp;province=จ.นครราชสีมา&amp;address=" class="text-black">Nakhon Ratchasima</a>
<a href="search.php?keyword=50200&amp;lat=18.7883439&amp;long=98.98530079999999&amp;country_code=TH&amp;city=Chiang%20Mai&amp;province=จ.เชียงใหม่&amp;address=22%20Jhaban%20Road" class="text-black">Chiang Mai</a>
<a href="search.php?keyword=90110&amp;lat=7.0086472&amp;long=100.4746879&amp;country_code=TH&amp;city=Hat%20Yai&amp;province=จ.สงขลา&amp;address=48%20Supasarnrangsan%20Road" class="text-black">Hat Yai</a>
<a href="search.php?keyword=41000&amp;lat=17.3646969&amp;long=102.8158924&amp;country_code=TH&amp;city=Udon%20Thani&amp;province=จ.อุดรธานี&amp;address=" class="text-black">Udon Thani</a>
<a href="search.php?keyword=11120&amp;lat=13.8994973&amp;long=100.5426442&amp;country_code=TH&amp;city=Pak%20Kret&amp;province=จ.นนทบุรี&amp;address=" class="text-black">Pak Kret</a>
<a href="search.php?keyword=40000&amp;lat=16.4321938&amp;long=102.8236214&amp;country_code=TH&amp;city=Khon%20Kaen&amp;province=จ.ขอนแก่น&amp;address=" class="text-black">Khon Kaen</a>
<a href="search.php?keyword=20110&amp;lat=13.1623042&amp;long=100.9221135&amp;country_code=TH&amp;city=Si%20Racha&amp;province=จ.ชลบุรี&amp;address=161%20Surasak%203" class="text-black">Chaophraya Surasak</a>
<a href="search.php?keyword=34000&amp;lat=15.2286861&amp;long=104.8564217&amp;country_code=TH&amp;city=Ubon%20Ratchathani&amp;province=จ.อุบลราชธานี&amp;address=179%2024" class="text-black">Ubon Ratchathani</a>


<a href="search.php?keyword=2000&amp;lat=51.2213404&amp;long=4.4051485&amp;country_code=BE&amp;city=Antwerp&amp;province=Flanders&amp;address=61%20Minderbroedersrui" class="text-black">Antwerp</a>
<a href="search.php?keyword=9000&amp;lat=51.0500182&amp;long=3.7303351&amp;country_code=BE&amp;city=Ghent&amp;province=Flanders&amp;address=2e%20Vlaanderenstraat" class="text-black">Ghent</a>
<a href="search.php?keyword=6000&amp;lat=50.4096349&amp;long=4.44601&amp;country_code=BE&amp;city=Charleroi&amp;province=Wallonia&amp;address=51%20Boulevard%20Audent" class="text-black">Charleroi</a>
<a href="search.php?keyword=4000&amp;lat=50.63295859999999&amp;long=5.569749799999999&amp;country_code=BE&amp;city=Liège&amp;province=Wallonia&amp;address=" class="text-black">Liège</a>
<a href="search.php?keyword=1000&amp;lat=50.8476424&amp;long=4.3571696&amp;country_code=BE&amp;city=Brussels&amp;province=Brussels&amp;address=55%20Bergstraat" class="text-black">Brussels</a>
<a href="search.php?keyword=1030&amp;lat=50.8674778&amp;long=4.3773347&amp;country_code=BE&amp;city=Schaerbeek&amp;province=Brussels&amp;address=391%20Haachtsesteenweg" class="text-black">Schaerbeek</a>
<a href="search.php?keyword=1070&amp;lat=50.83492709999999&amp;long=4.3069041&amp;country_code=BE&amp;city=Anderlecht&amp;province=Brussels&amp;address=14%20Sint-Guidocorso" class="text-black">Anderlecht</a>
<a href="search.php?keyword=8000&amp;lat=51.2091807&amp;long=3.2247552&amp;country_code=BE&amp;city=Bruges&amp;province=Flanders&amp;address=1%20Markt" class="text-black">Bruges</a>
<a href="search.php?keyword=5000&amp;lat=50.4649359&amp;long=4.865072899999999&amp;country_code=BE&amp;city=Namur&amp;province=Wallonia&amp;address=68%20Rue%20de%20Fer" class="text-black">Namur</a>
<a href="search.php?keyword=3000&amp;lat=50.8822871&amp;long=4.7137645&amp;country_code=BE&amp;city=Leuven&amp;province=Flanders&amp;address=254%20Diestsestraat" class="text-black">Leuven</a>


<a href="search.php?keyword=1011%20RM&amp;lat=52.3675734&amp;long=4.9041389&amp;country_code=NL&amp;city=Amsterdam&amp;province=NH&amp;address=" class="text-black">Amsterdam</a>
<a href="search.php?keyword=3012%20CM&amp;lat=51.9244201&amp;long=4.4777325&amp;country_code=NL&amp;city=Rotterdam&amp;province=ZH&amp;address=2151%20Hofplein" class="text-black">Rotterdam</a>
<a href="search.php?keyword=2526%20NG&amp;lat=52.0704978&amp;long=4.3006999&amp;country_code=NL&amp;city=The%20Hague&amp;province=ZH&amp;address=18t%20Vaillantlaan" class="text-black">The Hague</a>
<a href="search.php?keyword=3512%20JH&amp;lat=52.09073739999999&amp;long=5.1214201&amp;country_code=NL&amp;city=Utrecht&amp;province=UT&amp;address=1%20Domplein" class="text-black">Utrecht</a>
<a href="search.php?keyword=5616%20LA&amp;lat=51.44164199999999&amp;long=5.4697225&amp;country_code=NL&amp;city=Eindhoven&amp;province=NB&amp;address=" class="text-black">Eindhoven</a>
<a href="search.php?keyword=5014%20DB&amp;lat=51.560596&amp;long=5.0919143&amp;country_code=NL&amp;city=Tilburg&amp;province=NB&amp;address=16%20NS-Plein" class="text-black">Tilburg</a>
<a href="search.php?keyword=9712%20GW&amp;lat=53.2193835&amp;long=6.566501799999999&amp;country_code=NL&amp;city=Groningen&amp;province=GR&amp;address=18%20Oude%20Ebbingestraat" class="text-black">Groningen</a>
<a href="search.php?keyword=1315%20GN&amp;lat=52.37506699999999&amp;long=5.2153339&amp;country_code=NL&amp;city=Almere&amp;province=FL&amp;address=" class="text-black">Almere Stad</a>
<a href="search.php?keyword=4837%20EA&amp;lat=51.5719149&amp;long=4.768323&amp;country_code=NL&amp;city=Breda&amp;province=NB&amp;address=23%20Graaf%20Engelbertlaan" class="text-black">Breda</a>
<a href="search.php?keyword=6533%20DK&amp;lat=51.8125626&amp;long=5.8372264&amp;country_code=NL&amp;city=Nijmegen&amp;province=GE&amp;address=61%20Marie%20Curiestraat" class="text-black">Nijmegen</a>