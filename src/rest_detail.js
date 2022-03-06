import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
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
import { StatusBar } from 'expo-status-bar';
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
import { useIsFocused } from "@react-navigation/native";
import { BasePath } from "../config/config";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchableDropdown from "react-native-searchable-dropdown";
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import OptionsMenu from "react-native-options-menu";
import Toast from "react-native-tiny-toast";

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

const images = [
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

const footer = [
  {
    contact: [
      {
        txt: "Contact us",
      },
      {
        txt: "Log in",
      },
      {
        txt: "Sign up",
      },
      {
        txt: "My Account",
      },
    ],
    top_Cuisines: [
      {
        txt: "Burgers",
      },
      {
        txt: "Mexican",
      },
      {
        txt: "Chinese",
      },
      {
        txt: "Japanese",
      },
      {
        txt: "Brunch",
      },
      {
        txt: "Pizza",
      },
      {
        txt: "Italian",
      },
      {
        txt: "Indian",
      },
      {
        txt: "Thai",
      },
      {
        txt: "Lebanese",
      },
      {
        txt: "View All cuisines",
      },
    ],
    popular_locations: [
      {
        txt: "New York",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "10007",
          input_category: "",
          input_lat: "40.7127753",
          input_long: "-74.0059728",
          input_city: "New York",
          input_province: "NY",
          input_address: "254 Chambers Street",
        },
      },
      {
        txt: "Los Angeles",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "90012",
          input_category: "",
          input_lat: "34.0522342",
          input_long: "-118.2436849",
          input_city: "Los Angeles",
          input_province: "CA",
          input_address: "106 West 1st Street",
        },
      },
      {
        txt: "Miami",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "33131",
          input_category: "",
          input_lat: "25.7616798",
          input_long: "-80.1917902",
          input_city: "Miami",
          input_province: "FL",
          input_address: "1170 Florida 972",
        },
      },
      {
        txt: "London",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "SW1A 2DR",
          input_category: "",
          input_lat: "51.5074256",
          input_long: "1271814",
          input_city: "London",
          input_province: "England",
          input_address: "403 Charing Cross Road",
        },
      },
      {
        txt: "Paris",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "FR",
          input_postcode: "75004",
          input_category: "",
          input_lat: "48.856614",
          input_long: "2.3522219",
          input_city: "Paris",
          input_province: "IDF",
          input_address: "4 Place del Hôtel de Ville",
        },
      },
      {
        txt: "Berlin",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "DE",
          input_postcode: "10178",
          input_category: "",
          input_lat: "52.52000659999999",
          input_long: "13.404954",
          input_city: "Berlin",
          input_province: "BE",
          input_address: "7 B5",
        },
      },
      {
        txt: "Madrid",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "ES",
          input_postcode: "28013",
          input_category: "",
          input_lat: "40.4167754",
          input_long: "-3.7037902",
          input_city: "Madrid",
          input_province: "MD",
          input_address: "41 Puerta del Sol",
        },
      },

      {
        txt: "Rome",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "IT",
          input_postcode: "00185",
          input_category: "",
          input_lat: "41.9027835",
          input_long: "12.4963655",
          input_city: "Rome",
          input_province: "Lazio",
          input_address: "12 Piazza della Repubblica",
        },
      },
      {
        txt: "Tokyo",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "JP",
          input_postcode: "105-0011",
          input_category: "",
          input_lat: "35.6585805",
          input_long: "139.7454329",
          input_city: "Minato City",
          input_province: "Tokyo",
          input_address: "",
        },
      },
      {
        txt: "New Delhi",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "IN",
          input_postcode: "110011",
          input_category: "",
          input_lat: "28.6139391",
          input_long: "77.2090212",
          input_city: "New Delhi",
          input_province: "DL",
          input_address: "",
        },
      },
      {
        txt: "View all locations",
      },
    ],
    top_brands: [
      {
        txt: "KFC",
      },
      {
        txt: "Burger King",
      },
      {
        txt: "Pizza Hut",
      },
      {
        txt: "Subway",
      },
      {
        txt: "YO! Sushi",
      },
      {
        txt: "View all locations",
      },
    ],
    get_know: [
      {
        txt: "Privacy Policy",
        link: "https://fastyget.com/privacy_policy",
      },
      {
        txt: "Terms and Conditions",
        link: "https://fastyget.com/terms_and_conditions",
      },
      {
        txt: "About Fastyget",
        link: "https://fastyget.com/about_fastyget",
      },
      {
        txt: "Fastyget Group Website",
        link: "https://fastyget.com/fastyget-group",
      },
      {
        txt: "Fastyget Blog",
        link: "https://fastyget.com/blog/",
      },
      {
        txt: "Careers",
        link: "https://fastyget.com/careers",
      },
      {
        txt: "Cookie Policy",
        link: "https://fastyget.com/cookie_policy",
      },
      {
        txt: "Modern Slavery Statement",
        link: "https://fastyget.com/modern_slavery_statement",
      },
      {
        txt: "Sutainability",
        link: "https://fastyget.com/sustainability",
      },
    ],
  },
];

