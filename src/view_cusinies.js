import React, { useRef, useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Dimensions,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
const { height } = Dimensions.get("window");
import { Video } from "expo-av";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Autocomplete from "react-native-autocomplete-input";
import { useIsFocused } from "@react-navigation/native";
import { BasePath } from "../config/config";
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import SearchableDropdown from "react-native-searchable-dropdown";
import { touchProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OptionsMenu from "react-native-options-menu";
import Toast from "react-native-tiny-toast";
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
  {
    img: require("../assets/images/food_cats/cat_acai.jpg"),
    text: "Acai",
  },
  {
    img: require("../assets/images/food_cats/cat_african.jpg"),
    text: "African",
  },
  {
    img: require("../assets/images/food_cats/cat_alcohol.jpg"),
    text: "Alcohol",
  },
  {
    img: require("../assets/images/food_cats/cat_american.jpg"),
    text: "American",
  },
  {
    img: require("../assets/images/food_cats/cat_arab.jpg"),
    text: "Arab",
  },
  {
    img: require("../assets/images/food_cats/cat_argentinian.jpg"),
    text: "Argentinian",
  },
  {
    img: require("../assets/images/food_cats/cat_asian.jpg"),
    text: "Asian",
  },
  {
    img: require("../assets/images/food_cats/cat_bagels.jpg"),
    text: "Bagels",
  },
  {
    img: require("../assets/images/food_cats/cat_BBQ.jpg"),
    text: "BBQ",
  },
  {
    img: require("../assets/images/food_cats/cat_beers.jpg"),
    text: "Beers",
  },
  {
    img: require("../assets/images/food_cats/cat_brazilian.jpg"),
    text: "Brazilian",
  },
  {
    img: require("../assets/images/food_cats/cat_breakfast.jpg"),
    text: "Breakfast",
  },
  {
    img: require("../assets/images/food_cats/cat_burgers.jpg"),
    text: "Burgers",
  },
  {
    img: require("../assets/images/food_cats/cat_burritos.jpg"),
    text: "Burritos",
  },
  {
    img: require("../assets/images/food_cats/cat_cakes.jpg"),
    text: "Cakes",
  },
  {
    img: require("../assets/images/food_cats/cat_candy.jpg"),
    text: "Candy",
  },
  {
    img: require("../assets/images/food_cats/cat_cantonese.jpg"),
    text: "Cantonese",
  },
  {
    img: require("../assets/images/food_cats/cat_caribbean.jpg"),
    text: "Caribbean",
  },
  {
    img: require("../assets/images/food_cats/cat_caviar.jpg"),
    text: "Caviar",
  },
  {
    img: require("../assets/images/food_cats/cat_cheese.jpg"),
    text: "Cheese",
  },
  {
    img: require("../assets/images/food_cats/cat_chicken.jpg"),
    text: "Chicken",
  },

  {
    img: require("../assets/images/food_cats/cat_chinese.jpg"),
    text: "Chinese",
  },

  {
    img: require("../assets/images/food_cats/cat_coffee.jpg"),
    text: "Coffee",
  },

  {
    img: require("../assets/images/food_cats/cat_crepes.jpg"),
    text: "Crepes",
  },

  {
    img: require("../assets/images/food_cats/cat_cupcakes.jpg"),
    text: "Cupcakes",
  },

  {
    img: require("../assets/images/food_cats/cat_curry.jpg"),
    text: "Curry",
  },

  {
    img: require("../assets/images/food_cats/cat_desserts.jpg"),
    text: "Desserts",
  },

  {
    img: require("../assets/images/food_cats/cat_dimsums.jpg"),
    text: "Dimsums",
  },

  {
    img: require("../assets/images/food_cats/cat_donuts.jpg"),
    text: "Donuts",
  },
  {
    img: require("../assets/images/food_cats/cat_ethiopian.jpg"),
    text: "Ethiopian",
  },
  {
    img: require("../assets/images/food_cats/cat_fastfood.jpg"),
    text: "FastFood",
  },
  {
    img: require("../assets/images/food_cats/cat_french.jpg"),
    text: "French",
  },
  {
    img: require("../assets/images/food_cats/cat_fruits.jpg"),
    text: "Fruits",
  },
  {
    img: require("../assets/images/food_cats/cat_fusion.jpg"),
    text: "Fusion",
  },
  {
    img: require("../assets/images/food_cats/cat_german.jpg"),
    text: "German",
  },
  {
    img: require("../assets/images/food_cats/cat_ice-cream.jpg"),
    text: "Ice cream",
  },
  {
    img: require("../assets/images/food_cats/cat_indian.jpg"),
    text: "Indian",
  },
  {
    img: require("../assets/images/food_cats/cat_iranian.jpg"),
    text: "Iranian",
  },
  {
    img: require("../assets/images/food_cats/cat_iraqi.jpg"),
    text: "Iraqi",
  },
  {
    img: require("../assets/images/food_cats/cat_italian.jpg"),
    text: "Italian",
  },
  {
    img: require("../assets/images/food_cats/cat_jamaica.jpg"),
    text: "Jamica",
  },
  {
    img: require("../assets/images/food_cats/cat_japanese.jpg"),
    text: "Japanese",
  },
  {
    img: require("../assets/images/food_cats/cat_jewish.jpg"),
    text: "Jewish",
  },
  {
    img: require("../assets/images/food_cats/cat_juices.jpg"),
    text: "Juices",
  },
  {
    img: require("../assets/images/food_cats/cat_kebab.jpg"),
    text: "Kebab",
  },
  {
    img: require("../assets/images/food_cats/cat_kids.jpg"),
    text: "Kids",
  },
  {
    img: require("../assets/images/food_cats/cat_korean.jpg"),
    text: "Korean",
  },
  {
    img: require("../assets/images/food_cats/cat_latin.jpg"),
    text: "Latin",
  },
  {
    img: require("../assets/images/food_cats/cat_lebanese.jpg"),
    text: "Lebanese",
  },
  {
    img: require("../assets/images/food_cats/cat_mac-and-cheese.jpg"),
    text: "Mac & cheese",
  },
  {
    img: require("../assets/images/food_cats/cat_malaysian.jpg"),
    text: "Malaysian",
  },
  {
    img: require("../assets/images/food_cats/cat_mexican.jpg"),
    text: "Mexican",
  },
  {
    img: require("../assets/images/food_cats/cat_middle-eastern.jpg"),
    text: "Middle Eastern",
  },
  {
    img: require("../assets/images/food_cats/cat_milkshakes.jpg"),
    text: "Milkshakes",
  },
  {
    img: require("../assets/images/food_cats/cat_moroccan.jpg"),
    text: "Moroccan",
  },
  {
    img: require("../assets/images/food_cats/cat_north-african.jpg"),
    text: "North Africa",
  },
  {
    img: require("../assets/images/food_cats/cat_pakistani.jpg"),
    text: "Pakistani",
  },
  {
    img: require("../assets/images/food_cats/cat_pancakes.jpg"),
    text: "Pancakes",
  },
  {
    img: require("../assets/images/food_cats/cat_pasta.jpg"),
    text: "Pasta",
  },
  {
    img: require("../assets/images/food_cats/cat_pho.jpg"),
    text: "Pho",
  },
  {
    img: require("../assets/images/food_cats/cat_pizza.jpg"),
    text: "Pizza",
  },
  {
    img: require("../assets/images/food_cats/cat_poke.jpg"),
    text: "Poke",
  },

  {
    img: require("../assets/images/food_cats/cat_polish.jpg"),
    text: "Polish",
  },
  {
    img: require("../assets/images/food_cats/cat_portuguese.jpg"),
    text: "Portuguese",
  },
  {
    img: require("../assets/images/food_cats/cat_pub-food.jpg"),
    text: "Pub food",
  },
  {
    img: require("../assets/images/food_cats/cat_punjabi.jpg"),
    text: "Punjabi",
  },
  {
    img: require("../assets/images/food_cats/cat_rice-dishes.jpg"),
    text: "Rice Dishes",
  },
  {
    img: require("../assets/images/food_cats/cat_russian.jpg"),
    text: "Russian",
  },
  {
    img: require("../assets/images/food_cats/cat_salads.jpg"),
    text: "Salads",
  },
  {
    img: require("../assets/images/food_cats/cat_sandwich.jpg"),
    text: "Sandwich",
  },
  {
    img: require("../assets/images/food_cats/cat_scandinavian.jpg"),
    text: "Scandinavian",
  },
  {
    img: require("../assets/images/food_cats/cat_seafood.jpg"),
    text: "Seafood",
  },
  {
    img: require("../assets/images/food_cats/cat_shawarma.jpg"),
    text: "Shawarma",
  },
  {
    img: require("../assets/images/food_cats/cat_singaporean.jpg"),
    text: "Singaporean",
  },
  {
    img: require("../assets/images/food_cats/cat_smoothies.jpg"),
    text: "Smoothies",
  },
  {
    img: require("../assets/images/food_cats/cat_soups.jpg"),
    text: "Soups",
  },
  {
    img: require("../assets/images/food_cats/cat_south-asian.jpg"),
    text: "South Asian",
  },
  {
    img: require("../assets/images/food_cats/cat_south-east-asian.jpg"),
    text: "South East Asian",
  },
  {
    img: require("../assets/images/food_cats/cat_south-indian.jpg"),
    text: "South indian",
  },
  {
    img: require("../assets/images/food_cats/cat_sri-lankan.jpg"),
    text: "Sri Lankan",
  },
  {
    img: require("../assets/images/food_cats/cat_steak.jpg"),
    text: "Steak",
  },
  {
    img: require("../assets/images/food_cats/cat_stir-fry.jpg"),
    text: "Stir Fry",
  },
  {
    img: require("../assets/images/food_cats/cat_street-food.jpg"),
    text: "Street Food",
  },
  {
    img: require("../assets/images/food_cats/cat_sushi.jpg"),
    text: "Sushi",
  },
  {
    img: require("../assets/images/food_cats/cat_swedish.jpg"),
    text: "Swedish",
  },
  {
    img: require("../assets/images/food_cats/cat_tacos.jpg"),
    text: "Tacos",
  },
  {
    img: require("../assets/images/food_cats/cat_tapas.jpg"),
    text: "Tapas",
  },
  {
    img: require("../assets/images/food_cats/cat_tea.jpg"),
    text: "Tea",
  },
  {
    img: require("../assets/images/food_cats/cat_thai.jpg"),
    text: "Thai",
  },
  {
    img: require("../assets/images/food_cats/cat_turkish.jpg"),
    text: "Turkish",
  },
  {
    img: require("../assets/images/food_cats/cat_vietnamese.jpg"),
    text: "Vietnamse",
  },
  {
    img: require("../assets/images/food_cats/cat_waffles.jpg"),
    text: "Waffles",
  },
  {
    img: require("../assets/images/food_cats/cat_wine.jpg"),
    text: "Wine",
  },
  {
    img: require("../assets/images/food_cats/cat_wings.jpg"),
    text: "Wings",
  },
  {
    img: require("../assets/images/food_cats/cat_wraps.jpg"),
    text: "Wraps",
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
        txt: "View all cuisines",
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
        link: "https://fastyget.com/about-fastyget",
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

var items = [
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "Java",
  },
  {
    id: 3,
    name: "Ruby",
  },
  {
    id: 4,
    name: "React Native",
  },
  {
    id: 5,
    name: "PHP",
  },
  {
    id: 6,
    name: "Python",
  },
  {
    id: 7,
    name: "Go",
  },
  {
    id: 8,
    name: "Swift",
  },
];

export default function landing(props) {
  const isFocused = useIsFocused();
  const [location, setLocation] = useState("");
  const googleRef = useRef(null);
  const [countary, setcountary] = useState(false);
  const [current, setCurrent] = useState(contries[2].img);
  const [catdishes, setCatdishes] = useState([]);
  const [popular, setpopular] = useState(false);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [postal, setpostal] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLattitude] = useState("");
  const [lng, setLongitutde] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [category, setcategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errmsg, seterrmsg] = useState("");
  const [validateLogin, setvalidateLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [logged, setlogged] = useState("");

  let scrollRef = useRef();

  useEffect(async () => {
    // await AsyncStorage.clear()
    if (isFocused) {
      setvalidateLogin(false);
      let logged = await AsyncStorage.getItem("isLoggedIn");
      let name = await AsyncStorage.getItem("username");
      if (logged != null) {
        if (logged == 1) setlogged(logged);
        setvalidateLogin(logged == 1 ? true : false);
        setUsername(name.replace(/[0-9]/g, ""));
      }
    }

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
          setCatdishes(json.Data);
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
        alert(e);
      });
  }, [isFocused]);

  const getPostal = async () => {
    if (country === "") {
      seterrmsg("Select your desired country name ");
    }
    // else if(category === ""){
    //     seterrmsg("Enter your desired dish, restaurant or cuisines name ")
    // }
    else {
      setLoading(true);
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
          getList(postal);
        }, 1500);

        // alert('Payment Successfull')
      }
    }
  };
  const dirGetPostal = async (contr, latti, longi, prov, citi, adres) => {
    setLoading(true);
    const result = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latti},${longi}&key=AIzaSyCRkgexCkmB9mXWNGP9orbRkF_i189cea4`;
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
          input_country: contr,
          input_postcode: postal,
          input_category: category,
          input_lat: latti,
          input_long: longi,
          input_city: citi,
          input_province: prov,
          input_address: adres,
        };
        console.log(params);

        props.navigation.navigate("Search", { params: params });
        setLoading(false);
        setCountry("");
        setcategory("");
        setpopular(false);
        seterrmsg("");
      }, 1500);

      // alert('Payment Successfull')
    }
  };
  const getList = async (postal) => {
    // console.log(selectedValue);
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
    console.log(params);

    props.navigation.navigate("Search", { params: params });
    setLoading(false);
    setCountry("");
    googleRef.current.clear();
    // setcategory('')
    setSelectedValue("");
    setpopular(false);
    seterrmsg("");
  };

  // function initMap() {

  //     var input_mobile = document.getElementById('pac-input-mobile');
  //     var input_mobile_popup = document.getElementById('pac-input-mobile-popup');
  //     var red_url="";
  //     var category_search= '<?php echo $cat; ?>';
  //     var options = {
  //         fields: ["formatted_address", "geometry", "name"],
  //         strictBounds: false,
  //         types: ["establishment","geocode"],
  //     };

  return (
    // <View style={styles.MainContainer}>

    // </View>
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
            <Image
              source={require("../assets/fastyget_logo.png")}
              style={{ height: 70, width: 180 }}
            />
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
        ref={scrollRef}
        style={{ marginBottom: Platform.ios ? responsiveHeight(10) : null }}
        keyboardShouldPersistTaps="handled"
        // scrollEventThrottle={64}
        // keyboardDismissMode="on-drag"
        listViewDisplayed="true"
        // onScroll={() => { if(!hideResults){sethideResults(true)}}}
      >
        {/* <KeyboardAvoidingView behavior={"padding"}> */}

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 20,
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Browse Through All Cuisines{"\n"}Available on FastyGet
          </Text>
          <FlatList
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              alignSelf: "center",
            }}
            keyExtractor={(item, index) => index.toString()}
            numColumns={"2"}
            showsHorizontalScrollIndicator={false}
            data={dishes}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setpopular(true), setcategory(item.text);
                }}
                style={{ alignItems: "center" }}
              >
                <Image
                  source={item.img}
                  style={{ width: responsiveWidth(45), height: 110, margin: 5 }}
                />
              </TouchableOpacity>
            )}
          />
          {/* {dishes.map((item)=>{
            return(
              <View style={{flexDirection:'row'}} >
              <TouchableOpacity
                onPress={() => {
                  setpopular(true), setcategory(item.text);
                }}
                style={{ alignItems: "center" }}
              >
                <Image
                  source={item.img}
                  style={{ width: responsiveWidth(45), height: 110, margin: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setpopular(true), setcategory(item.text);
                }}
                style={{ alignItems: "center" }}
              >
                <Image
                  source={item.img}
                  style={{ width: responsiveWidth(45), height: 110, margin: 5 }}
                />
              </TouchableOpacity>
              </View>
            )
          })

          } */}
        </View>

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
                      ? null
                      : logged == 1 && item.txt === "My Account"
                      ? props.navigation.navigate("Setting")
                      : props.navigation.navigate("Login");
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
                      ? props.navigation.navigate("Link", {
                          link: "https://fastyget.com/cuisines",
                        })
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
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={'2'}
              data={footer[0].get_know}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Link", { link: item.link });
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
        <View style={{ padding: 20, marginBottom: responsiveHeight(10) }}>
          
          <Text
            style={{
              fontSize: 26,
              fontWeight: "700",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Feedback
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            How to improve our App
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              alignSelf: "center",
              color: "blue",
            }}
          >
            Send feedbck
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 26,
              fontWeight: "700",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Follow us
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Link", {
                  link: "https://fastyget.com/blog/",
                });
              }}
            >
              <MaterialCommunityIcons
                name="signal-variant"
                size={30}
                style={{ marginRight: 15 }}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Link", {
                  link: "https://www.facebook.com/fastygetapp",
                });
              }}
            >
              <FontAwesome
                name="facebook-f"
                size={30}
                style={{ marginRight: 15 }}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Link", {
                  link: "https://www.instagram.com/accounts/login/",
                });
              }}
            >
              <Entypo
                name="instagram"
                size={30}
                style={{ marginRight: 15 }}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Link", {
                  link: "https://twitter.com/fastyget",
                });
              }}
            >
              <AntDesign
                name="twitter"
                size={30}
                style={{ marginRight: 15 }}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Link", {
                  link: "https://www.linkedin.com/company/fastyget",
                });
              }}
            >
              <Entypo name="linkedin" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          height: 30,
          width: 30,
          backgroundColor: "#FFBC00",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          bottom: 120,
          right: 20,
        }}
        onPress={() =>
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          })
        }
      >
        <AntDesign name="upcircleo" size={20} color="white" />
      </TouchableOpacity>
      {popular ? (
        <TouchableOpacity
          onPress={() => setpopular(false)}
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
          <TouchableWithoutFeedback>
            <View
              style={{
                marginTop: "20%",
                // position: 'absolute',
                height: 150,
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
              <TouchableOpacity
                onPress={() => setpopular(false)}
                style={{ alignSelf: "flex-end", marginTop: 5, marginRight: 5 }}
              >
                <Entypo name="cross" size={24} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  height: 350,
                  width: "90%",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 30, fontWeight: "700", color: "white" }}
                >
                  Deliver to
                </Text>

                {Platform.OS === "ios" ? (
                  <GooglePlacesAutocomplete
                    ref={googleRef}
                    styles={{
                      container: {
                        flex: 1,
                        // position:'absolute',
                        // marginTop:45,
                        // top:responsiveHeight(25),
                        // width:'80%',
                        zIndex: 2,
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
                      var contry;
                      var province;
                      var city;
                      var address;
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
                          province = details.address_components[i].short_name;
                          city = details.address_components[i].long_name;
                          // setProvince(details.address_components[i].short_name)
                          // setCity(details.address_components[i].long_name)
                        } else if (
                          details.address_components[i].types[0] === "country"
                        ) {
                          contry = details.address_components[i].short_name;
                          // setCountry(details.address_components[i].short_name)
                        } else if (details.formatted_address) {
                          address = details.formatted_address;
                          // setAddress(details.formatted_address);
                        } else {
                        }
                      }
                      setLocation(data);
                      // setTimeout(() => {
                      dirGetPostal(
                        contry,
                        details.geometry.location.lat,
                        details.geometry.location.lng,
                        province,
                        city,
                        address
                      );
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

                    styles={{
                      container: {
                        flex: 1,
                        // position:'absolute',
                        // marginTop:45,
                        // top:responsiveHeight(25),
                        // width:'85%',
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
                      var contry;
                      var province;
                      var city;
                      var address;
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
                          province = details.address_components[i].short_name;
                          city = details.address_components[i].long_name;
                          // setProvince(details.address_components[i].short_name)
                          // setCity(details.address_components[i].long_name)
                        } else if (
                          details.address_components[i].types[0] === "country"
                        ) {
                          contry = details.address_components[i].short_name;
                          // setCountry(details.address_components[i].short_name)
                        } else if (details.formatted_address) {
                          address = details.formatted_address;
                          // setAddress(details.formatted_address);
                        } else {
                        }
                      }
                      setLocation(data);
                      // setTimeout(() => {
                      dirGetPostal(
                        contry,
                        details.geometry.location.lat,
                        details.geometry.location.lng,
                        province,
                        city,
                        address
                      );
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
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      ) : null}

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
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
  },
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
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  MainContainer: {
    backgroundColor: "#FAFAFA",
    flex: 1,
    padding: 12,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    //    borderWidth:1
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 15,
    margin: 12,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
  },
});
