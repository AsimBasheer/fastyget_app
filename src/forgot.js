import React, { useRef,useState } from 'react'
import {View,Text,Image,ScrollView,Dimensions,TouchableWithoutFeedback,FlatList,StyleSheet,ActivityIndicator,ImageBackground,TouchableOpacity, Platform} from 'react-native'
const { height } = Dimensions.get("window");
import { Video} from 'expo-av';
import { Entypo,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import {BasePath} from '../config/config'
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveHeight } from 'react-native-responsive-dimensions';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwt_decode from "jwt-decode";
import Toast from 'react-native-tiny-toast';
import { StatusBar } from 'expo-status-bar';

const footer=[
    {
        contact:[
            {
                txt:'Contact us'
            },
            {
                txt:'Log in'
            },
            {
                txt:'Sign up'
            },
            {
                txt:'My Account'
            },
        ],
        top_Cuisines:[
            {
                txt:'Burgers'
            },
            {
                txt:'Mexican'
            },
            {
                txt:'Chinese'
            },
            {
                txt:'Japanese'
            },
            {
                txt:'Brunch'
            },
            {
                txt:'Pizza'
            },
            {
                txt:'Italian'
            },
            {
                txt:'Indian'
            },
            {
                txt:'Thai'
            },
            {
                txt:'Lebanese'
            },
            {
                txt:'View All cuisines'
            },
        ],
        popular_locations:[
            {
                txt:'New York',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'US',
                        "input_postcode" : '10007',
                        "input_category" : '',
                        "input_lat":'40.7127753',
                        "input_long":'-74.0059728',
                        "input_city":'New York',
                        "input_province":'NY',
                        "input_address":'254 Chambers Street'
                }
            },
            {
                txt:'Los Angeles',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'US',
                        "input_postcode" : '90012',
                        "input_category" : '',
                        "input_lat":'34.0522342',
                        "input_long":'-118.2436849',
                        "input_city":'Los Angeles',
                        "input_province":'CA',
                        "input_address":'106 West 1st Street'
                }
            },
            {
                txt:'Miami',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'US',
                        "input_postcode" : '33131',
                        "input_category" : '',
                        "input_lat":'25.7616798',
                        "input_long":'-80.1917902',
                        "input_city":'Miami',
                        "input_province":'FL',
                        "input_address":'1170 Florida 972'
                }
            },
            {
                txt:'London',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'GB',
                        "input_postcode" : 'SW1A 2DR',
                        "input_category" : '',
                        "input_lat":'51.5074256',
                        "input_long":'1271814',
                        "input_city":'London',
                        "input_province":'England',
                        "input_address":'403 Charing Cross Road'
                }
            },
            {
                txt:'Paris',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'FR',
                        "input_postcode" : '75004',
                        "input_category" : '',
                        "input_lat":'48.856614',
                        "input_long":'2.3522219',
                        "input_city":'Paris',
                        "input_province":'IDF',
                        "input_address":'4 Place del Hôtel de Ville'
                }
            },
            {
                txt:'Berlin',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'DE',
                        "input_postcode" : '10178',
                        "input_category" : '',
                        "input_lat":'52.52000659999999',
                        "input_long":'13.404954',
                        "input_city":'Berlin',
                        "input_province":'BE',
                        "input_address":'7 B5'
                }
            },
            {
                txt:'Madrid',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'ES',
                        "input_postcode" : '28013',
                        "input_category" : '',
                        "input_lat":'40.4167754',
                        "input_long":'-3.7037902',
                        "input_city":'Madrid',
                        "input_province":'MD',
                        "input_address":'41 Puerta del Sol'
                }
            },

            {
                txt:'Rome',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'IT',
                        "input_postcode" : '00185',
                        "input_category" : '',
                        "input_lat":'41.9027835',
                        "input_long":'12.4963655',
                        "input_city":'Rome',
                        "input_province":'Lazio',
                        "input_address":'12 Piazza della Repubblica'
                }
            },
            {
                txt:'Tokyo',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'JP',
                        "input_postcode" : '105-0011',
                        "input_category" : '',
                        "input_lat":'35.6585805',
                        "input_long":'139.7454329',
                        "input_city":'Minato City',
                        "input_province":'Tokyo',
                        "input_address":''
                }
            },
            {
                txt:'New Delhi',
                params:{
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                        "input_country" : 'IN',
                        "input_postcode" : '110011',
                        "input_category" : '',
                        "input_lat":'28.6139391',
                        "input_long":'77.2090212',
                        "input_city":'New Delhi',
                        "input_province":'DL',
                        "input_address":''
                }
            },
            {
                txt:'View all locations'
            },
        ],        
        top_brands:[
            {
                txt:'KFC'
            },
            {
                txt:'Burger King'
            },
            {
                txt:'Pizza Hut'
            },
            {
                txt:'Subway'
            },
            {
                txt:'YO! Sushi'
            },
            {
                txt:'View all locations'
            },
        ],
        get_know:[
            {
                txt:'Privacy Policy',
                link:'https://fastyget.com/privacy_policy'
            },
            {
                txt:'Terms and Conditions',
                link:'https://fastyget.com/terms_and_conditions'
            },
            {
                txt:'About Fastyget',
                link:'https://fastyget.com/about_fastyget'
            },
            {
                txt:'Fastyget Group Website',
                link:'https://fastyget.com/fastyget-group'
            },
            {
                txt:'Fastyget Blog',
                link:'https://fastyget.com/blog/'
            },
            {
                txt:'Careers',
                link:'https://fastyget.com/careers'
            },
            {
                txt:'Cookie Policy',
                link:'https://fastyget.com/cookie_policy'
            },
            {
                txt:'Modern Slavery Statement',
                link:'https://fastyget.com/modern_slavery_statement'
            },
            {
                txt:'Sutainability',
                link:'https://fastyget.com/sustainability'
            },
        ]
    }
]


