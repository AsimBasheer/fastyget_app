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
import { StatusBar } from 'expo-status-bar';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import OptionsMenu from "react-native-options-menu";
import Toast from "react-native-tiny-toast";
import * as Location from "expo-location";
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

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
    img: require("../assets/images/homepics/burgers.jpg"),
    text: "Burgers",
  },
  {
    img: require("../assets/images/homepics/mexican.jpg"),
    text: "Mexican",
  },
  {
    img: require("../assets/images/homepics/chinese.jpg"),
    text: "Chinese",
  },
  {
    img: require("../assets/images/homepics/japanese.jpg"),
    text: "Japanese",
  },
  {
    img: require("../assets/images/homepics/brunch.jpg"),
    text: "Brunch",
  },
  {
    img: require("../assets/images/homepics/pizza.jpg"),
    text: "Pizza",
  },
  {
    img: require("../assets/images/homepics/italian.jpg"),
    text: "Italian",
  },
  {
    img: require("../assets/images/homepics/indian.jpg"),
    text: "Indian",
  },
  {
    img: require("../assets/images/homepics/thai.jpg"),
    text: "Thai",
  },
  {
    img: require("../assets/images/homepics/lebanese.jpg"),
    text: "Lebanese",
  },
];

const uk_cities = [
  {
    uk_1: [
      {
        txt: "Central London (WC)",
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
        txt: "South West London (SW)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "SW15 3BD",
          input_category: "",
          input_lat: "51.455202",
          input_long: "-0.2290289",
          input_city: "London",
          input_province: "England",
          input_address: "401-403 Tildesley Road",
        },
      },
      {
        txt: "North London (N)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "NW9 4BQ",
          input_category: "",
          input_lat: "51.59016399999999",
          input_long: "-0.2408755",
          input_city: "Edgware",
          input_province: "England",
          input_address: "110 Colindeep Lane",
        },
      },
      {
        txt: "West London (W)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "W1D 6QF",
          input_category: "",
          input_lat: "51.51082100000001",
          input_long: "-0.1313521",
          input_city: "London",
          input_province: "England",
          input_address: "10 Leicester Street",
        },
      },
      {
        txt: "North Est London (IG)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "E16 2RB",
          input_category: "",
          input_lat: "51.50762340000001",
          input_long: "0.0650647",
          input_city: "London",
          input_province: "England",
          input_address: "193-285 University Way",
        },
      },
      {
        txt: "North West London (NW)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "NW10 7XT",
          input_category: "",
          input_lat: "51.532432",
          input_long: "-0.271503",
          input_city: "London",
          input_province: "England",
          input_address: "3 Commercial Way",
        },
      },
      {
        txt: "South East London (SE)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "N17 0SP",
          input_category: "",
          input_lat: "51.6049325",
          input_long: "-0.05419710000000001",
          input_city: "London",
          input_province: "England",
          input_address: "68 Willoughby Lane",
        },
      },
      {
        txt: "Brighton (BN)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "BN1 1FN",
          input_category: "",
          input_lat: "50.82253000000001",
          input_long: "-0.137163",
          input_city: "Brighton",
          input_province: "England",
          input_address: "",
        },
      },
      {
        txt: "South London (CR)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "CR0 3AT",
          input_category: "",
          input_lat: "51.3888898",
          input_long: "-0.1403317",
          input_city: "Croydon",
          input_province: "England",
          input_address: "15 Homemead Road",
        },
      },
      {
        txt: "Bristol (BS)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "BS1 6WS",
          input_category: "",
          input_lat: "51.454513",
          input_long: "-2.58791",
          input_city: "Bristol",
          input_province: "England",
          input_address: "",
        },
      },
      {
        txt: "Birmingham (B)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "B4 7DL",
          input_category: "",
          input_lat: "52.48624299999999",
          input_long: "-1.890401",
          input_city: "Birmingham",
          input_province: "England",
          input_address: "83 Aston Street",
        },
      },
    ],
  },

  {
    uk_2: [
      {
        txt: "Sheffield (S)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "S1 1LL",
          input_category: "",
          input_lat: "53.38112899999999",
          input_long: "-1.470085",
          input_city: "Sheffield",
          input_province: "England",
          input_address: "15 Orchard Square",
        },
      },
      {
        txt: "Manchester (M)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "M2 4NG",
          input_category: "",
          input_lat: "53.4807593",
          input_long: "-2.2426305",
          input_city: "Manchester",
          input_province: "England",
          input_address: "81 King Street",
        },
      },
      {
        txt: "Portsmouth (PO)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "PO2 8RR",
          input_category: "",
          input_lat: "50.8197675",
          input_long: "-1.0879769",
          input_city: "Portsmouth",
          input_province: "England",
          input_address: "87 Gruneisen Road",
        },
      },
      {
        txt: "Leeds (LS)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "LS1 3ED",
          input_category: "",
          input_lat: "53.8007554",
          input_long: "-1.5490774",
          input_city: "Leeds",
          input_province: "England",
          input_address: "8 Calverley Street",
        },
      },
      {
        txt: "Leicester (LE)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "LE1 4AX",
          input_category: "",
          input_lat: "52.6368778",
          input_long: "-1.1397592",
          input_city: "Leicester",
          input_province: "England",
          input_address: "53-71 Vaughan Way",
        },
      },
      {
        txt: "Glasgow (G)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "G2 3NX",
          input_category: "",
          input_lat: "55.864237",
          input_long: "-4.251806",
          input_city: "Glasgow",
          input_province: "Scotland",
          input_address: "2 Buchanan Street",
        },
      },
      {
        txt: "Coventry (CV)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "CV1 3LD",
          input_category: "",
          input_lat: "52.406822",
          input_long: "-1.519693",
          input_city: "Coventry",
          input_province: "England",
          input_address: "undefined Meadow Street",
        },
      },
      {
        txt: "Edinburgh (EH)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "EH1 3EG",
          input_category: "",
          input_lat: "55.953252",
          input_long: "-3.188267",
          input_city: "Edinburgh",
          input_province: "Scotland",
          input_address: "6 Waterloo Place",
        },
      },
      {
        txt: "Liverpool (L)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "L2 2LZ",
          input_category: "",
          input_lat: "53.4083714",
          input_long: "-2.9915726",
          input_city: "Liverpool",
          input_province: "England",
          input_address: "8-6 Tithebarn Street",
        },
      },
      {
        txt: "Nottingham (NG)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "NG1 5AU",
          input_category: "",
          input_lat: "52.95478319999999",
          input_long: "-1.1581086",
          input_city: "Nottingham",
          input_province: "England",
          input_address: "33 College Street",
        },
      },
      {
        txt: "Southampton (SO)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "SO14 7DW",
          input_category: "",
          input_lat: "50.90970040000001",
          input_long: "-1.4043509",
          input_city: "Southampton",
          input_province: "England",
          input_address: "undefined Above Bar Street",
        },
      },
      {
        txt: "Cardiff (CF)",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "GB",
          input_postcode: "CF10 2AF",
          input_category: "",
          input_lat: "51.48158100000001",
          input_long: "-3.17909",
          input_city: "Cardiff",
          input_province: "Wales",
          input_address: "22 Queen Street",
        },
      },
    ],
  },
];

