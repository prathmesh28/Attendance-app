import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack';
import { View, Text, ActivityIndicator,StatusBar,Dimensions, StyleSheet } from "react-native"
import LoadingScreen from "./Screens/LoadingScreen"
import LoginScreen from "./Screens/LoginScreen"
import PhoneAuth from "./Screens/PhoneAuth"
import WelcomeScreen from './Screens/WelcomeScreen'
import HomeScreen from "./Screens/HomeScreen"
import ProfileScreen from "./Screens/ProfileScreen"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
const AuthStack = createStackNavigator({
    Intro:WelcomeScreen,
    Login: LoginScreen,
    Phone:PhoneAuth
  },
  {
    header: null,
    headerMode: 'none',
 
    
}

)


const Tab = createMaterialBottomTabNavigator();
const TabStack =()=>{
  return (
    <NavigationContainer>

    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Text style={{fontSize:20}}>&#x1F3E0;</Text>
          ),
        }}
        />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Text style={{fontSize:20}}>&#128587;</Text>
          ),
        }}
         />
    </Tab.Navigator>
    </NavigationContainer>
    
  );
}


const Container = createAppContainer(

    createSwitchNavigator(
        {
          
            
            Auth: AuthStack,
            App:TabStack,
            Loading: LoadingScreen,
        },
        {
            initialRouteName: "Loading"
        }
    )
 ) ;  
class App extends React.Component {
  _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
        };
      }
      async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
          this.setState({ isReady: true });
        }
      }
      componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        if (!this.state.isReady) {
            return <View><Text>Loading</Text></View>
          }
          return <Container/>
    }
  }
  
  export default App
  