import React from "react";
import { View, Text,StatusBar,TouchableOpacity,Dimensions, StyleSheet,Button,Alert } from "react-native";


export default class ProfileScreen extends React.Component {
    render(){
        return(
            <View style={{flex: 1, 
                alignItems: 'center',
                justifyContent: 'center'}}>
                <TouchableOpacity
                //    style={{width:100,height:80,backgroundColor:'#DF2E2E',borderRadius:50,alignItems:'center',justifyContent:'center'}}
                    onPress={() => auth().signOut()}
                    style={{alignSelf:'center', width:100,backgroundColor:"#2196F3",height:50,borderRadius:50,justifyContent:"center",alignItems:'center'}}

                >
                    <Text style={{fontSize:20,color:'#fff'}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        )

    }
}