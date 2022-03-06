import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Linking,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Modal,
  ImageBackground,
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

const src_images = [
  {
    source_name: "Uber Eats",
    image: require("../assets/images/link/ubereat.png"),
  },
  {
    source_name: "Deliveroo",
    image: require("../assets/images/link/deliveroo.png"),
  },
  {
    source_name: "Just Eat",
    image: require("../assets/images/link/just_eat.png"),
  },
  {
    source_name: "Grubhub",
    image: require("../assets/images/link/grubhub.png"),
  },
  {
    source_name: "Doordash",
    image: require("../assets/images/link/doordash.png"),
  },
  {
    source_name: "Postmates",
    image: require("../assets/images/link/postmates.png"),
  },
  {
    source_name: "Supper",
    image: require("../assets/images/link/supper.png"),
  },
  {
    source_name: "Foodpanda",
    image: require("../assets/images/link/foodpanda.png"),
  },
  {
    source_name: "Wolt",
    image: require("../assets/images/link/wolt.png"),
  },
  {
    source_name: "Swiggy",
    image: require("../assets/images/link/swiggy.png"),
  },
  {
    source_name: "Waitr",
    image: require("../assets/images/link/waitr.png"),
  },
  {
    source_name: "Dunzo",
    image: require("../assets/images/link/dunzo.png"),
  },
  {
    source_name: "Thuisbezorgd",
    image: require("../assets/images/link/thuisbezorgd.png"),
  },
  {
    source_name: "Rappi",
    image: require("../assets/images/link/rappi.png"),
  },
  {
    source_name: "Takeaway",
    image: require("../assets/images/link/takeaway.png"),
  },
  {
    source_name: "Ifood",
    image: require("../assets/images/link/ifood.png"),
  },
  {
    source_name: "Glovo",
    image: require("../assets/images/link/glovo.png"),
  },
  {
    source_name: "Delivery",
    image: require("../assets/images/link/delivery.png"),
  },
  {
    source_name: "Zomato",
    image: require("../assets/images/link/zomato.png"),
  },
  {
    source_name: "Eatstreet",
    image: require("../assets/images/link/eatstreet.png"),
  },
  {
    source_name: "Waiter",
    image: require("../assets/images/link/waiter.png"),
  },
  {
    source_name: "Pedidosya",
    image: require("../assets/images/link/pedidosya.png"),
  },
  {
    source_name: "Grabfood",
    image: require("../assets/images/link/grabfood.png"),
  },
  {
    source_name: "Skipthedishes",
    image: require("../assets/images/link/skipthedishes.png"),
  },
];

const dishes = [
  '[{"restaurant_name":"intial index1","delivery":"34","source":"ubereat1","title":"Millennium Pizza Bar"},{"restaurant_name":"Millennium Pizza Bar","delivery":"14","source":"ubereat","title":"Millennium Pizza Bar"},{"restaurant_name":"Millennium Pizza Bar","delivery":"4","title":"Millennium Pizza Bar","source":"foodpanda"},{"restaurant_name":"Millennium Pizza Bar","delivery":"0","title":"Millennium Pizza Bar","source":"foodpan1da"}]',
  '[{"restaurant_name":"intial index2","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"},{"restaurant_name":"Millennium Pizza Bar","title":"Millennium Pizza Bar","source":"foodpanda","delivery":"23"},{"restaurant_name":"Millennium Pizza Bar","source":"ubereat","title":"Millennium Pizza Bar","delivery":"0"},{"restaurant_name":"Millennium Pizza Bar","title":"Millennium Pizza Bar","source":"fooqdpanda","delivery":"1"}]',
  '[{"restaurant_name":"intial index3","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
  '[{"restaurant_name":"intial index4","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
  '[{"restaurant_name":"intial index5","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
  '[{"restaurant_name":"intial index6","source":"ubereat2","title":"Millennium Pizza Bar","delivery":"32"}]',
];

const sort = [
  {
    txt: "Recommended",
    selected: false,
  },
  {
    txt: "Most Popular",
    selected: false,
  },
  {
    txt: "Price High to Low",
    selected: false,
  },
  {
    txt: "Price Low to High",
    selected: false,
  },
];

const dietary = [
  {
    txt: "Kosher",
    selected: false,
  },
  {
    txt: "Organic",
    selected: false,
  },
  {
    txt: "Gluten Free",
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
    txt: "Vegan",
    selected: false,
  },
  {
    txt: "Allergy Friendly",
    selected: false,
  },

  {
    txt: "Paleo",
    selected: false,
  },

  {
    txt: "Healthy",
    selected: false,
  },
  {
    txt: "Low Crab",
    selected: false,
  },
];

const contries = [
  {
    img: require("../assets/images/flags/united-states.png"),
    name: "United States",
  },
  {
    img: require("../assets/images/flags/italy.png"),
    name: "Italy",
  },
  {
    img: require("../assets/images/flags/united-kingdom.png"),
    name: "United Kingdom",
  },

  {
    img: require("../assets/images/flags/japan.png"),
    name: "Japan",
  },
  {
    img: require("../assets/images/flags/united_arab_emirates.png"),
    name: "U.A.E",
  },
  {
    img: require("../assets/images/flags/kuwait.png"),
    name: "Kuwait",
  },
  {
    img: require("../assets/images/flags/argentina.png"),
    name: "Argentina",
  },
  {
    img: require("../assets/images/flags/mexico.png"),
    name: "Mexico",
  },
  {
    img: require("../assets/images/flags/australia.png"),
    name: "Australia",
  },
  {
    img: require("../assets/images/flags/netherlands.png"),
    name: "Netherlands",
  },
  {
    img: require("../assets/images/flags/belgium.png"),
    name: "Belgium",
  },
  {
    img: require("../assets/images/flags/norway.png"),
    name: "Norway",
  },
  {
    img: require("../assets/images/flags/brazil.png"),
    name: "Brazil",
  },
  {
    img: require("../assets/images/flags/peru.png"),
    name: "Peru",
  },
  {
    img: require("../assets/images/flags/canada.png"),
    name: "Canda",
  },
  {
    img: require("../assets/images/flags/philippines.png"),
    name: "Philippines",
  },
  {
    img: require("../assets/images/flags/czech-republic.png"),
    name: "Czech Republic",
  },
  {
    img: require("../assets/images/flags/poland.png"),
    name: "Poland",
  },
  {
    img: require("../assets/images/flags/denmark.png"),
    name: "Denmark",
  },
  {
    img: require("../assets/images/flags/portugal.png"),
    name: "Portugal",
  },
  {
    img: require("../assets/images/flags/finland.png"),
    name: "Finland",
  },
  {
    img: require("../assets/images/flags/romania.png"),
    name: "Romania",
  },
  {
    img: require("../assets/images/flags/france.png"),
    name: "France",
  },
  {
    img: require("../assets/images/flags/saudi-arabia.png"),
    name: "Saudi Arabia",
  },
  {
    img: require("../assets/images/flags/germany.png"),
    name: "Germany",
  },
  {
    img: require("../assets/images/flags/singapore.png"),
    name: "Singapore",
  },
  {
    img: require("../assets/images/flags/greece.png"),
    name: "Greece",
  },
  {
    img: require("../assets/images/flags/spain.png"),
    name: "Spain",
  },
  {
    img: require("../assets/images/flags/hong-kong.png"),
    name: "Hong Kong",
  },
  {
    img: require("../assets/images/flags/sweden.png"),
    name: "Sweden",
  },
  {
    img: require("../assets/images/flags/india.png"),
    name: "India",
  },
  {
    img: require("../assets/images/flags/switzerland.png"),
    name: "Switzerland",
  },
  {
    img: require("../assets/images/flags/indonesia.png"),
    name: "Indonesia",
  },
  {
    img: require("../assets/images/flags/taiwan.png"),
    name: "Taiwan",
  },
  {
    img: require("../assets/images/flags/ireland.png"),
    name: "Ireland",
  },
  {
    img: require("../assets/images/flags/thailand.png"),
    name: "Thailand",
  },
];

