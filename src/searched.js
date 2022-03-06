import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Modal,
  ImageBackground,
  Linking,
  TouchableOpacity,
} from "react-native";
const { height } = Dimensions.get("window");
import { Video } from "expo-av";
import {
  Entypo,
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import RangeSlider, { Slider } from "react-native-range-slider-expo";
import CheckBox from "react-native-check-box";
import { BasePath } from "../config/config";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SearchableDropdown from "react-native-searchable-dropdown";
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import OptionsMenu from "react-native-options-menu";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
import Toast from "react-native-tiny-toast";
import * as AppleAuthentication from "expo-apple-authentication";
import jwt_decode from "jwt-decode";
import * as Location from "expo-location";
import { StatusBar } from 'expo-status-bar';

const images = [
  {
    image: require("../assets/images/sq/ubereats.jpg"),
  },
  {
    image: require("../assets/images/sq/deliveroo.jpg"),
  },
  {
    image: require("../assets/images/sq/justeat.jpg"),
  },
  {
    image: require("../assets/images/sq/grubhub.jpg"),
  },
  {
    image: require("../assets/images/sq/doordash.jpg"),
  },
  {
    image: require("../assets/images/sq/postmates.jpg"),
  },
  {
    image: require("../assets/images/sq/supper.jpg"),
  },
  {
    image: require("../assets/images/sq/foodpanda.jpg"),
  },
  {
    image: require("../assets/images/sq/wolt.jpg"),
  },
  {
    image: require("../assets/images/sq/swiggy.jpg"),
  },
  {
    image: require("../assets/images/sq/waitr.jpg"),
  },
  {
    image: require("../assets/images/sq/dunzo.jpg"),
  },
  {
    image: require("../assets/images/sq/thuisbezorgd.jpg"),
  },
  {
    image: require("../assets/images/sq/rappi.jpg"),
  },
  {
    image: require("../assets/images/sq/talabat.jpg"),
  },
  {
    image: require("../assets/images/sq/takeaway.jpg"),
  },
  {
    image: require("../assets/images/sq/lieferando.jpg"),
  },
  {
    image: require("../assets/images/sq/ifood.jpg"),
  },
  {
    image: require("../assets/images/sq/glovo.jpg"),
  },
  {
    image: require("../assets/images/sq/delivery.jpg"),
  },
  {
    image: require("../assets/images/sq/zomato.jpg"),
  },
  {
    image: require("../assets/images/sq/eatstreet.jpg"),
  },
  {
    image: require("../assets/images/sq/waiter.jpg"),
  },
  {
    image: require("../assets/images/sq/pedidosya.jpg"),
  },
  {
    image: require("../assets/images/sq/hungerstation.jpg"),
  },
  {
    image: require("../assets/images/sq/BoxGR.jpg"),
  },
  {
    image: require("../assets/images/sq/grabfood.jpg"),
  },
  {
    image: require("../assets/images/sq/menulog.jpg"),
  },
  {
    image: require("../assets/images/sq/talabat.jpg"),
  },
  {
    image: require("../assets/images/sq/skipthedishes.jpg"),
  },
];

const dishes = [
  '[{"restaurant_name":"PaStation ","delivery_fee":"\\u00a32.99","delivery":2.99,"delivery_time":"20\\u201335 min","delivery_time_numeric":20.0,"rating":4.7,"rating_numeric":4.7,"nb_reviews":"500+","promotion":" ","image_url":"https:\\/\\/rs-menus-api.roocdn.com\\/images\\/17c4a0cb-6896-4b74-9eb5-9193c0bc9f81\\/image.jpeg?width=2000&height=1400","link":"https:\\/\\/deliveroo.co.uk\\/menu\\/london\\/goodge-street\\/pastation-goodge-street?day=today&geohash=gcpvj0e56cwp&time=ASAP","source":"Deliveroo","filter_gluten_free":0,"filter_allergy_friendly":0,"filter_vegetarian":0,"filter_vegan":0,"filter_halal":0,"filter_kosher":0,"filter_organic":0,"filter_paleo":0,"filter_healthy":0,"price_category":"\\u00a3","distance":"1 mile away","categories":"Pasta, Italian, Pizza, Salads","_id":"87008","carbon":1.0,"match found":"PaStation "},{"restaurant_name":"Pastation","delivery_fee":"\\u00a30.99","delivery":0.99,"delivery_time":"35 min","delivery_time_numeric":35.0,"rating":4.33,"rating_numeric":3.6,"nb_reviews":23,"promotion":"20% off when you spend \\u00a315","image_url":"https:\\/\\/just-eat-prod-eu-res.cloudinary.com\\/image\\/upload\\/c_fill,f_auto,q_auto,w_600,h_400,d_uk:cuisines:italian-1.jpg\\/v1\\/uk\\/restaurants\\/140780.jpg","link":"https:\\/\\/www.just-eat.co.uk\\/restaurants-pastation-londonw1t","source":"Just Eat","filter_gluten_free":0,"filter_allergy_friendly":0,"filter_vegetarian":0,"filter_vegan":0,"filter_halal":0,"filter_kosher":0,"filter_organic":0,"filter_paleo":0,"filter_healthy":0,"price_category":"\\u00a3","distance":"1.0 miles","categories":"Italian, Pizza, Low Delivery Fee","_id":140780,"carbon":1.0,"match found":"PaStation "},{"restaurant_name":"PaStation","delivery_fee":"\\u00a31.29","delivery":1.29,"delivery_time":"25\\u201335 min","delivery_time_numeric":25.0,"rating":"4.5","rating_numeric":4.5,"nb_reviews":200.0,"promotion":null,"image_url":"https:\\/\\/d1ralsognjng37.cloudfront.net\\/cc170a78-6d90-4260-8240-07a113e84341.jpeg","link":"https:\\/\\/www.ubereats.com\\/store\\/pastation\\/ZcBXdxDQQWeZwx9AvLIaKw","source":"Uber Eats","filter_gluten_free":0,"filter_allergy_friendly":0,"filter_vegetarian":0,"filter_vegan":0,"filter_halal":0,"filter_kosher":0,"filter_organic":0,"filter_paleo":0,"filter_healthy":0,"price_category":"\\u00a3\\u00a3","distance":null,"categories":"Pizza","_id":"65c05777-10d0-4167-99c3-1f40bcb21a2b","carbon":2.0,"match found":"PaStation "}]',
  '[{"restaurant_name":"intial index1","delivery":"34","source":"ubereat1","title":"Millennium Pizza Bar"},{"restaurant_name":"Millennium Pizza Bar","delivery":"14","source":"ubereat","title":"Millennium Pizza Bar"},{"restaurant_name":"Millennium Pizza Bar","delivery":"24","title":"Millennium Pizza Bar","source":"foodpanda"},{"restaurant_name":"Millennium Pizza Bar","delivery":"0","title":"Millennium Pizza Bar","source":"foodpan1da"}]',
  '[{"restaurant_name":"intial index2","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"},{"restaurant_name":"Millennium Pizza Bar","title":"Millennium Pizza Bar","source":"foodpanda","delivery":"23"},{"restaurant_name":"Millennium Pizza Bar","source":"ubereat","title":"Millennium Pizza Bar","delivery":"0"},{"restaurant_name":"Millennium Pizza Bar","title":"Millennium Pizza Bar","source":"fooqdpanda","delivery":"1"}]',
  '[{"restaurant_name":"intial index3","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
  '[{"restaurant_name":"intial index4","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
  '[{"restaurant_name":"intial index5","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
  '[{"restaurant_name":"intial index6","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
];

const sort = [
  {
    txt: "All",
    selected: false,
  },
  {
    txt: "Delivery Time",
    selected: false,
  },
  {
    txt: "Rating",
    selected: false,
  },
  {
    txt: "Delivery Fee",
    selected: false,
  },
  {
    txt: "Promotion Only?",
    selected: false,
  },
];

const dietary = [
  {
    txt: "Allergy Friendly",
    selected: false,
  },
  {
    txt: "Vegan",
    selected: false,
  },
  {
    txt: "Halal",
    selected: false,
  },
  {
    txt: "Vegetarian",
    selected: false,
  },
  {
    txt: "Kosher",
    selected: false,
  },
  {
    txt: "Paleo",
    selected: false,
  },
  {
    txt: "Gluten Free",
    selected: false,
  },
  {
    txt: "Organic",
    selected: false,
  },
  {
    txt: "Healthy",
    selected: false,
  },
];

export default function Searched(props) {
  const [location, setLocation] = useState("");
  const [ismodal, setismodal] = useState(false);
  const [catdishes, setCatdishes] = useState([]);
  const [issort, setissort] = useState(false);
  const [filtermodal, setfiltermodal] = useState(false);
  const [best, setbest] = useState(false);
  const [deal, setdeal] = useState([]);
  const isFocused = useIsFocused();
  const [value, setValue] = useState(0);
  const [devTime, setDevTime] = useState(0);
  const [carbonvalue, setcarbonvalue] = useState(0);
  const [isChecked, setisChecked] = useState({});
  const [param, setParams] = useState();
  const [search, setSerch] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [searchArr, setsearchArr] = useState([]);
  const [oriArr, setOriarr] = useState([]);
  const [arrLength, setarrLength] = useState("");
  const [searchKey, setsearchKey] = useState("");
  const [conCode, setconCode] = useState([]);
  const [sortList, setsortList] = useState(sort);
  const [dietry, setDietry] = useState();
  const [Viewmenu, setViewList] = useState(false);
  const [menuLoading, setmenuLoading] = useState(false);
  const [showlength, setshowlength] = useState(true);
  const [menuRes, setmenuRes] = useState("");
  const [menuResCat, setmenuResCat] = useState("");
  const [menuAddres, setmenuAddres] = useState("");
  const [menuImage, setmenuImage] = useState();
  const [previous, setprevious] = useState(0);
  const [menuCategory, setmenuCategory] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [curreny, setCurrency] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLattitude] = useState("");
  const [lng, setLongitutde] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [category, setcategory] = useState("");
  const [seaLoading, setseaLoading] = useState(false);
  const googleRef = useRef(null);
  const [errmsg, seterrmsg] = useState("");
  const [once, setOnce] = useState(true);
  const [validateLogin, setvalidateLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isloginLoading, setisloginLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [erromsg, seterrMsg] = useState("");
  const [id, setId] = useState("");
  const [singItem, setsingItem] = useState();
  const [temparr, settemparr] = useState();
  const [indxItem, setindxItem] = useState();
  const [selected, setSelected] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currlocation, setcurrLocation] = useState();

  //   const prevCount = usePrevious(oriArr)
  const ref = useRef();

  useEffect(() => {
    // return searchedsrc()
    // await AsyncStorage.clear()
    setData();

    setDietry(dietary);
    // fetch(`${BasePath}getCategories.php`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "multipart/form-data",
    //     },
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     // const {results: dish} = json.Data;
    //     // console.log(dish);
    //     if (json.Status.message == "Successfull") {
    //         // console.log(json.Data);
    //         setCatdishes(json.Data);
    //         // setTimeout(() => {
    //             // json.Data.map((item)=>{
    //             //     setCatdishes(item.category_name)
    //             // })
    //             // setFilteredDishes(json.Data.category_name)
    //         // }, 500);

    //     }
    //     // setTimeout(() => {
    //     //     console.log(catdishes);
    //     // }, 8000);
    //     //setting the data in the films state
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // let rre = []
    // let final = []
    // let temparr = []

    // let arr = []
    // dishes.map((item,index)=>{
    //     let res = JSON.parse(item)
    //     let srcArr = []
    //     if(res.length > 1){
    //         res.map((data,key)=>{
    //             srcArr.push({src:data.source,fee:data.delivery})
    //         })
    //     }else{
    //         arr.push(res[0])
    //     }
    //     const n = srcArr.filter((tag, index, dub) =>
    //      dub.findIndex(t => t.src === tag.src) == index);
    //      let sou = []
    //      let temp = 10000.5
    //      let indx = 0

    //     if(res.length > 1){
    //         res.map((item,index)=>{

    //         // console.log('iteration',index);
    //         if(index === 0){
    //             sou = [].concat(n)
    //             .sort((a, b) => a.fee > b.fee ? 1 : -1)
    //         //     n.map((data,key)=>{
    //         //     // console.log(indx+"***********************"+temp , data.fee<temp)
    //         //     // console.log(data.fee+"*****"+temp ,indx, data.fee<temp)
    //         //     // console.log('inner loop iteration',key);

    //         //     if(data.fee<temp){
    //         //         temp = data.fee
    //         //         indx = key
    //         //     }
    //         //     // else{
    //         //     //     temp = data.fee
    //         //     //     indx = key
    //         //     // }
    //         //     // console.log( data.fee)

    //         //         sou.push(data)
    //         // })

    //             // console.log(temp ,indx)
    //             rre.push({...item,sou})

    //     }
    //     // console.log(indx+"***********************"+temp)
    //     // temparr.push({best:temp,indx:indx})
    //     // console.log(temparr);
    //     })

    //     }
    //     // if(res.length > 1){
    //     //     temparr.push({tempval:temp,tempindx:indx})
    //     // }
    // })
    // return console.log("sc array == >",rre)

    // var rest = rre.map((data,key)=>{
    //     let drc = data.sou.map((item,index)=>{
    //         // temparr.map((dat,i)=>{
    //             if(dat.tempindx == index){
    //                 return {...item,temp:true,temp_num:dat.tempval}
    //             }else{
    //                 return {...item}
    //             }
    //         // })
    //         // return temparr
    //         // console.log( indx ,index);
    //         // console.log( typeof indx ,typeof index);

    //     })
    //     return {...data,drc,sou:[]}
    // })

    // var ids = new Set(arr.map(d => d.restaurant_name));
    // var merged = [...arr, ...rest.filter(d => !ids.has(d.restaurant_name))];
    // console.log("sc array == >",merged)
    searchedArr();
    checkCurrency();
    return async function resetData() {
      // alert('called component unmount')
      try {
        await AsyncStorage.removeItem("delivery");
        await AsyncStorage.removeItem("time");
        await AsyncStorage.removeItem("carbon");
        // alert('cleared item')
        // return true;
      } catch (exception) {
        console.log(exception);
        // return false;
      }
      // await AsyncStorage.clear()
    };
  }, [isFocused]);

  const getcategory = (val) => {
    setcategory(val);
    const formData = new FormData();
    formData.append("slug", val);
    // return console.log(formData);
    // console.log(formData);
    try {
      fetch(`${BasePath}getSearchList.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson.Flag)
          let cat = [];
          let res = [];
          let combined = [];
          let Flag = responseJson.Status;
          if (Flag.flag == 1) {
            Toast.show(Flag.message);
            // console.log(responseJson.Restaurants);
            cat.push(responseJson.Categories);
            res.push(responseJson.Restaurants);
            cat.map((item, index) => {
              res.map((data, indx) => {
                combined.push(...item, ...data);
              });
            });
            // Toast.show(responseJson)
            // Toast.show('Added to recents')

            setTimeout(() => {
              // console.log(combined);
              setCatdishes(combined);
            }, 500);
          } else {
            // Toast.show(Flag.message)
            // Toast.show(responseJson.error_msg);
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  async function setData() {
    let logged = await AsyncStorage.getItem("isLoggedIn");
    let id = await AsyncStorage.getItem("userid");
    // alert(id)
    if (logged != null) {
      setvalidateLogin(logged == 1 ? true : false);
      setId(id);
    } else {
      if (once) {
        setismodal(true);
        setOnce(false);
      }
    }
  }

  async function searchedArr(param = "") {
    // console.log(param);
    setisLoading(true);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    let params;
    if (param != "") {
      params = { ...param };
      console.log("if called");
    } else {
      params = { ...props?.route?.params?.params };
      console.log("else called");
    }
    // const params = props?.route?.params?.params
    setParams(params);
    // console.log(params)
    const searchKey = params.input_category;
    const coucode = params.input_country;
    setsearchKey(searchKey);
    try {
      const res = await axios.post(
        `https://circular-hawk-253618.appspot.com/getRestaurants2`,
        JSON.stringify(params),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = res?.data;
      var arrData = [];
      var finl = [];
      let temp = 10000.5;
      let indx = 0;
      // let rre = []
      var best = [];
      var arrOri = [];
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

      data.map((item, index) => {
        var res = JSON.parse(item);
        let arr = [];
        let srcArr = [];

        if (res.length > 1) {
          arrOri.push({ ...res[0], isFav: false });
          res.map((data, key) => {
            // arr.push(data)
            srcArr.push({
              src: data.source,
              promotion: data.promotion,
              delivery_fee: data.delivery_fee,
              delivery_fee_numeric: data.delivery_fee_numeric,
              delivery_time: data.delivery_time,
              rating_numeric: data.rating_numeric,
              nb_reviews: data.nb_reviews,
              link: data.link,
              delivery_time: data.delivery_time,
              delivery_time_numeric: data.delivery_time_numeric,
            });
          });
        } else {
          finl.push({ ...res[0], isFav: false });
        }
        let dub = srcArr;
        const n = srcArr.filter(
          (tag, index, dub) => dub.findIndex((t) => t.src === tag.src) == index
        );
        let sou = [];
        if (res.length > 1) {
          res.map((item, index) => {
            if (index === 0) {
              sou = []
                .concat(n)
                .sort((a, b) =>
                  a.delivery_fee_numeric > b.delivery_fee_numeric ? 1 : -1
                );
              //     n.forEach((data,key)=>{
              //         if(data.delivery_fee_numeric<temp){
              //             temp = data.delivery_fee_numeric
              //             indx = key
              arrData.push({ ...item, sou });
            }
            //         sou.push(data)
            // })
            // console.log(indx+ "=" +temp)
          });
        }
      });
      // console.log(arrData)
      var rre = arrData.map((data, key) => {
        // console.log(temp+"++++++11111111111++++++++"+indx)
        let sre = data.sou;
        // console.log(sre)
        let drc = sre.map((item, index) => {
          if (indx === index) {
            return { ...item, temp: true, temp_num: temp };
          } else {
            return { ...item };
          }
        });
        return { ...data, drc, sou: [] };
        // return data
        // console.log(data)
      });
      // return console.log(best);
      var ids = new Set(rre.map((d) => d.restaurant_name));
      var merged = [...rre, ...finl.filter((d) => !ids.has(d.restaurant_name))];
      // return console.log(finl);

      setsearchArr(merged);
      setarrLength(rre.length + finl.length);

      var names = new Set(arrOri.map((d) => d.restaurant_name));
      var mergedOri = [
        ...arrOri,
        ...finl.filter((d) => !names.has(d.restaurant_name)),
      ];
      ref.current = mergedOri;
      setOriarr(mergedOri);
      // alert(mergedOri.length)
    } catch (err) {
      console.log(err.response.data);
    }

    try {
      console.log(coucode + "  !!!!!!!!!!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      const params = new URLSearchParams();
      params.append("country_code", coucode);

      const res = await axios.post(
        `https://foodery.org/Mobile_API/getSources.php`,
        params,
        {
          headers: {
            // Accept: 'application/json',
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = res?.data?.Data;
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      // await AsyncStorage.setItem('sou_arr',data)
      //  console.log(data)
      setconCode(data);
    } catch (err) {
      console.log(err.response.data);
    }
    setisLoading(false);
    setSelected("");
  }

  function searchedsrc(source) {
    // return  console.log(source)
    // console.log(conCode)
    var link = [];
    conCode.map((item, index) => {
      if (item.source_name === source) {
        // console.log(item.name)
        link.push(item.source_image);
      }
    });
    let images = [];
    link.map((item) => {
      // console.log(item)
      images.push(
        <Image
          source={{ uri: `http://foodery.org/${item}` }}
          style={{ height: responsiveHeight(6.4), width: 'auto' }}
        />
      );
    });
    return images;
  }

  async function sortBy(sort) {
    setisLoading(true);

    const res = sortList.map((item) => {
      if (item.txt === sort) {
        // alert('called')
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    // console.log(res);

    setsortList(res);

    let singleObj = [];
    let multiObj = [];

    if (sort === "All") {
      await AsyncStorage.removeItem("delivery");
      await AsyncStorage.removeItem("time");
      await AsyncStorage.removeItem("carbon");
      searchedArr();
    } else if (sort === "Delivery Time") {
      // setsearchArr(myData)
      // const res =
      // searchArr.map((item)=>{
      //     if(item.sou){
      //         // console.log('************sou found*****************',item.sou);
      //         multiObj.push(item)

      //     }else{
      //         singleObj.push(item)
      //         // console.log(item.delivery_time_numeric);
      //     }
      // })

      const myDataMulti = []
        .concat(oriArr)
        .sort((a, b) =>
          a.delivery_time_numeric > b.delivery_time_numeric ? 1 : -1
        );

      // const myData = [].concat(singleObj)
      // .sort((a, b) => a.delivery_time_numeric > b.delivery_time_numeric ? 1 : -1)

      // var ids = new Set(myDataMulti.map(d => d.restaurant_name));
      // var merged = [...myDataMulti, ...myData.filter(d => !ids.has(d.restaurant_name))];

      setsearchArr(myDataMulti);
      // alert(myDataMulti.length)

      // myDataMulti.map((item)=>{

      //         console.log(item.delivery_time_numeric);
      // })
      // console.log(myData.delivery_time_numeric);
      setisLoading(false);
    } else if (sort === "Rating") {
      const myDataMulti = []
        .concat(oriArr)
        .sort((a, b) => (a.rating < b.rating ? 1 : -1));
      setsearchArr(myDataMulti);

      setisLoading(false);
    } else if (sort === "Delivery Fee") {
      const myDataMulti = []
        .concat(oriArr)
        .sort((a, b) =>
          a.delivery_fee_numeric > b.delivery_fee_numeric ? 1 : -1
        );
      setsearchArr(myDataMulti);

      setisLoading(false);
    } else {
      searchArr.map((item) => {
        if (item.sou) {
          // console.log('************sou found*****************',item.sou);
          multiObj.push(item);
        } else {
          singleObj.push(item);
          // console.log(item.delivery_time_numeric);
        }
      });
      // const myDataMulti = []
      //   .concat(multiObj)
      //   .sort((a, b) => (a.sou[0].promotion > b.sou[0].promotion ? 1 : -1));

      const myData = []
        .concat(singleObj)
        .sort((a, b) => (a.promotion > b.promotion ? 1 : -1));

      // var ids = new Set(myDataMulti.map((d) => d.restaurant_name));
      // var merged = [
      //   ...myDataMulti,
      //   ...myData.filter((d) => !ids.has(d.restaurant_name)),
      // ];

      setsearchArr(myData);
      // alert(myDataMulti.length)
      setisLoading(false);
    }

    // setTimeout(() => {
    // }, 4000);
    setissort(false);
  }

  async function viewMenu(id, link, source) {
    console.log(id, link, source);
    try {
      setmenuLoading(true);
      const recent = props.route.params.params;
      // return console.log(recent.input_address);
      const params = {
        "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
        rest_id: id,
        source_id: source,
        country_code: recent.input_country,
        lat: recent.input_lat,
        long: recent.input_long,
        rest_slug: link,
      };
      // console.log(params);
      const res = await axios.post(
        `https://circular-hawk-253618.appspot.com/getRestaurantsMenu2`,
        JSON.stringify(params),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = res?.data;
      // console.log(data);
      setmenuRes(data[0].rest_name);
      var str = data[0].rest_categories;
      if (str != null || str != undefined) {
        var desir = str.replace(/\,/g, " • ");
        setmenuResCat(desir);
      } else {
        setmenuResCat(data[0].rest_categories);
      }
      setmenuAddres(data[0].rest_address);
      setmenuImage(data[0].rest_image);
      // console.log(params);
      let uniqueCat = [];
      data.map((item) => {
        // console.log(item.cat_title);
        uniqueCat.push({ cat: item.cat_title });
      });
      const n = uniqueCat.filter(
        (tag, index, dub) => dub.findIndex((t) => t.cat === tag.cat) == index
      );
      const index = n.findIndex((object) => {
        return object.cat === "Popular Dishes";
      });
      let cat_data = [];
      if (index != -1) {
        const fnal = arraymove(n, index, 0);
        setmenuCategory(fnal);
        data.map((item) => {
          fnal.map((data) => {
            if (item.cat_title === data.cat) {
              // console.log(item.cat_title ,' === ', data.cat);
              cat_data.push({
                cat_title: item.cat_title,
                dish_name: item.dish_name,
                dish_price: item.dish_price,
                dish_image: item.dish_image,
                dish_description: item.dish_description,
              });
            }
          });
        });
      } else {
        setmenuCategory(n);
        data.map((item) => {
          n.map((data) => {
            if (item.cat_title === data.cat) {
              // console.log(item.cat_title ,' === ', data.cat);
              cat_data.push({
                cat_title: item.cat_title,
                dish_name: item.dish_name,
                dish_price: item.dish_price,
                dish_image: item.dish_image,
                dish_description: item.dish_description,
              });
            }
          });
        });
      }
      // console.log(cat_data);
      setTimeout(() => {
        setcategoryList(cat_data);
        setmenuLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }

  function emptytext(event) {
    setshowlength(event > 10 ? true : false);
  }

  async function filterclose() {
    console.log(value, devTime, carbonvalue);
    if (value != "Nan") {
      await AsyncStorage.setItem("delivery", JSON.stringify(value));
    }
    if (devTime != "Nan") {
      await AsyncStorage.setItem("time", JSON.stringify(devTime));
    }
    if (carbonvalue != "Nan") {
      await AsyncStorage.setItem("carbon", JSON.stringify(carbonvalue));
    }
    setfiltermodal(false);
  }

  async function setfilters() {
    // setisLoading(true)
    try {
      // const price = await AsyncStorage.getItem('price')
      const delivery = await AsyncStorage.getItem("delivery");
      const time = await AsyncStorage.getItem("time");
      const carbon = await AsyncStorage.getItem("carbon");
      // const dietary = await AsyncStorage.getItem('dietary')
      const numDev = parseInt(delivery);
      const numtime = parseInt(time);
      const numDevCarbon = parseInt(carbon);
      // alert(delivery)
      // if(dietary != ''){
      //     setTimeout(() => {
      //         filter_dietary(dietary)
      //     }, 1000);
      // }
      // if(price != ''){
      //     setTimeout(() => {
      //         filter_priceCategory(price)
      //     }, 1000);
      // }
      if (delivery != "") {
        setTimeout(() => {
          filter_deliveryFee(numDev);
        }, 1100);
      }
      if (time != "") {
        setTimeout(() => {
          filter_deliveryTime(numtime);
        }, 1200);
      }
      if (carbon != "") {
        setTimeout(() => {
          filter_Carbon(numDevCarbon);
        }, 1300);
      }
    } catch (e) {
      console.log(e);
    }
    setfiltermodal(true);
    // setTimeout(() => {
    //     setisLoading(false)
    // }, 2200);
  }

  async function filter_priceCategory(txt) {
    await AsyncStorage.setItem("price", txt);
    //    console.log(txt);
    const resu = curreny.map((item) => {
      if (item.txt === txt) {
        // alert('called')
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });

    setCurrency(resu);
    const res = oriArr.filter((item) => {
      if (item.price_category == txt) {
        // console.log(item.price_category);
        return { ...item };
      } else {
        // alert("not found")
      }
    });
    //    console.log("***************************************");
    // if(res.length < 1){

    // }else{
    setsearchArr(res);
    setarrLength(res.length);
    // }
    // setisLoading(false)
  }

  async function filter_deliveryFee(value) {
    // alert(value)

    setValue(value);
    if (value === 0) {
      const res = oriArr.filter((item) => {
        if (item.delivery_fee_numeric < 1 || item.delivery_fee_numeric === 1) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 1) {
      const res = oriArr.filter((item) => {
        if (item.delivery_fee_numeric < 1 || item.delivery_fee_numeric === 2) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 2) {
      const res = oriArr.filter((item) => {
        if (item.delivery_fee_numeric < 3 || item.delivery_fee_numeric === 3) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 3) {
      const res = oriArr.filter((item) => {
        if (item.delivery_fee_numeric > 3) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    }
  }

  function filter_deliveryTime(value) {
    // alert(oriArr.length)
    setDevTime(value);
    if (value === 0) {
      const res = oriArr.filter((item) => {
        if (
          item.delivery_time_numeric < 10 ||
          item.delivery_time_numeric === 10
        ) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 1) {
      const res = oriArr.filter((item) => {
        if (
          item.delivery_time_numeric < 20 ||
          item.delivery_time_numeric === 20
        ) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 2) {
      const res = oriArr.filter((item) => {
        if (
          item.delivery_time_numeric < 30 ||
          item.delivery_time_numeric === 30
        ) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 3) {
      const res = oriArr.filter((item) => {
        if (item.delivery_time_numeric > 30) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    }
  }

  function filter_Carbon(value) {
    // alert(oriArr.length)
    setcarbonvalue(value);
    if (value === 0) {
      const res = oriArr.filter((item) => {
        if (item.carbon === 3 || item.carbon < 3) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 1) {
      const res = oriArr.filter((item) => {
        if (item.carbon === 2 || item.carbon < 2) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 2) {
      const res = oriArr.filter((item) => {
        if (item.carbon === 1 || item.carbon < 1) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (value === 3) {
      const res = oriArr.filter((item) => {
        if (item.carbon === 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    }
  }

  function setrestData() {
    console.log(isChecked);
    console.log(ref.current);
    setisLoading(true);
    if (isChecked[0] === true) {
      setTimeout(() => {
        setsearchArr(ref.current);
        setarrLength(ref.current.length);
        setisLoading(false);
      }, 1000);
    }
  }

  function filter_Src(item, index) {
    console.log(isChecked);

    let srcName = "";
    conCode.map((item, indx) => {
      if (indx === index) {
        srcName = item.source_name;
      }
    });
    // console.log(srcName);
    const res = oriArr.filter((item) => {
      // console.log(item)
      // console.log(item.soure)
      if (item.source == srcName) {
        // console.log('true called')
        // console.log(item);
        return { ...item };
      } else {
        // console.log('false called')
        // console.log(item);
      }
    });

    // ref.current = res
    setsearchArr(res);
    setarrLength(res.length);
  }

  async function filter_dietary(name) {
    await AsyncStorage.setItem("dietary", name);

    const res = dietry.map((item) => {
      if (item.txt === name) {
        // alert('called')
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    // console.log(res);

    setDietry(res);
    // setarrLength(res.length)

    if (name === "Allergy Friendly") {
      const res = oriArr.filter((item) => {
        if (item.filter_allergy_friendly != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Vegan") {
      const res = oriArr.filter((item) => {
        if (item.filter_vegan != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Halal") {
      const res = oriArr.filter((item) => {
        if (item.filter_halal != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Vegetarian") {
      const res = oriArr.filter((item) => {
        if (item.filter_vegetarian != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Kosher") {
      const res = oriArr.filter((item) => {
        if (item.filter_kosher != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Paleo") {
      const res = oriArr.filter((item) => {
        if (item.filter_paleo != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Gluten Free") {
      const res = oriArr.filter((item) => {
        if (item.filter_gluten_free != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Organic") {
      const res = oriArr.filter((item) => {
        if (item.filter_organic != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    } else if (name === "Healthy") {
      const res = oriArr.filter((item) => {
        if (item.filter_healthy != 0) {
          // console.log(item.price_category);
          return { ...item };
        }
      });
      setsearchArr(res);
      setarrLength(res.length);
    }
    // alert(name)
  }

  function checkCurrency() {
    const country_filter = props.route.params.params.input_country;
    // alert(cont)
    const range_filter = [];
    if (
      country_filter == "EC" ||
      country_filter == "CR" ||
      country_filter == "CL" ||
      country_filter == "BR" ||
      country_filter == "SG" ||
      country_filter == "HK" ||
      country_filter == "DO" ||
      country_filter == "GT" ||
      country_filter == "PE" ||
      country_filter == "US" ||
      country_filter == "CA" ||
      country_filter == "NZ" ||
      country_filter == "AU" ||
      country_filter == "MX" ||
      country_filter == "AE" ||
      country_filter == "TW" ||
      country_filter == "AR"
    ) {
      range_filter.push(
        {
          txt: "$",
          selected: false,
        },
        {
          txt: "$$",
          selected: false,
        },
        {
          txt: "$$$",
          selected: false,
        },
        {
          txt: "$$$$",
          selected: false,
        }
      );
    }
    if (country_filter == "GB") {
      range_filter.push(
        {
          txt: "£",
          selected: false,
        },
        {
          txt: "££",
          selected: false,
        },
        {
          txt: "£££",
          selected: false,
        },
        {
          txt: "££££",
          selected: false,
        }
      );
    }
    if (country_filter == "ID") {
      range_filter.push(
        {
          txt: "Rp",
          selected: false,
        },
        {
          txt: "RpRp",
          selected: false,
        },
        {
          txt: "RpRpRp",
          selected: false,
        },
        {
          txt: "RpRpRpRp",
          selected: false,
        }
      );
    }
    if (country_filter == "TH") {
      range_filter.push(
        {
          txt: "฿",
          selected: false,
        },
        {
          txt: "฿฿",
          selected: false,
        },
        {
          txt: "฿฿฿",
          selected: false,
        },
        {
          txt: "฿฿฿฿",
          selected: false,
        }
      );
    }
    if (country_filter == "PH") {
      range_filter.push(
        {
          txt: "₱",
          selected: false,
        },
        {
          txt: "₱₱",
          selected: false,
        },
        {
          txt: "₱₱₱",
          selected: false,
        },
        {
          txt: "₱₱₱₱",
          selected: false,
        }
      );
    }
    if (country_filter == "CZ") {
      range_filter.push(
        {
          txt: "Kč",
          selected: false,
        },
        {
          txt: "KčKč",
          selected: false,
        },
        {
          txt: "KčKčKč",
          selected: false,
        },
        {
          txt: "KčKčKčKč",
          selected: false,
        }
      );
    }
    if (country_filter == "DK") {
      range_filter.push(
        {
          txt: "-kr.",
          selected: false,
        },
        {
          txt: "-kr.-kr.",
          selected: false,
        },
        {
          txt: "-kr.-kr.-kr.",
          selected: false,
        },
        {
          txt: "-kr.-kr.-kr.-kr.",
          selected: false,
        }
      );
    }
    if (country_filter == "NO" || country_filter == "SE") {
      range_filter.push(
        {
          txt: "kr",
          selected: false,
        },
        {
          txt: "krkr",
          selected: false,
        },
        {
          txt: "krkrkr",
          selected: false,
        },
        {
          txt: "krkrkrkr",
          selected: false,
        }
      );
    }
    if (country_filter == "RO") {
      range_filter.push(
        {
          txt: "L",
          selected: false,
        },
        {
          txt: "LL",
          selected: false,
        },
        {
          txt: "LLL",
          selected: false,
        },
        {
          txt: "LLLL",
          selected: false,
        }
      );
    }
    if (country_filter == "SA") {
      range_filter.push(
        {
          txt: "SR",
          selected: false,
        },
        {
          txt: "SRSR",
          selected: false,
        },
        {
          txt: "SRSRSR",
          selected: false,
        },
        {
          txt: "SRSRSRSR",
          selected: false,
        }
      );
    }
    if (country_filter == "CH") {
      range_filter.push(
        {
          txt: "fr",
          selected: false,
        },
        {
          txt: "frfr",
          selected: false,
        },
        {
          txt: "frfrfr",
          selected: false,
        },
        {
          txt: "frfrfrfr",
          selected: false,
        }
      );
    }
    if (country_filter == "BG") {
      range_filter.push(
        {
          txt: "lev",
          selected: false,
        },
        {
          txt: "levlev",
          selected: false,
        },
        {
          txt: "levlevlev",
          selected: false,
        },
        {
          txt: "levlevlevlev",
          selected: false,
        }
      );
    }

    if (country_filter == "PL") {
      range_filter.push(
        {
          txt: "zł",
          selected: false,
        },
        {
          txt: "złzł",
          selected: false,
        },
        {
          txt: "złzłzł",
          selected: false,
        },
        {
          txt: "złzłzłzł",
          selected: false,
        }
      );
    }
    if (country_filter == "KW") {
      range_filter.push(
        {
          txt: "KD",
          selected: false,
        },
        {
          txt: "KDKD",
          selected: false,
        },
        {
          txt: "KDKDKD",
          selected: false,
        },
        {
          txt: "KDKDKDKD",
          selected: false,
        }
      );
    }
    if (country_filter == "IN") {
      range_filter.push(
        {
          txt: "₹",
          selected: false,
        },
        {
          txt: "₹₹",
          selected: false,
        },
        {
          txt: "₹₹₹",
          selected: false,
        },
        {
          txt: "₹₹₹₹",
          selected: false,
        }
      );
    }

    if (country_filter == "JP") {
      range_filter.push(
        {
          txt: "¥",
          selected: false,
        },
        {
          txt: "¥¥",
          selected: false,
        },
        {
          txt: "¥¥¥",
          selected: false,
        },
        {
          txt: "¥¥¥¥",
          selected: false,
        }
      );
    }

    if (
      country_filter == "ES" ||
      country_filter == "IE" ||
      country_filter == "IT" ||
      country_filter == "FR" ||
      country_filter == "BE" ||
      country_filter == "PT" ||
      country_filter == "LU" ||
      country_filter == "DE" ||
      country_filter == "NL" ||
      country_filter == "IR" ||
      country_filter == "GR" ||
      country_filter == "FI"
    ) {
      range_filter.push(
        {
          txt: "€",
          selected: false,
        },
        {
          txt: "€€",
          selected: false,
        },
        {
          txt: "€€€",
          selected: false,
        },
        {
          txt: "€€€€",
          selected: false,
        }
      );
    }
    setCurrency(range_filter);
    // alert(JSON.stringify(range_filter))
  }

  const getPostal = async () => {
    if (country === "") {
      seterrmsg("Select your desired country name ");
    }
    // else if(category === ""){
    //     seterrmsg("Enter your desired dish, restaurant or cuisines name ")
    // }
    else {
      setseaLoading(true);
      const result = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4`;
      // console.log(result);

      let response = await fetch(result, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      let responseJson = await response.json();
      let addres = responseJson.results[0];

      var postal;
      addres.address_components.map((item) => {
        if (item.types[0] === "postal_code") {
          postal = item.long_name;
          // setpostcode(item.long_name);
        }
      });

      //   console.log(addres.address_components)
      if (responseJson.error) {
        Toast.show("Invalid Credential");
      } else {
        setTimeout(() => {
          const params = {
            "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
            input_country: country,
            input_postcode: postal,
            input_category: selected,
            input_lat: lat,
            input_long: lng,
            input_city: city,
            input_province: province,
            input_address: address,
          };
          searchedArr(params);
        }, 1500);
        setseaLoading(false);
        setSerch(false);

        // alert('Payment Successfull')
      }
    }
  };

  const getCurrentpostal = async () => {
    setseaLoading(true);
    // console.log(currlocation);
    const result = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currlocation.latitude},${currlocation.longitude}&key=AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4`;
    // console.log(result);

    let response = await fetch(result, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    let responseJson = await response.json();
    //   console.log(responseJson);
    let addres = responseJson.results[0];

    var postal;
    var address = responseJson.plus_code.compound_code;
    var city;
    var contary;
    var province;
    addres.address_components.map((item) => {
      if (item.types[0] === "postal_code") {
        postal = item.long_name;
        // setpostcode(item.long_name);
      }
      if (item.types[0] === "locality") {
        city = item.long_name;
      }
      if (item.types[0] === "administrative_area_level_1") {
        province = item.short_name;
      }

      if (item.types[0] === "country") {
        contary = item.short_name;
      }
    });

    //   console.log(addres.address_components)
    if (responseJson.error) {
      Toast.show("Invalid Credential");
      setLoading(false);
    } else {
      setTimeout(() => {
        const params = {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: contary,
          input_postcode: postal,
          input_category: selected,
          input_lat: currlocation.latitude,
          input_long: currlocation.longitude,
          input_city: city,
          input_province: province,
          input_address: address,
        };
        // console.log(params);
        searchedArr(params);
        // props.navigation.navigate("Search", { params: params });
        setCountry("");
        setcurrLocation("")
        setSerch('')
        // googleRef.current.clear();
        // setcategory('')
        setSelected("");
        setSelectedValue("");
        // setpopular(false);
        seterrmsg("");
        setseaLoading(false);

        // getList(postal)
      }, 1500);
    }
  };

  function apple_login(email, name) {
    const formData = new FormData();
    formData.append("email", email);
    // formData.append("password", password);
    // console.log(formData);
    try {
      fetch(`${BasePath}signin_api.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson.Flag)
          let Flag = responseJson.Flag;
          setisLoading(false);
          if (Flag.flag == 1) {
            // console.log(responseJson);
            // Toast.show(responseJson)
            let type = "with_Apple";
            setismodal(false);
            storeData(responseJson.Data, type);
            Toast.show(Flag.message);

            // setTimeout(() => {
            // }, 200);
          } else {
            // alert(Flag.message)
            alert("Signup from Apple before login");

            // Toast.show(responseJson.error_msg);
            setisLoading(false);

            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function login_request() {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    // console.log(formData);
    try {
      fetch(`${BasePath}signin_api.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson.Flag)
          let Flag = responseJson.Flag;
          setisLoading(false);
          if (Flag.flag == 1) {
            // console.log(responseJson);
            // Toast.show(responseJson)
            let type = "with_api";
            storeData(responseJson.Data, type);
            setisloginLoading(false);
            setismodal(false);
            Toast.show(Flag.message);
            // setTimeout(() => {
            // }, 200);
          } else {
            alert(Flag.message);
            // Toast.show(responseJson.error_msg);
            setisloginLoading(false);

            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function FacebookLogin() {
    // const appId = '410520310175330';
    // const appId = '1270305600052488';
    const appId = "460268192332102";
    // this.setState({ isLoading: true })
    try {
      await Facebook.initializeAsync({ appId });
      const { type, token, expires, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
          behavior: "native",
        });
      if (type === "success") {
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,gender,email,first_name,last_name,name,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.email) {
              const formData = new FormData();
              formData.append("email", data.email);
              // formData.append("password", password);
              // console.log(formData);
              try {
                fetch(`${BasePath}signin_api.php`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                  },
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    // console.log(responseJson.Flag)
                    let Flag = responseJson.Flag;
                    setisLoading(false);
                    if (Flag.flag == 1) {
                      // console.log(responseJson);
                      // Toast.show(responseJson)
                      let type = "with_Facebook";
                      storeData(responseJson.Data, type);
                      setisloginLoading(false);
                      setismodal(false);
                      Toast.show(Flag.message);
                      // setTimeout(() => {
                      // }, 200);
                    } else {
                      // alert(Flag.message)
                      alert("Signup from facebook before login");
                      // Toast.show(responseJson.error_msg);
                      setisloginLoading(false);

                      return;
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } catch (e) {
                console.log(e);
              }
            } else {
              alert("Please make your facebook email public then try again");
            }
          })
          .catch((e) => console.log(e));
      } else {
        // this.setState({ isLoading: false })/
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
      // this.setState({ isLoading: false })
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidStandaloneAppClientId:
          "989823458470-2l2i5ji6aqvqd7cdbp3k0erht8ispg7o.apps.googleusercontent.com",
        iosStandaloneAppClientId:
          "989823458470-mom7ujiu180nnefk3be4f6tec9iujqlk.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        // setAccess
        // console.log(accessToken);
        // alert(1)
        let userResponseInfo = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${result.accessToken}` },
          }
        );

        userResponseInfo.json().then((data) => {
          console.log(data.picture);
          const formData = new FormData();
          formData.append("email", data.email);
          // formData.append("password", password);
          // console.log(formData);
          try {
            fetch(`${BasePath}signin_api.php`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
              body: formData,
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson.Flag);
                let Flag = responseJson.Flag;
                setisLoading(false);
                if (Flag.flag == 1) {
                  // console.log(responseJson);
                  // Toast.show(responseJson)
                  let type = "with_Google";
                  storeData(responseJson.Data, type);
                  setisloginLoading(false);
                  setismodal(false);
                  Toast.show(Flag.message);
                  // setTimeout(() => {
                  // }, 200);
                } else {
                  // alert(Flag.message)
                  alert("Signup from google before login");
                  // Toast.show(responseJson.error_msg);
                  setisloginLoading(false);

                  return;
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (e) {
            console.log(e);
          }
        });
      } else {
        Toast.show("Permission denied");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function storeData(response, type) {
    // let res = JSON.parse(response)
    // console.log(res);
    try {
      await AsyncStorage.setItem("isLoggedIn", "1");
      // console.log(1);
      await AsyncStorage.setItem("email", response[0].email);
      // console.log(2);
      await AsyncStorage.setItem("userid", response[0].userid);
      // console.log(3);
      await AsyncStorage.setItem("username", response[0].username);
      // console.log(4);
      await AsyncStorage.setItem("fname", response[0].firstname);
      // console.log(5);
      await AsyncStorage.setItem("lname", response[0].lastname);
      // console.log(6);
      await AsyncStorage.setItem("login_type", type);
      // console.log(7);
      // await AsyncStorage.setItem('isChecked', JSON.stringify(this.state.isChecked))
      // alert(this.state.isChecked)
      setData();
      setisloginLoading(false);
      setismodal(false);
      // props.navigation.replace('Landing')
    } catch (e) {
      console.log(e);
    }
  }

  const form_validation = () => {
    setisloginLoading(true);
    if (email === "" || password === "") {
      seterrMsg("All Fields are required");
      setisloginLoading(false);
      // this.setState({ error_message: , isLoading: false, show_error: true })
    } else if (password.length < 6) {
      seterrMsg("Password Invalid");
      setisloginLoading(false);
      // this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
      // console.log("password")
    } else if (!ValidateEmail(email)) {
      seterrMsg("Email is not valid");
      setisloginLoading(false);
      // this.setState({ error_message: '', isLoading: false, show_error: true })
    } else {
      // this.setState({isLoading:true})
      seterrMsg("");
      setisloginLoading(true);
      login_request();
    }
    // else {
    //     this.login_request()
    // }
    // console.log("working");
  };

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  }

  async function addFav(item, resName) {
    if(validateLogin){

    
    // return console.log(item);
    var res = searchArr.map((item) => {
      if (item.restaurant_name === resName) {
        return {
          ...item,
          isFav: true,
        };
      } else {
        return { ...item };
      }
    });
    setsearchArr(res);
    let obj = [];
    let objF = obj.push(item);
    // return console.log(obj);
    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("json_data", JSON.stringify(obj));
    // console.log(formData);
    try {
      fetch(`${BasePath}setWishlist.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson.Flag)
          let Flag = responseJson.Flag;
          if (Flag.flag == 1) {
            // console.log(responseJson);
            // Toast.show(responseJson)
            Toast.show("Added to wishlist");

            // setTimeout(() => {
            // }, 200);
          } else {
            // Toast.show(Flag.message)
            // Toast.show(responseJson.error_msg);
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }else{
    props.navigation.navigate('Login')
  }
  }

  async function setRecent(item) {
    Linking.openURL(
      item.link
    );
    // props.navigation.navigate("Link", { link: item.link, params: param });
    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("hotel_name", singItem.restaurant_name);
    formData.append("source_name", singItem.source);
    formData.append("source_url", singItem.link);
    // return console.log(formData);
    // console.log(formData);
    try {
      fetch(`${BasePath}setRecentlyOrdered.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson.Flag)
          let Flag = responseJson.Flag;
          if (Flag.flag == 1) {
            // console.log(responseJson);
            // Toast.show(responseJson)
            // Toast.show('Added to recents')
            // setTimeout(() => {
            // }, 200);
          } else {
            // Toast.show(Flag.message)
            // Toast.show(responseJson.error_msg);
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function rest_params(id) {
    const param = {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      rest_id: id,
      lat: "",
      long: "",
    };
    props.navigation.navigate("RestDetail", { params: param });
  }

  const getLocation = async () => {
    setCurrentCity('Fetching your current location')
    Toast.show("Please Wait. . .");
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      let location = await Location.getCurrentPositionAsync({});
      setcurrLocation({ latitude, longitude });
      // setTimeout(() => {
      setCurrentLocation(location.coords)
    // console.log(location);
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const setCurrentLocation = async (coords) =>{
    // console.log(coords.latitude);
    const result = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4`;
    // console.log(result);

    let response = await fetch(result, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    let responseJson = await response.json();
    //   console.log(responseJson);
    if(Platform.OS === "ios"){
      let addres = responseJson.results[1];
      // alert(addres.formatted_address)
      var postal;
      
      Toast.show("FastyGet accquired your location to show restaurants and best deals near your location and help to make delivery more accurate.");
      setCurrentCity(addres.formatted_address)
    }else{
      let addres = responseJson.results[0];

      var postal;
      // var address = responseJson.plus_code.compound_code;
      var city;
      var contary;
      var province;
      addres.address_components.map((item) => {
        if (item.types[0] === "locality") {
          city = item.long_name;
        }else if (item.types[0] === "route"){
          contary = item.long_name
        }else if (item.types[2] === "sublocality_level_1"){
          province = item.long_name
        }
  
      });
      // alert(province)
      // console.log(city);
      Toast.show("FastyGet accquired your location to show restaurants and best deals near your location and help to make delivery more accurate.");
      setCurrentCity(`${contary} ${province} , ${city} `)
    }
  }

  return (
    <SafeAreaView style={{}}>
      {Platform.OS === "ios" && <StatusBar StatusBarStyle={'dark'} /> }

      <View
        style={{
          height: 80,
          width: "100%",
          backgroundColor: "#FFBC00",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            marginLeft: 0,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              margin: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{ flex: 1, flexDirection: "row" }}
            >
              <Image
                source={require("../assets/fastyget_logo.png")}
                style={{ height: 70, width: 180 }}
              />
              {/* <Text style={{alignSelf:'center',fontSize:28,fontWeight:'bold'}}>foodery</Text> */}
            </TouchableOpacity>
            {/* <Image
                        source={require('../assets/images/flags/united-kingdom.png')}
                        style={{width:35,height:35}}
                    /> */}
            <View style={{ flexDirection: "row" }}>
              {validateLogin ? (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Wish")}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 15,
                  }}
                >
                  <Image
                    source={require("../assets/heartb.png")}
                    style={{ width: 32, height: 32 }}
                  />
                  {/* <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>LOGIN</Text> */}
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => setSerch(true)}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  source={require("../assets/images/favicon.png")}
                  style={{ width: 35, height: 35 }}
                />
                {/* <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>LOGIN</Text> */}
              </TouchableOpacity>
              {validateLogin ? (
                <OptionsMenu
                  button={require("../assets/account.png")}
                  buttonStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 15,
                    width: 35,
                    height: 35,
                    resizeMode: "contain",
                    // marginTop: 18,
                    // marginRight:20
                  }}
                  destructiveIndex={3}
                  options={[
                    "Wish List",
                    "Recently Clicked",
                    "Account Settings",
                    "Log Out",
                  ]}
                  optionText={{ color: "green" }}
                  actions={[
                    () => {
                      props.navigation.navigate("Wish");
                    },
                    () => {
                      props.navigation.navigate("Recent");
                    },
                    () => {
                      props.navigation.navigate("Setting");
                    },
                    async () => {
                      setvalidateLogin(false);
                      await AsyncStorage.clear();
                    },
                    // () => console.log("cancel"),
                  ]}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Login")}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <Image
                    source={require("../assets/account.png")}
                    style={{
                      width: 35,
                      height: 35,
                      resizeMode: "contain",
                    }}
                  />
                  {/* <FontAwesome name="user" size={40} color="black" /> */}
                  {/* <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>LOGIN</Text> */}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
      {isLoading ? null : (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 28,
            marginTop: 9,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setfilters()}
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons name="options-sharp" size={24} color="black" />
            <Text style={{ fontSize: 18, fontWeight: "700" }}> Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setissort(true)}
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="sort-amount-desc" size={24} color="black" />
            <Text style={{ fontSize: 18, fontWeight: "700" }}> Sort</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <View
          style={{
            height: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            size={"large"}
            color={"#FFBC00"}
          />
        </View>
      ) : (
        <>
          {/* <View style={{ 
                height:responsiveHeight(5)}} > */}
          {!showlength ? (
            <>
            {searchArr.length < 1 || searchArr == [] ?null:
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 15,
                marginLeft: 10,
              }}
            >
              {arrLength} results found for `{searchKey || "All Categories"}`
            </Text>
          }
            </>
          )
          :
          null
        }
        {/* </View> */}

          <>
            {searchArr.length < 1 || searchArr == [] ? (
              <View style={{ height: "100%" }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginLeft: 15,
                    marginTop: 15,
                  }}
                >
                  0 results found for `{searchKey || "All Categories"}`
                </Text>
              </View>
            ) : (
              <FlatList
                onScroll={(e) => emptytext(e.nativeEvent.contentOffset.y)}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 10, marginBottom: "30%" }}
                keyExtractor={(item, index) => index.toString()}
                data={searchArr}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: "100%",
                      marginTop: 8,
                      marginBottom: 8,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      // borderWidth:0.6,
                      // borderColor:'white',
                      alignItems: "center",
                      shadowColor: "#470000",
                      // alignSelf:'center',
                      shadowOpacity: 0.2,
                      // shadowRadius: 31.84,
                      // backgroundColor:'red',
                      elevation: 1,
                    }}
                  >
                    {/* <Text>{item.distance}</Text> */}

                    <Image
                      source={{ uri: item.image_url }}
                      // source={item.img}
                      style={{
                        width: "100%",
                        height: 150,
                        alignSelf: "center",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    ></Image>
                    {item.isFav ? (
                      <View
                        style={{ position: "absolute", bottom: 210, right: 30 }}
                      >
                        <Image
                          source={require("../assets/heart.png")}
                          style={{
                            width: 32,
                            height: 32,
                            tintColor: "#FFBC00",
                          }}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => addFav(item, item.restaurant_name)}
                        style={{ position: "absolute", bottom: 210, right: 30 }}
                      >
                        <Image
                          source={require("../assets/heartb.png")}
                          style={{
                            width: 32,
                            height: 32,
                            tintColor: "#FFBC00",
                          }}
                        />
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        item.sou
                          ? // console.log(item)
                            viewMenu(
                              item._id,
                              item.drc[0].link,
                              item.drc[0].src
                            )
                          : viewMenu(item._id, item.link, item.source);
                        setViewList(true);
                      }}
                      style={{ position: "absolute", bottom: 130, right: 30 }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#ffff",
                          backgroundColor: "rgba(0,0,0,0.2)",
                          borderRadius: 10,
                          padding: 5,
                        }}
                      >
                        View Menu
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 4,
                        marginRight: 4,
                      }}
                    >
                      <View style={{ flex: 1.05 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          {item.restaurant_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.2,
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome name="star" size={20} color="#32cd32" />
                        {item.rating_numeric === 0 ||
                        item.rating_numeric === null ? (
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#32cd32",
                            }}
                          >
                            {" "}
                            N/A
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#32cd32",
                            }}
                          >
                            {" "}
                            {item.rating}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        width: "auto",
                        flexDirection: "row",
                        marginLeft: 4,
                        marginRight: 4,
                      }}
                    >
                      <View style={{ width: "50%" }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                          {item.distance} • {item.price_category}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "50%",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                          {item.delivery_fee} •{" "}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#a9a9a9",
                          }}
                        >
                          {item.delivery_time}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        // setTimeout(() => {
                        //     console.log(item.sou)
                        // }, 5000);
                        setsingItem(item);
                        item.drc
                          ? setdeal(item.drc)
                          : setdeal([
                              {
                                src: item.source,
                                promotion: item.promotion,
                                delivery_fee: item.delivery_fee,
                                delivery_fee_numeric: item.delivery_fee_numeric,
                                delivery_time: item.delivery_time,
                                rating_numeric: item.rating_numeric,
                                nb_reviews: item.nb_reviews,
                                link: item.link,
                                delivery_time: item.delivery_time,
                                temp: true,
                              },
                            ]);
                        setmenuRes(item.restaurant_name);
                        setbest(true);
                      }}
                      style={{
                        flexDirection: "row",
                        width: "98%",
                        height: 50,
                        borderWidth: 1,
                        marginBottom: 5,
                        marginTop: 8,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 0.5 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginLeft: 5,
                          }}
                        >
                          Best Deals on
                        </Text>
                      </View>
                      <View style={{ flex: 0.7 }}>
                        {searchedsrc(item.drc ? item.drc[0].src : item.source)}
                        {/* <Image
                                    source={searchedsrc(item.source)}
                                    style={{height:40,width:120}}
                                /> */}
                      </View>
                      <View style={{ flex: 0.1 }}>
                        <View>
                          <AntDesign name="down" size={24} color="black" />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </>
        </>
      )}
      {filtermodal ? (
        <TouchableOpacity
          onPress={() => filterclose()}
          activeOpacity={1}
          style={{
            height: '100%',
            width: "100%",
            top: 'auto',
            right: 0,
            left: 0,
            bottom: 100,
            position: "absolute",
            backgroundColor: "rgba(64, 77, 97, 0.5)",
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            // contentContainerStyle={styles.scrollModal}
            // showsVerticalScrollIndicator={false}
            style={{ marginBottom: Platform.OS === "ios" ? "5%" : "5%" }}
          >
            <TouchableWithoutFeedback style={{ height: "auto" }}>
              <View
                style={{
                  marginTop: "50%",
                  alignSelf: "center",
                  // position: 'absolute',
                  height: "100%",
                  width: "90%",
                  backgroundColor: "#F8F8F8",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 10,
                }}
              >
                {/* <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: Platform.OS === 'ios'? '65%':'45%'}}> */}
                <TouchableOpacity
                  onPress={() => filterclose()}
                  style={{
                    margin: 15,
                    alignSelf: "flex-end",
                    marginTop: 5,
                    marginRight: 5,
                  }}
                >
                  <Entypo name="cross" size={24} color="grey" />
                </TouchableOpacity>
                <View
                  style={{ width: "90%",alignSelf:'center' }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginLeft: responsiveWidth(5),
                      // marginRight: 20,
                    }}
                  >
                    Price Range:
                  </Text>
                  <View
                    style={{
                      marginLeft: responsiveWidth(5),
                      marginTop: responsiveHeight(3),
                      flexDirection: "row",
                    }}
                  >
                    <FlatList
                      style={{   }}
                      keyExtractor={(item, index) => index.toString()}
                      // numColumns={'3'}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={curreny}
                      renderItem={({ item, index }) => (
                        <>
                          {item.selected ? (
                            <TouchableOpacity
                              onPress={() => filter_priceCategory(item.txt)}
                              style={{
                                marginHorizontal: 5,
                                margin: 5,
                                borderRadius: 20,
                                backgroundColor: "#A9A9A9",
                              }}
                            >
                              <Text
                                style={{
                                  margin: 7,
                                  fontWeight: "bold",
                                  fontSize: 18,
                                }}
                              >
                                {item.txt}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => filter_priceCategory(item.txt)}
                              style={{
                                marginHorizontal: 5,
                                margin: 5,
                                borderRadius: 20,
                                backgroundColor: "#DCDCDC",
                              }}
                            >
                              <Text
                                style={{
                                  margin: 7,
                                  fontWeight: "bold",
                                  fontSize: 18,
                                }}
                              >
                                {item.txt}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      marginTop:  responsiveHeight(3),
                      fontWeight: "bold",
                      marginLeft: responsiveWidth(5),
                    }}
                  >
                    Max Delivery Time:
                  </Text>

                  <Slider
                    min={0}
                    max={3}
                    value={value}
                    valueOnChange={(value) => filter_deliveryFee(value)}
                    initialValue={value}
                    step={1}
                    knobColor="black"
                    valueLabelsBackgroundColor="black"
                    inRangeBarColor="grey"
                    outOfRangeBarColor="black"
                    styleSize={16}
                    showRangeLabels={false}
                    showValueLabels={false}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: -45,
                      marginLeft: "4.5%",
                    }}
                  >
                    <View style={{ flex: 0.38 }}>
                      {
                        value === 0 ? (
                          <Text style={{ color: "#303030" }}>£1</Text>
                        ) : (
                          // <TouchableOpacity onPress={()=> setValue(0)} >
                          <Text style={{ color: "#a9a9a9" }}>£1</Text>
                        )
                        // </TouchableOpacity>
                      }
                    </View>
                    <View style={{ flex: 0.4 }}>
                      {value === 1 ? (
                        <Text style={{ color: "#303030" }}>£2</Text>
                      ) : (
                        <Text style={{ color: "#a9a9a9" }}>£2</Text>
                      )}
                    </View>
                    <View style={{ flex: 0.32 }}>
                      {value === 2 ? (
                        <Text style={{ color: "#303030" }}>£3</Text>
                      ) : (
                        <Text style={{ color: "#a9a9a9" }}>£3</Text>
                      )}
                    </View>
                    <View style={{ flex: 0.2, alignItems: "center" }}>
                      {value === 3 ? (
                        <Text style={{ color: "#303030" }}>£4+</Text>
                      ) : (
                        <Text style={{ color: "#a9a9a9" }}>£4+</Text>
                      )}
                    </View>
                  </View>

                  <Slider
                    min={0}
                    max={3}
                    value={devTime}
                    valueOnChange={(value) => filter_deliveryTime(value)}
                    initialValue={devTime}
                    step={1}
                    knobColor="black"
                    valueLabelsBackgroundColor="black"
                    inRangeBarColor="grey"
                    outOfRangeBarColor="black"
                    styleSize={16}
                    showRangeLabels={false}
                    showValueLabels={false}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      marginTop: -45,
                      marginLeft: "1.5%",
                    }}
                  >
                    <View style={{ flex: 0.25 }}>
                      {
                        devTime === 0 ? (
                          <Text style={{ color: "#303030" }}>10min</Text>
                        ) : (
                          // <TouchableOpacity onPress={()=> setValue(0)} >
                          <Text style={{ color: "#a9a9a9" }}>10min</Text>
                        )
                        // </TouchableOpacity>
                      }
                    </View>
                    <View style={{ flex: 0.25, marginLeft: "4%" }}>
                      {devTime === 1 ? (
                        <Text style={{ color: "#303030" }}>20min</Text>
                      ) : (
                        <Text style={{ color: "#a9a9a9" }}>20min</Text>
                      )}
                    </View>
                    <View style={{ flex: 0.25, alignItems: "center" }}>
                      {devTime === 2 ? (
                        <Text style={{ color: "#303030" }}>30min</Text>
                      ) : (
                        <Text style={{ color: "#a9a9a9" }}>30min</Text>
                      )}
                    </View>
                    <View style={{ flex: 0.25, alignItems: "flex-end" }}>
                      {devTime === 3 ? (
                        <Text style={{ color: "#303030" }}>40min+</Text>
                      ) : (
                        <Text style={{ color: "#a9a9a9" }}>40min+</Text>
                      )}
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      marginTop:  responsiveHeight(3),
                      fontWeight: "bold",
                      marginLeft: responsiveWidth(5),
                      // marginRight: 20,
                    }}
                  >
                    Max Carbon Footprint:
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "green",
                        marginLeft:responsiveWidth(5),
                      }}
                    >
                      Because we care about the planet.
                      <Image
                        source={require("../assets/earth.png")}
                        style={{ width: 20, height: 20, alignSelf: "center" }}
                      />
                    </Text>
                  </View>
                  <Slider
                    min={0}
                    max={3}
                    value={carbonvalue}
                    valueOnChange={(value) => filter_Carbon(value)}
                    initialValue={carbonvalue}
                    step={1}
                    knobColor="black"
                    valueLabelsBackgroundColor="black"
                    inRangeBarColor="grey"
                    outOfRangeBarColor="black"
                    styleSize={16}
                    showRangeLabels={false}
                    showValueLabels={false}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      marginTop: -45,
                      marginLeft: "0.3%",
                    }}
                  >
                    <View style={{ flex: 0.25, flexDirection: "row" }}>
                      <Image
                        source={require("../assets/plant.png")}
                        style={{ width: 15, height: 15, alignSelf: "center" }}
                      />
                      <Image
                        source={require("../assets/plant.png")}
                        style={{
                          width: 15,
                          height: 15,
                          marginLeft: 2,
                          alignSelf: "center",
                        }}
                      />
                      <Image
                        source={require("../assets/plant.png")}
                        style={{
                          width: 15,
                          height: 15,
                          marginLeft: 2,
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.25,
                        marginLeft: "5.5%",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={require("../assets/plant.png")}
                        style={{ width: 15, height: 15, alignSelf: "center" }}
                      />
                      <Image
                        source={require("../assets/plant.png")}
                        style={{
                          width: 15,
                          height: 15,
                          marginLeft: 2,
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    <View style={{ flex: 0.24, alignItems: "center" }}>
                      <Image
                        source={require("../assets/plant.png")}
                        style={{ width: 15, height: 15, alignSelf: "center" }}
                      />
                    </View>
                    <View style={{ flex: 0.25, alignItems: "flex-end" }}>
                      <Image
                        source={require("../assets/fall.png")}
                        style={{
                          width: 15,
                          height: 15,
                          alignSelf: "flex-end",
                          marginRight: "18%",
                        }}
                      />
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      marginTop:  responsiveHeight(3),
                      fontWeight: "bold",
                      marginLeft: responsiveWidth(5),
                      // marginRight: 20,
                    }}
                  >
                    Filter By:
                  </Text>
                  {conCode.map((item, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop:  responsiveHeight(1),
                          height: responsiveHeight(6.5),
                          marginLeft: responsiveWidth(5),
                          alignItems:'center',
                          // justifyContent:'center',
                          // backgroundColor:'red'
                        }}
                      >
                        <CheckBox
                          style={{ alignSelf:'center',justifyContent:'center' }}
                          isChecked={isChecked[index]}
                          onClick={() => {
                            {
                              setisChecked({
                                ...isChecked,
                                [index]: !isChecked[index],
                              });
                            }
                            // console.log(isChecked);
                            isChecked[index] === true
                              ? setrestData()
                              : filter_Src(item, index);
                          }}
                          leftText={"CheckBox"}
                          checkBoxColor={"#FFBC00"}
                          uncheckedCheckBoxColor={"grey"}
                        />
                        <Image
                          source={{
                            uri: `http://foodery.org/${item.source_image}`,
                          }}
                          style={{
                            height: 45,
                            width: 170,
                            marginLeft: 15,
                            alignSelf: "center",
                          }}
                        />
                      </View>
                    );
                  })}

                  <Text
                    style={{
                      fontSize: 22,
                      marginTop: responsiveHeight(1.5),
                      fontWeight: "bold",
                      marginLeft: responsiveWidth(5),
                      // marginRight: 20,
                    }}
                  >
                    Dietary:
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <FlatList
                    style={{ marginTop: responsiveHeight(3), marginBottom: responsiveHeight(3) }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={"3"}
                    showsHorizontalScrollIndicator={false}
                    data={dietry}
                    renderItem={({ item, index }) => (
                      <>
                        {item.selected ? (
                          <TouchableOpacity
                            onPress={() => filter_dietary(item.txt)}
                            style={{
                              marginHorizontal: 5,
                              margin: 5,
                              borderRadius: 20,
                              backgroundColor: "#A9A9A9",
                            }}
                          >
                            <Text
                              style={{
                                margin: 7,
                                fontWeight: "bold",
                                fontSize: 18,
                              }}
                            >
                              {item.txt}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => filter_dietary(item.txt)}
                            style={{
                              marginHorizontal: 5,
                              margin: 5,
                              borderRadius: 20,
                              backgroundColor: "#DCDCDC",
                            }}
                          >
                            <Text
                              style={{
                                margin: 7,
                                fontWeight: "bold",
                                fontSize: 18,
                              }}
                            >
                              {item.txt}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  />
                </View>
                {/* </ScrollView> */}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={ismodal}
        // style={{ backgroundColor:'rgba(64, 77, 97, 1)' }}
        onRequestClose={() => {
          setismodal(false);
        }}
      >
        <TouchableOpacity
          onPress={() => setismodal(false)}
          activeOpacity={1}
          style={{
            height: "100%",
            backgroundColor: "rgba(64, 77, 97, 0.5)",
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.scrollModal}
          >
            <TouchableWithoutFeedback style={{ height: "75%" }}>
              <View
                style={{
                  marginTop: "25%",
                  bottom: 0,
                  height: "auto",
                  // position: 'absolute',
                  width: "100%",
                  backgroundColor: "#F8F8F8",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 10,
                }}
              >
                <View
                  style={{
                    height: 250,
                    width: "100%",
                    backgroundColor: "#FFBC00",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setismodal(false)}
                    style={{
                      alignSelf: "flex-end",
                      marginTop: 5,
                      marginRight: 5,
                    }}
                  >
                    <Entypo name="cross" size={24} color="white" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "700",
                      color: "white",
                      margin: 6,
                      left: 10,
                    }}
                  >
                    We're comparing the major food{"\n"}delivery apps for you...
                  </Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 15, alignSelf: "center" }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={"15"}
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    renderItem={({ item, index }) => (
                      <Image
                        source={item.image}
                        style={{ width: 20, height: 20, margin: 3 }}
                      />
                    )}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "700",
                      color: "white",
                      margin: 6,
                      left: 10,
                    }}
                  >
                    you'll just need to register or{"\n"}login
                  </Text>
                </View>
                <View
                  style={{ width: "90%", alignSelf: "center", marginTop: 20 }}
                >
                  <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    Sign in
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 18 }}>Not a member yet? </Text>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("Signup")}
                      style={{ alignSelf: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "blue",
                          alignSelf: "center",
                        }}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18 }}>Email</Text>
                    <View
                      style={{
                        margin: 5,
                        width: "100%",
                        height: 40,
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#a9a9a9",
                      }}
                    >
                      <TextInput
                        placeholder={"Email"}
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        style={{ margin: 5 }}
                      />
                    </View>
                    <Text style={{ fontSize: 18 }}>Password</Text>
                    <View
                      style={{
                        margin: 5,
                        width: "100%",
                        height: 40,
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#a9a9a9",
                      }}
                    >
                      <TextInput
                        placeholder={"Password"}
                        style={{ margin: 5 }}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                        secureTextEntry={true}
                        maxLength={20}
                      />
                    </View>
                  </View>
                  {erromsg === "" ? null : (
                    <Text
                      style={{
                        color: "tomato",
                        marginTop: 15,
                        fontSize: 16,
                        alignSelf: "center",
                        textAlign: "center",
                      }}
                    >
                      {erromsg}
                    </Text>
                  )}
                  {isloginLoading ? (
                    <TouchableOpacity
                      style={{
                        height: 45,
                        backgroundColor: "#FFBC00",
                        marginTop: 20,
                        justifyContent: "center",
                        borderRadius: 8,
                      }}
                    >
                      <ActivityIndicator
                        size={"large"}
                        color={"white"}
                        style={{ alignSelf: "center" }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={form_validation}
                      style={{
                        height: 45,
                        backgroundColor: "#FFBC00",
                        marginTop: 20,
                        justifyContent: "center",
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          alignSelf: "center",
                          fontWeight: "700",
                        }}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => FacebookLogin()}
                    style={{
                      flexDirection: "row",
                      height: 45,
                      backgroundColor: "#3B5998",
                      marginTop: 20,
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 0.1 }}>
                        <Image
                          source={require("../assets/f.png")}
                          style={{
                            width: 20,
                            height: 30,
                            tintColor: "white",
                            alignSelf: "center",
                          }}
                        />
                      </View>
                      <View style={{ flex: 0.9 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            alignSelf: "center",
                            fontWeight: "700",
                            color: "white",
                            marginRight: 20,
                          }}
                        >
                          Sign in via facebook
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => signInWithGoogleAsync()}
                    style={{
                      height: 45,
                      backgroundColor: "#ffff",
                      borderWidth: 1,
                      marginTop: 20,
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 0.1 }}>
                        <Image
                          source={require("../assets/g.png")}
                          style={{ width: 25, height: 25, alignSelf: "center" }}
                        />
                      </View>
                      <View style={{ flex: 0.9 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            alignSelf: "center",
                            fontWeight: "700",
                            color: "black",
                            marginRight: 20,
                          }}
                        >
                          Sign in via Google
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {Platform.OS === "ios" && (
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                          // alert('not ios')
                          const credential =
                            await AppleAuthentication.signInAsync({
                              requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope
                                  .FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope
                                  .EMAIL,
                              ],

                              // requestedOperation:  AppleAuthentication.AppleAuthenticationOperation.LOGIN,
                              // /requestedScopes:[AppleAuthenticationScope.FULL_NAME,AppleAuthentication.AppleAuthenticationScope.EMAIL]
                            });
                          // signed in
                          //  var c= await AppleAuthentication.getCredentialStateAsync(credential).then((e)=>{
                          //   alert(JSON.stringify( e))
                          //  }).catch((e)=>{
                          //    alert('error'+JSON.stringify( e))
                          //  })

                          var decoded = jwt_decode(credential.identityToken);
                          var decoded = jwt_decode(credential.identityToken);
                          var email = decoded.email;
                          var name = email.substring(0, 6);
                          //   this.googlelogin_request(email,name)
                          apple_login(email, name);
                          // alert(JSON.stringify( decoded))
                        } catch (e) {
                          if (e.code === "ERR_CANCELED") {
                            Toast.show(e);
                            // handle that the user canceled the sign-in flow
                          } else {
                            // handle other errors
                          }
                        }
                      }}
                      style={{
                        height: 45,
                        backgroundColor: "black",
                        borderWidth: 1,
                        marginTop: 20,
                        justifyContent: "center",
                        borderRadius: 8,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ flex: 0.1 }}>
                          <Image
                            source={require("../assets/apple.png")}
                            style={{
                              width: 25,
                              height: 25,
                              alignSelf: "center",
                            }}
                          />
                        </View>
                        <View style={{ flex: 0.9 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              alignSelf: "center",
                              fontWeight: "700",
                              color: "white",
                              marginRight: 20,
                            }}
                          >
                            Sign in with Apple
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("Forgot")}
                    style={{ marginTop: 15, marginBottom: 20 }}
                  >
                    <Text style={{ fontSize: 16, color: "blue" }}>
                      Forgot your password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={issort}
        // style={{ backgroundColor:'rgba(64, 77, 97, 1)' }}
        onRequestClose={() => {
          setissort(false);
        }}
      >
        <TouchableOpacity
          onPress={() => setissort(false)}
          activeOpacity={1}
          style={{
            height: "100%",
            backgroundColor: "rgba(64, 77, 97, 0.5)",
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.scrollModal}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  marginTop: "20%",
                  bottom: 0,
                  height:'auto',
                  alignSelf: "center",
                  // position: 'absolute',
                  width: "90%",
                  backgroundColor: "#F8F8F8",
                  borderRadius: 15,
                  // shadowColor: "#000",
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 8,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,
                  // elevation: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setissort(false)}
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 5,
                    marginRight: 5,
                  }}
                >
                  <Entypo name="cross" size={24} color="grey" />
                </TouchableOpacity>
                <View style={{ width: "90%", alignSelf: "center" }}>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    Sort By:
                  </Text>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 10,marginBottom:28, alignSelf: "center" }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={"3"}
                    data={sortList}
                    renderItem={({ item, index }) => (
                      <>
                        {item.selected ? (
                          <TouchableOpacity
                            onPress={() => sortBy(item.txt)}
                            style={{
                              margin: 10,
                              borderRadius: 12,
                              width: "auto",
                              marginVertical: 10,
                              backgroundColor: "#A9A9A9",
                            }}
                          >
                            <Text
                              style={{
                                margin: 8,
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              {item.txt}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => sortBy(item.txt)}
                            style={{
                              margin: 10,
                              borderRadius: 12,
                              width: "auto",
                              marginVertical: 10,
                              backgroundColor: "#DCDCDC",
                            }}
                          >
                            <Text
                              style={{
                                margin: 8,
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              {item.txt}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={best}
        // style={{ backgroundColor:'rgba(64, 77, 97, 1)' }}
        onRequestClose={() => {
          setbest(false);
        }}
      >
        <TouchableOpacity
          onPress={() => setbest(false)}
          activeOpacity={1}
          style={{
            height: "100%",
            backgroundColor: "rgba(64, 77, 97, 0.5)",
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.scrollModal}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  marginTop: "20%",
                  bottom: 0,
                  // maxHeight:'80%',
                  height: "auto",
                  alignSelf: "center",
                  marginBottom: 30,
                  // position: 'absolute',
                  width: "85%",
                  backgroundColor: "#F8F8F8",
                  borderRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setbest(false)}
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 5,
                    marginRight: 5,
                  }}
                >
                  <Entypo name="cross" size={24} color="grey" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    margin: 5,
                    alignSelf: "center",
                  }}
                >
                  {menuRes}
                </Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: 5 }}
                  keyExtractor={(item, index) => index.toString()}
                  data={deal}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        width: "95%",
                        alignSelf: "center",
                        marginBottom: 15,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.7 }}>
                          {searchedsrc(item.src)}
                          {/* <Image
                                                    source={deal.bestdeal}
                                                    style={{height:50,width:150}}
                                                /> */}
                        </View>
                        {item.temp ? (
                          <View
                            style={{
                              flex: 0.5,
                              flexDirection: "row",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 24,
                                marginLeft:5,
                                fontWeight: "600",
                                color: "#FFBC00",
                              }}
                            >
                              Best Deal{" "}
                            </Text>
                            <FontAwesome
                              name="star"
                              size={26}
                              color="#FFBC00"
                            />
                          </View>
                        ) : null}

                        <View></View>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          marginLeft: 10,
                          flexDirection: "row",
                        }}
                      >
                        <View style={{}}>
                          <MaterialCommunityIcons
                            name="silverware-fork-knife"
                            size={18}
                            color="#a9a9a9"
                          />
                          <FontAwesome5
                            style={{ marginTop: 5 }}
                            name="bicycle"
                            size={18}
                            color="#a9a9a9"
                          />
                          <FontAwesome
                            style={{ marginTop: 5 }}
                            name="clock-o"
                            size={18}
                            color="#a9a9a9"
                          />
                          <FontAwesome
                            style={{ marginTop: 5 }}
                            name="star"
                            size={18}
                            color="#FFBC00"
                          />
                        </View>
                        <View style={{ marginLeft: 4, flex: 1 }}>
                          {/* <Text style={{fontWeight:'700'}}>{ deal.distance == '£' ?  deal.distance : 'N/A'}</Text> */}
                          <Text style={{ fontWeight: "700" }}>
                            {item.promotion ? item.promotion : "N/A"}
                          </Text>
                          <Text style={{ marginTop: 5, fontWeight: "700" }}>
                            {item.delivery_fee} delivery{" "}
                          </Text>
                          <Text style={{ marginTop: 5, fontWeight: "700" }}>
                            {item.delivery_time}
                          </Text>
                          <Text style={{ marginTop: 5, fontWeight: "700" }}>
                            {item.rating_numeric}/5
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => setRecent(item)}
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                            backgroundColor: "#FFBC00",
                            borderRadius: 10,
                            padding: 10,
                          }}
                        >
                          <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontSize: 18, color: "black" }}>
                              Order
                            </Text>
                          </View>
                          <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontSize: 18, color: "black" }}>
                              {item.src}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={Viewmenu}
        // style={{ backgroundColor:'rgba(64, 77, 97, 1)' }}
        onRequestClose={() => {
          setViewList(false);
        }}
      >
        <TouchableOpacity
          onPress={() => setViewList(false)}
          activeOpacity={1}
          style={{
            height: "100%",
            backgroundColor: "rgba(64, 77, 97, 0.5)",
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.scrollModal}
            nestedScrollEnabled={true}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  marginTop: "20%",
                  bottom: 0,
                  // maxHeight:'85%',
                  height: "auto",
                  alignSelf: "center",
                  // position: 'absolute',
                  width: "90%",
                  backgroundColor: "#F5F5F5",
                  borderRadius: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setViewList(false)}
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 5,
                    marginRight: 5,
                  }}
                >
                  <Entypo name="cross" size={24} color="grey" />
                </TouchableOpacity>
                {menuLoading ? (
                  <View
                    style={{
                      flex: 1,
                      marginTop: responsiveHeight(36),
                      marginBottom: responsiveHeight(40),
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator
                      style={{ alignSelf: "center" }}
                      size={"large"}
                      color={"#FFBC00"}
                    />
                  </View>
                ) : (
                  <ScrollView style={{ marginBottom: 20 }}>
                    <View style={{ width: "95%", alignSelf: "center" }}>
                      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                        {menuRes}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginTop: responsiveHeight(1),
                        }}
                      >
                        {menuResCat}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#808080",
                          marginTop: responsiveHeight(0.5),
                        }}
                      >
                        {" "}
                        • {menuAddres}
                      </Text>
                      <Image
                        source={{ uri: menuImage }}
                        style={{
                          width: "100%",
                          height: 150,
                          marginTop: responsiveHeight(1),
                        }}
                      />
                    </View>
                    {/* <View style={{height:70,backgroundColor:'green'}} > */}
                    <FlatList
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      style={{
                        marginTop: 10,
                        marginRight: 5,
                        height: responsiveHeight(8),
                        alignSelf: "center",
                        marginBottom: responsiveHeight(1),
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      // numColumns={'3'}
                      horizontal={true}
                      data={menuCategory}
                      renderItem={
                        ({ item, index }) => (
                          // <View style={{}} >
                          <TouchableWithoutFeedback key={index}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                marginHorizontal: 15,
                                textAlign: "center",
                                alignSelf: "center",
                              }}
                            >
                              {item.cat}
                            </Text>
                          </TouchableWithoutFeedback>
                        )
                        // </View>
                      }
                    />
                    {/* </View> */}
                    <View
                      style={{
                        alignSelf: "center",
                        borderWidth: 2,
                        width: "90%",
                        borderColor: "#a9a9a9",
                      }}
                    />
                    {menuCategory.length < 1 ? null : (
                      <>
                        {menuCategory.map((txt) => {
                          return (
                            <>
                              <Text
                                style={{
                                  fontSize: 26,
                                  margin: 15,
                                  marginBottom: 0,
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                {txt.cat}
                              </Text>
                              <View>
                                {categoryList.map((item, index) => {
                                  return (
                                    <>
                                      {txt.cat === item.cat_title ? (
                                        <View
                                          style={{
                                            marginTop: responsiveHeight(2.5),
                                            backgroundColor: "white",
                                            shadowColor: "#000",
                                            shadowOffset: {
                                              width: 0,
                                              height: 8,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                            flexDirection: "row",
                                            width: "100%",
                                            flex: 1,
                                            // borderBottomWidth:0.5
                                          }}
                                        >
                                          <>
                                            <View
                                              style={{
                                                width:
                                                  item.dish_image === null ||
                                                  item.dish_image ===
                                                    undefined ||
                                                  item.dish_image === ""
                                                    ? "100%"
                                                    : "65%",
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  fontSize: 18,
                                                  marginLeft: 8,
                                                }}
                                              >
                                                {item.dish_name}
                                              </Text>
                                              {item.dish_description === "" ||
                                              item.dish_description ===
                                                null ? null : (
                                                <Text
                                                  style={{
                                                    fontSize: 14,
                                                    marginLeft: 8,
                                                    marginRight: 5,
                                                    marginTop: 12,
                                                    marginBottom: 10,
                                                    color: "#808080",
                                                    marginTop: 5,
                                                  }}
                                                >
                                                  {item.dish_description}
                                                </Text>
                                              )}
                                              {/* <Text style={{fontSize:14,marginLeft:8,marginTop:12,marginBottom:10,color:'#808080',marginTop:5}} >{item.dish_image === null || item.dish_image === "" ?
                                                                            null:item.dish_image.split('//')[1].split('?')[0]}</Text> */}
                                              <Text
                                                style={{
                                                  fontSize: 14,
                                                  marginLeft: 8,
                                                  marginTop: 12,
                                                  marginBottom: 10,
                                                  color: "#808080",
                                                  marginTop: 5,
                                                }}
                                              >
                                                {item.dish_price}
                                              </Text>
                                            </View>
                                            <View
                                              style={{
                                                width:
                                                  item.dish_image === null ||
                                                  item.dish_image ===
                                                    undefined ||
                                                  item.dish_image === ""
                                                    ? null
                                                    : "35%",
                                              }}
                                            >
                                              {item.dish_image === null ||
                                              item.dish_image === undefined ||
                                              item.dish_image === "" ? null : (
                                                <>
                                                  {item.dish_image.url ? (
                                                    <Image
                                                      source={{
                                                        uri: item.dish_image
                                                          .url,
                                                      }}
                                                      style={{
                                                        width: "100%",
                                                        height: 150,
                                                      }}
                                                    />
                                                  ) : (
                                                    <Image
                                                      // source={{uri :'https://rs-menus-api.roocdn.com/images/347a5473-159c-4532-b0cf-0354dea20d71/image.jpeg' }}
                                                      source={{
                                                        uri:
                                                          "https://" +
                                                          item.dish_image
                                                            .split("//")[1]
                                                            .split("?")[0],
                                                      }}
                                                      style={{
                                                        width: "100%",
                                                        height: 150,
                                                      }}
                                                    />
                                                  )}
                                                </>
                                              )}
                                            </View>
                                          </>
                                        </View>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  );
                                })}
                              </View>
                            </>
                          );
                        })}
                      </>
                    )}
                  </ScrollView>
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>

      {search ? (
        <TouchableOpacity
          onPress={() => setSerch(false)}
          activeOpacity={1}
          style={{
            zIndex: 99999,
            height: height,
            width: "100%",
            top: 2,
            right: 0,
            left: 0,
            alignItems: "center",
            bottom: 1000,
            position: "absolute",
            backgroundColor: "rgba(64, 77, 97, 0.5)",
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.scrollModal}
            keyboardShouldPersistTaps="handled"
            listViewDisplayed="true"
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  marginTop: "38%",
                  // position: 'absolute',
                  height: 330,
                  maxHeight: 700,
                  width: 340,
                  backgroundColor: "#FFBC00",
                  borderRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 10,
                  zindex: 99999,
                }}
              >
                {/* <KeyboardAwareScrollView 
                                // style={{marginBottom:30}}
                                keyboardShouldPersistTaps='always'
                                listViewDisplayed='true'> */}
                {/* <View style={{backgroundColor:'grey',width:'100%',height:'100%',xindex:99999,alignItems:'center',position:'absolute'}} > */}

                <View
                  style={{
                    flex: 1,
                    height: "auto",
                    width: "auto",
                    zIndex: 99999,
                  }}
                >
                  <View style={{ alignSelf: "center", width: "90%" }}>
                    <Text
                      style={{
                        fontSize: 26,
                        color: "white",
                        fontWeight: "bold",
                        marginTop: 20,
                      }}
                    >
                      WE HELP YOU FIND THE BEST DEAL AROUND YOU
                    </Text>

                    {currentCity === ''?
                    <>
                      {Platform.OS === "ios" ? (
                        <GooglePlacesAutocomplete
                          ref={googleRef}
                          // keyboardShouldPersistTaps='handled'
                          // listViewDisplayed='auto'
                          // debounce={300}
                          // renderLeftButton={()=>
                          //     <View style={{flexDirection:'row'}} >
                          //         <Entypo style={{marginLeft:10,alignSelf:'center'}} name="location-pin" size={24} color="red" />
                          //          <View style={{width:0.3,height:40,backgroundColor:'#a9a9a9',marginLeft:5}}/>
                          //      </View>
                          // }
                          // getDefaultValue={() => {
                          //     return ''; // text input default value
                          // }}
                          renderRightButton={() => (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                backgroundColor: "white",
                                justifyContent: "center",
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => getLocation()}
                                style={{ height: 25, width: 25, marginLeft: 10 }}
                              >
                                <FontAwesome
                                  style={{ alignSelf: "center" }}
                                  name="location-arrow"
                                  size={24}
                                  color="black"
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                          styles={{
                            container: {
                              flex: 1,
                              // position:'absolute',
                              marginTop: 15,
                              // top:responsiveHeight(25),
                              // width:'100%',
                              zIndex: 2,
                            },
                            textInput: {
                              width: "84.5%",
                              height: 45,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                            },
                            listView: {
                              width: "90%",
                              alignSelf: "flex-end",
                              position: "absolute",
                              marginTop: 45,
                              zIndex: 2,
                              // left:0
                            },
                          }}
                          placeholder="Enter your address*"
                          fetchDetails={true}
                          // filterReverseGeocodingByTypes={{
                          //     types: ['regions','postal_code','administrative_area_level_1','country']
                          // }}
                          onPress={(data, details) => {
                            setLattitude(details.geometry.location.lat);
                            setLongitutde(details.geometry.location.lng);
                            for (
                              let i = 0;
                              i < details.address_components.length;
                              i++
                            ) {
                              if (
                                details.address_components[i].types[0] ===
                                "administrative_area_level_1"
                              ) {
                                setProvince(
                                  details.address_components[i].short_name
                                );
                                setCity(details.address_components[i].long_name);
                              } else if (
                                details.address_components[i].types[0] ===
                                "country"
                              ) {
                                setCountry(
                                  details.address_components[i].short_name
                                );
                              } else if (details.formatted_address) {
                                setAddress(details.formatted_address);
                              } else {
                              }
                            }
                            setLocation(data);
                          }}
                          query={{
                            key: "AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4",
                            language: "en",
                            // types:'postal_code',
                          }}
                          onFail={(error) => Toast.show(error)}
                          requestUrl={{
                            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
                            useOnPlatform: "web",
                          }}
                          enablePoweredByContainer={false}
                          // returnKeyType={'default'}
                          autoFillOnNotFound={true}
                        />
                      ) : (
                        <GooglePlacesAutocomplete
                          ref={googleRef}
                          // keyboardShouldPersistTaps='handled'
                          // listViewDisplayed='auto'
                          // debounce={300}
                          // renderLeftButton={()=>
                          //     <View style={{flexDirection:'row'}} >
                          //         <Entypo style={{marginLeft:10,alignSelf:'center'}} name="location-pin" size={24} color="red" />
                          //          <View style={{width:0.3,height:40,backgroundColor:'#a9a9a9',marginLeft:5}}/>
                          //      </View>
                          // }
                          // getDefaultValue={() => {
                          //     return ''; // text input default value
                          // }}
                          renderRightButton={() => (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                backgroundColor: "white",
                                justifyContent: "center",
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => getLocation()}
                                style={{ height: 25, width: 25, marginLeft: 10 }}
                              >
                                <FontAwesome
                                  style={{ alignSelf: "center" }}
                                  name="location-arrow"
                                  size={24}
                                  color="black"
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                          styles={{
                            container: {
                              flex: 1,
                              // position:'absolute',
                              marginTop: 15,
                              // top:responsiveHeight(25),
                              // width:'100%',
                            },
                            textInput: {
                              width: "85.3%",
                              height: 45,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                            },
                            listView: {
                              width: "88%",
                              alignSelf: "flex-end",
                              position: "absolute",
                              marginTop: 45,
                              zIndex: 2,
                              // left:0
                            },
                          }}
                          placeholder="Enter your address*"
                          fetchDetails={true}
                          // filterReverseGeocodingByTypes={{
                          //     types: ['regions','postal_code','administrative_area_level_1','country']
                          // }}
                          onPress={(data, details) => {
                            setLattitude(details.geometry.location.lat);
                            setLongitutde(details.geometry.location.lng);
                            for (
                              let i = 0;
                              i < details.address_components.length;
                              i++
                            ) {
                              if (
                                details.address_components[i].types[0] ===
                                "administrative_area_level_1"
                              ) {
                                setProvince(
                                  details.address_components[i].short_name
                                );
                                setCity(details.address_components[i].long_name);
                              } else if (
                                details.address_components[i].types[0] ===
                                "country"
                              ) {
                                setCountry(
                                  details.address_components[i].short_name
                                );
                              } else if (details.formatted_address) {
                                setAddress(details.formatted_address);
                              } else {
                              }
                            }
                            setLocation(data);
                          }}
                          query={{
                            key: "AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4",
                            language: "en",
                            // types:'postal_code',
                          }}
                          onFail={(error) => Toast.show(error)}
                          requestUrl={{
                            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
                            useOnPlatform: "web",
                          }}
                          enablePoweredByContainer={false}
                          // returnKeyType={'default'}
                          autoFillOnNotFound={true}
                        />
                      )}
                    </>
                    :
                    <View
                  style={{
                    height: 45,
                    backgroundColor: "white",
                    zIndex: 9999,
                    marginTop: 15,
                    borderRadius: 8,
                  }}
                >
                  <View style={{ flexDirection: "row", zindex: 999 }}>
                      <Entypo style={{marginLeft:10,alignSelf:'center'}} name="location-pin" size={24} color="black" />

                      {/* <MaterialCommunityIcons
                        style={{ marginLeft: 10, marginTop: 10 }}
                        name="silverware-fork-knife"
                        size={24}
                        color="black"
                      /> */}
                      <View
                        style={{
                          width: 0.3,
                          height: 40,
                          backgroundColor: "#a9a9a9",
                          left: 8,
                        }}
                      />

                      <TextInput
                        value={currentCity}
                        onChangeText={(value) =>
                          setCurrentCity(value)
                        }
                        placeholder={"Enter your address"}
                        style={{ width: "83%", height: 40, left: 22 }}
                      />
                  </View>
                </View>
                    }
                    {/*  */}
                    <View
                      style={{
                        height: category.length > 1 ? "50%" : 45,
                        backgroundColor: "white",
                        marginTop:currentCity === '' ? 60 : 15,
                        borderRadius: 8,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons
                          style={{ marginLeft: 10, marginTop: 10 }}
                          name="silverware-fork-knife"
                          size={24}
                          color="black"
                        />
                        <View
                          style={{
                            width: 0.3,
                            height: 40,
                            backgroundColor: "#a9a9a9",
                            left: 8,
                          }}
                        />

                        <TextInput
                          value={selected != "" ? selected : category}
                          onChangeText={(value) =>
                            selected != ""
                              ? setSelected(value)
                              : value.length > 1
                              ? getcategory(value)
                              : setcategory(value)
                          }
                          placeholder={"Dishes, Restaurants or Cuisines"}
                          style={{ width: "83%", height: 40, left: 22 }}
                        />
                      </View>
                      {category.length > 1 ? (
                        <>
                          {catdishes.length != 0 ? (
                            <View style={{ width: "100%" }}>
                              <FlatList
                                style={{ marginBottom: responsiveHeight(9.8) }}
                                keyExtractor={(item, index) => index.toString()}
                                showsVeritcalScrollIndicator={false}
                                data={catdishes}
                                renderItem={({ item, index }) => (
                                  <>
                                    {item.cat_name ? (
                                      <TouchableOpacity
                                        onPress={() => {
                                          setcategory("");
                                          setSelected(item.cat_name);
                                        }}
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          borderTopWidth: 1,
                                          paddingBottom: 10,
                                          paddingTop: 5,
                                          borderColor: "#DCDCDC",
                                        }}
                                      >
                                        <FontAwesome
                                          style={{
                                            marginLeft: 10,
                                            marginTop: 10,
                                          }}
                                          name="search"
                                          size={24}
                                          color="black"
                                        />
                                        <Text
                                          style={{
                                            alignSelf: "center",
                                            marginLeft: 18,
                                            marginTop: 6,
                                            fontSize: 14,
                                            fontWeight: "700",
                                          }}
                                        >
                                          {item.cat_name}
                                        </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() =>
                                          rest_params(item.rest_idx)
                                        }
                                        style={{
                                          margin: 10,
                                          borderTopWidth: 1,
                                          paddingBottom: 10,
                                          paddingTop: 5,
                                          borderColor: "#DCDCDC",
                                        }}
                                      >
                                        <View style={{ flexDirection: "row" }}>
                                          <Image
                                            source={{ uri: item.rest_image }}
                                            style={{
                                              width: 80,
                                              height: 60,
                                              borderRadius: 4,
                                            }}
                                          />
                                          <Text
                                            style={{
                                              alignSelf: "center",
                                              left: responsiveWidth(2.5),
                                              fontSize: 14,
                                              fontWeight: "700",
                                              width: "70%",
                                            }}
                                          >
                                            {item.rest_name}
                                          </Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                          <Text
                                            style={{
                                              color: "#8C8C8C",
                                              top: 10,
                                              fontSize: 14,
                                            }}
                                          >
                                            {item.rest_city} | {item.rest_cat}{" "}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    )}
                                  </>
                                )}
                              />
                            </View>
                          ) : null}
                        </>
                      ) : null}
                    </View>

                    <Text
                      style={{ color: "white", marginTop: 5, fontSize: 16 }}
                    >
                      Optional
                    </Text>
                    {errmsg === "" ? null : (
                      <Text
                        style={{
                          color: "tomato",
                          marginTop: 7,
                          fontSize: 16,
                          alignSelf: "center",
                          textAlign: "center",
                        }}
                      >
                        {errmsg}
                      </Text>
                    )}
                    {seaLoading ? (
                      <View
                        style={{
                          marginTop: 15,
                          height: 45,
                          backgroundColor: "#997051",
                          justifyContent: "center",
                          borderRadius: 8,
                        }}
                      >
                        <ActivityIndicator
                          size={"large"}
                          color={"white"}
                          style={{ alignSelf: "center" }}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => currentCity != ''
                        ? getCurrentpostal()
                        : getPostal()}
                        style={{
                          marginTop: 20,
                          height: 45,
                          backgroundColor: "#997051",
                          justifyContent: "center",
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            alignSelf: "center",
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          SEARCH
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* </View> */}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  backgroundVideo: {
    backgroundColor: "blue",
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
  },
});