const us_cities = [
  {
    us_1: [
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
        txt: "Chicago",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "60604",
          input_category: "",
          input_lat: "41.8781136",
          input_long: "-87.6297982",
          input_city: "Chicago",
          input_province: "IL",
          input_address: "55 Jackson Boulevard",
        },
      },
      {
        txt: "Houston",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "77002",
          input_category: "",
          input_lat: "29.7604267",
          input_long: "-95.3698028",
          input_city: "Houston",
          input_province: "TX",
          input_address: "1200 Bagby Street",
        },
      },
      {
        txt: "Phoenix",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "85004",
          input_category: "",
          input_lat: "33.4483771",
          input_long: "-112.0740373",
          input_city: "Phoenix",
          input_province: "AZ",
          input_address: "22 Washington Street",
        },
      },
      {
        txt: "Philadelphia",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "19102",
          input_category: "",
          input_lat: "39.9525839",
          input_long: "-75.1652215",
          input_city: "Philadelphia",
          input_province: "PA",
          input_address: "10 South 15th Street",
        },
      },
      {
        txt: "Fort Worth",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "76102",
          input_category: "",
          input_lat: "32.7554883",
          input_long: "-97.3307658",
          input_city: "Fort Worth",
          input_province: "TX",
          input_address: "100-198 East 3rd Street",
        },
      },
      {
        txt: "Columbus",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "43215",
          input_category: "",
          input_lat: "39.9611755",
          input_long: "-82.99879419999999",
          input_city: "Columbus",
          input_province: "OH",
          input_address: "1 East Capital Street",
        },
      },
      {
        txt: "Indianapolis",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "46204",
          input_category: "",
          input_lat: "39.768403",
          input_long: "-86.158068",
          input_city: "Indianapolis",
          input_province: "IN",
          input_address: "1861 Monument Circle",
        },
      },
      {
        txt: "Charlotte",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "28280",
          input_category: "",
          input_lat: "35.2270869",
          input_long: "-80.8431267",
          input_city: "Charlotte",
          input_province: "NC",
          input_address: "108 South Tryon Street",
        },
      },
      {
        txt: "San Francisco",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "94103",
          input_category: "",
          input_lat: "37.7749295",
          input_long: "-122.4194155",
          input_city: "San Francisco",
          input_province: "CA",
          input_address: "5911 Market Street",
        },
      },
      {
        txt: "Seattle",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "98164",
          input_category: "",
          input_lat: "47.6062095",
          input_long: "-122.3320708",
          input_city: "Seattle",
          input_province: "WA",
          input_address: "449 Madison Street",
        },
      },
    ],
  },

  {
    us_2: [
      {
        txt: "San Antonio",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "78205",
          input_category: "",
          input_lat: "29.4241219",
          input_long: "-98.49362819999999",
          input_city: "San Antonio",
          input_province: "TX",
          input_address: "156-100 Dolorosa",
        },
      },
      {
        txt: "San Diego",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "92101",
          input_category: "",
          input_lat: "32.715738",
          input_long: "-117.1610838",
          input_city: "San Diego",
          input_province: "CA",
          input_address: "",
        },
      },
      {
        txt: "Dallas",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "75201",
          input_category: "",
          input_lat: "32.7766642",
          input_long: "-96.79698789999999",
          input_city: "Dallas",
          input_province: "TX",
          input_address: "1550 Marilla Street",
        },
      },
      {
        txt: "San Jose",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "95112",
          input_category: "",
          input_lat: "37.3382082",
          input_long: "-121.8863286",
          input_city: "San Jose",
          input_province: "CA",
          input_address: "195 East Santa Clara Street",
        },
      },
      {
        txt: "Austin",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "78701",
          input_category: "",
          input_lat: "30.267153",
          input_long: "-97.7430608",
          input_city: "Austin",
          input_province: "TX",
          input_address: "114 East 5th Street",
        },
      },
      {
        txt: "Jacksonville",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "32202",
          input_category: "",
          input_lat: "30.3321838",
          input_long: "-81.65565099999999",
          input_city: "Jacksonville",
          input_province: "FL",
          input_address: "",
        },
      },
      {
        txt: "Denver",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "80202",
          input_category: "",
          input_lat: "39.7392358",
          input_long: "-104.990251",
          input_city: "Denver",
          input_province: "CO",
          input_address: "1437 Bannock Street",
        },
      },
      {
        txt: "Washington",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "20036",
          input_category: "",
          input_lat: "38.9071923",
          input_long: "-77.0368707",
          input_city: "Washington",
          input_province: "DC",
          input_address: "1301 Massachusetts Avenue Northwest",
        },
      },
      {
        txt: "Las Vegas",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "20036",
          input_category: "",
          input_lat: "38.9071923",
          input_long: "-77.0368707",
          input_city: "Las Vegas",
          input_province: "DC",
          input_address: "1301 Massachusetts Avenue Northwest",
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
        txt: "Nashville",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "37243",
          input_category: "",
          input_lat: "36.1626638",
          input_long: "-86.7816016",
          input_city: "Nashville",
          input_province: "TN",
          input_address: "201 Church Street",
        },
      },
      {
        txt: "Boston",
        params: {
          "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
          input_country: "US",
          input_postcode: "02203",
          input_category: "",
          input_lat: "42.3600825",
          input_long: "-71.0588801",
          input_city: "Boston",
          input_province: "MA",
          input_address: "100 Franklin Avenue",
        },
      },
    ],
  },
];

