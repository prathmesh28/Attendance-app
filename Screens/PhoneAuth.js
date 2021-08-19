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
    Dimensions
} from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import { LoginSvgOne } from './assets/SubtlePrismSvg'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import _ from 'lodash';
// import Loader from '../Loader'


const { height, width } = Dimensions.get('screen')

const PhoneAuth = ({navigation}) => {

    const [phone, setPhone] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('')
    const [isValidPhoneText, setIsValidPhoneText] = useState('Null')
    const [check_textInputChange,setCheck_textInputChange] = useState(false)
    const [userAccount, setUserAccount] = useState(false)
    const [loading, setLoading] = useState(false)
    const [textInfo,setTextInfo] = useState('Loading...')
    const [forget,setForget] = useState(false)

    useEffect(() => {   
        setLoading(true)
      
        if(navigation.state.params){
            if(navigation.state.params.forget===true){
                setForget(true)
             }else{
                setForget(false)
             }  
         }
     
       setLoading(false)
     },[])


    const textInputChange = (val) => {
        setPhone(val)
        if( val.trim().length > 10 || val.trim().length < 10) {
            setCheck_textInputChange(false)
            setIsValidPhoneText('Enter a valid phone no.')
        } 
        else {
            setCheck_textInputChange(true)
            setIsValidPhoneText('Null')
        }
    }



    const loginHandle = async(phone) => {

         setLoading(true)
        setTextInfo('checking phone no...')

        await database().ref('UsersList/').once('value', async(snapshot) => {

            let found =false 
            await _.map(snapshot.val(), (e) => {
                if(e.phoneNo==='+91'+phone){
                    found=true
                }
            })
            console.log(found) 
           

                if(found)
                {
                    if(forget){
                        console.log('hione')
                        phoneAuthUser(phone)
                        
                    }else{
                        console.log('hitwo')
                        Alert.alert('Already Exist!', "this phone no. already exist...", [
                            {text: 'Okay'}
                        ])
                        setLoading(false)
                        return
                    }
                    console.log('hi')
                    console.log(forget)
                }else{
                    if(forget){
                        console.log('hithree')
                        Alert.alert('User not found!', "Check phone no. again...", [
                            {text: 'Okay'}
                        ])
                        setLoading(false)
                        return
                    }else{
                        console.log('hifour')
                        phoneAuthUser(phone)
                    }
                }
                
           
        })
     
        
    }
   // if(forget){
        //     if(useraccount){
        //         //forget password & user exist (login here)
        //     }else{
        //         //did forget password & user not exist
        //     }    
        // }else{
        //     //first time user
        //     if(useraccount){
        //         //entered phone no. of other account
        //     }else{
        //         //new user (login here)
        //     }
        // }

 
    const phoneAuthUser=async()=>{
        console.log('phone auth function')
        await auth().signInWithPhoneNumber('+91'+phone)
        .then(data => {
            setConfirm(data);
            // console.log(data)
            // console.log(data.verificationId)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }).catch(error => {

            if (error.code === 'auth/invalid-phone-number') {
                Alert.alert('Error!', "Enter a valid phone no.!", [
                    {text: 'Okay'}
                ])
                setLoading(false)
            }else{
                Alert.alert('Error!', "Check phone no. or try again later", [
                    {text: 'Okay'}
                ])
                setLoading(false)
            }
            console.log(error)
        })
    }





     // Handle confirm code button press
    async function confirmCode(code) {
        setLoading(true)
        setTextInfo('verifying code...')
        
        if(forget){
            try {
                await confirm.confirm(code);
            }

            catch (error) {
                Alert.alert('Error!', 'Invalid code.', [
                    {text: 'Okay'}
                ])
                setLoading(false)
                console.log('Invalid code.');
            }

            setTimeout(() => {
                setLoading(false)
            }, 3000) 

        }
        else{
            try {
                const credential = auth.PhoneAuthProvider.credential(
                    confirm.verificationId,
                    code,
                );
                console.log('new user login')
                await auth().currentUser.linkWithCredential(credential)
                    .then(async(data) => {
                        console.log('data',data)

                        let email = data.user.email
                        let phoneNo = data.user.phoneNumber

                        await database().ref('UsersList/' + data.user.uid).update({
                            email, phoneNo
                        })
                        setTimeout(() => {
                            setLoading(false)
                        }, 3000) 

                        navigation.navigate("App")
                }).catch(error => {
  
                    if (error.code == 'auth/invalid-verification-code') {
                        Alert.alert('Error!', "Check verification code.", [
                            {text: 'Okay'}
                            ])
                        } else {
                        Alert.alert('Error!', "error.", [
                            {text: 'Okay'}
                            ])
                        }
                        setLoading(false)
                        console.log(error)
                })
    
            } 
            catch (error) {
                if (error.code == 'auth/invalid-verification-code') {
                    console.log('Invalid code.');
                    setLoading(false)
                } else {
                    console.log('Account linking error');
                }
            }
        }
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#2e86c1' barStyle="light-content"/>
        {/* <Loader loading={loading} textInfo={textInfo}/> */}

        <View style={styles.header}>
            <Text style={styles.text_header}>Phone no. authentication!</Text>
        </View>
        {/* <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
               // backgroundColor: "#fff"
            }]}
            > */}
            {/* <View style={{bottom:-20}}>
                <LoginSvgOne width={width*1} height={height*0.15} color={'#fff'} ></LoginSvgOne>
            </View> */}

            <View style={styles.footernew}> 
{/* {console.log('confirm',confirm)} */}
            {confirm?
                <View>
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Code</Text>
                    <View style={styles.action}>
                        {/* <Feather 
                            name="lock"
                    //     color={colors.text}
                            size={20}
                        /> */}
                    <TextInput 
                        placeholder="Enter Code"
                        placeholderTextColor="#666666"
                        keyboardType="phone-pad"
                        //secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                    //       color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => {setCode(val)}}
                    />
                 </View>
                </View>:<>
                <Text style={styles.text_footer}>Phone no.</Text>
                <View style={styles.action}>
                    {/* <FontAwesome 
                        name="user-o"
                        // color={colors.text}
                        size={20}
                    /> */}
                    <TextInput 
                        placeholder="Enter phone number"
                        placeholderTextColor="#666666"
                        keyboardType="phone-pad"
                        style={[styles.textInput, {
                          //  color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                       // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {/* {check_textInputChange ? 
                        // <Animatable.View
                        //     animation="bounceIn"
                        // >
                            <Feather 
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        // </Animatable.View>
                        : null
                    } */}
                </View>

                </>}
                




               {isValidPhoneText==='Null'?null:
                    // <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{isValidPhoneText}</Text>
                    // </Animatable.View>
                    }
                
            
       
               
          












            <View style={styles.button}>
                {confirm?
                    <TouchableOpacity
                        onPress={() => {confirmCode(code)}}
                        style={[styles.signIn, {
                            borderColor: '#2e86c1',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#2e86c1'
                        }]}>check</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {loginHandle( phone)}}
                    >
                        {/* <LinearGradient
                            colors={['#87CEEB', '#2e86c1']}
                            style={styles.signIn}
                        > */}
                            <Text style={[styles.textSign, {
                                color:'#000'
                            }]}>Send code</Text>
                        {/* </LinearGradient> */}
                    </TouchableOpacity>
                }
                

                
            </View>
            </View>
        {/* </Animatable.View> */}
      </View>
    );
};
export default PhoneAuth

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
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
     //   paddingHorizontal: 0,
         padding: 0,
         margin: 0
    },
    footernew: {
      flex: 1,
      backgroundColor: '#fff',
      // borderTopLeftRadius: 30,
      // borderTopRightRadius: 30,
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
        fontSize: 18
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
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });


