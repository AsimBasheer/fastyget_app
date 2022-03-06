import React, { useRef, useState,useEffect,Fragment } from 'react'
import {View,Text,Image,TouchableWithoutFeedback,TextInput,ScrollView,Modal,Dimensions,ActivityIndicator,Platform,KeyboardAvoidingView,FlatList,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
import {BasePath} from '../config/config'
import {
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import AsyncStorage from '@react-native-async-storage/async-storage'
import OptionsMenu from "react-native-options-menu";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
const { height } = Dimensions.get("window");
import { Entypo,AntDesign,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StatusBar } from 'expo-status-bar';


const contries = [
    {
        img:require('../assets/images/flags/united-states.png'),
        name:'United States'
    },
    {
        img:require('../assets/images/flags/italy.png'),
        name:'Italy'
    },
    {
        img:require('../assets/images/flags/united-kingdom.png'),
        name:'United Kingdom'
    },

    {
        img:require('../assets/images/flags/japan.png'),
        name:'Japan'
    },
    {
        img:require('../assets/images/flags/united_arab_emirates.png'),
        name:'U.A.E'
    },
    {
        img:require('../assets/images/flags/kuwait.png'),
        name:'Kuwait'
    },
    {
        img:require('../assets/images/flags/argentina.png'),
        name:'Argentina'
    },
    {
        img:require('../assets/images/flags/mexico.png'),
        name:'Mexico'
    },
    {
        img:require('../assets/images/flags/australia.png'),
        name:'Australia'
    },
    {
        img:require('../assets/images/flags/netherlands.png'),
        name:'Netherlands'
    },
    {
        img:require('../assets/images/flags/belgium.png'),
        name:'Belgium'
    },
    {
        img:require('../assets/images/flags/norway.png'),
        name:'Norway'
    },
    {
        img:require('../assets/images/flags/brazil.png'),
        name:'Brazil'
    },
    {
        img:require('../assets/images/flags/peru.png'),
        name:'Peru'
    },
    {
        img:require('../assets/images/flags/canada.png'),
        name:'Canda'
    },
    {
        img:require('../assets/images/flags/philippines.png'),
        name:'Philippines'
    },
    {
        img:require('../assets/images/flags/czech-republic.png'),
        name:'Czech Republic'
    },
    {
        img:require('../assets/images/flags/poland.png'),
        name:'Poland'
    },
    {
        img:require('../assets/images/flags/denmark.png'),
        name:'Denmark'
    },
    {
        img:require('../assets/images/flags/portugal.png'),
        name:'Portugal'
    },
    {
        img:require('../assets/images/flags/finland.png'),
        name:'Finland'
    },
    {
        img:require('../assets/images/flags/romania.png'),
        name:'Romania'
    },
    {
        img:require('../assets/images/flags/france.png'),
        name:'France'
    },
    {
        img:require('../assets/images/flags/saudi-arabia.png'),
        name:'Saudi Arabia'
    },
    {
        img:require('../assets/images/flags/germany.png'),
        name:'Germany'
    },
    {
        img:require('../assets/images/flags/singapore.png'),
        name:'Singapore'
    },
    {
        img:require('../assets/images/flags/greece.png'),
        name:'Greece'
    },
    {
        img:require('../assets/images/flags/spain.png'),
        name:'Spain'
    },
    {
        img:require('../assets/images/flags/hong-kong.png'),
        name:'Hong Kong'
    },
    {
        img:require('../assets/images/flags/sweden.png'),
        name:'Sweden'
    },
    {
        img:require('../assets/images/flags/india.png'),
        name:'India'
    },
    {
        img:require('../assets/images/flags/switzerland.png'),
        name:'Switzerland'
    },
    {
        img:require('../assets/images/flags/indonesia.png'),
        name:'Indonesia'
    },
    {
        img:require('../assets/images/flags/taiwan.png'),
        name:'Taiwan'
    },
    {
        img:require('../assets/images/flags/ireland.png'),
        name:'Ireland'
    },
    {
        img:require('../assets/images/flags/thailand.png'),
        name:'Thailand'
    },
   
]

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
                link:'https://fastyget.com/about-fastyget'
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


    const settings = (props) => {

    const isFocused = useIsFocused();
    const [current,setCurrent] = useState(contries[2].img)
    const [countary,setcountary] = useState(false)
    const [validateLogin, setvalidateLogin] = useState(false);  
    const [username, setUsername] = useState('');  
    const [id, setId] = useState('');  
    const [fname, setfname] = useState('');  
    const [lname, setlname] = useState('');  
    const [oldpassword, setoldPassword] = useState('');  
    const [newpassword, setnewPassword] = useState('');  
    const [nameErr, setnameErr] = useState('');  
    const [passErr, setpassErr] = useState('');  
    const [type, settype] = useState('');  
    const [isNamloder, setisNamloder] = useState(false);  
    const [isPassloder, setisPassloder] = useState(false);  
    const [isDelloder, setisDelloder] = useState(false);  
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
    const [logged, setlogged] = useState('');  


        useEffect(async() => {
            // await AsyncStorage.clear()
            let logged = await AsyncStorage.getItem('isLoggedIn');
            let name = await AsyncStorage.getItem('username');
            let userid = await AsyncStorage.getItem('userid');
            let fname = await AsyncStorage.getItem('fname');
            let lname = await AsyncStorage.getItem('lname');
            let type = await AsyncStorage.getItem('login_type');
            // alert(type)
            settype(type)
            if(fname != null && lname != null){
                setfname(fname)
                setlname(lname)
            }
            if(logged != null){
                // if(logged === 1){
                    setlogged(logged)
                    setvalidateLogin(logged == 1 ? true : false)
                    setUsername(name.replace(/[0-9]/g, '').substring(0,5))
                    setId(userid)
                // }
                

            }
            
          }, [isFocused]);


          const form_validation = () => {
            setisNamloder(true)
            if (fname === '' || lname === '') {
                setnameErr('All Fields are required')
                setisNamloder(false)
    
            }  else if (validatefirstname(fname)) {
                setnameErr('First name should be in alphabets')
                setisNamloder(false)
            }else if (validatefirstname(lname)) {
                setnameErr('Last name should be in alphabets')
                setisNamloder(false)
            }
            else {
                setnameErr('')
                setisNamloder(true)
                setNames()
            }
        
        }

        const pass_validation = () => {
            setisPassloder(true)

            
            if (oldpassword === '' || newpassword === '') {
                setpassErr('All Fields are required')
                setisPassloder(false)
    
            }else if(type != 'with_Email'){
                setpassErr('Old Password is not found')
                setisPassloder(false)
            }  else if (newpassword < 12 ) {
                setpassErr('New password sholud be min. 12 character')
                setisPassloder(false)
            }
            else {
                setpassErr('')
                setisPassloder(true)
                setPassword()
            }
        
        }

        function setNames(){
            const formData = new FormData();
            formData.append("first_name", fname);
            formData.append("last_name", lname);
            formData.append("user_id", id);
            // console.log(formData);
            try {
                fetch(`${BasePath}update_name.php`, {
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
                        let Flag = responseJson.Flag
                        setisNamloder(false)
                        if (Flag.flag == 1) {
                            // console.log(responseJson);
                            // Toast.show(responseJson)
                            Toast.show(Flag.message)
                            storeData();

                            // setTimeout(() => {
                            // }, 200);
                        } else {
                            Toast.show(Flag.message)
                            // Toast.show(responseJson.error_msg);
                            setisNamloder(false)

                            return;
                        }
                    })
                    .catch((error) => {
                        console.log(error)

                    });
            } catch (e) { console.log(e) }
        }

        function setPassword(){
            const formData = new FormData();
            formData.append("old_password", oldpassword);
            formData.append("new_password", newpassword);
            formData.append("user_id", id);
            // console.log(formData);
            try {
                fetch(`${BasePath}update_password.php`, {
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
                        let Flag = responseJson.Flag
                        setisPassloder(false)
                        if (Flag.flag == 1) {
                            // console.log(responseJson);
                            // Toast.show(responseJson)
                            Toast.show(Flag.message)
                            // storeData();

                            // setTimeout(() => {
                            // }, 200);
                        } else {
                            Toast.show(Flag.message)
                            // Toast.show(responseJson.error_msg);
                            setisPassloder(false)

                            return;
                        }
                    })
                    .catch((error) => {
                        console.log(error)

                    });
            } catch (e) { console.log(e) }
        }

        function deleteAcoount(){
            setisDelloder(true)
            const formData = new FormData();
            formData.append("user_id", id);
            // console.log(formData);
            try {
                fetch(`${BasePath}delete_account.php`, {
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
                        let Flag = responseJson.Flag
                        setisDelloder(false)
                        if (Flag.flag == 1) {
                            // console.log(responseJson);
                            // Toast.show(responseJson)
                            Toast.show(Flag.message)
                            // storeData();
                            clearData()
                            // setTimeout(() => {
                            // }, 200);
                        } else {
                            Toast.show(Flag.message)
                            // Toast.show(responseJson.error_msg);
                            setisDelloder(false)

                            return;
                        }
                    })
                    .catch((error) => {
                        console.log(error)

                    });
            } catch (e) { console.log(e) }
        }

        async function storeData  ()  {
            // let res = JSON.parse(response)
            // console.log(res);
            try {
                    await AsyncStorage.setItem('fname', fname)
                    // console.log(5);
                    await AsyncStorage.setItem('lname', lname)
                    // console.log(6);
                    // alert(this.state.isChecked)
                    setisNamloder(false)
            } catch (e) {
                console.log(e)
            }
    
        }

        async function clearData (){
            await AsyncStorage.clear()
            props.navigation.replace('Landing')

        }

        const validatefirstname = (lastname) => {
            if (/(?=[A-Za-z])/.test(lastname)) {
              return false;
            }
            return true;
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
                    // seterrmsg('')
                }, 1500);
                
          
                // alert('Payment Successfull')
              }
            
        }

    return (
        <SafeAreaView>
            {Platform.OS === "ios" && <StatusBar StatusBarStyle={'dark'}/> }
            <View style={{height:80,width:'100%',backgroundColor:'#FFBC00',justifyContent:'center'}}>
            <View style={{flex:1,flexDirection:'row',margin:10,alignItems:'center'}}>
                <TouchableOpacity onPress={()=>props.navigation.replace('Landing')} style={{flex:1,flexDirection:'row'}} >
                    <Image
                        source={require('../assets/fastyget_logo.png')}
                        style={{height:70,width:180}}
                    />
                    {/* <Text style={{alignSelf:'center',fontSize:28,fontWeight:'bold'}}>foodery</Text> */}
                </TouchableOpacity>
                {/* <View style={{marginLeft:responsiveScreenWidth(20)}}/> */}
                <View style={{flexDirection:'row'}} >
                    <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>setcountary(true)} >
                        <Image
                            source={current}
                            style={{width:35,height:35}}
                        />
                    </TouchableOpacity>
                    {!validateLogin?
                        <TouchableOpacity
                            onPress={()=> props.navigation.navigate('Login')}
                            style={{marginLeft:6,height:40,borderRadius:8,width:70,backgroundColor:'brown',justifyContent:'center',alignItems:'center'}}
                            >
                                <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>LOGIN</Text>
                        </TouchableOpacity>
                    :
                        <>
                        <Text style={{margin:10,fontWeight:'bold',fontSize:20}} >
                            {username.charAt(0).toUpperCase()+username.slice(1)}
                        </Text>
                        <OptionsMenu
                            button={require('../assets/down.png')}
                            buttonStyle={{
                                width: 30,
                                height: 15,
                                resizeMode: "contain",
                                marginTop: 18,
                                // marginRight:20
                            }}
                            destructiveIndex={
                                3
                            }
                            options={
                                ["Wish List", "Recently Clicked", "Account Settings","Log Out"]
                            }
                            optionText={{ color: "green" }}
                            actions={
                                [
                                    () => {
                                        props.navigation.navigate('Wish')
                                    },
                                    () => {
                                        props.navigation.navigate('Recent')
                                    },
                                    () => {
                                    },
                                    async () => {
                                        setvalidateLogin(false)
                                        setlogged(0)
                                        await AsyncStorage.clear()
                                        props.navigation.replace('Landing')
                                    },
                                    // () => console.log("cancel"),
                                    ]
                                
                            }
                            />
                        </>
                    
                    }
                    
                </View>
                
            </View>
        </View>
        <ScrollView style={{marginBottom:responsiveHeight(10)}}>
            <View style={{backgroundColor:'white',padding:20}} >
                <Text style={{marginTop:10,fontSize:24,fontWeight:'bold',alignSelf:'center'}} >Account Settings</Text>
                <Text style={{marginTop:10,fontSize:20,fontWeight:'600'}} >Personal Information</Text>
                <Text style={{fontSize:16,fontWeight:'bold',marginTop:10}} >First Name</Text> 
                <View style={{margin:5,width:'95%',height:40,alignSelf:'center',borderRadius:5,borderWidth:1,borderColor:'#a9a9a9'}} >
                    <TextInput
                        placeholder={'e.g. John'}
                        style={{margin:5}}
                        onChangeText={value => setfname(value)}
                        value={fname}
                        maxLength={30}
                    />
                </View> 
                <Text style={{fontSize:16,fontWeight:'bold'}} >Last Name</Text> 
                <View style={{margin:5,width:'95%',height:40,alignSelf:'center',borderRadius:5,borderWidth:1,borderColor:'#a9a9a9'}} >
                    <TextInput
                        placeholder={'e.g. Smith'}
                        style={{margin:5}}
                        onChangeText={value => setlname(value)}
                        value={lname}
                        maxLength={30}
                    />
                </View> 
                {nameErr === ''?
                    null
                :
                    <Text style={{color:'tomato',marginTop:15,fontSize:16,alignSelf:'center',textAlign:'center'}} >{nameErr}</Text>
                }
                {isNamloder?
                    <TouchableOpacity  style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                        <ActivityIndicator size={'large'} color={'white'} style={{alignSelf:'center'}} />
                    </TouchableOpacity>
                        :
                    <TouchableOpacity onPress={form_validation} style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                        <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700'}} >Update personal information</Text>
                    </TouchableOpacity>
                }
                <Text style={{marginTop:10,fontSize:20,fontWeight:'600'}} >Change your password</Text>
                <Text style={{fontSize:16,fontWeight:'bold',marginTop:10}} >Old Password</Text> 
                <View style={{margin:5,width:'95%',height:40,alignSelf:'center',borderRadius:5,borderWidth:1,borderColor:'#a9a9a9'}} >
                    <TextInput
                        style={{margin:5}}
                        onChangeText={value => setoldPassword(value)}
                        value={oldpassword}
                        secureTextEntry={true}
                        maxLength={12}
                    />
                </View>
                
                <Text style={{fontSize:16,fontWeight:'bold'}} >New Password</Text> 
                <View style={{margin:5,width:'95%',height:40,alignSelf:'center',borderRadius:5,borderWidth:1,borderColor:'#a9a9a9'}} >
                    <TextInput
                        style={{margin:5}}
                        onChangeText={value => setnewPassword(value)}
                        value={newpassword}
                        secureTextEntry={true}
                        maxLength={12}
                    />
                </View>  
                {passErr === ''?
                    null
                :
                    <Text style={{color:'tomato',marginTop:15,fontSize:16,alignSelf:'center',textAlign:'center'}} >{passErr}</Text>
                }
                {isPassloder?
                    <TouchableOpacity  style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                        <ActivityIndicator size={'large'} color={'white'} style={{alignSelf:'center'}} />
                    </TouchableOpacity>
                        :
                    <TouchableOpacity onPress={pass_validation} style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                        <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700'}} >Change password</Text>
                    </TouchableOpacity>
                }
                <Text style={{fontSize:16,color:'#a9a9a9',marginTop:16}} > • Lowercase letter</Text> 
                <Text style={{fontSize:16,color:'#a9a9a9',marginTop:5}} > • Special character</Text> 
                <Text style={{fontSize:16,color:'#a9a9a9',marginTop:5}} > • Number</Text> 
                <Text style={{fontSize:16,color:'#a9a9a9',marginTop:5}} > • Uppercase character</Text> 
                <Text style={{fontSize:16,color:'#a9a9a9',marginTop:5}} > • Min. 12 characters</Text> 

                {isDelloder?
                    <TouchableOpacity   style={{height:45,backgroundColor:'tomato',marginTop:26,justifyContent:'center',borderRadius:8}}>
                        <ActivityIndicator size={'large'} color={'white'} style={{alignSelf:'center'}} />
                    </TouchableOpacity>
                        :
                    <TouchableOpacity onPress={deleteAcoount} style={{height:45,backgroundColor:'tomato',marginTop:20,justifyContent:'center',borderRadius:8}}>
                        <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700',color:'white'}} >Delete my account</Text>
                    </TouchableOpacity>
                }
            </View>
            
            <View style={{backgroundColor:'#DCDCDC',width:'100%'}}>
                    <View style={{margin:20}}>
                        <Text style={{fontSize:28,fontWeight:'bold'}} >Customer Service</Text>
                        <FlatList
                            style={{marginTop:10 }}
                            keyExtractor={(item, index) => index.toString()}
                            // numColumns={'2'}
                            data={footer[0].contact}
                            renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={()=>{
                                item.txt === 'Contact us' || item.txt === 'My Account' ? 
                                null
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
                                props.navigation.navigate('Link',{link:'https://fastyget.com/cuisines'})   
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
                                props.navigation.navigate('Link',{link:'https://fastyget.com/locations'}) 
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
                            style={{marginTop:10 }}
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
        <Modal
                animationType="slide"
                transparent={true}
                visible={countary}
                // style={{ backgroundColor:'rgba(64, 77, 97, 1)' }}
                onRequestClose={() => {
                    setcountary(false);
                }}>
                <TouchableOpacity
                 onPress={()=>setcountary(false)}
                 activeOpacity={1}
                style={{
                    height: '100%',
                    backgroundColor: 'rgba(64, 77, 97, 0.5)',
                }}>
                     <ScrollView 
                            directionalLockEnabled={true} 
                            contentContainerStyle={styles.scrollModal}
                        >
                        <TouchableWithoutFeedback  >
                            <View
                            style={{
                            marginTop: '20%',
                            bottom: 50,
                            // maxHeight:'80%',
                            height:'auto',
                            alignSelf:'center',
                            // position: 'absolute',
                            width: '85%',
                            backgroundColor: '#F8F8F8',
                            borderRadius: 15,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                            }}>
                                <TouchableOpacity onPress={()=> setcountary(false)} style={{alignSelf:'flex-end',marginTop:5,marginRight:5}} >
                                    <Entypo name="cross" size={24} color="grey" />
                                </TouchableOpacity>
                                <Text style={{fontSize:26,fontWeight:'700',marginLeft:10}} >Select your country</Text>
                                <FlatList
                                    style={{marginTop:10,height:'auto' }}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={'2'}
                                    data={contries}
                                    renderItem={({ item, index }) =>
                                        <TouchableOpacity onPress={()=>{ 
                                            setCurrent(item.img),
                                            setcountary(false)
                                            }} style={{flexDirection:'row',width:'40%',alignItems:'center',marginHorizontal:responsiveWidth(5)}} >
                                            <Image
                                                source={item.img}
                                                style={{width:25,height:25,borderRadius:50}}
                                            />
                                            <Text style={{margin:10,fontSize:14}} >{item.name}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            

                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                    </TouchableOpacity>
        </Modal>
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
    SearchBoxTextItem: {
        margin: 5,
        fontSize: 16,
        paddingTop: 4,
      },
    backgroundVideo: {
        backgroundColor:'blue',
        height:height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 16,
        marginTop: 40,
      },
      MainContainer: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        padding: 12,
      },
      autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    //    borderWidth:1
      },
      descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      itemText: {
        fontSize: 22,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 12,
      },
      infoText: {
        textAlign: 'center',
        fontSize: 16,
      },
})

export default settings