const fran_cities = [
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
    txt: "Lyon",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "FR",
      input_postcode: "69002",
      input_category: "",
      input_lat: "45.764043",
      input_long: "4.835659",
      input_city: "Lyon",
      input_province: "Auvergne-Rhône-Alpes",
      input_address: "20 Rue de la Poulaillerie",
    },
  },
  {
    txt: "Marseille",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "FR",
      input_postcode: "13002",
      input_category: "",
      input_lat: "43.296482",
      input_long: "5.36978",
      input_city: "Marseille",
      input_province: "Provence-Alpes-Côte d Azur",
      input_address: "68 Rue de la Prison",
    },
  },
  {
    txt: "Bordeaux",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "FR",
      input_postcode: "33000",
      input_category: "",
      input_lat: "44.837789",
      input_long: "-0.57918",
      input_city: "Bordeaux",
      input_province: "Nouvelle-Aquitaine",
      input_address: "6 Place Rohan",
    },
  },
  {
    txt: "Toulouse",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "FR",
      input_postcode: "31000",
      input_category: "",
      input_lat: "43.604652",
      input_long: "1.444209",
      input_city: "Toulouse",
      input_province: "Occitanie",
      input_address: "8 Place du Capitole",
    },
  },
  {
    txt: "Lille",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "FR",
      input_postcode: "59000",
      input_category: "",
      input_lat: "50.62925",
      input_long: "3.057256",
      input_city: "Lille",
      input_province: "Hauts-de-France",
      input_address: "25 Rue Colbrant",
    },
  },
  {
    txt: "Nice",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "FR",
      input_postcode: "06000",
      input_category: "",
      input_lat: "43.7101728",
      input_long: "7.261953200000001",
      input_city: "Nice",
      input_province: "Provence-Alpes-Côte d Azur",
      input_address: "26 Place du Général de Gaulle",
    },
  },
];

const ger_cities = [
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
    txt: "Hamburgh",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "DE",
      input_postcode: "20095",
      input_category: "",
      input_lat: "53.5510846",
      input_long: "9.9936818",
      input_city: "Hamburg",
      input_province: "HH",
      input_address: "8 Rathausmarkt",
    },
  },
  {
    txt: "Munich",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "DE",
      input_postcode: "80331",
      input_category: "",
      input_lat: "48.1351253",
      input_long: "11.5819806",
      input_city: "Munich",
      input_province: "BY",
      input_address: "1 Tal",
    },
  },
  {
    txt: "Cologne",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "DE",
      input_postcode: "50667",
      input_category: "",
      input_lat: "50.937531",
      input_long: "6.9602786",
      input_city: "Cologne",
      input_province: "NRW",
      input_address: "1 Unter Käster",
    },
  },
  {
    txt: "Frankfurt am Main",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "DE",
      input_postcode: "60311",
      input_category: "",
      input_lat: "50.1109221",
      input_long: "8.6821267",
      input_city: "Frankfurt",
      input_province: "HE",
      input_address: "2 Neue Kräme",
    },
  },
  {
    txt: "Stuttgart",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "DE",
      input_postcode: "70173",
      input_category: "",
      input_lat: "48.7758459",
      input_long: "9.1829321",
      input_city: "Stuttgart",
      input_province: "BW",
      input_address: "17 Charlottenplatz",
    },
  },
  {
    txt: "Dusseldorf",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "DE",
      input_postcode: "40213",
      input_category: "",
      input_lat: "51.2277411",
      input_long: "6.7734556",
      input_city: "Düsseldorf",
      input_province: "NRW",
      input_address: "14 Lambertusstraße",
    },
  },
];

