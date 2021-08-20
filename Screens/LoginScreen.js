import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
const { height, width } = Dimensions.get('screen')
import Loader from './Loader'

 
const LoginScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: ' ',
        password: ' ',
    });
   
    const [loading, setLoading] = useState(false)
    const [account, setAccount] = useState(false)

    useEffect(() => {   
       setLoading(true)
      auth().onAuthStateChanged(user => {
      //  console.log(user)
        if(user===null){
          setAccount(false)
          
        }else{
          if(user.email===null){
            setAccount(false)
          }else{
            setAccount(true)
          }
        }
        
      })
      setLoading(false)
    },[])



    async function loginHandle(email, password) {
        console.log(email, password)
        //setLoading(true)
        if(email && password){
            try {
            await auth().signInWithEmailAndPassword(email, password);
            console.log('done');
            setLoading(false)
            } catch (error) {
                console.log('this')
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error!', 'That email address is already in use!', [
                    {text: 'Okay'}
                ])
            }else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error!', 'That email address is invalid!', [
                    {text: 'Okay'}
                ])
            }else{
                Alert.alert('Error!', 'Please check Email/Password', [
                    {text: 'Okay'}
                ])
            }
            
            console.log(error.message);
            setLoading(false)
            }
        }
      }



    return (
    <View style={styles.container}>
        <StatusBar backgroundColor='#2e86c1' barStyle="light-content"/>
        <Loader loading={loading} textInfo={'Loading...'}/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        
        <View style={styles.footernew}> 
            {account?
            <View>
                <Text style={styles.text_footer}>You are already logged in as {auth().currentUser.email}.{'\n'}
                    Click continue to complete phone authentication.{'\n'}</Text>
                    <TouchableOpacity
                        style={{...styles.signIn,width:width*0.6,alignSelf:"center"}}
                        onPress={() => navigation.navigate('Phone')}
                        >
                        <Text style={[styles.textSign, {
                        color:'#000'
                        }]}>Continue</Text>
                    </TouchableOpacity>

                    <Text style={styles.text_footer}>{'\n'}Want to signin with other account?</Text>
                        <TouchableOpacity
                            style={{width:width*0.6,alignSelf:"center"}}
                            onPress={() => auth().signOut()}
                        >
              
                    <Text style={[styles.textSign, {
                        color:'#000'
                    }]}>Logout</Text>
                </TouchableOpacity>

</View>
            :<><Text style={[styles.text_footer, {
            }]}>Email</Text>
            <View style={styles.action}>
            
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => setData({ ...data, username: val})
                    }
                />
              
            </View>
         
            

            <Text style={[styles.text_footer, {
              //  color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
               
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    style={[styles.textInput]}
                    autoCapitalize="none"
                    secureTextEntry
                    onChangeText={(val) => setData({ ...data, password: val})}
                />
                
            </View>
        
            

            <View style={styles.button}>

            <TouchableOpacity
                    onPress={() => {
                       navigation.navigate('Phone',{forget:true})
                    }}
                    style={[styles.signIn, {
                        borderColor: '#2e86c1',
                        borderWidth: 1,
                      //  marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#2e86c1'
                    }]}>Forget Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.signIn,{ backgroundColor:'#2e86c1'}]}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
             
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Log In</Text>
                </TouchableOpacity>

                
            </View></>}
            </View>
       

      </View>
    );
};
export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#2e86c1'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 0
    },
    footer: {
        flex: 5,
        backgroundColor: 'transparent',
         padding: 0,
         margin: 0,
         //height:height
    },
    footernew: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 30
  },

    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
      //  alignItems: 'center',
     
        marginTop: 50
    },
    signIn: {
        width: '40%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin:10,
       
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
   
    
  })