export default function Login(props) {

    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [errmsg, seterrMsg] = useState('');  
    const [isLoading, setisLoading] = useState(false);  
    const [popular, setpopular] = useState(false);
    const [country, setCountry] = useState('');
    const [lat, setLattitude] = useState('');
    const [lng, setLongitutde] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [address, setAddress] = useState('');  
    const [category, setcategory] = useState('');  
    const googleRef = useRef(null)
    const [location,setLocation] = useState('')

    let scrollRef;
    
    function login_request () {

        const formData = new FormData();
        formData.append("email", email);
        // console.log(formData);
        try {
            fetch(`${BasePath}forget_password.php`, {
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
                    let Flag = responseJson.Status
                    setisLoading(false)
                    if (Flag.flag == 1) {
                        // console.log(responseJson);
                        // Toast.show(responseJson)
                        Toast.show(Flag.message)
                        props.navigation.navigate('Landing')
                        // let type = 'with_api'
                        // storeData(responseJson.Data,type);

                        // setTimeout(() => {
                        // }, 200);
                    } else {
                        Toast.show(Flag.message)
                        // Toast.show(responseJson.error_msg);
                        setisLoading(false)

                        return;
                    }
                })
                .catch((error) => {
                    console.log(error)

                });
        } catch (e) { console.log(e) }
    }

   
    const form_validation = () => {
        setisLoading(true)
        if (email === '' ) {
            seterrMsg('Email is required')
            setisLoading(false)
            // this.setState({ error_message: , isLoading: false, show_error: true })

        } else if (!ValidateEmail(email)) {
            seterrMsg('Email is not valid')
            setisLoading(false)
            // this.setState({ error_message: '', isLoading: false, show_error: true })
        }
        else {
            // this.setState({isLoading:true})
            seterrMsg('')
            setisLoading(true)
            login_request()

        }
        // else {
        //     this.login_request()
        // }
        // console.log("working");
    }

    function ValidateEmail (email)  {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }

        return (false)
    }

    const dirGetPostal = async (contr,latti,longi,prov,citi,adres) =>{

       

        // setLoading(true)
        const result = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latti},${longi}&key=AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4`
        // console.log(result);

        let response = await fetch(result, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",}
          });
          let responseJson = await response.json();
          let addres = responseJson.results[0]
       
        var postal
        addres.address_components.map((item)=>{
                if(item.types[0] === 'postal_code'){
                    postal = (item.long_name);
                    // setpostcode(item.long_name);
                }
        })

        //   console.log(addres.address_components)
          if (responseJson.error) {
            Toast.show('Invalid Credential')
      
          } else {
      
            setTimeout(() => {
                const params = {
                    'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                    "input_country" : contr,
                    "input_postcode" : postal,
                    "input_category" : category,
                    "input_lat":latti,
                    "input_long":longi,
                    "input_city":citi,
                    "input_province":prov,
                    "input_address":adres
                }
                console.log(params);
               
                props.navigation.navigate('Search',{params:params})
                // setLoading(false)
                setCountry('')
                setcategory('')
                setpopular(false)
                seterrmsg('')
            }, 1500);
            
      
            // alert('Payment Successfull')
          }
        
    }

    return (
    <SafeAreaView>
        {/* hidden={true} */}
        {Platform.OS === "ios" && <StatusBar StatusBarStyle={'dark'} /> }

        <View style={{height:80,width:'100%',backgroundColor:'#FFBC00',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>props.navigation.replace('Landing')} style={{flexDirection:'row',margin:10,alignItems:'center'}}>
                <Image
                    source={require('../assets/fastyget_logo.png')}
                    style={{height:70,width:180}}
                />
                {/* <Text style={{alignSelf:'center',fontSize:28,fontWeight:'bold'}}>foodery</Text> */}
                
            </TouchableOpacity>
            <View style={{width:'28%'}}/>

        </View>
        <ScrollView
            ref={ ref => {scrollRef = ref} }
            
        >
            <View style={{}}>
               
                <View style={{width:'90%',alignSelf:'center',marginTop:20}} >
                    <Text style={{fontSize:22,fontWeight:'bold'}} >Sign in</Text>
                    <View style={{flexDirection:'row'}} >
                        <Text style={{fontSize:18}} >Not a member yet? </Text> 
                        <TouchableOpacity onPress={()=> props.navigation.navigate('Signup')} style={{alignSelf:'center'}}>
                            <Text style={{fontSize:18,fontWeight:'600',color:'blue',alignSelf:'center'}} >Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:20}} >
                        <Text style={{fontSize:18}} >Email</Text>
                        <View style={{margin:5,justifyContent:'center',width:'95%',height:40,alignSelf:'center',borderRadius:10,borderWidth:1,borderColor:'#a9a9a9'}} >
                            <TextInput
                                placeholder={'Your Email'}
                                onChangeText={value => setEmail(value)}
                                value={email}
                                style={{ margin: 5 }}
                            />
                        </View> 
                        
                    </View>
                    
                    {isLoading?
                        <TouchableOpacity  style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                            <ActivityIndicator size={'large'} color={'white'} style={{alignSelf:'center'}} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity onPress={form_validation} style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                            <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700'}} >Send Email</Text>
                        </TouchableOpacity>
                    }
                    
                </View>
            </View>
            

            <View style={{backgroundColor:'#DCDCDC',width:'100%',marginTop:20}}>
                <View style={{margin:20}}>
                    <Text style={{fontSize:28,fontWeight:'bold'}} >Customer Service</Text>
                    <FlatList
                        style={{marginTop:10 }}
                        keyExtractor={(item, index) => index.toString()}
                        // numColumns={'2'}
                        data={footer[0].contact}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={()=>{
                                item.txt === 'Contact us'  ? 
                                props.navigation.navigate('Link',{link:'https://fastyget.com/contact-us'})
                                :
                                item.txt === 'Log in'?
                                    props.navigation.navigate('Login')
                                :
                                  props.navigation.navigate('Signup')
                            }} >
                                <Text style={{marginTop:10,marginBottom:5,fontSize:18,fontWeight:'700'}} >{item.txt}</Text>
                            </TouchableOpacity>
                        }
                    />
                    <Text style={{fontSize:28,fontWeight:'bold',marginTop:responsiveHeight(5)}} >Top Cuisines</Text>
                    <FlatList
                        style={{marginTop:10 }}
                        keyExtractor={(item, index) => index.toString()}
                        // numColumns={'2'}
                        data={footer[0].top_Cuisines}
                        renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={()=>{
                            item.txt === 'View all cuisines' ?
                            props.navigation.navigate('Cuisines')   
                            :
                                setpopular(true),
                                setcategory(item.txt)
                        }} >
                            <Text style={{marginTop:10,marginBottom:5,fontSize:18,fontWeight:'700'}} >{item.txt}</Text>
                        </TouchableOpacity>
                        }
                    />
                    <Text style={{fontSize:28,fontWeight:'bold',marginTop:responsiveHeight(5)}} >Popular locations</Text>
                    <FlatList
                        style={{marginTop:10 }}
                        keyExtractor={(item, index) => index.toString()}
                        // numColumns={'2'}
                        data={footer[0].popular_locations}
                        renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={()=>{
                            item.txt === 'View all locations' ?
                            props.navigation.navigate('Locations')
                            :
                            props.navigation.navigate('Search',{params:item.params}) 
                        }}  >
                            <Text style={{marginTop:10,marginBottom:5,fontSize:18,fontWeight:'700'}} >{item.txt}</Text>
                        </TouchableOpacity>
                        }
                    />
                    <Text style={{fontSize:28,fontWeight:'bold',marginTop:responsiveHeight(5)}} >Top Brands</Text>
                    <FlatList
                        style={{marginTop:10 }}
                        keyExtractor={(item, index) => index.toString()}
                        // numColumns={'2'}
                        data={footer[0].top_brands}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity>
                                <Text style={{marginTop:10,marginBottom:5,fontSize:18,fontWeight:'700'}} >{item.txt}</Text>
                            </TouchableOpacity>
                        }
                    />
                    <Text style={{fontSize:28,fontWeight:'bold',marginTop:responsiveHeight(5)}} >Get to know us</Text>
                    <FlatList
                        style={{marginTop:10,marginBottom:responsiveHeight(10) }}
                        keyExtractor={(item, index) => index.toString()}
                        // numColumns={'2'}
                        data={footer[0].get_know}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={()=>{
                                props.navigation.navigate('Link',{link:item.link})  
                            }} >
                                <Text style={{marginTop:10,marginBottom:5,fontSize:18,fontWeight:'700'}} >{item.txt}</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
                
            </View>
            
            

        </ScrollView>
        {popular?
            <TouchableOpacity
                    onPress={()=>setpopular(false)}
                    activeOpacity={1}
                style={{
                    zIndex:99999,
                    height: '100%',
                    width:'100%',
                    top:100,
                    right:0,
                    left:0,
                    alignItems:'center',
                    bottom: 1000,
                    position: 'absolute',
                    backgroundColor: 'rgba(64, 77, 97, 0.5)',
                }}>
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                            marginTop:'20%',
                            // position: 'absolute',
                            height:'30%',
                            width: 340,
                            backgroundColor: '#FFBC00',
                            borderRadius: 15,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                            zindex:99999
                            }}>
                            
                                <TouchableOpacity onPress={()=> setpopular(false)} style={{alignSelf:'flex-end',marginTop:5,marginRight:5}} >
                                    <Entypo name="cross" size={24} color="white" />
                                </TouchableOpacity>
                                <View style={{flex:1,height:350,width:'90%',alignSelf:'center',marginTop:10}} >
                                    <Text style={{fontSize:30,fontWeight:'700',color:'white'}} >Deliver to</Text>
                                    
                                    {Platform.OS === 'ios'?
                                    <GooglePlacesAutocomplete
                                    ref= {googleRef}
                                        
                                            styles={{
                                                container:{
                                                    flex:1,
                                                    // position:'absolute',
                                                    // marginTop:45,
                                                    // top:responsiveHeight(25),
                                                    // width:'80%',
                                                    zIndex:  2 ,
                                                },
                                                textInput :{
                                                    width:'100%',height:45
                                                },
                                                listView: {
                                                    width:'88%',
                                                    alignSelf:'flex-end',
                                                    position:'absolute',
                                                    marginTop:45,
                                                    zIndex:2,
                                                    // left:0
                                                }

                                            }}
                                                placeholder='Enter your address*'
                                                fetchDetails={true}
                                                // filterReverseGeocodingByTypes={{
                                                //     types: ['regions','postal_code','administrative_area_level_1','country']
                                                // }}
                                                onPress={(data, details) => {
                                                    var contry
                                                    var province
                                                    var city
                                                    var address
                                                    setLattitude(details.geometry.location.lat)
                                                    setLongitutde(details.geometry.location.lng)
                                                    for (let i = 0; i < details.address_components.length; i++) {
            
                                                        if (details.address_components[i].types[0] === "administrative_area_level_1") {
                                                            province = details.address_components[i].short_name
                                                            city = details.address_components[i].long_name
                                                            // setProvince(details.address_components[i].short_name)
                                                            // setCity(details.address_components[i].long_name)
                                                        }else if(details.address_components[i].types[0] === "country") {
                                                            contry = details.address_components[i].short_name
                                                            // setCountry(details.address_components[i].short_name)
                                                        }else if(details.formatted_address){
                                                            address = details.formatted_address
                                                            // setAddress(details.formatted_address);
                                                        }else {
                                                        }
                                                    }
                                                    setLocation(data)
                                                    // setTimeout(() => {
                                                        dirGetPostal(contry,details.geometry.location.lat,details.geometry.location.lng,province,city,address)
                                                   
                                                }}
                                                query={{
                                                    key: 'AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4',
                                                    language: 'en',
                                                    // types:'postal_code',
                                                    
                                                }}
                                                onFail={(error) => Toast.show(error)}
                                                requestUrl={{
                                                url:
                                                    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                                                useOnPlatform: 'web',
                                                }}
                                                enablePoweredByContainer={false}
                                                // returnKeyType={'default'}
                                                autoFillOnNotFound={true}
                                        />
                                    :
                                    <GooglePlacesAutocomplete
                                    ref= {googleRef}
                                        // keyboardShouldPersistTaps='handled'
                                      
                                            styles={{
                                                container:{
                                                    flex:1,
                                                    // position:'absolute',
                                                    // marginTop:45,
                                                    // top:responsiveHeight(25),
                                                    // width:'85%',
                                                },
                                                textInput :{
                                                    width:'100%',height:45
                                                },
                                                listView: {
                                                    width:'88%',
                                                    alignSelf:'flex-end',
                                                    position:'absolute',
                                                    marginTop:45,
                                                    zIndex:2,
                                                    // left:0
                                                }

                                            }}
                                                placeholder='Enter your address*'
                                                fetchDetails={true}
                                                // filterReverseGeocodingByTypes={{
                                                //     types: ['regions','postal_code','administrative_area_level_1','country']
                                                // }}
                                                onPress={(data, details) => {
                                                    var contry
                                                    var province
                                                    var city
                                                    var address
                                                    setLattitude(details.geometry.location.lat)
                                                    setLongitutde(details.geometry.location.lng)
                                                    for (let i = 0; i < details.address_components.length; i++) {
            
                                                        if (details.address_components[i].types[0] === "administrative_area_level_1") {
                                                            province = details.address_components[i].short_name
                                                            city = details.address_components[i].long_name
                                                            // setProvince(details.address_components[i].short_name)
                                                            // setCity(details.address_components[i].long_name)
                                                        }else if(details.address_components[i].types[0] === "country") {
                                                            contry = details.address_components[i].short_name
                                                            // setCountry(details.address_components[i].short_name)
                                                        }else if(details.formatted_address){
                                                            address = details.formatted_address
                                                            // setAddress(details.formatted_address);
                                                        }else {
                                                        }
                                                    }
                                                    setLocation(data)
                                                    // setTimeout(() => {
                                                        dirGetPostal(contry,details.geometry.location.lat,details.geometry.location.lng,province,city,address)
                                                   
                                                }}
                                                query={{
                                                    key: 'AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4',
                                                    language: 'en',
                                                    // types:'postal_code',
                                                    
                                                }}
                                                onFail={(error) => Toast.show(error)}
                                                requestUrl={{
                                                url:
                                                    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                                                useOnPlatform: 'web',
                                                }}
                                                enablePoweredByContainer={false}
                                                // returnKeyType={'default'}
                                                autoFillOnNotFound={true}
                                        />
                                    }

                                </View>  
                        </View>
                    </TouchableWithoutFeedback>
            </TouchableOpacity>
            :null}
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    backgroundVideo: {
        backgroundColor:'blue',
        height:height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
})

