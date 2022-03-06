
// // import React from "react";
// // import * as Crypto from "expo-crypto";
// // import * as AppleAuthentication from "expo-apple-authentication";
// // import {View,Text,Image,ScrollView,Dimensions,FlatList,StyleSheet,ActivityIndicator,ImageBackground,TouchableOpacity} from 'react-native'
    
// // export default function Login(): React.FunctionComponent<any> async () => {
// // const loginWithApple = async () => {
// //     const csrf = Math.random().toString(36).substring(2, 15);
// //     const nonce = Math.random().toString(36).substring(2, 10);
// //     const hashedNonce = await Crypto.digestStringAsync(
// //       Crypto.CryptoDigestAlgorithm.SHA256, nonce);
// //     const appleCredential = await AppleAuthentication.signInAsync({
// //       requestedScopes: [
// //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
// //         AppleAuthentication.AppleAuthenticationScope.EMAIL
// //       ],
// //       state: csrf,
// //       nonce: hashedNonce
// //     });
// //     const { identityToken, email, state } = appleCredential;
// //   }
// //   // This should go in state
// //   const loginAvailable = await AppleAuthentication.isAvailableAsync();
// //   return (<>
// //     {loginAvailable === true ? (
// //       <View style={{ alignItems: "center" }}>
// //         <AppleAuthentication.AppleAuthenticationButton
// //           buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
// //           buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
// //           cornerRadius={5}
// //           style={{ width: 250, height: 50 }}
// //           onPress={loginWithApple}
// //       />
// //     </View>
// //      ) : null}
// //      </>
// //   );
// // };
// import React, { Component } from "react";
// import {
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
//   TouchableNativeFeedback,
//   Image,
//   ScrollView,
//   AsyncStorage,
//   TouchableOpacity,
//   Text,
//   View,
// } from "react-native";
// import * as Permissions from 'expo-permissions';
// import * as Notifications from 'expo-notifications';
// import { TextInput } from "react-native-gesture-handler";
// import * as Facebook from 'expo-facebook';
// // import * as Google from 'expo-google-app-auth';
// import * as GoogleSignIn from 'expo-google-sign-in';
// import Toast from "react-native-tiny-toast";
// import { BasePath } from "../config/config";
// import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
// import { db } from '../config/firebase.config'
// import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import jwt_decode from "jwt-decode";
// import { mini,small,medium, large } from '../SvgImages/ResponsiveFonts';
// import { Defaultfont } from '../SvgImages/FontColors';
// import { AppleIcon, EmailIcon, FacebookIcon, GoogleIcon, LoginLogiImage, Security } from '../SvgImages/SVGImages';
// // var token = "eyJ0eXAiO.../// jwt token";
// // var decoded = jwt_decode(token);
 
// // console.log(decoded);

// const experienceId = "@asim_bashir/wulff_project";

// export default class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       ExpoPushToken: '',
//       showpass: false,
//       email: "",
//       password: "",
//       show_error: false,
//       error_message: "",
//       isLoading: false,
//       gUsername: '',
//       gFname: '',
//       gEmail: '',
//       gId: '',
//       gPhotourl: ''
//     };
//     this.checkLoginStatus();
//     this.registerForNotification()

//   };

  
//   registerForNotification = async () => {
//     const { status: existingstatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingstatus;
//     if (existingstatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status
//     }
//     if (finalStatus !== 'granted') {
//       return;
//     }
//     let token = await Notifications.getExpoPushTokenAsync({ experienceId, });
//     this.setState({ ExpoPushToken: token.data })
//   }

//   setTokenFirebase = (user_id) => {
//     // alert(this.state.ExpoPushToken)

//     var hasToken = false
//     var docId = ''
//     db.collection("tokens").get().then((query) => {
//       query.forEach(doc => {
//         console.log(doc.data().user_id + ' ' + user_id);
//         if (doc.data().user_id == user_id) {
//           docId = doc.id
//           hasToken = true
//         }
//       })
//     }).then(() => {
//       if (hasToken) {
//         db.collection("tokens").doc(docId)
//           .update({ 'user_id': user_id, 'token': this.state.ExpoPushToken })
//       } else {
//         db.collection("tokens")
//           .add({ 'user_id': user_id, 'token': this.state.ExpoPushToken })
//       }
//     })


//   }
  
//   onAppleButtonPress=async ()=> {
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     })
//     console.warn(appleAuthRequestResponse)
  
//     // get current authentication state for user
//     // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
//     // const credentialState =
   
    
//     let credentials = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
//     alert(JSON.stringify( credentials))
//     //alert(JSON.stringify( appleAuthRequestResponse))
//     // use credentialState response to ensure the user is authenticated
//     // if (credentialState === appleAuth.State.AUTHORIZED) {
//     //   // user is authenticated
//     //   //alert(credentialState)
//     // }
//   }
  

