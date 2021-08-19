import React from "react";
import { View, Text,StatusBar,Dimensions, StyleSheet,Button,Alert,TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import Loader from './Loader'
const {width, height} = Dimensions.get("window");



export default class HomeScreen extends React.Component {
state={
    sessions:'',
    name:'',
    timeInterval:'',
    disableButton:false,
    time:'',
    ThisDay:new Date().toISOString().substr(0,10),
    registered:false,
    loading:false
}

//9-12
//12-14
//14-17


componentDidMount(){
    this.refresh()
//     var TodayDate = new Date().getHours()
//  //   console.log(TodayDate)

//     8<TodayDate?(12<=TodayDate?(14<=TodayDate? (17<=TodayDate?this.setState({timeInterval:'Tomorrow',disableButton:true,time:'three'}):this.setState({timeInterval:'02:00PM to 05:00PM',time:'three'})):this.setState({timeInterval:'12:00PM to 02:00PM',time:'two'})):this.setState({timeInterval:'09:00AM to 12:00PM',time:'one'})):this.setState({timeInterval:'Today',disableButton:true})//change time:'three'

   
//     database()
//         .ref('UsersList/' + auth()._user.uid )
//         .once('value')
//         .then(snapshot => {
//             //new Date(item.sessions[thisDay].two.tempDate).toLocaleTimeString()
//             this.setState({name:snapshot.val().name,sessions:snapshot.val().sessions})
//           //  snapshot.val().map
//           snapshot.val().sessions[this.state.ThisDay][this.state.time]?this.setState({registered:true}):this.setState({registered:false})
//           //snapshot.val().sessions[this.state.ThisDay][this.state.time].tempDate




//             // tempData.map((e) => {
//             //     console.log(e)
//             // });

//             // _.map(snapshot.val().sessions, (e) => {
//             //     console.log(e.one)
//             // })
//         //    console.log('User data: ', snapshot.val().sessions);
//         })

}
refresh = () =>{
    this.setState({loading:true})
    console.log('hi')
    var TodayDate = new Date().getHours()

    8<TodayDate?(12<=TodayDate?(14<=TodayDate? (17<=TodayDate?this.setState({timeInterval:'Tomorrow',disableButton:true,time:'three'}):this.setState({timeInterval:'02:00PM to 05:00PM',time:'three'})):this.setState({timeInterval:'12:00PM to 02:00PM',time:'two'})):this.setState({timeInterval:'09:00AM to 12:00PM',time:'one'})):this.setState({timeInterval:'Today',disableButton:true})//change time:'three'

    database()
        .ref('UsersList/' + auth()._user.uid )
        .once('value')
        .then(snapshot => {
            this.setState({name:snapshot.val().name,sessions:snapshot.val().sessions})
          snapshot.val().sessions[this.state.ThisDay][this.state.time]?this.setState({registered:true}):this.setState({registered:false})
          
        })
        setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 1500);
}

    AddToday = async() => {
        this.setState({loading:true})
        console.log(auth()._user.uid)
        let start = new Date().toISOString().substr(0,10)
        var tempDate = new Date().valueOf() 
        console.log(start)
        // database()
        // .ref('UsersList/' + auth()._user.uid + '/sessions/')
        // .once('value')
        // .then(snapshot => {
        //     console.log('User data: ', snapshot.val());
        // });
        
        await database().ref('UsersList/' + auth()._user.uid + '/sessions/' + start +'/'+ this.state.time).set({
            tempDate
        })
        this.refresh()
        setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 1500);
    }



    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <View style={{display:'flex',marginBottom:40,marginVertical:10}}>
                    <Text style={styles.welcome}>Welcome {this.state.name}!</Text>
                </View>
                <View style={{backgroundColor:"#fff",width:width*0.9,paddingVertical:10, alignSelf:"center",borderRadius:20,alignItems:"center",justifyContent:"center"}}>
                
                
                {this.state.disableButton?null:<>
                    {this.state.registered?
                    <Text style={{fontSize:20,marginVertical:20}}>Your attendance is marked for{'\n'}
                        <Text>{this.state.timeInterval}</Text>
                    </Text>
                    :<>
                        <Text style={{fontSize:20,marginVertical:20}}>Mark your Attendance for{'\n'}
                            <Text>{this.state.timeInterval}</Text>
                        </Text>
                        <TouchableOpacity 
                            onPress={() => this.AddToday()}
                            disabled={this.state.disableButton}
                            style={{width:100,backgroundColor:"#2196F3",height:50,borderRadius:15,justifyContent:"center",alignItems:'center'}}>
                            <Text style={{color:"#fff",fontSize:20}}>Check in!</Text>
                        </TouchableOpacity>
                    </>
                    }
                    </>
                }
                {this.state.timeInterval==='Today'?<Text>Mark your attendance at 09:00am.</Text>:null}
                {this.state.timeInterval==='Tomorrow'?
                    <Text style={{fontSize:20}}>Good Night! come back tomorrow.</Text>:null}

                
                

                </View>
                
                   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width,
 //       justifyContent: "center",
    //    alignItems: "center",
   //     alignSelf:"center",
        backgroundColor:'#d3edf8'
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 40,
        marginLeft: 10,
        marginTop: 30
    }
});