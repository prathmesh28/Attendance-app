import React from "react";
import { View, Text, ActivityIndicator,StatusBar,Dimensions, StyleSheet, TouchableOpacity } from "react-native";
const {width, height} = Dimensions.get("window");

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
      <StatusBar backgroundColor={'#87CEEB'} />
    
                        <Text style={{textAlign:"center"}}>Welcome Screen</Text>
                        <TouchableOpacity style={{ display:'flex',alignItems:'flex-end', flexDirection: "row",}} onPress={() => this.props.navigation.navigate('Login')}>
       <Text style={{color:'black',fontSize:30}}>Welcome </Text>
       </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:'#d3edf8'
    }
});