//   // signInWithGoogleAsync = async () => {
//   //   console.log('Google')
//   //   this.setState({ isLoading: true })

//   //   try {
//   //     const result = await Google.logInAsync({
//   //       androidClientId: "624660692098-i1gvgeancsv6dv6qkti9e6jcv6da9liv.apps.googleusercontent.com",
//   //       iosClientId: "624660692098-5frkgrlfb9ho8uhbcmmol2ta94rlalv4.apps.googleusercontent.com",
//   //       scopes: ['profile', 'email'],
//   //     });

//   //     if (result.type === 'success') {
//   //       console.log(result.user)
//   //       this.googlelogin_request(
//   //         result.user.email,
//   //         result.user.givenName,
//   //         result.user.name,
//   //         result.user.photoUrl)

//   //       return result.accessToken;
//   //     } else {
//   //       this.setState({ isLoading: false })
//   //       return { cancelled: true };
//   //     }
//   //   } catch (e) {
//   //     return { error: true };
//   //   }
//   // }
//   signInWithGoogleAsync = async () => {
//     this.setState({ isLoading: true })
//     try {
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       if (type === 'success') {
//         // this._syncUserWithStateAsync();
//         // console.log(user)
//         // alert(user.auth.accessToken)
//         this.googlelogin_request(
//           user.email,
//           user.displayName ,
//           // result.user.name,
//           // result.user.photoUrl
//         )
//         return user.auth.accessToken;
//       }else{
//         this.setState({ isLoading: false })
//       }
//     } catch ({ message }) {
//       alert('login Error:' + message);
//       this.setState({ isLoading: false })

//     }
//   };

//   FacebookLogin = async () => {

//     // const appId = '410520310175330';
//     const appId = '1270305600052488';
//     this.setState({ isLoading: true })
//     try {
//       await Facebook.initializeAsync(appId);
//       const {
//         type,
//         token,
//         expires,
//         permissions,
//         declinedPermissions,
//       } = await Facebook.logInWithReadPermissionsAsync(
//         {
//           permissions: ['public_profile', 'email'],
//         });
//       if (type === 'success') {
//         fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,name,picture.height(500)`)
//           .then(response => response.json())
//           .then(data => {
//             console.log(data)
//             this.googlelogin_request(
//               data.email,
//               data.first_name,
//               data.name,
//               data.picture
//             )
//           })
//           .catch(e => console.log(e))
//       } else {
//         this.setState({ isLoading: false })
//       }
//     } catch ({ message }) {
//       alert(`Facebook Login Error: ${message}`);
//       this.setState({ isLoading: false })
//     }
//   }

//   checkLoginStatus = async () => {
//     if (await AsyncStorage.getItem('isLoggedIn')) {

//       this.props.navigation.dispatch('DashboardDrawer')
//     } else {
//     }
//   }


//   show_error_message = () => {
//     if (this.state.show_error) {
//       return (
//         <View>
//           <Text style={{ color: 'red', textAlign: 'center' }}>{this.state.error_message}</Text>
//         </View>
//       )
//     }
//   }


//   storeData = async (response) => {
//     // return
//     // console.log(response)
//     const { navigate } = this.props.navigation;
//     try {
//       console.log("1");
//       await AsyncStorage.setItem('static_path', response.static_path)
//       await AsyncStorage.setItem('isLoggedIn', '1')
//       console.log("2");
//       await AsyncStorage.setItem('id', JSON.stringify(response.user.profile.user_id));
//       // console.log("3");
//       await AsyncStorage.setItem('name', response.user.username);
//       // console.log("4");
//       await AsyncStorage.setItem('role', response.user.profile.role);
//       // console.log("5");
//       await AsyncStorage.setItem('email', response.user.email);
//       // console.log("6");
//       await AsyncStorage.setItem('first_name', response.user.first_name);
//       // console.log("7");
//       await AsyncStorage.setItem('bio', response.user.profile.bio ? response.user.profile.bio : '');
//       // console.log("8");
//       await AsyncStorage.setItem('emailVerify', JSON.stringify(response.user.profile.emailVerify));
//       // console.log("9");
//       await AsyncStorage.setItem('phone', response.user.profile.phone == null ? '' : response.user.profile.phone);
//       // console.log("10");
//       await AsyncStorage.setItem('set_password', JSON.stringify(response.user.set_password));
//       // console.log("11");
//       await AsyncStorage.setItem('image', response.user.profile.image);
//       await AsyncStorage.setItem('cover_image', response.user.profile.background_image);
//       console.log("12");
//       await AsyncStorage.setItem('verified', JSON.stringify(response.user.profile.verified));
//       await AsyncStorage.setItem('card', response.user.profile.card);
//       await AsyncStorage.setItem('price', response.user.profile.price);
//       await AsyncStorage.setItem('paymentField', response.user.profile.payment_field);
//       await AsyncStorage.setItem('paymentType', response.user.profile.payment_type);
//       await AsyncStorage.setItem('email_notify', JSON.stringify(response.user.profile.email_notify));
//       await AsyncStorage.setItem('post_notify', JSON.stringify(response.user.profile.post_notify));
//       await AsyncStorage.setItem('subscribe_notify', JSON.stringify(response.user.profile.subscribe_notify));
//       await AsyncStorage.setItem('live_notify', JSON.stringify(response.user.profile.live_notify));
//       console.log("13");
//       // alert(1)
//       this.setTokenFirebase(response.user.profile.user_id)
//       // alert(2)

//       this.props.navigation.replace('DashboardDrawer')

//     } catch (e) {
//       console.log(e)
//     }

//   }

//   login_request = () => {

//     const formData = new FormData();
//     formData.append("email", this.state.email);
//     formData.append("password", this.state.password);
//     try {
//       fetch(`${BasePath}login`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((responseJson) => {
//           // console.log(responseJson)

//           if (responseJson.error == false) {
//             // console.log(responseJson);
//             this.storeData(responseJson);
//             // this.props.navigation.replace('DashboardDrawer')

//             // firebase
//             //   .auth()
//             //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
//             //   .then(() =>console.log(added)
//             //    )
//             //   .catch(error => this.setState({ errorMessage: error.message }))
//             //   // firebase.database().ref('user/'+this.state.Phone).set(
//             //   //   {
//             //   //     name:this.state.First_Name,
//             //   //     image:this.state.img_str
//             //   //   }
//             //   // )
//             //   .then(()=>{
//             //     console.log('inside store data')

//             //   }).catch((e)=>{
//             //     console.log('error'+e)
//             //   })


//             setTimeout(() => {
//               // Toast.show(responseJson.success_msg)
//             }, 200);
//           } else {
//             //          console.log(responseJson.data.original.error_msg)
//             this.setState({ isLoading: false });
//             Toast.show(responseJson.error_msg);

//             return;
//           }
//         })
//         .catch((error) => { });
//     } catch (e) { }
//   }


//   googlelogin_request = (email, fname) => {
//     console.log("******");
//     // console.log(gPhotourl);
//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("first_name", fname);
//     // formData.append("username", username);
//     // formData.append("image", 'jdhksdfshdfk');
//     // formData.append("password", this.state.password);
//     try {
//       fetch(`${BasePath}social-login`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((responseJson) => {
//           // console.log(responseJson)

//           if (responseJson.error == false) {
//             console.log(responseJson);

//             this.storeData(responseJson);



//             setTimeout(() => {
//               // Toast.show(responseJson.success_msg)
//             }, 200);

//           } else {


//             console.log("working");
//             Toast.show(responseJson.error_msg);

//             return;
//           }
//         })
//         .catch((error) => { });
//     } catch (e) { }
//   }

//   form_validation = () => {
//     this.setState({ isLoading: true })
//     if (this.state.email === '' || this.state.password === '') {
//       this.setState({ error_message: 'All Fields are required', isLoading: false, show_error: true })

//     } else if (this.state.password.length < 6) {
//       this.setState({ error_message: 'Password Invalid', isLoading: false, show_error: true })
//       console.log("password")

//     } else if (!this.ValidateEmail(this.state.email)) {
//       if (!this.validateUsername(this.state.email)) {
//         this.setState({ error_message: 'Email and Username are not valid', isLoading: false, show_error: true })
//       }
//       else {
//         // this.setState({isLoading:true})
//         this.setState({ error_message: '', show_error: true })
//         this.login_request()
//       }
//     } else {
//       this.login_request()
//     }
//     // console.log("working");
//   }

//   ValidateEmail = (email) => {
//     if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
//       return (true)
//     }

//     return (false)
//   }

//   ValidateName = (Name) => {
//     var regExp = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
//     var name = Name.match(regExp);
//     if (name) {

//       return true;
//     }
//     return false;
//   }

//   validateUsername = (email) => {
//     if (/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(email)) {
//       return (true)
//     }

//     return (false)
//   }

//   login = () => {
//     this.setState({ isLoading: true })
//     this.form_validation()
//   }



//   render() {
//     return (
//       <View
//         style={{flex:1,backgroundColor:'#FAFAFA'}}
//       >
//         <ScrollView>
//           <View style={{marginTop:40}}/>
//           <View style={{alignSelf:'center',marginVertical:20}}>
//             <LoginLogiImage/>
//           </View>
//           <View style={{padding:15}}>
//             <Text style={{fontSize:large,color:'#2D2A31',fontWeight:'700'}}>Sign In</Text>
//             <View style={styles.TextContainer}>
//               <EmailIcon/>
//               <TextInput onChangeText={value => this.setState({ email: value })} placeholder="E-mail / User Name" placeholderTextColor="#6B6983" style={styles.InputField}/>
//             </View>
//             <View style={styles.TextContainer}>
//             <Security/>
//               <TextInput secureTextEntry={this.state.showpass} onChangeText={value => this.setState({ password: value })} placeholder="Password" placeholderTextColor="#6B6983" style={{...styles.InputField,width:'85%'}}/>
//               {this.state.showpass?
//                 <Ionicons onPress={()=>this.setState({showpass:!this.state.showpass})} name="eye" size={24} color="black" />
//                 :<Ionicons onPress={()=>this.setState({showpass:!this.state.showpass})} name="eye-off" size={24} color="black" />
//               }
//             </View>
//           </View>
//           <Text onPress={() => this.props.navigation.navigate("Forgot")} style={{color:'#2D2A31',textDecorationLine:'underline',textAlign:'right',marginRight:15}}>Forgot Password</Text>
//           {this.state.isLoading?
//            <TouchableOpacity activeOpacity={1} style={{borderRadius:5,backgroundColor:'#6211AC',height:60,margin:15,justifyContent:'center',alignItems:'center'}}>
//            <ActivityIndicator color={"#fff"}/>
//          </TouchableOpacity>:
//           <TouchableOpacity onPress={() => this.form_validation()}  style={{borderRadius:5,backgroundColor:'#6211AC',height:60,margin:15,justifyContent:'center',alignItems:'center'}}>
//             <Text style={{fontSize:medium,color:'#fff'}}>Sign In</Text>
//           </TouchableOpacity>}
//           <Text style={{marginVertical:15,textAlign:'center'}}>Or</Text>
//           <View style={styles.SocialContainer}>
//             <TouchableOpacity onPress={() => this.signInWithGoogleAsync()}>
//               <GoogleIcon/>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => this.FacebookLogin()} >
//               <FacebookIcon/>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={async () => {
//             try {
//               const credential = await AppleAuthentication.signInAsync({
//                 requestedScopes: [
//                   AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//                   AppleAuthentication.AppleAuthenticationScope.EMAIL,
//                 ],
                
//                 // requestedOperation:  AppleAuthentication.AppleAuthenticationOperation.LOGIN,
//                 // /requestedScopes:[AppleAuthenticationScope.FULL_NAME,AppleAuthentication.AppleAuthenticationScope.EMAIL]
//               });
//               // signed in
//             //  var c= await AppleAuthentication.getCredentialStateAsync(credential).then((e)=>{
//             //   alert(JSON.stringify( e))
//             //  }).catch((e)=>{
//             //    alert('error'+JSON.stringify( e))
//             //  })
              
//               var decoded = jwt_decode(credential.identityToken);
//               var decoded =jwt_decode(credential.identityToken)
//               var email=decoded.email
//               var name=email.substring(0, 6)
//               this.googlelogin_request(email,name)
//               // alert(JSON.stringify( decoded))
//             } catch (e) {
//               if (e.code === 'ERR_CANCELED') {
//                 // handle that the user canceled the sign-in flow
//               } else {
//                 // handle other errors
//               }
//             }
//           }}>
//             <AppleIcon/>
//             </TouchableOpacity>
//           </View>
//           <Text style={{textAlign:'center',marginTop:20,color:Defaultfont}}>Don't have an account? <Text style={{color:Defaultfont,fontWeight:'900'}} onPress={()=>this.props.navigation.navigate('SignUp')}>Sign up</Text></Text>
//         </ScrollView>
//       </View>
//     );
//   }
// }
// const styles=StyleSheet.create({
//   TextContainer:{
//     flexDirection:'row',
//     alignItems:'center',
//     borderRadius:5,
//     height:50,
//     backgroundColor:'#fff',
//     padding:15,
//     // shadowOffset:{width:0.1,height:0.1},
    
//     shadowOpacity:0.05,
//     marginVertical:10
//   },
//   InputField:{
    
//     height:40,
//     width:'98%',
//     paddingHorizontal:10
//   },
//   SocialContainer:{
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'space-around',
//     paddingHorizontal:80,
//     marginTop:20

//   }
// })