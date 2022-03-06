import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
// import {Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './src/landing'
import Search from './src/searched'
import Login from './src/login'
import Signup from './src/signup'
import Link from './src/srcLink'
import Wish from './src/wishlist'
import Recent from './src/recently'
import Setting from './src/settings'
import Locations from './src/view_location'
import Cuisines from './src/view_cusinies'
import Forgot from './src/forgot'
import RestDetail from './src/rest_detail'
import RestList from './src/rest_list'



const Stack = createStackNavigator();



export default class App extends Component {
  render() {
    console.disableYellowBox = true

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Link" component={Link} options={{ headerShown: false }} />
          <Stack.Screen name="Wish" component={Wish} options={{ headerShown: false }} />
          <Stack.Screen name="Recent" component={Recent} options={{ headerShown: false }} />
          <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
          <Stack.Screen name="Locations" component={Locations} options={{ headerShown: false }} />
          <Stack.Screen name="Cuisines" component={Cuisines} options={{ headerShown: false }} />
          <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
          <Stack.Screen name="RestDetail" component={RestDetail} options={{ headerShown: false }} />
          <Stack.Screen name="RestList" component={RestList} options={{ headerShown: false }} />
          
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