const src_img = [
  {
    name: "Uber_Eats",
    img: require("../assets/images/link/ubereat.png"),
  },
  {
    name: "Supper",
    img: require("../assets/images/link/supper.png"),
  },
  {
    name: "Just_Eat",
    img: require("../assets/images/link/just_eat.png"),
  },
  {
    name: "Deliveroo",
    img: require("../assets/images/link/deliveroo.png"),
  },
];

const app_img = {
  app_Uber_Eats: require("../assets/images/link/ubereat.png"),
  app_Deliveroo: require("../assets/images/link/deliveroo.png"),
  app_Doordash: require("../assets/images/link/doordash.png"),
  app_Dunzo: require("../assets/images/link/dunzo.png"),
  app_EatStreet: require("../assets/images/link/eatstreet.png"),
  app_Foodpanda: require("../assets/images/link/foodpanda.png"),
  app_Glovo: require("../assets/images/link/glovo.png"),
  app_GrabFood: require("../assets/images/link/grabfood.png"),
  app_Grubhub: require("../assets/images/link/grubhub.png"),
  app_Ifood: require("../assets/images/link/ifood.png"),
  app_Just_Eat: require("../assets/images/link/just_eat.png"),
  app_Pedidosya: require("../assets/images/link/pedidosya.png"),
  app_Postmates: require("../assets/images/link/postmates.png"),
  app_Rappi: require("../assets/images/link/rappi.png"),
  app_Skipthedishes: require("../assets/images/link/skipthedishes.png"),
  app_Supper: require("../assets/images/link/supper.png"),
  app_Swiggy: require("../assets/images/link/swiggy.png"),
  app_Takeaway: require("../assets/images/link/takeaway.png"),
  app_Waiter: require("../assets/images/link/waiter.png"),
  app_Waitr: require("../assets/images/link/waitr.png"),
  app_Wolt: require("../assets/images/link/wolt.png"),
  app_Zomato: require("../assets/images/link/zomato.png"),
};