const ital_cities = [
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
    txt: "Milan",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IT",
      input_postcode: "20122",
      input_category: "",
      input_lat: "45.4642035",
      input_long: "9.189982",
      input_city: "Milan",
      input_province: "Lombardy",
      input_address: "2 Piazza del Duomo",
    },
  },
  {
    txt: "Naples",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IT",
      input_postcode: "20122",
      input_category: "",
      input_lat: "45.4642035",
      input_long: "9.189982",
      input_city: "Naples",
      input_province: "Lombardy",
      input_address: "2 Piazza del Duomo",
    },
  },
  {
    txt: "Turin",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IT",
      input_postcode: "10123",
      input_category: "",
      input_lat: "45.070312",
      input_long: "7.686856499999999",
      input_city: "Turin",
      input_province: "Piedmont",
      input_address: "",
    },
  },
  {
    txt: "Palermo",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IT",
      input_postcode: "90133",
      input_category: "",
      input_lat: "38.11569",
      input_long: "13.3614868",
      input_city: "Palermo",
      input_province: "Sicily",
      input_address: "308 Via Vittorio Emanuele",
    },
  },
  {
    txt: "Genoa",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IT",
      input_postcode: "16121",
      input_category: "",
      input_lat: "44.4056499",
      input_long: "8.946256",
      input_city: "Genoa",
      input_province: "Liguria",
      input_address: "",
    },
  },
  {
    txt: "Bologna",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IT",
      input_postcode: "40121",
      input_category: "",
      input_lat: "44.494887",
      input_long: "11.3426163",
      input_city: "Bologna",
      input_province: "Emilia-Romagna",
      input_address: "1-5 Via dell Indipendenza",
    },
  },
];

const spain_cities = [
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
    txt: "Barcelona",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "ES",
      input_postcode: "08007",
      input_category: "",
      input_lat: "41.3873974",
      input_long: "2.168568",
      input_city: "Barcelona",
      input_province: "CT",
      input_address: "2502 Plaça de Catalunya",
    },
  },
  {
    txt: "Valencia",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "ES",
      input_postcode: "46002",
      input_category: "",
      input_lat: "39.4699075",
      input_long: "-0.3762881",
      input_city: "Valencia",
      input_province: "VC",
      input_address: "11013 Plaça de 0l Ajuntament",
    },
  },
  {
    txt: "Seville",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "ES",
      input_postcode: "41003",
      input_category: "",
      input_lat: "37.3890924",
      input_long: "-5.9844589",
      input_city: "Seville",
      input_province: "AN",
      input_address: "7-1 Calle Luis Montoto",
    },
  },
  {
    txt: "Bilbao",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "ES",
      input_postcode: "48009",
      input_category: "",
      input_lat: "43.2630126",
      input_long: "-2.9349852",
      input_city: "Bilbao",
      input_province: "PV",
      input_address: "1 Federico Moyúa Plaza",
    },
  },
  {
    txt: "Malaga",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "ES",
      input_postcode: "29015",
      input_category: "",
      input_lat: "36.721261",
      input_long: "-4.4212655",
      input_city: "Málaga",
      input_province: "AN",
      input_address: "7 Calle Santa María",
    },
  },
  {
    txt: "Oviedo",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "ES",
      input_postcode: "33007",
      input_category: "",
      input_lat: "43.3619145",
      input_long: "-5.8493887",
      input_city: "Oviedo",
      input_province: "AS",
      input_address: "",
    },
  },
];

const jap_cities = [
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
    txt: "Yokohama",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "JP",
      input_postcode: "231-0016",
      input_category: "",
      input_lat: "35.4436739",
      input_long: "139.6379639",
      input_city: "Yokohama",
      input_province: "Kanagawa",
      input_address: "",
    },
  },
  {
    txt: "Osaka",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "JP",
      input_postcode: "530-0005",
      input_category: "",
      input_lat: "34.6937249",
      input_long: "135.5022535",
      input_city: "Osaka",
      input_province: "Osaka",
      input_address: "",
    },
  },
  {
    txt: "Nagoya",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "JP",
      input_postcode: "460-0001",
      input_category: "",
      input_lat: "35.18145060000001",
      input_long: "136.9065571",
      input_city: "Nagoya",
      input_province: "Aichi",
      input_address: "",
    },
  },
  {
    txt: "Sapporo",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "JP",
      input_postcode: "060-0042",
      input_category: "",
      input_lat: "43.0617713",
      input_long: "141.3544506",
      input_city: "Sapporo",
      input_province: "Hokkaido",
      input_address: "",
    },
  },
  {
    txt: "Kobe",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "JP",
      input_postcode: "650-0001",
      input_category: "",
      input_lat: "34.6900806",
      input_long: "135.1956311",
      input_city: "Kobe",
      input_province: "Hyogo",
      input_address: "",
    },
  },
  {
    txt: "Kyoto",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "JP",
      input_postcode: "604-0925",
      input_category: "",
      input_lat: "35.011564",
      input_long: "135.7681489",
      input_city: "Kyoto",
      input_province: "Kyoto",
      input_address: "",
    },
  },
];

