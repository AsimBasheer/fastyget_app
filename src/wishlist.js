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
import axios from 'axios';
import Toast from 'react-native-tiny-toast';


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

const images = [
    {
        source_name: "Uber Eats",
        image:require('../assets/images/link/ubereat.png'),
    },
    {
        source_name: "Deliveroo",
        image:require('../assets/images/link/deliveroo.png')
    },
    {
        source_name: "Just Eat",
        image:require('../assets/images/link/just_eat.png')
    },
    {
        source_name: "Grubhub",
        image:require('../assets/images/link/grubhub.png')
    },
    {
        source_name: "Doordash",
        image:require('../assets/images/link/doordash.png')
    },
    {
        source_name: "Postmates",
        image:require('../assets/images/link/postmates.png')
    },
    {
        source_name: "Supper",
        image:require('../assets/images/link/supper.png')
    },
    {
        source_name: "Foodpanda",
        image:require('../assets/images/link/foodpanda.png')
    },
    {
        source_name: "Wolt",
        image:require('../assets/images/link/wolt.png')
    },
    {
        source_name: "Swiggy",
        image:require('../assets/images/link/swiggy.png')
    },
    {
        source_name: "Waitr",
        image:require('../assets/images/link/waitr.png')
    },
    {
        source_name: "Dunzo",
        image:require('../assets/images/link/dunzo.png')
    },
    {
        source_name: "Thuisbezorgd",
        image:require('../assets/images/link/thuisbezorgd.png')
    },
    {
        source_name: "Rappi",
        image:require('../assets/images/link/rappi.png')
    },
    {
        source_name: "Takeaway",
        image:require('../assets/images/link/takeaway.png')
    },
    {
        source_name: "Ifood",
        image:require('../assets/images/link/ifood.png')
    },
    {
        source_name: "Glovo",
        image:require('../assets/images/link/glovo.png')
    },
    {
        source_name: "Delivery",
        image:require('../assets/images/link/delivery.png')
    },
    {
        source_name: "Zomato",
        image:require('../assets/images/link/zomato.png')
    },
    {
        source_name: "Eatstreet",
        image:require('../assets/images/link/eatstreet.png')
    },
    {
        source_name: "Waiter",
        image:require('../assets/images/link/waiter.png')
    },
    {
        source_name: "Pedidosya",
        image:require('../assets/images/link/pedidosya.png')
    },
    {
        source_name: "Grabfood",
        image:require('../assets/images/link/grabfood.png')
    },
    {
        source_name: "Skipthedishes",
        image:require('../assets/images/link/skipthedishes.png')
    },
   
    
]



    const settings = (props) => {

    const isFocused = useIsFocused();
    const [current,setCurrent] = useState(contries[2].img)
    const [countary,setcountary] = useState(false)
    const [validateLogin, setvalidateLogin] = useState(false);  
    const [username, setUsername] = useState('');  
    const [wishlist, setWishlist] = useState([]);  
    const [conCode, setconCode] = useState([]);
    const [srcimages, setsrcimages] = useState(images);
    const [Viewmenu, setViewList] = useState(false);
    const [menuLoading, setmenuLoading] = useState(false);
    const [menuRes, setmenuRes] = useState('');
    const [menuResCat, setmenuResCat] = useState('');
    const [menuAddres, setmenuAddres] = useState('');
    const [menuImage, setmenuImage] = useState();
    const [menuCategory, setmenuCategory] = useState([]);
    const [categoryList, setcategoryList] = useState([]);
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
        // try {
        //     // console.log(coucode+"  !!!!!!!!!!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        //     const params = new URLSearchParams()
        //     params.append('country_code',"GB" )
            
        // const res = await axios.post(`https://foodery.org/Mobile_API/getSources.php`,
        // params, 
        // {
        // headers: {
        //     // Accept: 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // });
        // const data = res?.data?.Data
        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        // //  console.log(data)
        // setconCode(data)
        // } catch (err) {
        //     console.log(err.response.data);
        // }
        let id = await AsyncStorage.getItem('userid');
            
        const formData = new FormData();
        formData.append("user_id", id);
        // formData.append("json_data", JSON.stringify(obj));
        // console.log(formData);
        try {
            fetch(`${BasePath}getWishlist.php`, {
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
                        // console.log(responseJson.Data)
                        let data = responseJson.Data
                        var res = []
                        data.map((item)=>{
                            let obj = JSON.parse(item.json_data)
                            obj.map((data)=>{
                                res.push(data)
                            })
                        })
                        setWishlist(res)
                        setisLoading(false)
                        // console.log(res);
                        // Toast.show(responseJson)
                        // alert('Added to wishlist')
                        
                        // setTimeout(() => {
                        // }, 200);
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


        async function viewMenu(id,link,source){
        try{
            setmenuLoading(true)
            console.log(id,link,source);
            // const recent = props.route.params.params
            // return console.log(recent.input_address);
            const params = {
                'X-Api-Key':'AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c',
                'rest_id':id,
                'source_id':source,
                'country_code':'',
                'lat':0,
                'long':0,
                'rest_slug':link

            }
            console.log(params);
            const res = await axios.post(`https://circular-hawk-253618.appspot.com/getRestaurantsMenu2`,
            JSON.stringify(params), 
            {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            });
            const data = res?.data
            // console.log(data);
            setmenuRes(data[0].rest_name)
            var str = data[0].rest_categories
            if(str != null  || str != undefined ){
                var desir  =  str.replace(/\,/g," • ")
                setmenuResCat(desir)
            }else{
                setmenuResCat(data[0].rest_categories)
            }
            setmenuAddres(data[0].rest_address)
            setmenuImage(data[0].rest_image)
            // console.log(params);
            let uniqueCat = []
            data.map((item)=>{
                // console.log(item.cat_title);
                uniqueCat.push({cat:item.cat_title})
                
            })
            const n = uniqueCat.filter((tag, index, dub) =>
            dub.findIndex(t => t.cat === tag.cat) == index);
            setmenuCategory(n)
            let cat_data = []
            data.map((item)=>{
                n.map((data)=>{
                    if(item.cat_title === data.cat){
                        // console.log(item.cat_title ,' === ', data.cat);
                        cat_data.push({cat_title:item.cat_title,dish_name:item.dish_name,dish_price:item.dish_price,dish_image:item.dish_image,dish_description:item.dish_description})
                    }
                })
            })
        // console.log(cat_data);
        setTimeout(() => {
            setcategoryList(cat_data)
            setmenuLoading(false)
        }, 500);

        }catch(e){console.log(e);}
        }


        function searchedsrc (source) {   
            // return  console.log(source)
            // console.log(conCode)
            var link = []
            srcimages.map((item,index)=>{
                if(item.source_name === source){
                    // console.log(item.name)
                    link.push(item.image)
                }
            })
            let images = []
            link.map((item)=>{
                // console.log(item)
                images.push(
                    <Image
                    source={item}
                    style={{height:30,width:100,alignSelf:'center'}}
                />
                )
            })
            return images
        }

    return (
        <SafeAreaView>
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
                                        // props.navigation.navigate('Search')
                                    },
                                    () => {
                                        props.navigation.navigate('Recent')
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
                <Text style={{fontSize:22,fontWeight:'bold',marginLeft:15,marginTop:15}} >No data found</Text>

            </View>
            :
            <FlatList
                // onScroll={(e) => emptytext(e.nativeEvent.contentOffset.y)}
                showsVerticalScrollIndicator={false}
                style={{marginTop:10,marginBottom:'30%'}}
                keyExtractor={(item, index) => index.toString()}
                data={wishlist}
                renderItem={({ item, index }) =>
                    <View style={{width:'100%',marginTop:10,marginBottom:15,
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        // borderWidth:0.6,
                        // borderColor:'white',
                        alignItems:'center',
                        shadowColor: '#470000',
                        // alignSelf:'center',
                        shadowOpacity: 0.2,
                        // shadowRadius: 31.84,
                        // backgroundColor:'red',
                        elevation: 1,
                        }}>
                        {/* <Text>{item.distance}</Text> */}

                        <Image
                            source={{uri : item.image_url}}
                            // source={item.img}
                            style={{width:'100%',height:140,alignSelf:'center',alignItems:'flex-end',justifyContent:'center'}}
                        >
                        </Image>
                        
                        

                        <TouchableOpacity onPress={()=>{
                            item.sou?
                                // console.log(item.sou[0].src)
                                viewMenu(item._id,item.link,item.source)
                            :
                                viewMenu(item._id,item.link,item.source)
                            setViewList(true)
                            }}  style={{position:'absolute',bottom:item.drc || item.source ?'80%':'50%',right:20,backgroundColor:'#FFE69C',borderRadius:8}}>
                            <Text style={{fontSize:18,fontWeight:'bold',color:'black',margin:10}}  >SEE RESTAURANT MENU</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',marginLeft:15,marginRight:4}} >
                            <View style={{flex:1.05}}>
                                <Text style={{fontSize:22,fontWeight:'bold'}} >{item.restaurant_name}</Text>
                            </View>
                           
                        </View>
                        <View style={{width:'auto',flexDirection:'row',marginLeft:20,marginRight:4}} >
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize:20}}>{item.distance} </Text>
                            </View>
                            <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-end' }} >
                                
                            </View>
                        </View>
                        <ScrollView horizontal={true} style={{marginTop:6}} showsHorizontalScrollIndicator={false} >
                            {
                                item.categories.split(',').map((str)=>{
                                    return <Text style={{alignSelf:'flex-start',borderRadius:4,margin:5,padding:8,backgroundColor:'#FFE69C',fontSize:20,fontWeight:'bold'}} >{str}</Text>
                                })
                            }
                        </ScrollView>
                        <View style={{marginTop:10}} >
                            {/* <Text>{item.drc.length}</Text> */}
                            {item.drc?
                            <>
                            {item.drc.length === 3?
                                <View style={{height:'auto',flexDirection:'row'}}>
                                    {item.drc[0].src != ''?
                                    <View style={{width:130,borderLeftWidth:3,borderColor:'#a9a9a9',borderTopLeftRadius:10,borderBottomLeftRadius:10}} >
                                    {searchedsrc(item.drc[0].src)}
                                    <View style={{marginTop:10,alignItems:'center',flex:1}} >
                                        <Text>Promotion</Text>
                                        {item.drc[0].promotion != null || item.drc[1].promotion != ''?
                                        <Text style={{fontWeight:'bold',textAlign:'center'}} >{item.drc[0].promotion}</Text>
                                        :
                                        <Text style={{fontWeight:'bold',textAlign:'center'}} >N/A</Text>
                                        }
                                        <Text style={{marginTop:20}}>Delivery Fee</Text>
                                        <Text style={{fontWeight:'bold'}}>{item.drc[0].delivery_fee}</Text>
                                        <Text style={{marginTop:20}}>Delivery Time</Text>
                                        <Text style={{fontWeight:'bold'}} >{item.drc[0].delivery_time}</Text>
                                        <Text style={{marginTop:20}}>Rating</Text>
                                        <Text style={{fontWeight:'bold'}}>{item.drc[0].rating_numeric} / 5 </Text>
                                        <Text style={{fontWeight:'bold'}} >({item.drc[0].nb_reviews} review)</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.drc[0].link})} style={{alignSelf:'center',alignItems:'center',padding:10,marginTop:20,marginBottom:10,borderRadius:10,backgroundColor:'#FFE69C'}}  >
                                        <Text>Order</Text>
                                        <Text>{item.drc[0].src}</Text>
                                    </TouchableOpacity>

                                </View>
                                    :
                                    null}
                                    {item.drc[1].src != ''?
                                    <View style={{width:130,borderLeftWidth:3,borderColor:'#a9a9a9',borderTopLeftRadius:10,borderBottomLeftRadius:10}} >
                                    {searchedsrc(item.drc[1].src)}
                                    
                                    <View style={{marginTop:10,alignItems:'center',flex:1}} >
                                        <Text>Promotion</Text>
                                        {item.drc[1].promotion != null || item.drc[1].promotion != ''  ?
                                        <Text style={{fontWeight:'bold',textAlign:'center'}} >{item.drc[1].promotion}</Text>
                                        :
                                        <Text style={{fontWeight:'bold',textAlign:'center'}} >N/A</Text>
                                        }
                                        <Text style={{marginTop:20}}>Delivery Fee</Text>
                                        <Text style={{fontWeight:'bold'}}>{item.drc[1].delivery_fee}</Text>
                                        <Text style={{marginTop:20}}>Delivery Time</Text>
                                        <Text style={{fontWeight:'bold'}} >{item.drc[1].delivery_time}</Text>
                                        <Text style={{marginTop:20}}>Rating</Text>
                                        <Text style={{fontWeight:'bold'}}>{item.drc[1].rating_numeric} / 5 </Text>
                                        <Text style={{fontWeight:'bold'}} >({item.drc[1].nb_reviews} review)</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.drc[1].link})} style={{alignSelf:'center',alignItems:'center',padding:10,marginTop:20,marginBottom:10,borderRadius:10,backgroundColor:'#FFE69C'}}  >
                                        <Text>Order</Text>
                                        <Text>{item.drc[1].src}</Text>
                                    </TouchableOpacity>
                                </View>
                                    :
                                    null}
                                    {item.drc[2].src != ''?
                                        <View style={{width:130,borderLeftWidth:3,borderColor:'#a9a9a9',borderTopLeftRadius:10,borderBottomLeftRadius:10}} >
                                            {searchedsrc(item.drc[2].src)}
                                            <View style={{marginTop:10,alignItems:'center',flex:1}} >
                                                <Text>Promotion</Text>
                                                {item.drc[2].promotion != null?
                                                <Text style={{fontWeight:'bold',textAlign:'center'}} >{item.drc[2].promotion}</Text>
                                                :
                                                <Text style={{fontWeight:'bold',textAlign:'center'}} >N/A</Text>
                                                }
                                                <Text style={{marginTop:20}}>Delivery Fee</Text>
                                                <Text style={{fontWeight:'bold'}}>{item.drc[2].delivery_fee}</Text>
                                                <Text style={{marginTop:20}}>Delivery Time</Text>
                                                <Text style={{fontWeight:'bold'}} >{item.drc[2].delivery_time}</Text>
                                                <Text style={{marginTop:20}}>Rating</Text>
                                                <Text style={{fontWeight:'bold'}}>{item.drc[2].rating_numeric} / 5 </Text>
                                                <Text style={{fontWeight:'bold'}} >({item.drc[2].nb_reviews} review)</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.drc[2].link})} style={{alignSelf:'center',alignItems:'center',padding:10,marginTop:20,marginBottom:10,borderRadius:10,backgroundColor:'#FFE69C'}}  >
                                                <Text>Order</Text>
                                                <Text>{item.drc[2].src}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                    null}
                                    
                                    
                                </View>                            
                            :
                                <>
                                {item.drc.length === 2?
                                    <View style={{height:'auto',flexDirection:'row'}}>
                                    {item.drc[0].src != ''?
                                        <View style={{width:130,borderLeftWidth:3,borderColor:'#a9a9a9',borderTopLeftRadius:10,borderBottomLeftRadius:10}} >
                                        {searchedsrc(item.drc[0].src)}
                                        <View style={{marginTop:10,alignItems:'center',flex:1}} >
                                            <Text>Promotion</Text>
                                            {item.drc[0].promotion != null || item.drc[1].promotion != ''?
                                            <Text style={{fontWeight:'bold',textAlign:'center'}} >{item.drc[0].promotion}</Text>
                                            :
                                            <Text style={{fontWeight:'bold',textAlign:'center'}} >N/A</Text>
                                            }
                                            <Text style={{marginTop:20}}>Delivery Fee</Text>
                                            <Text style={{fontWeight:'bold'}}>{item.drc[0].delivery_fee}</Text>
                                            <Text style={{marginTop:20}}>Delivery Time</Text>
                                            <Text style={{fontWeight:'bold'}} >{item.drc[0].delivery_time}</Text>
                                            <Text style={{marginTop:20}}>Rating</Text>
                                            <Text style={{fontWeight:'bold'}}>{item.drc[0].rating_numeric} / 5 </Text>
                                            <Text style={{fontWeight:'bold'}} >({item.drc[0].nb_reviews} review)</Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.drc[0].link})} style={{alignSelf:'center',alignItems:'center',padding:10,marginTop:20,marginBottom:10,borderRadius:10,backgroundColor:'#FFE69C'}}  >
                                            <Text>Order</Text>
                                            <Text>{item.drc[0].src}</Text>
                                        </TouchableOpacity>

                                        </View>
                                    :
                                    null}
                                    {item.drc[1].src != ''?
                                        <View style={{width:130,borderLeftWidth:3,borderColor:'#a9a9a9',borderTopLeftRadius:10,borderBottomLeftRadius:10}} >
                                        {searchedsrc(item.drc[1].src)}
                                        
                                        <View style={{marginTop:10,alignItems:'center',flex:1}} >
                                            <Text>Promotion</Text>
                                            {item.drc[1].promotion != null || item.drc[1].promotion != ''  ?
                                            <Text style={{fontWeight:'bold',textAlign:'center'}} >{item.drc[1].promotion}</Text>
                                            :
                                            <Text style={{fontWeight:'bold',textAlign:'center'}} >N/A</Text>
                                            }
                                            <Text style={{marginTop:20}}>Delivery Fee</Text>
                                            <Text style={{fontWeight:'bold'}}>{item.drc[1].delivery_fee}</Text>
                                            <Text style={{marginTop:20}}>Delivery Time</Text>
                                            <Text style={{fontWeight:'bold'}} >{item.drc[1].delivery_time}</Text>
                                            <Text style={{marginTop:20}}>Rating</Text>
                                            <Text style={{fontWeight:'bold'}}>{item.drc[1].rating_numeric} / 5 </Text>
                                            <Text style={{fontWeight:'bold'}} >({item.drc[1].nb_reviews} review)</Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.drc[1].link})} style={{alignSelf:'center',alignItems:'center',padding:10,marginTop:20,marginBottom:10,borderRadius:10,backgroundColor:'#FFE69C'}}  >
                                            <Text>Order</Text>
                                            <Text>{item.drc[1].src}</Text>
                                        </TouchableOpacity>
                                        </View>
                                    :
                                    null}
                                    
                                    </View>
                                :
                                    <View style={{height:'auto',flexDirection:'row'}}>
                                    {item.drc[0].src != ''?
                                        <View style={{width:130,borderLeftWidth:3,borderColor:'#a9a9a9',borderTopLeftRadius:10,borderBottomLeftRadius:10}} >
                                        {searchedsrc(item.drc[0].src)}
                                        <View style={{marginTop:10,alignItems:'center',flex:1}} >
                                            <Text>Promotion</Text>
                                            {item.drc[0].promotion != null || item.drc[0].promotion != ''?
                                            <Text style={{fontWeight:'bold',textAlign:'center'}} >{item.drc[0].promotion}</Text>
                                            :
                                            <Text style={{fontWeight:'bold',textAlign:'center'}} >N/A</Text>
                                            }
                                            <Text style={{marginTop:20}}>Delivery Fee</Text>
                                            <Text style={{fontWeight:'bold'}}>{item.drc[0].delivery_fee}</Text>
                                            <Text style={{marginTop:20}}>Delivery Time</Text>
                                            <Text style={{fontWeight:'bold'}} >{item.drc[0].delivery_time}</Text>
                                            <Text style={{marginTop:20}}>Rating</Text>
                                            <Text style={{fontWeight:'bold'}}>{item.drc[0].rating_numeric} / 5 </Text>
                                            <Text style={{fontWeight:'bold'}} >({item.drc[0].nb_reviews} review)</Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.drc[0].link})} style={{alignSelf:'center',alignItems:'center',padding:10,marginTop:20,marginBottom:10,borderRadius:10,backgroundColor:'#FFE69C'}}  >
                                            <Text>Order</Text>
                                            <Text>{item.drc[0].src}</Text>
                                        </TouchableOpacity>

                                        </View>
                                    :
                                    null}
                                    
                                    
                                    </View>
                                }
                                </>
                                  
                            }
                            </>
                            :
                            <View style={{height:'auto',flexDirection:'row'}}>
                            {item.source != ''?
                                <View style={{width:130,borderLeftWidth:3,borderColor:'#a9a9a9',borderTopLeftRadius:10,borderBottomLeftRadius:10}} >
                                {searchedsrc(item.source)}
                                <View style={{marginTop:10,alignItems:'center',flex:1}} >
                                    <Text>Promotion</Text>
                                    {item.promotion != null || item.promotion != ''?
                                    <Text style={{fontWeight:'bold',textAlign:'center'}} >{item.promotion}</Text>
                                    :
                                    <Text style={{fontWeight:'bold',textAlign:'center'}} >N/A</Text>
                                    }
                                    <Text style={{marginTop:20}}>Delivery Fee</Text>
                                    <Text style={{fontWeight:'bold'}}>{item.delivery_fee}</Text>
                                    <Text style={{marginTop:20}}>Delivery Time</Text>
                                    <Text style={{fontWeight:'bold'}} >{item.delivery_time}</Text>
                                    <Text style={{marginTop:20}}>Rating</Text>
                                    <Text style={{fontWeight:'bold'}}>{item.rating_numeric} / 5 </Text>
                                    <Text style={{fontWeight:'bold'}} >({item.nb_reviews} review)</Text>
                                </View>
                                <TouchableOpacity onPress={()=>props.navigation.navigate('Link',{link:item.link})} style={{alignSelf:'center',alignItems:'center',padding:10,marginTop:20,marginBottom:10,borderRadius:10,backgroundColor:'#FFE69C'}}  >
                                    <Text>Order</Text>
                                    <Text>{item.source}</Text>
                                </TouchableOpacity>

                                </View>
                            :
                            null}
                            
                            
                            </View>
                            }
                        </View>
                    </View>
                }
            />
            }
        </>
        }
        {/* <Text style={{marginTop:20,fontSize:24,fontWeight:'bold',alignSelf:'center'}} >Empty Wishlist</Text> */}
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={Viewmenu}
                // style={{ backgroundColor:'rgba(64, 77, 97, 1)' }}
                onRequestClose={() => {
                    setViewList(false);
                }}>
                <TouchableOpacity 
                    onPress={()=>setViewList(false)}
                    activeOpacity={1}
                    style={{
                        height: '100%',
                        backgroundColor: 'rgba(64, 77, 97, 0.5)',
                    }}>
                        <ScrollView 
                            directionalLockEnabled={true} 
                            contentContainerStyle={styles.scrollModal}
                        >
                        <TouchableWithoutFeedback>
                        <View
                            style={{
                            marginTop: '20%',
                            bottom: 0,
                            // maxHeight:'85%',
                            height:'auto',
                            alignSelf:'center',
                            // position: 'absolute',
                            width: '90%',
                            backgroundColor: '#F5F5F5',
                            borderRadius: 5,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                            }}>
                                <TouchableOpacity onPress={()=> setViewList(false)} style={{alignSelf:'flex-end',marginTop:5,marginRight:5}} >
                                    <Entypo name="cross" size={24} color="grey" />
                                </TouchableOpacity>
                                {menuLoading?
                                    <View style={{flex:1,marginTop:responsiveHeight(36),marginBottom:responsiveHeight(40),alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                                        <ActivityIndicator style={{alignSelf:'center'}} size={'large'} color={"#FFBC00"} />
                                    </View>
                                :
                                <ScrollView style={{marginBottom:20}} >
                                    <View style={{width:'95%',alignSelf:'center'}} >
                                        <Text style={{fontSize:26,fontWeight:'bold'}} >{menuRes}</Text>
                                        <Text style={{fontSize:16,fontWeight:'bold',marginTop:responsiveHeight(1)}} >{menuResCat}</Text>
                                        <Text style={{fontSize:14,color:'#808080',marginTop:responsiveHeight(0.5)}} > • {menuAddres}</Text>
                                        <Image 
                                            source={{uri:menuImage}}
                                            style={{width:'100%',height:150,marginTop:responsiveHeight(1)}}

                                        />
                                    </View>
                                    <FlatList
                                            showsVerticalScrollIndicator={false}
                                            style={{marginTop:10,marginRight:5,alignSelf:'center',marginBottom:responsiveHeight(5) }}
                                            keyExtractor={(item, index) => index.toString()}
                                            numColumns={'3'}
                                            data={menuCategory}
                                            renderItem={({ item, index }) =>
                                            // <View style={{}} >
                                                <Text style={{fontSize:16,fontWeight:'bold',marginHorizontal:15}} >{item.cat}</Text>
                                            // </View>
                                    }/>
                                    <View style={{alignSelf:'center',borderWidth:2,width:'90%',borderColor:'#a9a9a9'}} />
                                    {menuCategory.length < 1?
                                        null
                                    :
                                        <>
                                        
                                        { menuCategory.map((txt)=>{
                                            return(
                                                <>
                                                <Text style={{fontSize:26,margin:15,fontWeight:'bold'}} >{txt.cat}</Text>
                                                <View>
                                                    {categoryList.map(( item, index ) =>{
                                                        return(
                                                            <>
                                                            {txt.cat === item.cat_title?

                                                                <View style={{
                                                                    marginTop:responsiveHeight(2.5),
                                                                    backgroundColor:'white',
                                                                    shadowColor: '#000',
                                                                    shadowOffset: {
                                                                        width: 0,
                                                                        height: 8,
                                                                    },
                                                                    shadowOpacity: 0.25,
                                                                    shadowRadius: 3.84,
                                                                    elevation:5,
                                                                    // borderBottomWidth:0.5
                                                                    }}>
                                                                    <>
                                                                        <Text style={{fontSize:18,marginLeft:8}} >{item.dish_name}</Text>
                                                                        {item.dish_description === "" || item.dish_description === null ?
                                                                            null
                                                                        :
                                                                            <Text style={{fontSize:14,marginLeft:8,marginRight:5,marginTop:12,marginBottom:10,color:'#808080',marginTop:5}} >{item.dish_description}</Text>
                                                                        }
                                                                        {/* <Text style={{fontSize:14,marginLeft:8,marginTop:12,marginBottom:10,color:'#808080',marginTop:5}} >{item.dish_image === null || item.dish_image === "" ?
                                                                            null:item.dish_image.split('//')[1].split('?')[0]}</Text> */}
                                                                        <Text style={{fontSize:14,marginLeft:8,marginTop:12,marginBottom:10,color:'#808080',marginTop:5}} >{item.dish_price}</Text>
                                                                        {item.dish_image === null || item.dish_image === undefined || item.dish_image === "" ?
                                                                            null
                                                                        :
                                                                        <>
                                                                        {item.dish_image.url?
                                                                            <Image
                                                                                source={{uri : item.dish_image.url }}
                                                                                style={{width:'100%',height:150}}
                                                                            />
                                                                        :
                                                                            <Image
                                                                                // source={{uri :'https://rs-menus-api.roocdn.com/images/347a5473-159c-4532-b0cf-0354dea20d71/image.jpeg' }}
                                                                                source={{uri :'https://'+item.dish_image.split('//')[1].split('?')[0] }}
                                                                                style={{width:'100%',height:150}}
                                                                            />
                                                                
                                                                        }
                                                                        </>
                                                                        
                                                                        }
                                                                        
                                                                    </>
                                                                    
                                                            </View>
                                                            :
                                                            <></>
                                                        }
                                                        </>
                                                        )
                                                    
                                                    })}
                                                </View>

                                                </>
                                            )
                                        })}
                                        </> 
                                    } 
                                
                                </ScrollView>
                                }

                        </View>
                        </TouchableWithoutFeedback>
                        </ScrollView>
                    </TouchableOpacity >
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
