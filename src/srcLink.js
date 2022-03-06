import React, { useState,useEffect,useRef } from 'react';
import { StyleSheet, BackHandler,Text,ActivityIndicator, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Card } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';

// ...
export default function SrcLink(props) {
    const [link, setlnk] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const [param, setParams] = useState();
    const [canGoback, setcanGoback] = useState(false);
    const webViewRef = useRef(null)
    useEffect(() => {
        const lnk = props.route.params.link
        const param =props.route.params.params
        // console.log(param);
        setlnk(lnk)
        setParams(param)
      
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButton
          );
      
          return () => backHandler.remove();

      }, []);

      function handleBackButton ()  {
        //   return console.log(param);
        if (canGoback) {
            // alert('called')
            webViewRef.current.goBack();
            // setTimeout(() => {
                // console.log(param);
                if(param != undefined){
                    props.navigation.replace('Search',{params:param});   
                }
            // }, 800);    
            
          return true;
        }else{
            if(param != undefined){
                props.navigation.replace('Search',{params:param});   
            }
        }
      
      };

      function onNavigationStateChange  (navState)  {
        // console.log(navState);
        setcanGoback(navState.canGoBack)
        // this.setState({
        //   canGoBack: navState.canGoBack,
        // });
      };

    return(
        <SafeAreaView style={{flex:1}} >
            {Platform.OS === "ios" && <StatusBar StatusBarStyle={'dark'} /> }
            <WebView 
                ref={webViewRef}
                onLoad={() => setisLoading(false)}
                style={{ }}
                onNavigationStateChange={onNavigationStateChange}
                source={{ uri: link }} />
            {isLoading && (
                <ActivityIndicator
                style={{ position: "absolute", marginTop:'65%',alignSelf:'center' }}
                size="large"
                color={"#FFBC00"}
                />
            )}
        </SafeAreaView>
    ) 
}