const aust_cities = [
  {
    txt: "Sydney",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "AU",
      input_postcode: "2000",
      input_category: "",
      input_lat: "-33.8688197",
      input_long: "151.2092955",
      input_city: "Sydney",
      input_province: "NSW",
      input_address: "110-140 King Street",
    },
  },
  {
    txt: "Melbourne",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "AU",
      input_postcode: "3000",
      input_category: "",
      input_lat: "37.8136276",
      input_long: "144.9630576",
      input_city: "Melbourne",
      input_province: "VIC",
      input_address: "210 Elizabeth Street",
    },
  },
  {
    txt: "Brisbane",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "AU",
      input_postcode: "4000",
      input_category: "",
      input_lat: "-27.4704528",
      input_long: "153.0260341",
      input_city: "Brisbane City",
      input_province: "QLD",
      input_address: "162 Elizabeth Street",
    },
  },
  {
    txt: "Perth",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "AU",
      input_postcode: "6000",
      input_category: "",
      input_lat: "-31.9523123",
      input_long: "115.861309",
      input_city: "Perth",
      input_province: "WA",
      input_address: "395 Barrack Street",
    },
  },
  {
    txt: "Adelaide",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "AU",
      input_postcode: "5000",
      input_category: "",
      input_lat: "-34.9284989",
      input_long: "138.6007456",
      input_city: "Adelaide",
      input_province: "SA",
      input_address: "",
    },
  },
  {
    txt: "Canberra",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "AU",
      input_postcode: "2600",
      input_category: "",
      input_lat: "-35.3075",
      input_long: "149.124417",
      input_city: "Capital Hill",
      input_province: "ACT",
      input_address: "1 Parliament Drive",
    },
  },
  {
    txt: "Hobart",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "AU",
      input_postcode: "7000",
      input_category: "",
      input_lat: "-42.8826055",
      input_long: "147.3257196",
      input_city: "Hobart",
      input_province: "TAS",
      input_address: "135 Murray Street",
    },
  },
];

const ind_cities = [
  {
    txt: "Mumbai",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IN",
      input_postcode: "400070",
      input_category: "",
      input_lat: "19.0759837",
      input_long: "72.8776559",
      input_city: "Mumbai",
      input_province: "MH",
      input_address: "192 Central Salsette Tramway Road",
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
    txt: "Bangalore",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IN",
      input_postcode: "560001",
      input_category: "",
      input_lat: "12.9715987",
      input_long: "77.5945627",
      input_city: "Bengaluru",
      input_province: "KA",
      input_address: "418 Vittal Mallya Road",
    },
  },
  {
    txt: "Hyderabad",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IN",
      input_postcode: "500095",
      input_category: "",
      input_lat: "17.385044",
      input_long: "78.486671",
      input_city: "Hyderabad",
      input_province: "TG",
      input_address: "401 Hyderabad - Janagam Highway",
    },
  },
  {
    txt: "Ahmedabad",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IN",
      input_postcode: "380006",
      input_category: "",
      input_lat: "23.022505",
      input_long: "72.5713621",
      input_city: "Ahmedabad",
      input_province: "GJ",
      input_address: "2 Ashram Road",
    },
  },
  {
    txt: "Chennai",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IN",
      input_postcode: "600003",
      input_category: "",
      input_lat: "13.0826802",
      input_long: "80.2707184",
      input_city: "Chennai",
      input_province: "TN",
      input_address: "",
    },
  },
  {
    txt: "Kolkata",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "IN",
      input_postcode: "700012",
      input_category: "",
      input_lat: "22.572646",
      input_long: "88.36389500000001",
      input_city: "Kolkata",
      input_province: "WB",
      input_address: "24 Radha Nath Mullick Lane",
    },
  },
];