export default function Searched(props) {
  const [countary, setcountary] = useState(false);
  const [location, setLocation] = useState("");
  const [ismodal, setismodal] = useState(false);
  const [catdishes, setCatdishes] = useState([]);
  const [cuisinedishes, setcuisinedishes] = useState([]);
  const [chaindishes, setchaindishes] = useState([]);
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
  const [selectedCuisine, setselectedCuisine] = useState("");
  const [selectedChain, setselectedChain] = useState("");
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
  const [current, setCurrent] = useState(contries[2].img);
  const [var1, setvar1] = useState("");
  const [var2, setvar2] = useState("");
  const [var3, setvar3] = useState("");
  const [var4, setvar4] = useState("");
  const [var5, setvar5] = useState([]);
  const [first, setfirst] = useState(false);
  //   const prevCount = usePrevious(oriArr)
  const ref = useRef();
  const prevCountRef = useRef();

  // useEffect(() => {
  //   //assign the ref's current value to the count Hook
  //   prevCountRef.current = var1;
  // }, [var1]);

  useEffect(() => {
    // return searchedsrc()
    // await AsyncStorage.clear()
    setData();
    setCurrency([{ txt: "£" }, { txt: "££" }, { txt: "£££" }, { txt: "££££" }]);
    // setDietry(dietary)
    fetch(`${BasePath}getCategories.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // const {results: dish} = json.Data;
        // console.log(dish);
        if (json.Status.message == "Successfull") {
          // console.log(json.Data);
          // setCatdishes(json.Data);
          // setTimeout(() => {
          // json.Data.map((item)=>{
          //     setCatdishes(item.category_name)
          // })
          // setFilteredDishes(json.Data.category_name)
          // }, 500);
        }
        // setTimeout(() => {
        //     console.log(catdishes);
        // }, 8000);
        //setting the data in the films state
      })
      .catch((e) => {
        console.log(e);
      });
    // let rre = []
    // let final = []
    // let temp = 10000.5
    // let indx = 0
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
    //     // console.log(arr);

    //     // let dub=srcArr;
    //     const n = srcArr.filter((tag, index, dub) =>
    //      dub.findIndex(t => t.src === tag.src) == index);
    //      let sou = []
    //     if(res.length > 1){
    //     res.map((item,index)=>{

    //         if(index === 0){
    //             n.map((data,key)=>{
    //             // console.log(indx+"***********************"+temp , data.fee<temp)
    //             // console.log(data.fee+"*****"+temp , data.fee<temp)

    //             if(data.fee<temp){
    //                 temp = data.fee
    //                 indx = key
    //             }
    //             // else{
    //             //     temp = data.fee
    //             //     indx = key
    //             // }
    //             // console.log( data.fee)

    //                 sou.push(data)
    //         })
    //             // console.log(indx+"***********************"+temp)
    //             rre.push({...item,sou})

    //     }
    //     })

    //     }
    // })
    // // return console.log("sc array == >",rre)

    // var rest = rre.map((data,key)=>{
    //     let drc = data.sou.map((item,index)=>{
    //         if(indx === index){
    //             return {...item,temp:true,temp_num:temp}
    //         }else{
    //             return {...item}
    //         }
    //     })
    //     return {...data,drc,sou:[]}
    // })

    // var ids = new Set(arr.map(d => d.restaurant_name));
    // var merged = [...arr, ...rest.filter(d => !ids.has(d.restaurant_name))];
    // console.log("sc array == >",merged)
    searchedArr();
    // checkCurrency()
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

  useEffect(() => {
    console.log(isChecked);
    const a = Object.keys(isChecked).filter((item) => isChecked[item]);
    if (first) {
      common(var1, var2, var3, var4, a);
    }
    setfirst(true);
  }, [isChecked]);

  function rest_params(id) {
    const param = {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      rest_id: id,
      lat: "",
      long: "",
    };
    props.navigation.navigate("RestDetail", { params: param });
  }

  async function setData() {
    let logged = await AsyncStorage.getItem("isLoggedIn");
    let id = await AsyncStorage.getItem("userid");
    // alert(id)
    if (logged != null) {
      setvalidateLogin(logged == 1 ? true : false);
      setId(id);
    } else {
      if (once) {
        // setismodal(true)
        setOnce(false);
      }
    }
  }

  async function searchedArr() {
    // console.log(param);
    setisLoading(true);
    try {
      let district = props?.route?.params?.district;
      setsearchKey(district);
      const param = new URLSearchParams();
      param.append("district", district);

      const res = await axios.post(
        `https://fastyget.com/Mobile_API/getRestaurantsList.php`,
        param,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = res?.data;
      const status = data.Status;
      if (status.flag === 1) {
        Toast.show(status.message);
        setsearchArr(data.Data);
        setOriarr(data.Data);
        setarrLength(data.Data.length);
        let catlist = data.Data[0];
        let cusinies = [];
        let chain = [];
        let dietry = [];
        let sourcekeys = [];
        for (const key in catlist) {
          if (key.includes("cat_")) {
            cusinies.push({ name: `${key.replace("cat_", "")}` });
          }
          // console.log(`${key.replace('cat_','')}: ${catlist[key]}`);
          if (key.includes("chain_")) {
            chain.push({ name: `${key.replace("chain_", "")}` });
          }
          if (key.includes("filter_")) {
            dietry.push({
              txt: `${key.replace("filter_", "")}`,
              selected: false,
            });
          }
          if (key.includes("app_") && app_img[key]) {
            // sourcekeys.push({img:require("../assets/images/link/"+app_img[key])})

            if (typeof app_img[key] != "Array []") {
              // console.log("inside if",typeof app_img[key] , key );
              sourcekeys.push({ img: app_img[key], name: key });
            }
            // console.log(typeof app_img[key] );
          }
        }
        const index = dietry.findIndex((object) => {
          // return object.txt === 'Allergy_Friendly';
          return object.txt === "Eco_Friendly_Packaging";
        });
        const fnal = arraymove(dietry, index, 10);
        setCatdishes(cusinies);
        setchaindishes(chain);
        setDietry(fnal);
        // console.log(sourcekeys);
        setconCode(sourcekeys);
      } else {
        Toast.show(status.message);
      }
      // console.log(data);
    } catch (e) {
      console.log(e);
    }

    function arraymove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      return arr;
    }
    // let params ;
    // if(param != ''){
    //     params = {...param}
    //     console.log('if called');
    // }else{
    //     params = {...props?.route?.params?.params}
    //     console.log('else called');

    // }
    // // const params = props?.route?.params?.params
    // setParams(params)
    // // console.log(params)
    // const searchKey = params.input_category
    // const coucode = params.input_country
    // setsearchKey(searchKey)
    // try {
    //     const res = await axios.post(`https://circular-hawk-253618.appspot.com/getRestaurants2`,
    //      JSON.stringify(params),
    //     {
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     });
    //     const data = res?.data
    //     var arrData = []
    //     var finl = []
    //     let temp = 10000.5
    //     let indx = 0
    //     // let rre = []
    //     var best = []
    //     var arrOri = []
    //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

    //     data.map((item,index)=>{
    //         var res = JSON.parse(item)
    //         let arr = []
    //         let srcArr = []

    //         if(res.length > 1){
    //                 arrOri.push({...res[0],isFav:false})
    //                 res.map((data,key)=>{
    //                     // arr.push(data)
    //                     srcArr.push({
    //                         src:data.source,
    //                         promotion:data.promotion,
    //                         delivery_fee:data.delivery_fee,
    //                         delivery_fee_numeric:data.delivery_fee_numeric,
    //                         delivery_time:data.delivery_time,
    //                         rating_numeric:data.rating_numeric,
    //                         nb_reviews:data.nb_reviews,
    //                         link:data.link,
    //                         delivery_time:data.delivery_time,
    //                         delivery_time_numeric:data.delivery_time_numeric

    //                     })
    //                 })
    //         }else{
    //             finl.push({...res[0],isFav:false})
    //         }
    //         let dub=srcArr;
    //         const n = srcArr.filter((tag, index, dub) =>
    //         dub.findIndex(t => t.src === tag.src) == index);
    //             let sou = []
    //             if(res.length > 1){
    //             res.map((item,index)=>{

    //                 if(index === 0){
    //                     n.map((data,key)=>{
    //                         if(data.delivery_fee_numeric<temp){
    //                             temp = data.delivery_fee_numeric
    //                             indx = key
    //                         }
    //                         sou.push(data)
    //                 })
    //                 // console.log(indx+ "=" +temp)
    //                 arrData.push({...item,sou})

    //                 // return console.log(temp+"++++++++++++++"+indx)

    //                 // console.log("======>",rest)
    //                 // console.log(temp+"++++++2222222222222222++++++++"+indx)

    //                 // best.push(rest)
    //             }
    //             })
    //     }
    //     })
    //     // console.log(arrData)
    // var rre = arrData.map((data,key)=>{
    //     // console.log(temp+"++++++11111111111++++++++"+indx)
    //         let sre = data.sou
    //         // console.log(sre)
    //         let drc = sre.map((item,index)=>{
    //             if(indx === index){
    //                 return {...item,temp:true,temp_num:temp}
    //             }else{
    //                 return {...item}

    //             }
    //         })
    //         return {...data,drc,sou:[]}
    //         // return data
    //         // console.log(data)
    //     })
    //     // return console.log(best);
    //     var ids = new Set(rre.map(d => d.restaurant_name));
    //     var merged = [...rre, ...finl.filter(d => !ids.has(d.restaurant_name))];
    //     // return console.log(finl);

    //     setsearchArr(merged)
    //     setarrLength(rre.length + finl.length)

    //     var names = new Set(arrOri.map(d => d.restaurant_name));
    //     var mergedOri = [...arrOri, ...finl.filter(d => !names.has(d.restaurant_name))];
    //     ref.current = mergedOri
    //     setOriarr(mergedOri)
    //     // alert(mergedOri.length)

    // } catch (err) {
    //     console.log(err.response.data);
    // }

    // try {
    //     console.log(coucode+"  !!!!!!!!!!%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    //     const params = new URLSearchParams()
    //     params.append('country_code',coucode )

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
    // // await AsyncStorage.setItem('sou_arr',data)
    // //  console.log(data)
    // setconCode(data)
    // } catch (err) {
    //     console.log(err.response.data);
    // }
    setisLoading(false);
  }

  function searchObj(obj, query) {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value === "object") {
        searchObj(value, query);
      }

      if (value === query) {
        console.log("property=" + key + " value=" + value);
      }
    }
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
          style={{ height: 40, width: 150 }}
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

    if (sort === "Recommended") {
      const myDataMulti = []
        .concat(oriArr)
        .sort((a, b) => (a.rest_rating < b.rest_rating ? 1 : -1));

      // const myData = [].concat(singleObj)
      // .sort((a, b) => a.delivery_time_numeric > b.delivery_time_numeric ? 1 : -1)

      // var ids = new Set(myDataMulti.map(d => d.restaurant_name));
      // var merged = [...myDataMulti, ...myData.filter(d => !ids.has(d.restaurant_name))];

      setsearchArr(myDataMulti);
      setisLoading(false);
    } else if (sort === "Most Popular") {
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
          a.rest_ratingNB_numeric < b.rest_ratingNB_numeric ? 1 : -1
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
    } else if (sort === "Price High to Low") {
      const myDataMulti = []
        .concat(oriArr)
        .sort((a, b) => (a.rest_priceBucket < b.rest_priceBucket ? 1 : -1));
      setsearchArr(myDataMulti);

      setisLoading(false);
    } else if (sort === "Price Low to High") {
      const myDataMulti = []
        .concat(oriArr)
        .sort((a, b) => (a.rest_priceBucket > b.rest_priceBucket ? 1 : -1));
      setsearchArr(myDataMulti);

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
      setmenuCategory(n);
      let cat_data = [];
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
      // console.log(cat_data);
      setTimeout(() => {
        setcategoryList(cat_data);
        setmenuLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }

  function emptytext(event) {
    if (event > 0) {
      setshowlength(true);
      // setprevious(event)
    } else {
      setshowlength(false);
      // setprevious(event)
    }
    // console.log()
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

  async function filter_priceCategory(txt, selected) {
    // await AsyncStorage.setItem('price',txt)
    //    console.log(txt);
    const resu = curreny.map((item) => {
      if (selected) {
        if (item.txt === txt) {
          // alert('called')
          txt = "";
          return {
            ...item,
            selected: false,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      } else {
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
      }
    });
    setvar3(txt != "" ? txt : "");
    setCurrency(resu);
    if (txt === "") {
      common(var1, var2, "", var4);
    } else {
      common(var1, var2, txt, var4);
    }
    //     const res = oriArr.filter((item)=>{
    //         if(item.price_category == txt){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }else{
    //             // alert("not found")
    //         }
    //     })
    // //    console.log("***************************************");
    //     // if(res.length < 1){

    //     // }else{
    //         setsearchArr(res)
    //         setarrLength(res.length)
    //     // }
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

  async function filter_dietary(name, selected) {
    // await AsyncStorage.setItem('dietary',name)

    const res = dietry.map((item) => {
      if (selected) {
        if (item.txt === name) {
          // alert('called')
          name = "";
          return {
            ...item,
            selected: false,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      } else {
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
      }
    });
    // console.log(res);

    setDietry(res);
    setvar4(name);
    if (name === "") {
      common(var1, var2, var3, "");
    } else {
      common(var1, var2, var3, name);
    }
    // setarrLength(res.length)

    // if(name === 'Allergy Friendly'){
    // const res = oriArr.filter((item)=>{
    //     if(item.filter_allergy_friendly != 0 ){
    //         // console.log(item.price_category);
    //         return { ...item}
    //     }
    // })
    //     setsearchArr(res)
    //     setarrLength(res.length)

    // }else if(name === 'Vegan'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_vegan != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
    // else if(name === 'Halal'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_halal != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
    // else if(name === 'Vegetarian'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_vegetarian != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
    // else if(name === 'Kosher'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_kosher != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
    // else if(name === 'Paleo'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_paleo != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
    // else if(name === 'Gluten Free'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_gluten_free != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
    // else if(name === 'Organic'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_organic != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
    // else if(name === 'Healthy'){
    //     const res = oriArr.filter((item)=>{
    //         if(item.filter_healthy != 0 ){
    //             // console.log(item.price_category);
    //             return { ...item}
    //         }
    //     })
    //         setsearchArr(res)
    //         setarrLength(res.length)
    // }
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
            input_category: selectedValue,
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

  async function addFav(item, resName) {
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
            Toast.show(Flag.message);
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

  async function setRecent(item) {
    props.navigation.navigate("Link", { link: item.link, params: param });
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
            Toast.show(Flag.message);
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

  async function common_temp(cuisine, chain, range, detry, sources) {
    setisLoading(true);

    console.log(cuisine, chain, range, detry);
    var csuinefilter = [];
    var chainfilter = [];
    var pricefilter = [];
    var dietryfilter = [];

    if (cuisine != "") {
      // alert(cuisine,"yesss");

      // var results = [];
      // var toSearch = "lo";
      for (var i = 0; i < oriArr.length; i++) {
        for (const key in oriArr[i]) {
          console.log(oriArr[i][key]);
          if (oriArr[i][key].indexOf(cuisine) != -1) {
            csuinefilter.push(oriArr[i]);
          }
        }
      }
      // setsearchArr(results)
      // setarrLength(results.length)
      // console.log(results);
    }
    if (chain != "") {
      // alert(chain,"yesss");
      // var results = [];
      // var toSearch = "lo";
      for (var i = 0; i < oriArr.length; i++) {
        for (const key in oriArr[i]) {
          console.log(oriArr[i][key]);
          if (oriArr[i][key].indexOf(chain) != -1) {
            chainfilter.push(oriArr[i]);
          }
        }
      }
      // setsearchArr(results)
      // setarrLength(results.length)
    }

    if (range != "") {
      // alert(chain,"yesss");
      for (var i = 0; i < oriArr.length; i++) {
        for (const key in oriArr[i]) {
          console.log(oriArr[i][key]);
          if (oriArr[i][key].indexOf(range) != -1) {
            pricefilter.push(oriArr[i]);
          }
        }
      }
    }

    if (detry != "") {
      // alert(detry,"yesss");
      for (var i = 0; i < oriArr.length; i++) {
        for (const key in oriArr[i]) {
          console.log(oriArr[i][key]);
          if (oriArr[i][key].indexOf(detry) != -1) {
            dietryfilter.push(oriArr[i]);
          }
        }
      }
    }

    var ids = new Set(csuinefilter.map((d) => d.rest_idx));
    var merged = [
      ...csuinefilter,
      ...chainfilter.filter((d) => !ids.has(d.rest_idx)),
    ];

    var ide = new Set(merged.map((d) => d.rest_idx));
    var merged1 = [
      ...merged,
      ...pricefilter.filter((d) => !ide.has(d.rest_idx)),
    ];

    var idi = new Set(merged1.map((d) => d.rest_idx));
    var merged2 = [
      ...merged1,
      ...dietryfilter.filter((d) => !idi.has(d.rest_idx)),
    ];

    // console.log("sc array == >",merged)
    setsearchArr(merged2);
    setarrLength(merged2.length);
    setisLoading(false);
  }

  async function common(cuisine, chain, range, detry, sources = []) {
    try {
      setisLoading(true);
      // console.log(cuisine,chain,range,detry);

      const cat = cuisine ? "cat_" + cuisine : null;
      const chainf = chain ? "chain_" + chain : null;
      const filter = detry ? "filter_" + detry : null;
      const price = range ? range : null;
      // const srces = sources.length != 0 ? sources : []
      // console.log(srces);
      console.log(cat, chainf, filter, price, sources);
      // || srces.filter((item1)=>item[item1]==="1")
      const c = oriArr.filter((item) => {
        if (
          item[cat] === "1" ||
          item[chainf] === "1" ||
          item[filter] === "1" ||
          item["rest_priceBucket"] === price ||
          sources.filter((item1) => item[item1] === "1").length
        ) {
          return item;
        }
      });
      // console.log();
      if(cat == null && chainf === null && filter === null && price === null && sources.length === 0 ){
          setsearchArr(oriArr);
          setarrLength(oriArr.length);
          // console.log('all params are null');
      }else{
        setsearchArr(c);
        setarrLength(c.length );

      }
      // else{
        // if(c.length === 0 ){
        //   Toast.show('Not found')
        // }else{
          // setsearchArr(c.length ? c : oriArr);
          // setarrLength(c.length ? c.length : oriArr.length);
        // }
      // }
      
      setisLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  async function cusinefilter(cuisine) {
    var csuinefilter = [];
    setisLoading(true);
    if (cuisine != "") {
      // for(var i=0; i<oriArr.length; i++) {
      //     for(const key in oriArr[i]) {
      //         console.log(oriArr[i][key]);
      //         if(oriArr[i][key].indexOf(cuisine)!=-1) {
      //             csuinefilter.push(oriArr[i]);
      //         }
      //     }
      // }
      let categ = "cat_" + cuisine;
      oriArr.map((item) => {
        for (const key in item) {
          if (key === categ && key === 1) {
            console.log(key, categ);
            csuinefilter.push(item);
          }
        }
      });
    }
    setsearchArr(csuinefilter);
    setarrLength(csuinefilter.length);
    console.log(csuinefilter.length);
    setisLoading(false);
  }

  return (
    <SafeAreaView style={{}}>
      {Platform.OS === "ios" && <StatusBar StatusBarStyle={'dark'} /> }

      <Modal
        animationType="slide"
        transparent={true}
        visible={countary}
        // style={{ backgroundColor:'rgba(64, 77, 97, 1)' }}
        onRequestClose={() => {
          setcountary(false);
        }}
      >
        <TouchableOpacity
          onPress={() => setcountary(false)}
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
                  bottom: 50,
                  // maxHeight:'80%',
                  height: "auto",
                  alignSelf: "center",
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
                  onPress={() => setcountary(false)}
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 5,
                    marginRight: 5,
                  }}
                >
                  <Entypo name="cross" size={24} color="grey" />
                </TouchableOpacity>
                <Text
                  style={{ fontSize: 26, fontWeight: "700", marginLeft: 10 }}
                >
                  Select your country
                </Text>
                <FlatList
                  style={{ marginTop: 10, height: "auto" }}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={"2"}
                  data={contries}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrent(item.img), setcountary(false);
                      }}
                      style={{
                        flexDirection: "row",
                        width: "40%",
                        alignItems: "center",
                        marginHorizontal: responsiveWidth(5),
                      }}
                    >
                      <Image
                        source={item.img}
                        style={{ width: 25, height: 25, borderRadius: 50 }}
                      />
                      <Text style={{ margin: 10, fontSize: 14 }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
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
            flex: 1,
            flexDirection: "row",
            margin: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => props.navigation.replace("Landing")}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={require("../assets/fastyget_logo.png")}
                style={{ height: 70, width: 180 }}
              />
              {/* <Text style={{alignSelf:'center',fontSize:28,fontWeight:'bold'}}>foodery</Text> */}
            </TouchableOpacity>

            {/* <Text style={{alignSelf:'center',fontSize:28,fontWeight:'bold'}}>foodery</Text> */}
          </View>
          {/* <View style={{marginLeft:responsiveScreenWidth(20)}}/> */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => setcountary(true)}
            >
              <Image source={current} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
            {!validateLogin ? (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Login")}
                style={{
                  marginLeft: 6,
                  height: 40,
                  borderRadius: 8,
                  width: 70,
                  backgroundColor: "brown",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  LOGIN
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20 }}>
                  {username.charAt(0).toUpperCase() + username.slice(1)}
                </Text>
                <OptionsMenu
                  button={require("../assets/down.png")}
                  buttonStyle={{
                    width: 30,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 18,
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
                      // setlogged(0);
                      await AsyncStorage.clear();
                    },
                    // () => console.log("cancel"),
                  ]}
                />
              </>
            )}
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
          {
            !showlength ? (
              <>
                {arrLength != "" ? (
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                  >
                    {arrLength} results found for `{searchKey}`
                  </Text>
                ) : (
                  <>
                    {arrLength === "" ? (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          marginTop: 15,
                          marginLeft: 10,
                        }}
                      >
                        0 results found for `{searchKey}`
                      </Text>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )
            // <Text style={{fontSize:20,fontWeight:'bold',marginTop:15,marginLeft:10}} ></Text>
          }
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
                  No data found
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
                      marginTop: 0,
                      marginBottom: 15,
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
                      source={{ uri: item.tmp_list_photos }}
                      // source={item.img}
                      style={{
                        width: "100%",
                        height: 160,
                        alignSelf: "center",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    ></Image>

                    <TouchableOpacity
                      onPress={() => {
                        rest_params(item.rest_idx);
                      }}
                      style={{
                        position: "absolute",
                        bottom: item.drc || item.source ? "80%" : "50%",
                        right: 10,
                        backgroundColor: "#FFE69C",
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                          margin: 10,
                        }}
                      >
                        VIEW RESTAURANT PAGE
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
                          {item.tmp_list_names}
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
                        {item.rest_rating === 0 || item.rest_rating === null ? (
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
                            {item.rest_rating}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        width: "auto",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        alignSelf: "flex-start",
                        marginLeft: 4,
                      }}
                    >
                      {/* <View style={{width:'80%'}}> */}
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          width: item.rest_address.length > 40 ? "80%" : null,
                        }}
                      >
                        {item.rest_priceBucket} • {item.rest_address}
                      </Text>
                      {/* </View> */}
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(
                            `https://www.google.com/maps?q=${item.rest_address}`
                          );
                        }}
                      >
                        {/* <Text style={{fontSize:14,fontWeight:'bold'}} >{item.delivery_fee} • </Text> */}
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#FFBC00",
                          }}
                        >
                          {" "}
                          View Map
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        // setTimeout(() => {
                        //     console.log(item.sou)
                        // }, 5000);
                        setsingItem(item);
                        // item.drc?

                        // setdeal(item.drc)
                        // :
                        // setdeal([{
                        //     src:item.source,
                        //     promotion:item.promotion,
                        //     delivery_fee:item.delivery_fee,
                        //     delivery_fee_numeric:item.delivery_fee_numeric,
                        //     delivery_time:item.delivery_time,
                        //     rating_numeric:item.rating_numeric,
                        //     nb_reviews:item.nb_reviews,
                        //     link:item.link,
                        //     delivery_time:item.delivery_time,
                        //     temp:true
                        // }])
                        setmenuRes(item.tmp_list_names);
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
                          Find all deals,incl.
                        </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        {/* {searchedsrc(item.source)} */}

                        <Image
                          source={
                            item.app_Uber_Eats === "1"
                              ? require("../assets/images/link/ubereat.png")
                              : item.app_Deliveroo === "1"
                              ? require("../assets/images/link/deliveroo.png")
                              : item.app_Just_Eat === "1"
                              ? require("../assets/images/link/just_eat.png")
                              : require("../assets/images/link/supper.png")
                          }
                          style={{ height: 45, width: 160 }}
                        />
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
            height: height,
            width: "100%",
            top: 2,
            right: 0,
            left: 0,
            bottom: 100,
            position: "absolute",
            backgroundColor: "rgba(64, 77, 97, 0.5)",
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            keyboardShouldPersistTaps="handled"
            listViewDisplayed="true"
            // contentContainerStyle={styles.scrollModal}
            // showsVerticalScrollIndicator={false}
            style={{ marginBottom: Platform.OS === "ios" ? "5%" : "5%" }}
          >
            <TouchableWithoutFeedback style={{ height: "auto" }}>
              <View
                style={{
                  marginTop: "30%",
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
                <View style={{}}>
                  {/* <TouchableOpacity onPress={()=> 
                                            filterclose()
                                            } style={{position:'absolute',alignSelf:'flex-end',right:responsiveWidth(7),top:responsiveHeight(5)}} >
                                            <Entypo name="cross" size={24} color="grey" />
                                        </TouchableOpacity> */}
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    Cuisine:
                  </Text>
                  <View>
                    <SearchableDropdown
                      multi={true}
                      // selectedItems={selectedCuisine}
                      onItemSelect={(item) => {
                        // const items = selectedValue;
                        // items.push(item)
                        // alert('called')
                        // console.log(item);
                        // alert(JSON.stringify(item))
                        setselectedCuisine(item.name);
                        setvar1(item.name);
                        // cusinefilter(item.name)
                        setTimeout(() => {
                          common(item.name, var2, var3, var4);
                        }, 500);
                      }}
                      containerStyle={{
                        padding: 5,
                        width: "90%",
                        marginTop: 20,
                        alignSelf: "center",
                        borderRadius: 5,
                        backgroundColor: "white",
                      }}
                      onRemoveItem={(item, index) => {
                        const items = selectedCuisine.filter(
                          (sitem) => sitem.name !== item.name
                        );
                        setselectedCuisine(items);
                      }}
                      itemStyle={{
                        padding: 10,
                        // marginTop: 2,
                        backgroundColor: "#ffff",
                        borderColor: "#bbb",
                        borderBottomWidth: 0.3,
                        // borderRadius: 5,
                      }}
                      itemTextStyle={{ color: "#222" }}
                      itemsContainerStyle={{
                        maxHeight: 180,
                        backgroundColor: "transparent",
                      }}
                      items={catdishes}
                      // defaultIndex={2}
                      resetValue={false}
                      onFocus={() => {
                        console.log();
                        setselectedCuisine(""), setvar1("");
                        // common("", var2, var3, var4);
                        console.log("valled");
                      }}
                      onBlur={ () => {
                        if(selectedCuisine == ""){
                          common("", var2, var3, var4);
                        }
                      } }
                      textInputProps={{
                        placeholder:
                          selectedCuisine == ""
                            ? "-- Select --"
                            : selectedCuisine,
                        placeholderTextColor:
                          selectedCuisine == "" ? "#FFCCC" : "black",
                        underlineColorAndroid: "transparent",
                        style: {
                          height: 35,
                          paddingLeft: 20,
                          width: "95%",
                          // paddingTop: 4,
                          // paddingBottom: 4,
                          // borderWidth: 1,
                          // borderColor: '#ccc',
                          // borderRadius: 5,
                        },

                        onTextChange: (text) => {
                          if (text.length === 0) {
                            // alert('as')
                            common("", var2, var3, var4);
                            setselectedCuisine("");
                          }
                          setselectedCuisine(text);
                        },
                      }}
                      listProps={{
                        nestedScrollEnabled: true,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 20,
                    }}
                  >
                    Chain:
                  </Text>
                  <SearchableDropdown
                    onItemSelect={(item) => {
                      // const items = selectedValue;
                      // items.push(item)
                      // alert(JSON.stringify(item))
                      setselectedChain(item.name);
                      setvar2(item.name);
                      common(var1, item.name, var3, var4);
                    }}
                    containerStyle={{
                      padding: 5,
                      width: "90%",
                      marginTop: 20,
                      alignSelf: "center",
                      borderRadius: 5,
                      backgroundColor: "white",
                    }}
                    onRemoveItem={(item, index) => {
                      const items = selectedChain.filter(
                        (sitem) => sitem.id !== item.id
                      );
                      setselectedChain(items);
                    }}
                    itemStyle={{
                      padding: 10,
                      // marginTop: 2,
                      backgroundColor: "#ffff",
                      borderColor: "#bbb",
                      borderBottomWidth: 0.3,
                      // borderRadius: 5,
                    }}
                    itemTextStyle={{ color: "#222" }}
                    onFocus={() => {
                      setselectedChain(""), setvar2("");
                      // common(var1, "", var3, var4);
                      console.log("valled");
                    }}
                    onBlur={ () => {
                      if(selectedChain == ''){
                        common(var1, "", var3, var4);
                      }
                    } }
                    itemsContainerStyle={{
                      maxHeight: 180,
                      // width:'88%',
                      // alignSelf:'flex-end',
                      // backgroundColor:'transparent'
                    }}
                    items={chaindishes}
                    // defaultIndex={2}
                    resetValue={false}
                    textInputProps={{
                      placeholder:
                        selectedChain == "" ? "-- Select --" : selectedChain,
                      placeholderTextColor:
                        selectedChain == "" ? "#FFCCC" : "black",
                      underlineColorAndroid: "transparent",
                      style: {
                        height: 35,
                        width: "95%",
                        paddingLeft: 20,
                        // paddingTop: 4,
                        // paddingBottom: 4,
                        // borderWidth: 1,
                        // borderColor: '#ccc',
                        // borderRadius: 5,
                      },
                      onTextChange: (text) => {
                        if (text.length === 0) {
                          // alert('as')
                          common(var1, "", var3, var4);
                          setselectedChain("");
                        }
                        setselectedChain(text);
                      },
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 20,
                    }}
                  >
                    Price Range:
                  </Text>
                  <View
                    style={{
                      marginLeft: 20,
                      marginTop: 15,
                      flexDirection: "row",
                    }}
                  >
                    <FlatList
                      style={{
                        marginTop: 20,
                        marginLeft: 20,
                        marginBottom: 20,
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      // numColumns={'3'}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={curreny}
                      renderItem={({ item, index }) => (
                        <>
                          {item.selected ? (
                            <TouchableOpacity
                              onPress={() =>
                                filter_priceCategory(item.txt, item.selected)
                              }
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
                              onPress={() =>
                                filter_priceCategory(item.txt, item.selected)
                              }
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
                </View>
                <Text
                  style={{
                    fontSize: 22,
                    marginTop: 20,
                    fontWeight: "bold",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  Dietary:
                </Text>
                <View style={{ alignItems: "center" }}>
                  <FlatList
                    style={{ marginTop: 20, marginBottom: 20 }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={"2"}
                    showsHorizontalScrollIndicator={false}
                    data={dietry}
                    renderItem={({ item, index }) => (
                      <>
                        {item.selected ? (
                          <TouchableOpacity
                            onPress={() =>
                              filter_dietary(item.txt, item.selected)
                            }
                            style={{
                              marginHorizontal: 5,
                              margin: 5,
                              borderRadius: 20,
                              backgroundColor: "#A9A9A9",
                            }}
                          >
                            {/* <Text style={{margin:7,fontWeight:'bold',fontSize:18}} >{item.txt.length > 18?item.txt.substring(0,17)+'...':item.txt}</Text> */}
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
                            onPress={() =>
                              filter_dietary(item.txt, item.selected)
                            }
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
                    marginTop: 30,
                    fontWeight: "bold",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  Filter By:
                </Text>
                <FlatList
                  style={{ marginTop: 20, marginBottom: 20 }}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={"2"}
                  showsHorizontalScrollIndicator={false}
                  data={conCode}
                  renderItem={
                    ({ item, index }) => (
                      // {conCode.map((item,index)=>{
                      // return(
                      <View
                        style={{
                          flexDirection: "row",
                          height: 50,
                          marginLeft: 20,
                          alignItems:'center'
                        }}
                      >
                        <CheckBox
                          style={{ alignItems: "center" }}
                          isChecked={isChecked[item.name]}
                          onClick={async () => {
                            {
                              setisChecked({
                                ...isChecked,
                                [item.name]: !isChecked[item.name],
                              });
                            }
                            // console.log(isChecked);

                            // var src_arr = Object.keys(isChecked)
                            // src_arr.push(item.name)lo
                            await setvar5(Object.keys(isChecked));
                            // setTimeout(async() => {
                            //     console.log(Object.keys(isChecked));
                            //     isChecked[item.name] === true ? null : common(var1,var2,var3,var4,Object.keys(isChecked))
                            //     // await
                            // }, 3000);
                          }}
                          leftText={"CheckBox"}
                          checkBoxColor={"#FFBC00"}
                          uncheckedCheckBoxColor={"grey"}
                        />
                        <Image
                          source={item.img}
                          style={{
                            height: responsiveHeight(4.5),
                            width: responsiveWidth(28),
                            marginLeft: 5,
                            alignSelf: "center",
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    )
                    // )

                    // })}
                  }
                />
                {/* </ScrollView> */}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      ) : null}

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
                  height:'auto' ,
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
                    numColumns={"2"}
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
                {singItem != undefined ? (
                  <>
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
                    {singItem.app_Uber_Eats === "1" ? (
                      <>
                        <Image
                          source={require("../assets/images/link/ubereat.png")}
                          style={{ width: "60%", alignSelf: "center" }}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              singItem.url_Uber_Eats
                            )
                            // props.navigation.navigate("Link", {
                            //   link: singItem.url_Uber_Eats,
                            // })
                          }
                          style={{
                            alignSelf: "center",
                            alignItems: "center",
                            padding: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            borderRadius: 10,
                            backgroundColor: "#FFE69C",
                          }}
                        >
                          <Text>ORDER</Text>
                          <Text>Uber Eats</Text>
                        </TouchableOpacity>
                      </>
                    ) : null}

                    {singItem.app_Deliveroo === "1" ? (
                      <>
                        <Image
                          source={require("../assets/images/link/deliveroo.png")}
                          style={{ width: "60%", alignSelf: "center" }}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              singItem.url_Deliveroo
                            )
                            // props.navigation.navigate("Link", {
                            //   link: singItem.url_Deliveroo,
                            // })
                          }
                          style={{
                            alignSelf: "center",
                            alignItems: "center",
                            padding: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            borderRadius: 10,
                            backgroundColor: "#FFE69C",
                          }}
                        >
                          <Text>ORDER</Text>
                          <Text>Deliveroo</Text>
                        </TouchableOpacity>
                      </>
                    ) : null}

                    {singItem.app_Just_Eat === "1" ? (
                      <>
                        <Image
                          source={require("../assets/images/link/just_eat.png")}
                          style={{ width: "60%", alignSelf: "center" }}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              singItem.url_Just_Eat
                            )
                            // props.navigation.navigate("Link", {
                            //   link: singItem.url_Just_Eat,
                            // })
                          }
                          style={{
                            alignSelf: "center",
                            alignItems: "center",
                            padding: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            borderRadius: 10,
                            backgroundColor: "#FFE69C",
                          }}
                        >
                          <Text>ORDER</Text>
                          <Text>Just Eat</Text>
                        </TouchableOpacity>
                      </>
                    ) : null}

                    {singItem.app_Supper === "1" ? (
                      <>
                        <Image
                          source={require("../assets/images/link/ubereat.png")}
                          style={{ width: "60%", alignSelf: "center" }}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              singItem.url_Supper
                            )
                            // props.navigation.navigate("Link", {
                            //   link: singItem.url_Supper,
                            // })
                          }
                          style={{
                            alignSelf: "center",
                            alignItems: "center",
                            padding: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            borderRadius: 10,
                            backgroundColor: "#FFE69C",
                          }}
                        >
                          <Text>ORDER</Text>
                          <Text>Supper</Text>
                        </TouchableOpacity>
                      </>
                    ) : null}
                  </>
                ) : null}
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
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      style={{
                        marginTop: 10,
                        marginRight: 5,
                        alignSelf: "center",
                        marginBottom: responsiveHeight(5),
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={"3"}
                      data={menuCategory}
                      renderItem={
                        ({ item, index }) => (
                          // <View style={{}} >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              marginHorizontal: 15,
                            }}
                          >
                            {item.cat}
                          </Text>
                        )
                        // </View>
                      }
                    />
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
                                  fontWeight: "bold",
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
                                            // borderBottomWidth:0.5
                                          }}
                                        >
                                          <>
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
                                            {item.dish_image === null ||
                                            item.dish_image === undefined ||
                                            item.dish_image === "" ? null : (
                                              <>
                                                {item.dish_image.url ? (
                                                  <Image
                                                    source={{
                                                      uri: item.dish_image.url,
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
            height: "100%",
            width: "100%",
            top: 100,
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
                  marginTop: "10%",
                  // position: 'absolute',
                  height: 350,
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
                            width: "100%",
                            height: 45,
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
                        styles={{
                          container: {
                            flex: 1,
                            // position:'absolute',
                            marginTop: 15,
                            // top:responsiveHeight(25),
                            // width:'100%',
                          },
                          textInput: {
                            width: "100%",
                            height: 45,
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

                    <SearchableDropdown
                      onItemSelect={(item) => {
                        // const items = selectedValue;
                        // items.push(item)
                        // alert(JSON.stringify(item))
                        setSelectedValue(item.category_name);
                      }}
                      containerStyle={{
                        padding: 5,
                        width: "100%",
                        borderRadius: 5,
                        marginTop: 60,
                        backgroundColor: "white",
                      }}
                      onRemoveItem={(item, index) => {
                        const items = selectedValue.filter(
                          (sitem) => sitem.id !== item.id
                        );
                        setSelectedValue(items);
                      }}
                      itemStyle={{
                        padding: 10,
                        // marginTop: 2,
                        backgroundColor: "#ffff",
                        borderColor: "#bbb",
                        borderBottomWidth: 0.3,
                        // borderRadius: 5,
                      }}
                      itemTextStyle={{ color: "#222" }}
                      itemsContainerStyle={{
                        width: "88%",
                        maxHeight: 180,
                        alignSelf: "flex-end",
                        backgroundColor: "transparent",
                      }}
                      items={catdishes}
                      // defaultIndex={2}
                      resetValue={false}
                      textInputProps={{
                        placeholder:
                          selectedValue == ""
                            ? "Dishes, Restaurants or Cuisines"
                            : selectedValue,
                        placeholderTextColor:
                          selectedValue == "" ? "#FFCCC" : "black",
                        underlineColorAndroid: "transparent",
                        style: {
                          height: 35,
                          paddingLeft: 15,
                          // paddingTop: 4,
                          // paddingBottom: 4,
                          // borderWidth: 1,
                          // borderColor: '#ccc',
                          // borderRadius: 5,
                        },
                        // onTextChange: text => selectedValue(text)
                      }}
                      listProps={{
                        nestedScrollEnabled: true,
                      }}
                    />
                    <Text
                      style={{ color: "white", marginTop: 5, fontSize: 16 }}
                    >
                      Optional
                    </Text>
                    {errmsg === "" ? null : (
                      <Text
                        style={{
                          color: "tomato",
                          marginTop: 15,
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
                          marginTop: 20,
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
                        onPress={() => getPostal()}
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
