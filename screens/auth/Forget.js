// import React, { useState } from "react";
// import { Text, View, StatusBar, TouchableOpacity, BackHandler, SafeAreaView, StyleSheet } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Input, Icon } from 'react-native-elements';
// import { Fonts, Colors, Sizes } from "../../constant/styles";
// import { Dimensions } from "react-native";
// import { TransitionPresets } from 'react-navigation-stack';
// import { Component } from "react";
// import { withNavigation } from "react-navigation";

// import axios from "axios";
// const { width } = Dimensions.get("screen");

// class ForgetScreen extends Component {
  
//     componentDidMount() {
//         BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
//     }

//     componentWillUnmount() {
//         BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
//     }

//     handleBackButton = () => {
//         this.props.navigation.goBack();
//         return true;
//     };

//     render() {
//         return (
//             <Forget navigation={this.props.navigation} />
//         )
//     }
// }

// const Forget = ({ navigation }) => {
//     const [password, setPassword] = useState('');
//     const [phone, setPhone] = useState('');
//     function submit(){
//     // axios.post("http://192.168.22.195:5000/mechanic/forget",{password,phone})
//     // .then((res)=>{
//     //     console.log(res)
//     // }).catch((err)=>console.log(err))
    
//    }
//     function backArrowAndSave() {
//         return (
//             <View style={styles.backArrowAndSaveContainerStyle}>
//                 <Ionicons name="arrow-back-outline" size={24} color="black"
//                     onPress={() => navigation.navigate("Verification")}
//                 />
//                 <View >
//                     <Text style={{
//                 ...Fonts.blackColor22Medium,
//                 paddingHorizontal: Sizes.fixPadding * 0.0,
//                 paddingVertical: Sizes.fixPadding * 0.0,
//             }}>Forget Password</Text> 
//                 </View>
//                 <TouchableOpacity activeOpacity={0.9} onPress={() => submit()}>
//                     <Text style={{ ...Fonts.blueColor18Regular }}>
//                         Save
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//     function forget() {
//         return (
//             <View style={styles.textFieldWrapStyle}>
//             <Input 
//                 onChangeText={ val => {setPhone(val)}}
//                 placeholder="Phone"  
//                 leftIcon={ 
//                  <Icon
//                     style={styles.otpFieldsWrapStyle}
//                     type= 'font-awesome'
//                     name='phone'
//                     size={24}
//                     color='black'
//                  />
//                 }  
//                 keyboardType="phone-pad"
//                />
//                 <Input
//                     placeholder="New Password"  
//                     onChangeText={(pass) => {setPassword(pass)}}
//                     leftIcon={ 
//                         <Icon
//                         style={{marginHorizontal:20}}
//                             type= 'font-awesome'
//                             name='lock'
//                             size={24}
//                             color='black'
//                           />
//                         }
//                     secureTextEntry={true}
//                 />
                   
//                 </View>
          
//         )
//     }


//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
//             <StatusBar backgroundColor={Colors.primaryColor} />
//             <View style={{ flex: 1 }}>
                
//                 {backArrowAndSave()}
//                 <View style={{ height:500 ,borderRadius:20,marginVertical:30}}> 
//                 {forget()}
//                 </View>
            
               
//             </View>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     backArrowAndSaveContainerStyle: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginLeft: Sizes.fixPadding * 2.0,
//         marginRight: Sizes.fixPadding,
//         marginTop: Sizes.fixPadding + 5.0
//     },
//     addPhotoContainerStyle: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderColor: 'white',
//         borderWidth: 1.0,
//         backgroundColor: '#FF9800',
//         height: 25.0, width: 25.0,
//         borderRadius: Sizes.fixPadding + 2.0,
//         position: 'absolute',
//         bottom: 5.0,
//         right: 5.0,
//     },
//     profilePhotoWrapStyle: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 50.0,
//         marginBottom: Sizes.fixPadding * 3.0,
//         marginHorizontal: 120,
//         borderRadius: 20,
//     },
//     formDataContainerStyle: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         borderRadius: Sizes.fixPadding - 5.0,
//         height: 65.0,
//         borderColor: '#F6F6F6',
//         elevation: 1,
//         marginHorizontal: Sizes.fixPadding,
//         paddingHorizontal: Sizes.fixPadding * 2.0,
//         marginTop: Sizes.fixPadding + 5.0,
//         borderWidth: 1.0,
//         shadowColor: 'black',
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0.5,
//         shadowRadius: Sizes.fixPadding,
//     },
//     dialogContainerStyle: {
//         borderRadius: Sizes.fixPadding,
//         width: width - 90,
//         alignSelf: 'center',
//         paddingHorizontal: Sizes.fixPadding * 2.0,
//         paddingVertical: Sizes.fixPadding * 2.0
//     },
    
//     bottomSheetStyle: {
//         backgroundColor: 'white',
//         paddingHorizontal: Sizes.fixPadding * 2.0,
//         paddingBottom: Sizes.fixPadding * 2.0,
//         paddingTop: Sizes.fixPadding + 5.0,
//     },
//     profilePhotoStyle: {
//         height: 100.0,
//         width: 100.0,
//         borderRadius: Sizes.fixPadding - 5.0,
        
//     },
//     otpFieldsWrapStyle: {
//         marginHorizontal:15
//     },
//     textFieldWrapStyle: {
//         height: 55.0,
//         width: 335.0,
//         elevation: 1.0,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal:15,
//         marginTop:100
//     },
// })

// ForgetScreen.navigationOptions = () => {
//     return {
//         header: () => null,
//         ...TransitionPresets.SlideFromRightIOS,
//     }
// }

// export default withNavigation(ForgetScreen);