export default function rest_detail(props) {
  const [srcimages, setsrcimages] = useState(images);
  const [menuLoading, setmenuLoading] = useState(false);
  const [showlength, setshowlength] = useState(true);
  const [menuRes, setmenuRes] = useState("");
  const [menuResCat, setmenuResCat] = useState("");
  const [menuAddres, setmenuAddres] = useState("");
  const [menuImage, setmenuImage] = useState();
  const [rating, setrating] = useState("");
  const [ratingnb, setratingnb] = useState("");
  const [previous, setprevious] = useState(0);
  const [menuCategory, setmenuCategory] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [srcList, setsrcList] = useState([]);
  const [validateLogin, setvalidateLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [district, setdistrict] = useState("");
  const [address, setaddress] = useState("");
  const [disclaimer, setdisclaimer] = useState("");
  const [singItem, setsingItem] = useState({});
  const [countary, setcountary] = useState(false);
  const [current, setCurrent] = useState(contries[2].img);
  const [logged, setlogged] = useState("");
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);

  const onViewRef = useRef((viewableItems) => {});

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(async () => {
    // await AsyncStorage.clear()

    restaurant_detail();
    if (isFocused) {
      setvalidateLogin(false);
      let logged = await AsyncStorage.getItem("isLoggedIn");
      let name = await AsyncStorage.getItem("username");
      if (logged != null) {
        if (logged == 1) setlogged(logged);
        setvalidateLogin(logged == 1 ? true : false);
        setUsername(name.replace(/[0-9]/g, "").substring(0, 5));
      }
    }
  }, [isFocused]);

  async function restaurant_detail() {
    setmenuLoading(true);
    try {
      let params = props.route.params.params;
      console.log(params);
      const res = await axios.post(
        `https://circular-hawk-253618.appspot.com/getSpecificRestaurant`,
        JSON.stringify(params),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = res?.data;
      let resobj = [];
      data.map((dat, index) => {
        dat.map((item) => {
          resobj.push(item);
        });
      });
      // console.log(resobj[0].rest_district);
      setdistrict(resobj[0].rest_district);
      setaddress(resobj[0].rest_full_address);
      setdisclaimer(resobj[0].rest_disclaimer);
      // console.log(data);
      const ns = data[2].filter(
        (tag, index, dub) => dub.findIndex((t) => t.rest_source === tag.rest_source) == index
      );
      setsrcList(ns);
      setmenuRes(resobj[0].rest_name);
      var str = resobj[0].rest_categories;
      if (str != null || str != undefined) {
        var desir = str.replace(/\,/g, " • ");
        setmenuResCat(desir);
      } else {
        setmenuResCat(resobj[0].rest_categories);
      }
      setmenuAddres(resobj[0].rest_full_address);
      setmenuImage(resobj[0].rest_image);
      setratingnb(resobj[0].rest_rating);
      setrating(resobj[0].rest_ratingNb);
      //     // console.log(params);
      let uniqueCat = [];
      data[1].map((item) => {
        // console.log(item.cat_title);
        uniqueCat.push({ cat: item.cat_title });
      });
      const n = uniqueCat.filter(
        (tag, index, dub) => dub.findIndex((t) => t.cat === tag.cat) == index
      );
      // if(n[cat] === 'Popular Dishes'){
      //     console.log('true');
      // }
      const index = n.findIndex((object) => {
        return object.cat === "Popular Dishes";
      });
      console.log("req index of popular", index);
      let cat_data = [];
      if (index != -1) {
        const fnal = arraymove(n, index, 0);
        console.log(fnal);
        setmenuCategory(fnal);
        data[1].map((item) => {
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
        // const fnal = arraymove(n,index,0)
        // console.log(fnal);
        setmenuCategory(n);
        data[1].map((item) => {
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
      // const fnal = arraymove(n,index,0)
      // console.log(fnal);
      // setmenuCategory(fnal)
      // let cat_data = []
      // data[1].map((item)=>{
      //     fnal.map((data)=>{
      //         if(item.cat_title === data.cat){
      //             // console.log(item.cat_title ,' === ', data.cat);
      //             cat_data.push({cat_title:item.cat_title,dish_name:item.dish_name,dish_price:item.dish_price,dish_image:item.dish_image,dish_description:item.dish_description})
      //         }
      //     })
      // })
      // console.log(cat_data);
      setTimeout(() => {
        const faq = data[1];
        setsingItem(faq[0]);

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

  function searchedsrc(source) {
    // return  console.log(source)
    // console.log(conCode)
    var link = [];
    srcimages.map((item, index) => {
      if (item.source_name === source) {
        // console.log(item.name)
        link.push(item.image);
      }
    });
    let images = [];
    link.map((item) => {
      // console.log(item)
      images.push(
        <Image
          source={item}
          style={{ height: 30, width: 100, alignSelf: "center" }}
        />
      );
    });
    return images;
  }

  return (
    <SafeAreaView>
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
                      setlogged(0);
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
      <ScrollView
        directionalLockEnabled={true}
        contentContainerStyle={styles.scrollModal}
      >
        <View
        // style={{
        // // marginTop: '20%',
        // bottom: 0,
        // // maxHeight:'85%',
        // height:'auto',
        // alignSelf:'center',
        // // position: 'absolute',
        // // width: '90%',
        // backgroundColor: '#F5F5F5',
        // borderRadius: 5,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 8,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 10,
        // }}
        >
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
            <>
              <ImageBackground
                source={{ uri: menuImage }}
                style={{ width: "100%", height: 200 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: 10,
                    marginTop: 15,
                    borderRadius: 20,
                    alignSelf: "center",
                    alignItems: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "700", color: "white" }}
                  >
                    {"Home >"}{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("RestList", {
                        district: district,
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {district}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{ fontSize: 16, fontWeight: "700", color: "white" }}
                  >
                    {" > " + menuRes}{" "}
                  </Text>
                </View>
              </ImageBackground>
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
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="star" size={24} color="#FFBC00" />
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    name="star"
                    size={20}
                    color="#FFBC00"
                  />
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    name="star"
                    size={20}
                    color="#FFBC00"
                  />
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    name="star"
                    size={20}
                    color="#FFBC00"
                  />
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    name="star-half-empty"
                    size={20}
                    color="#FFBC00"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#8C8C8C",
                      alignSelf: "center",
                    }}
                  >
                    {" "}
                    {ratingnb} ({rating} ratings)
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: responsiveHeight(3.5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#808080",
                      alignItems: "center",
                      width: menuAddres.length > 50 ? "80%" : null,
                    }}
                  >
                    {menuAddres}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        `https://www.google.com/maps?q=${address}`
                      );
                    }}
                    style={{ alignSelf: "center" }}
                  >
                    <Text style={{ color: "#FFBC00", fontSize: 14 }}>
                      {" "}
                      View Map
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Text>{disclaimer}</Text> */}
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 10,
                  marginLeft: 15,
                  marginRight: 5,
                  alignSelf: "center",
                  marginBottom: responsiveHeight(3),
                }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'3'}
                horizontal={true}
                data={srcList}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: 130,
                      borderLeftWidth: 3,
                      borderColor: "#a9a9a9",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  >
                    {searchedsrc(item.source)}
                    <View
                      style={{ marginTop: 10, alignItems: "center", flex: 1 }}
                    >
                      <Text>Promotion</Text>
                      {item.rest_promotion != null ||
                      item.rest_promotion != "" ? (
                        <Text
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          {item.rest_promotion}
                        </Text>
                      ) : (
                        <Text
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          N/A
                        </Text>
                      )}
                      <Text style={{ marginTop: 20 }}>Delivery Fee</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.delivery_fee}
                      </Text>
                      <Text style={{ marginTop: 20 }}>Delivery Time</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.delivery_time}
                      </Text>
                      <Text style={{ marginTop: 20 }}>Rating</Text>
                      {item.rest_rating != null ? (
                        <>
                          <Text style={{ fontWeight: "bold" }}>
                            {item.rest_rating} / 5{" "}
                          </Text>
                          <Text style={{ fontWeight: "bold" }}>
                            ({item.rest_ratingNb} review)
                          </Text>
                        </>
                      ) : (
                        <Text style={{ fontWeight: "bold" }}>N/A</Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(
                          item.rest_slug
                        );
                        // props.navigation.navigate("Link", {
                        //   link: item.rest_slug,
                        // });
                      }}
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
                      <Text>Order</Text>
                      <Text>{item.source}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 10,
                  marginRight: 5,
                  alignSelf: "center",
                  marginBottom: responsiveHeight(0),
                  width: "90%",
                }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'3'}
                // showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={menuCategory}
                renderItem={({ item, index }) => (
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginHorizontal: 15,
                      }}
                    >
                      {item.cat}
                    </Text>
                  </View>
                )}
              />
              {/* <View style={{alignSelf:'center',borderWidth:2,width:'90%',borderColor:'#a9a9a9'}} /> */}
              {menuCategory.length < 1 ? (
                // null0
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Menu result not found
                </Text>
              ) : (
                <>
                  <FlatList
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    style={{
                      alignSelf: "center",
                      marginBottom: responsiveHeight(10),
                    }}
                    // keyExtractor={(item, index) => index.toString()}
                    // numColumns={'3'}
                    // horizontal={true}
                    data={menuCategory}
                    renderItem={
                      ({ item, index }) => (
                        // {
                        //  menuCategory.map((txt)=>{
                        // return(
                        <>
                          <Text
                            style={{
                              fontSize: 26,
                              marginTop: 15,
                              marginHorizontal: 15,
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {item.cat}
                          </Text>
                          <View>
                            {categoryList.map((itm, indx) => {
                              return (
                                <>
                                  {item.cat === itm.cat_title ? (
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
                                              itm.dish_image === null ||
                                              itm.dish_image === undefined ||
                                              itm.dish_image === ""
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
                                            {itm.dish_name}
                                          </Text>
                                          {itm.dish_description === "" ||
                                          itm.dish_description ===
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
                                              {itm.dish_description}
                                            </Text>
                                          )}
                                          {/* <Text style={{fontSize:14,marginLeft:8,marginTop:12,marginBottom:10,color:'#808080',marginTop:5}} >{item.dish_image === null || item.dish_image === "" ?
                                                                null:item.dish_image.split('//')[1].split('?')[0]}</Text> */}
                                          <>
                                            {itm.cat_title ===
                                            "Popular Dishes" ? (
                                              <View
                                                style={{
                                                  flexDirection: "row",
                                                  alignItems: "center",
                                                  marginBottom: 5,
                                                }}
                                              >
                                                <Text
                                                  style={{
                                                    fontSize: 14,
                                                    marginLeft: 8,
                                                    marginTop: 12,
                                                    color: "#808080",
                                                  }}
                                                >
                                                  {itm.dish_price}
                                                </Text>
                                                <Text
                                                  style={{
                                                    marginLeft: 15,
                                                    padding: 4,
                                                    backgroundColor: "#FFBC00",
                                                    color: "white",
                                                    borderRadius: 25,
                                                  }}
                                                >
                                                  Popular
                                                </Text>
                                              </View>
                                            ) : (
                                              <Text
                                                style={{
                                                  fontSize: 14,
                                                  marginLeft: 8,
                                                  marginTop: 12,
                                                  color: "#808080",
                                                }}
                                              >
                                                {itm.dish_price}
                                              </Text>
                                            )}
                                          </>
                                        </View>
                                        <View
                                          style={{
                                            width:
                                              itm.dish_image === null ||
                                              itm.dish_image === undefined ||
                                              itm.dish_image === ""
                                                ? null
                                                : "35%",
                                          }}
                                        >
                                          {itm.dish_image === null ||
                                          itm.dish_image === undefined ||
                                          itm.dish_image === "" ? null : (
                                            <>
                                              {itm.dish_image.url ? (
                                                <Image
                                                  source={{
                                                    uri: itm.dish_image.url,
                                                  }}
                                                  // resizeMode={'center'}
                                                  resizeMethod={"auto"}
                                                  style={{
                                                    width: 140,
                                                    height: "100%",
                                                  }}
                                                />
                                              ) : (
                                                <Image
                                                  // source={{uri :'https://rs-menus-api.roocdn.com/images/347a5473-159c-4532-b0cf-0354dea20d71/image.jpeg' }}
                                                  source={{
                                                    uri:
                                                      "https://" +
                                                      itm.dish_image
                                                        .split("//")[1]
                                                        .split("?")[0],
                                                  }}
                                                  style={{
                                                    width: 140,
                                                    height: 120,
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
                      )
                      // )
                      // })
                    }
                  />
                </>
              )}
              {menuCategory.length < 1 ? null : (
                <>
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      marginLeft: 15,
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  >
                    FAQs
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 15,
                      width: "90%",
                      fontWeight: "bold",
                      marginLeft: 15,
                    }}
                  >
                    Q) Does {singItem.rest_name} deliver?{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      width: "90%",
                      marginLeft: 15,
                    }}
                  >
                    A) {singItem.FAQ1}{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 15,
                      width: "90%",
                      fontWeight: "bold",
                      marginLeft: 15,
                    }}
                  >
                    Q) Does {singItem.rest_name} offer contact-free delivery?{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      width: "90%",
                      marginLeft: 15,
                    }}
                  >
                    A) {singItem.FAQ2}{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 15,
                      width: "90%",
                      fontWeight: "bold",
                      marginLeft: 15,
                    }}
                  >
                    Q) What type of food is {singItem.rest_name} ?{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      width: "90%",
                      marginLeft: 15,
                    }}
                  >
                    A) {singItem.FAQ3}{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 15,
                      width: "90%",
                      fontWeight: "bold",
                      marginLeft: 15,
                    }}
                  >
                    Q) What's the address of {singItem.rest_name} ?{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      width: "90%",
                      marginLeft: 15,
                    }}
                  >
                    A) {singItem.FAQ1}{" "}
                  </Text>
                </>
              )}
            </>
          )}

          <View
            style={{ backgroundColor: "#DCDCDC", width: "100%", marginTop: 20 }}
          >
            <View style={{ margin: 20 }}>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                Customer Service
              </Text>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={footer[0].contact}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      item.txt === "Contact us"
                        ? props.navigation.navigate("Link", {
                            link: "https://fastyget.com/contact-us",
                          })
                        : item.txt === "Log in"
                        ? props.navigation.navigate("Login")
                        : props.navigation.navigate("Signup");
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {item.txt}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: responsiveHeight(5),
                }}
              >
                Top Cuisines
              </Text>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={footer[0].top_Cuisines}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      item.txt === "View all cuisines"
                        ? props.navigation.navigate("Cuisines")
                        : setpopular(true),
                        setcategory(item.txt);
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {item.txt}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: responsiveHeight(5),
                }}
              >
                Popular locations
              </Text>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={footer[0].popular_locations}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      item.txt === "View all locations"
                        ? props.navigation.navigate("Locations")
                        : props.navigation.navigate("Search", {
                            params: item.params,
                          });
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {item.txt}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: responsiveHeight(5),
                }}
              >
                Top Brands
              </Text>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={footer[0].top_brands}
                renderItem={({ item, index }) => (
                  <TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {item.txt}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: responsiveHeight(5),
                }}
              >
                Get to know us
              </Text>
              <FlatList
                style={{ marginTop: 10, marginBottom: responsiveHeight(10) }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={footer[0].get_know}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        item.link
                      );
                      // props.navigation.navigate("Link", { link: item.link });
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {item.txt}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
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
