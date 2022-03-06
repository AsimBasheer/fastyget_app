import React, { useRef,useState } from 'react'
import {View,Text,Image,ScrollView,Dimensions,TouchableWithoutFeedback,FlatList,ActivityIndicator,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
const { height } = Dimensions.get("window");
import { Video} from 'expo-av';
import { Entypo,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import {BasePath} from '../config/config'
import * as Facebook from 'expo-facebook';
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

export default function Signup(props) {



    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [zipcode, setzipcode] = useState('');  
    const [login_type, setlogin_type] = useState('');  
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
    
    function signup_request () {

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("zipcode", zipcode);
        formData.append("login_type", 'with_Email');
        // formData.append("password", password);
        // console.log(formData);
        try {
            fetch(`${BasePath}signup_api.php`, {
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
                    setisLoading(false)
                    if (Flag.flag == 1) {
                        // console.log(responseJson);
                        // Toast.show(responseJson)
                        Toast.show(Flag.message)
                        storeData(responseJson.Data);

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

    async function FacebookLogin ()  {

        // const appId = '410520310175330';
        // const appId = '1270305600052488';
        const appId = '460268192332102';
        // this.setState({ isLoading: true })
        try {
            await Facebook.initializeAsync({appId});
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync(
                {
                    permissions: ['public_profile', 'email'],
                    behavior: 'native'
                });
            if (type === 'success') {
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,gender,email,first_name,last_name,name,picture.height(500)`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if(data.email){
                        const formData = new FormData();
                        formData.append("email", data.email);
                        // formData.append("password", password);
                        // formData.append("zipcode", zipcode);
                        formData.append("login_type", 'with_Facebook');
                        // formData.append("password", password);
                        // console.log(formData);
                        try {
                            fetch(`${BasePath}signup_api.php`, {
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
                                    setisLoading(false)
                                    if (Flag.flag == 1) {
                                        // console.log(responseJson);
                                        // Toast.show(responseJson)
                                        Toast.show(Flag.message)
                                        storeData(responseJson.Data);

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
                    }else{
                        Toast.show('Please make your facebook email public then try again')
                    }
                    })
                    .catch(e => console.log(e))
            } else {
                // this.setState({ isLoading: false })/
            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
            // this.setState({ isLoading: false })
        }
    }

    async function signInWithGoogleAsync  ()  {
        try{
            const result = await Google.logInAsync({
                androidStandaloneAppClientId:'989823458470-2l2i5ji6aqvqd7cdbp3k0erht8ispg7o.apps.googleusercontent.com',
                iosStandaloneAppClientId:'989823458470-mom7ujiu180nnefk3be4f6tec9iujqlk.apps.googleusercontent.com',
                scopes:["profile","email"]
            })
            if(result.type === 'success'){
                // setAccess
                // console.log(accessToken);
                // alert(1)
                let userResponseInfo = await fetch ('https://www.googleapis.com/userinfo/v2/me',{
                    headers :{Authorization:`Bearer ${result.accessToken}` }
                })

                userResponseInfo.json().then(data =>{
                    // console.log(data.picture);
                    const formData = new FormData();
                    formData.append("email", data.email);
                    formData.append("login_type", 'with_Google');
                        // formData.append("password", password);
                    // console.log(formData);
                    try {
                        fetch(`${BasePath}signup_api.php`, {
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
                                // setisLoading(false)
                                if (Flag.flag == 1) {
                                    // console.log(responseJson);
                                    // Toast.show(responseJson)
                                    Toast.show(Flag.message)
                                    storeData(responseJson.Data);

                                    // setTimeout(() => {
                                    // }, 200);
                                } else {
                                    Toast.show(Flag.message)
                                    // Toast.show(responseJson.error_msg);
                                    // setisLoading(false)

                                    return;
                                }
                            })
                            .catch((error) => {
                                console.log(error)

                            });
                    } catch (e) { console.log(e) }
                })


            }else{
                console.log("permission denied");

            }
        }catch(e){
            console.log(e);
        }
      };

      function apple_login(email,name){
        const formData = new FormData();
        formData.append("email", email);
        formData.append("login_type", 'with_Apple');
        // formData.append("password", password);
                // console.log(formData);
                try {
                    fetch(`${BasePath}signup_api.php`, {
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
                            setisLoading(false)
                            if (Flag.flag == 1) {
                                // console.log(responseJson);
                                // Toast.show(responseJson)
                                Toast.show(Flag.message)
                                storeData(responseJson.Data);

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
                            Toast.show(error)

                        });
                } catch (e) { Toast.show(e) }
            
    }  

    async function storeData  (response)  {
        // let res = JSON.parse(response)
        // console.log(res);
        try {
                await AsyncStorage.setItem('isLoggedIn', '1')
                console.log(1);
                await AsyncStorage.setItem('email', response[0].email)
                console.log(2);
                await AsyncStorage.setItem('userid', JSON.stringify(response[0].userid))
                console.log(3);
                await AsyncStorage.setItem('username', response[0].username)
                console.log(4);
                await AsyncStorage.setItem('fname', response[0].firstname)
                console.log(5);
                await AsyncStorage.setItem('lname', response[0].lastname)
                console.log(6);
                if(response[0].login_type != null){
                    await AsyncStorage.setItem('login_type', response[0].login_type)
                    console.log(7);
                }
                // await AsyncStorage.setItem('isChecked', JSON.stringify(this.state.isChecked))
                // alert(this.state.isChecked)
                setisLoading(false)

                props.navigation.replace('Landing')

        } catch (e) {
            console.log(e)
        }

    }

    const form_validation = () => {
        setisLoading(true)
        if (email === '' || password === '' || zipcode === '') {
            seterrMsg('All Fields are required')
            setisLoading(false)
            // this.setState({ error_message: , isLoading: false, show_error: true })

        } else if (password.length < 6) {
            seterrMsg('Password Invalid')
            setisLoading(false)
            // this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
            // console.log("password")

        } else if (!ValidateEmail(email)) {
            seterrMsg('Email is not valid')
            setisLoading(false)
            // this.setState({ error_message: '', isLoading: false, show_error: true })
        }
        else {
            // this.setState({isLoading:true})
            seterrMsg('')
            setisLoading(true)
            signup_request()

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
                // seterrmsg('')
            }, 1500);
            
      
            // alert('Payment Successfull')
          }
        
    }

    return (
    <SafeAreaView>
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
                    <Text style={{fontSize:22,fontWeight:'bold'}} >Sign Up</Text>
                    <View style={{flexDirection:'row'}} >
                        <Text style={{fontSize:18}} >Have an account? </Text> 
                        <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{alignSelf:'center'}}>
                            <Text style={{fontSize:18,fontWeight:'600',color:'blue',alignSelf:'center'}} >Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:20}} >
                        <Text style={{fontSize:18}} >Email*</Text>
                        <View style={{margin:5,justifyContent:'center',width:'100%',height:40,alignSelf:'center',borderRadius:10,borderWidth:1,borderColor:'#a9a9a9'}} >
                            <TextInput
                                placeholder={'Your Email'}
                                onChangeText={value => setEmail(value)}
                                value={email}
                                style={{ margin: 5 }}
                            />
                        </View> 
                        <Text style={{fontSize:18}} >Password*</Text> 
                        <View style={{margin:5,justifyContent:'center',width:'100%',height:40,alignSelf:'center',borderRadius:10,borderWidth:1,borderColor:'#a9a9a9'}} >
                            <TextInput
                                placeholder={'Your Password'}
                                style={{margin:5}}
                                onChangeText={value => setPassword(value)}
                                value={password}
                                secureTextEntry={true}
                                maxLength={20}
                            />
                        </View> 
                        <Text style={{fontSize:18}} >Zip Code* <Text style={{fontSize:12,color:'#a9a9a9'}} > (for the best local deals)</Text> </Text> 
                        <View style={{margin:5,justifyContent:'center',width:'100%',height:40,alignSelf:'center',borderRadius:10,borderWidth:1,borderColor:'#a9a9a9'}} >
                            <TextInput
                                placeholder={'Your zipcode'}
                                onChangeText={value => setzipcode(value)}
                                value={zipcode}
                                style={{ margin: 5 }}
                            />
                        </View> 
                    </View>
                    {errmsg === ''?
                        null
                    :
                        <Text style={{color:'tomato',marginTop:15,fontSize:16,alignSelf:'center',textAlign:'center'}} >{errmsg}</Text>
                    }
                    {isLoading?
                        <TouchableOpacity  style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                            <ActivityIndicator size={'large'} color={'white'} style={{alignSelf:'center'}} />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={()=>form_validation()} style={{height:45,backgroundColor:'#FFBC00',marginTop:20,justifyContent:'center',borderRadius:8}}>
                            <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700'}} >Sign Up</Text>
                        </TouchableOpacity>
                    }       
                    <TouchableOpacity onPress={()=>FacebookLogin()}  style={{flexDirection:'row',height:45,backgroundColor:'#3B5998',marginTop:20,justifyContent:'center',borderRadius:8}}>
                        <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}} >
                            <View style={{flex:0.1}} >
                                <Image
                                    source={require('../assets/f.png')}
                                    style={{width:20,height:30,tintColor:'white',alignSelf:'center'}}
                                />
                            </View>
                            <View style={{flex:0.9}} >
                                <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700',color:'white',marginRight:20}} >Sign in via facebook</Text>
                            </View>
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>signInWithGoogleAsync()}  style={{height:45,backgroundColor:'#ffff',borderWidth:1,marginTop:20,justifyContent:'center',borderRadius:8}}>
                        <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}} >
                            <View style={{flex:0.1}} >
                                <Image
                                    source={require('../assets/g.png')}
                                    style={{width:25,height:25,alignSelf:'center'}}
                                />
                            </View>
                            <View style={{flex:0.9}} >
                                <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700',color:'black',marginRight:20}} >Sign in via Google</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {Platform.OS === 'ios' &&
                        <TouchableOpacity onPress={async () => {
                            try {
                                // alert('not ios')
                            const credential = await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
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
                            var decoded =jwt_decode(credential.identityToken)
                            var email=decoded.email
                            var name=email.substring(0, 6)
                            //   this.googlelogin_request(email,name)
                            apple_login(email,name)
                            // alert(JSON.stringify( decoded))
                            } catch (e) {
                                if (e.code === 'ERR_CANCELED') {
                                    console.log(e)
                                    // handle that the user canceled the sign-in flow
                                } else {
                                    // handle other errors
                                }
                            }
                            }}  style={{height:45,backgroundColor:'black',borderWidth:1,marginTop:20,justifyContent:'center',borderRadius:8}}>
                            <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}} >
                                <View style={{flex:0.1}} >
                                    <Image
                                        source={require('../assets/apple.png')}
                                        style={{width:25,height:25,alignSelf:'center'}}
                                    />
                                </View>
                                <View style={{flex:0.9}} >
                                    <Text style={{fontSize:14,alignSelf:'center',fontWeight:'700',color:'white',marginRight:20}} >Sign in with Apple</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    {/* <TouchableOpacity style={{marginTop:15,marginBottom:20}}>
                        <Text style={{fontSize:16,color:'blue'}} >Forgot your password?</Text>
                    </TouchableOpacity> */}
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
                                item.txt === 'Contact us' ? 
                                    props.navigation.navigate('Link',{link:'https://fastyget.com/contact-us'})
                                :
                                item.txt === 'Sign up'?
                                    props.navigation.navigate('Signup')
                                :
                                    props.navigation.navigate('Login')
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