const braz_cities = [
  {
    txt: "Sao Paulo",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "BR",
      input_postcode: "01318-010",
      input_category: "",
      input_lat: "-23.5557714",
      input_long: "-46.6395571",
      input_city: "São Paulo",
      input_province: "SP",
      input_address: "7550 Praça Pérola Byington",
    },
  },
  {
    txt: "Rio da Janeiro",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "BR",
      input_postcode: "20020-010",
      input_category: "",
      input_lat: "-22.9068467",
      input_long: "-43.1728965",
      input_city: "Rio de Janeiro",
      input_province: "RJ",
      input_address: "472 Avenida Presidente Antônio Carlos",
    },
  },
  {
    txt: "Brasilia",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "BR",
      input_postcode: "70740-610",
      input_category: "",
      input_lat: "-15.7975154",
      input_long: "-47.89188739999999",
      input_city: "Brasília",
      input_province: "DF",
      input_address: "1960 Via W3 Sul",
    },
  },
  {
    txt: "Salvador",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "BR",
      input_postcode: "40025-390",
      input_category: "",
      input_lat: "-12.9777378",
      input_long: "-38.5016363",
      input_city: "Salvador",
      input_province: "BA",
      input_address: "2836 Avenida Presidente Castelo Branco",
    },
  },
  {
    txt: "Fortaleza",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "BR",
      input_postcode: "60050-040",
      input_category: "",
      input_lat: "-3.7327203",
      input_long: "-38.5270134",
      input_city: "Fortaleza",
      input_province: "CE",
      input_address: "",
    },
  },
  {
    txt: "Belo Horizonte",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "BR",
      input_postcode: "30120-060",
      input_category: "",
      input_lat: "-19.919052",
      input_long: "-43.9386685",
      input_city: "Belo Horizonte",
      input_province: "MG",
      input_address: "703-611 Rua Rio de Janeiro",
    },
  },
  {
    txt: "Manaus",
    params: {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      input_country: "BR",
      input_postcode: "69020-200",
      input_category: "",
      input_lat: "-3.1190275",
      input_long: "-60.0217314",
      input_city: "Manaus",
      input_province: "AM",
      input_address: "949a Avenida Barcelos",
    },
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
        txt: "Japanses",
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
  const [inputcategory, setinputcategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errmsg, seterrmsg] = useState("");
  const [validateLogin, setvalidateLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [logged, setlogged] = useState("");
  const [currlocation, setcurrLocation] = useState();
  const [selected, setSelected] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  let scrollRef = useRef();

  useEffect(async () => {
    // await AsyncStorage.clear()
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data');
      }
    // })
    // ();
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
    //     alert(e);
    //   });
  }, [isFocused]);

  const getcategory = (val) => {
    setinputcategory(val);
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
          let Flag = responseJson.Status;
          if (Flag.flag == 1) {
            // Toast.show(Flag.message);

            // Toast.show(responseJson)
            // Toast.show('Added to recents')
            // setTimeout(() => {
            // console.log(combined);
            setCatdishes([
              ...responseJson.Categories,
              ...responseJson.Restaurants,
            ]);
            // }, 500);
          } else {
            // Toast.show(Flag.message);
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
      // console.log(responseJson);
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

  const getCurrentpostal = async () => {
    setLoading(true);
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

        props.navigation.navigate("Search", { params: params });
        setCountry("");
        // googleRef.current.clear();
        // setcategory('')
        setCurrentCity('')
        setSelected("");
        setSelectedValue("");
        setpopular(false);
        seterrmsg("");
        setLoading(false);

        // getList(postal)
      }, 1500);
    }
  };

  const getPostal = async () => {
    if (country === "") {
      seterrmsg("Select your desired location ");
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
      input_category: selected,
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
    setSelected("");
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

  function rest_params(id) {
    const param = {
      "X-Api-Key": "AIzaSyAqlttGeBw9qlxt72pT0fjliea-iSJmE4c",
      rest_id: id,
      lat: "",
      long: "",
    };
    props.navigation.navigate("RestDetail", { params: param });
  }

  return (
    // <View style={styles.MainContainer}>

    // </View>
    // style={{backgroundColor:'#FFBC00'}}
    <SafeAreaView  >
      {Platform.OS === "ios" && <StatusBar StatusBarStyle={'dark'} /> }
        
      <View
        style={{
          height:80,
          // height: Platform.OS === "ios"?100: 80,
          // paddingTop:Platform.OS === "ios"?10:0,
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
        style={{ marginBottom: Platform.OS === "ios"  ? responsiveHeight(10) : null,backgroundColor:'#FFFFFF' }}
        keyboardShouldPersistTaps="handled"
        // scrollEventThrottle={64}
        // keyboardDismissMode="on-drag"
        listViewDisplayed="true"
        // onScroll={() => { if(!hideResults){sethideResults(true)}}}
      >
        {/* <KeyboardAvoidingView behavior={"padding"}> */}
        <View style={{ flex: 1, zIndex: 999999 }}>
          <ImageBackground
            source={require("../assets/images/new.gif")}
            style={{ height: 763, width: "auto" }}
          >
            <View
              style={{
                flex: 1,
                height: "auto",
                width: "auto",
                backgroundColor: "#00000080",
                zIndex: 99999,
              }}
            >
              <View
                style={{ alignSelf: "center", width: "80%", zIndex: 99999 }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    color: "white",
                    fontWeight: "bold",
                    marginTop: 70,
                  }}
                >
                  WE HELP YOU FIND
                </Text>
                <Text
                  style={{ fontSize: 26, color: "white", fontWeight: "bold" }}
                >
                  THE BEST{" "}
                  <Text
                    style={{
                      fontSize: 26,
                      color: "#FFBC00",
                      fontWeight: "bold",
                    }}
                  >
                    FOOD MEAL
                  </Text>
                </Text>
                <Text
                  style={{ fontSize: 26, color: "white", fontWeight: "bold" }}
                >
                  AROUND YOU
                </Text>

                {/* <View style={{flexDirection:'row',position:'absolute',top: Platform.OS === 'ios' ? responsiveScreenHeight(31.4):responsiveScreenHeight(26.7),backgroundColor:'white',height:45,width:45,borderTopLeftRadius:8,borderBottomLeftRadius:8}} >
                                        <Entypo style={{marginLeft:10,alignSelf:'center'}} name="location-pin" size={24} color="black" />
                                        <View style={{width:0.3,height:40,backgroundColor:'#a9a9a9',marginLeft:5}}/>
                                    </View> */}
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
                          marginTop: 45,
                          // top:responsiveHeight(25),
                          // width:'80%',
                          zIndex: 99999,
                        },
                        textInput: {
                          width: "84.5%",
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
                            setProvince(details.address_components[i].short_name);
                            setCity(details.address_components[i].long_name);
                          } else if (
                            details.address_components[i].types[0] === "country"
                          ) {
                            setCountry(details.address_components[i].short_name);
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
                      // renderLeftButton={()=>
                      //     <View style={{flexDirection:'row',backgroundColor:'red'}} >
                      //         <Entypo style={{marginLeft:10,alignSelf:'center'}} name="location-pin" size={24} color="red" />
                      //         <View style={{width:0.3,height:40,backgroundColor:'#a9a9a9',marginLeft:5}}/>
                      //      </View>
                      // }
                      // getDefaultValue={() => {
                      //     return ''; // text input default value
                      // }}
                      styles={{
                        container: {
                          flex: 1,
                          // position:'absolute',
                          marginTop: 45,
                          // top:responsiveHeight(25),
                          // width:'85%',
                        },
                        textInput: {
                          width: "86.5%",
                          height: 45,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                        listView: {
                          width: "88%",
                          alignSelf: "flex-end",
                          position: "absolute",
                          marginTop: 45,
                          zIndex: 99999,
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
                            setProvince(details.address_components[i].short_name);
                            setCity(details.address_components[i].long_name);
                          } else if (
                            details.address_components[i].types[0] === "country"
                          ) {
                            setCountry(details.address_components[i].short_name);
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
                    marginTop: 45,
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
                
                {/* </View> */}
                {/* </View> */}
                {/* <View style={{
                                    height:300,
                                    // marginTop:40,
                                    backgroundColor:'transparent',
                                    position:'absolute',
                                    marginTop:'75%',
                                    top:0,
                                    left:0,
                                    right:0,
                                    bottom:0,
                                    zIndex:1
                                }}> */}
                <View
                  style={{
                    height: inputcategory.length > 1 ? "auto" : 45,
                    backgroundColor: "white",
                    zIndex: 9999,
                    marginTop: currentCity === '' ? 60 : 15,
                    borderRadius: 8,
                  }}
                >
                  <View style={{ flexDirection: "row", zindex: 999 }}>
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
                      value={selected || inputcategory}
                      onChangeText={(value) =>
                        selected != ""
                          ? setSelected(value)
                          : value.length > 1
                          ? getcategory(value)
                          : setinputcategory(value)
                      }
                      placeholder={"Dishes, Restaurants or Cuisines"}
                      style={{ width: "83%", height: 40, left: 22 }}
                    />
                  </View>
                  {inputcategory.length > 1 ? (
                    <View style={{ zIndex: 2 }}>
                      {catdishes.length != 0 ? (
                        <View style={{ width: "100%", zIndex: 99999 }}>
                          <FlatList
                            style={{}}
                            keyExtractor={(item, index) => index.toString()}
                            showsVeritcalScrollIndicator={false}
                            data={catdishes}
                            renderItem={({ item, index }) => (
                              <>
                                {item.cat_name ? (
                                  <TouchableOpacity
                                    onPress={() => {
                                      setinputcategory("");
                                      setSelected(item.cat_name);
                                    }}
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      borderTopWidth: 1,
                                      paddingBottom: 5,
                                      paddingTop: 5,
                                      borderColor: "#DCDCDC",
                                    }}
                                  >
                                    <FontAwesome
                                      style={{ marginLeft: 10, marginTop: 10 }}
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
                                    onPress={() => rest_params(item.rest_idx)}
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
                                          width: "75%",
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
                    </View>
                  ) : null}
                </View>
                {inputcategory.length > 1 ? null : (
                  <>
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
                    {isLoading ? (
                      <View
                        style={{
                          marginTop: 15,
                          height: 45,
                          backgroundColor: "#FFBC00",
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
                        onPress={() =>
                          currentCity != ''
                            ? getCurrentpostal()
                            : getPostal()
                        }
                        style={{
                          marginTop: 15,
                          height: 45,
                          backgroundColor: "#FFBC00",
                          justifyContent: "center",
                          borderRadius: 8,
                        }}
                      >
                        {/* <TouchableOpacity onPress={()=>   } style={{marginTop:15,height:45,backgroundColor:'#FFBC00',justifyContent:'center',borderRadius:8}}> */}
                        <Text
                          style={{
                            fontSize: 14,
                            alignSelf: "center",
                            fontWeight: "700",
                          }}
                        >
                          SEARCH
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Text
                      style={{
                        marginTop: responsiveHeight(8),
                        fontSize: 26,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      WE COMPARE
                    </Text>
                  </>
                )}
              </View>
              {inputcategory.length > 1 ? null : (
                <>
                  <FlatList
                    style={{ marginTop: 25, alignSelf: "center" }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={"10"}
                    showsVeritcalScrollIndicator={false}
                    data={images}
                    renderItem={({ item, index }) => (
                      <Image
                        source={item.image}
                        style={{ width: 28, height: 28, margin: 2 }}
                      />
                    )}
                  />
                  <View style={{ height: 86 }} />
                </>
              )}
              {/* </View>         */}
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 20,
              color: "black",
              fontWeight: "bold",
            }}
          >
            POPULAR{" "}
            <Text
              style={{ fontSize: 20, color: "#FFBC00", fontWeight: "bold" }}
            >
              FOOD
            </Text>{" "}
            CATEGORIES
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
        </View>
        <View style={{ margin: 20 }}>
          <TouchableOpacity onPress={()=>props.navigation.navigate("Cuisines")} >
            <Text style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
              Need some more{'\n'}options?
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Argentinian");
              }}
              style={{}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                argentinian
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Asian");
              }}
              style={{marginLeft:responsiveWidth(5)}}

            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                asian
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft:responsiveWidth(5)}}

              onPress={() => {
                setpopular(true), setcategory("Brazilian");
              }}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                brazilian
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Cantonese");
              }}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                cantonese
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Caribbean");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                caribbean
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Chicken");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                chicken
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Curry");
              }}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                curry
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Greek");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                greek
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Healthy");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                healthy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Iranian");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                iranian
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Korean");
              }}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                korean
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Middle eastern");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                middle eastern
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Pasta");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                pasta
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Seafood");
              }}
              style={{}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                seafood
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("spanish");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
              spanish
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Sushi");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                sushi
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Taiwanese");
              }}
              style={{}}
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                taiwanese
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setpopular(true), setcategory("Turkish");
              }}
              style={{marginLeft:responsiveWidth(5)}}
            
            >
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                {" "}
                turkish
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={{marginTop:10,fontSize:22,color:'black',fontWeight:'bold'}}>
                    argentinian   asian   brazilian
                    {'\n'}
                    cantonese   caribbean   chicken
                    {'\n'}
                    curry   greek   healthy   iranian
                    {'\n'}
                    korean   middle eastern   pasta
                    {'\n'}
                    poke   portuguese   salads
                    {'\n'}
                    seafood   spanish   sushi
                    {'\n'}
                    taiwanese    turkish
                </Text> */}
        </View>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              POPULAR{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                UK
              </Text>{" "}
              CITIES WITH FASTYGET{" "}
            </Text>
            <Image
              source={require("../assets/images/uk_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#FFBC00",
              textAlign: "center",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Compare between Uber Eats, Deliveroo, Just Eat, Supper
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={uk_cities[0].uk_1}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() =>
                      props.navigation.navigate("Search", {
                        params: item.params,
                      })
                    }
                  >
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      {item.txt}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{ width: "50%" }}>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={uk_cities[1].uk_2}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() =>
                      props.navigation.navigate("Search", {
                        params: item.params,
                      })
                    }
                  >
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        textAlign: "center",
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

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                US
              </Text>{" "}
              CITIES WITH FASTYGET{" "}
            </Text>
            <Image
              source={require("../assets/images/usa_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#FFBC00",
              textAlign: "center",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Compare between Uber Eats, Doordash, Grubhub, Postmates,
            delivery.com, EatStreet, waiter.com, Waiter
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={us_cities[0].us_1}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() =>
                      props.navigation.navigate("Search", {
                        params: item.params,
                      })
                    }
                  >
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      {item.txt}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{ width: "50%" }}>
              <FlatList
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={'2'}
                data={us_cities[1].us_2}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() =>
                      props.navigation.navigate("Search", {
                        params: item.params,
                      })
                    }
                  >
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        textAlign: "center",
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

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                FRANCE{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/france_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Compare between Uber Eats, Deliveroo, Just Eat.
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={fran_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                GERMANY{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/germany_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Uber Eats, Wolts, Leiferando.de, Foodpanda
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={ger_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                ITALY{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/italy_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Uber Eats, Deliveroo, Just Eat, Glovo.
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={ital_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                SPAIN{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/spain_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Uber Eats, Deliveroo, Just Eat, Glovo.
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={spain_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                JAPAN{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/japan_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Uber Eats, Wolt, Foodpanda.
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={jap_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                AUSTRALIA{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/australia_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Compare between Uber Eats, Deliveroo, Menulog.
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={aust_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                INDIA{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/india_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Swiggy, Zomato, Dunzo.
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={ind_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}
            >
              POPULAR CITIES IN{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: "#FFBC00" }}
              >
                BRAZIL{" "}
              </Text>
            </Text>
            <Image
              source={require("../assets/images/brazil_flag.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
              color: "#FFBC00",
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Uber Eats, Rappi, iFood.
          </Text>

          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={'2'}
            data={braz_cities}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Search", { params: item.params })
                }
              >
                <Text
                  style={{
                    margin: 10,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.txt}
                </Text>
              </TouchableOpacity>
            )}
          />
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
                      ? props.navigation.navigate("Link", {
                          link: "https://fastyget.com/contact-us",
                        })
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
            onPress={() =>
              props.navigation.navigate("Link", {
                link: "https://fastyget.com/contact-us",
              })
            }
          >
            Send feedback
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
            top: 2,
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
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "700",
                    color: "white",
                    marginBottom: 5,
                  }}
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
