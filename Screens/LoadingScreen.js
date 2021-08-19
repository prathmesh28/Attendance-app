import React from "react";
import { View, Text, ActivityIndicator,StatusBar,Dimensions, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
const {width, height} = Dimensions.get("window");

export default class LoadingScreen extends React.Component {

    componentDidMount() {
     
        console.log("hi")
        auth().onAuthStateChanged(user => {

            // console.log(user.phoneNumber)
             console.log("hi",user)
                if(user){
                    //  console.log('user',user)
                    if(user.phoneNumber){
                        // console.log('ph',user.phoneNumber)
                        this.props.navigation.navigate("App")
                    }else{
                     //   console.log('login',user.phoneNumber)
                        this.props.navigation.navigate("Phone")
                    }
                }else{
                  //  console.log('auth',user.phoneNumber)
                    this.props.navigation.navigate("Auth")
                }

        })
        // console.log(this.state.user)


    }

    render() {
        return (
            <View style={styles.container}>
      <StatusBar backgroundColor={'#87CEEB'} />
                
                    <Text>Loading App....{'\n'}
                        </Text>
                        <Text style={{textAlign:"center"}}>loading page
                      If app is not loading please check your internet connection or restart the app.</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width,
        paddingHorizontal:20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:'#d3edf8'
    }
});