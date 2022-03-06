import React, { useRef, useState,useEffect,Fragment } from 'react'
import {View,Text,Image,TouchableWithoutFeedback,ScrollView,Modal,Dimensions,ActivityIndicator,Platform,KeyboardAvoidingView,FlatList,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
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


    const settings = (props) => {

    const isFocused = useIsFocused();
    const [current,setCurrent] = useState(contries[2].img)
    const [countary,setcountary] = useState(false)
    const [validateLogin, setvalidateLogin] = useState(false);  
    const [username, setUsername] = useState('');  
    const [wishlist, setWishlist] = useState([]);  
    const [isLoading, setisLoading] = useState(true);

        useEffect(async() => {
            // await AsyncStorage.clear()
            let logged = await AsyncStorage.getItem('isLoggedIn');
            let name = await AsyncStorage.getItem('username');
            // alert(name)
            if(logged != null){
                setvalidateLogin(logged == 1 ? true : false)
                setUsername(name.replace(/[0-9]/g, '').substring(0,5))
    
            }
            getFav()
            
          }, [isFocused]);


          async function getFav(){
            
            let id = await AsyncStorage.getItem('userid');
              
            const formData = new FormData();
            formData.append("user_id", id);
            // formData.append("json_data", JSON.stringify(obj));
            // console.log(formData);
            try {
                fetch(`${BasePath}getRecentlyOrdered.php`, {
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
                        if (Flag.flag == 1) {
                            
                            setWishlist(responseJson.Data)
                            setisLoading(false)
                           
                        } else {
                            setisLoading(false)
                            Toast.show(Flag.message)
                            // Toast.show(responseJson.error_msg);
                            return;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
    
                    });
            } catch (e) { console.log(e) }
          }



    return (
        <SafeAreaView>
            {Platform.OS === "ios" && <StatusBar StatusBarStyle={'dark'} /> }
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
                                    },
                                    () => {
                                        props.navigation.navigate('Setting')
                                    },
                                    async () => {
                                        setvalidateLogin(false)
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
        {isLoading?
            <View style={{height:'100%',alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator style={{alignSelf:'center'}} size={'large'} color={"#FFBC00"} />
            </View>
            :
        <>
            {wishlist.length < 1 || wishlist == []  ?
            <View style={{height:'100%'}}  >
                <Text style={{fontSize:22,fontWeight:'bold',marginLeft:15,marginTop:15}} >Recent Orders are Empty </Text>

            </View>
            :
            <>
            <Text style={{fontSize:26,fontWeight:'bold',marginTop:20,marginBottom:15,alignSelf:'center'}} >Recently Ordered</Text>
            <FlatList
                // onScroll={(e) => emptytext(e.nativeEvent.contentOffset.y)}
                showsVerticalScrollIndicator={false}
                style={{marginBottom:'30%',alignSelf:'center'}}
                // keyExtractor={(item, index) => index.toString()}
                data={wishlist}
                renderItem={({ item, index }) =>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.source_url})} style={{flexDirection:'row'}}  >
                    <Text style={{fontSize:22,fontWeight:'bold',margin:5}} >
                         • Restaurant {item.hotel_name} 
                         <Text style={{fontSize:22,margin:5}} > on </Text>
                         {item.source_name}
                          </Text>
                    
                </TouchableOpacity>
            }
            />
            </>
            }
        </>
        }

        {/* <Text style={{marginTop:20,fontSize:24,fontWeight:'bold',alignSelf:'center'}} >Empty Recently Order</Text> */}
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
