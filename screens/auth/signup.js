import React, { Component, useState, useEffect} from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler,
    ScrollView,
    Picker,
    Keyboard
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { NavigationEvents } from 'react-navigation';
import { Input, Icon } from 'react-native-elements';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
const { height } = Dimensions.get('screen');
// import Close from "@material-ui/icons/Close";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

class SigninScreen extends Component {
   
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this)); 
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    render() {
        return (
            <>
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <Signin navigation={this.props.navigation} />
            </>
        )
    }
}

const Signin = ({ navigation }) => {
    
    const [email,setemail] = useState('');
    const [pass,setpass] = useState('');
    const [img,setimg] = useState('');
    const [ID,setID] = useState('');
    const [Ip,setIp] = useState('');
    const [alert,setalert] = useState('');
    const [togglealert,settogglealert] = useState(false);

    const [change,setchange] = useState(true);
    const [change2,setchange2] = useState(false);
    const [change3,setchange3] = useState(false);
    const [isBottomSheet,setIsBottomSheet] = useState(false);
    const [view, setview] = useState(false);

    const [nameplace,setnameplace] = useState('');
    const [address,setaddress] = useState('');
    const [location,setlocation] = useState('');
    const [phone,setphone] = useState('');  
    const [cordinate,setcordinate] = useState('');  
    // const [pepleCount,setpepleCount] = useState(0);  
    // const [stars,setstars] = useState(0);  
    const [value,setvalue] = useState('Service Technicians');
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [pickedImage, setPickedImage] = useState('../../assets/images/cam.png');
    const [errorMsg, setErrorMsg] = useState('');
    console.log(cordinate,"ff",errorMsg)
    console.log(value)
    console.log(phone)
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setchange(true)
            setchange2(false)
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setcordinate(location);
        })();
      }, []);
      let text = 'Waiting..';
      if (errorMsg) {
        setalert(errorMsg);
      } else if (cordinate) {
        text = JSON.stringify(cordinate);
        // setlatitude(text.coords.latitude)
      }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {deliveryBoyImage()}
                    {signinInfo()}
                    {EmailInfo()}
                    {change?continueButton():null}
                    {change2?continueButton2():null}
                    {change3?continueButton3():null}
                    {otpInfo()}
                    {/* {profilePhoto()} */}
                    {showBottomSheet()}
                    {/* {loginWithFacebookButton()}
                    {loginWithGoogleButton()} */}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
    function handle(pic){
           fetch("https://api.cloudinary.com/v1_1/dod9yhmlt/image/upload",{
            body: JSON.stringify(pic),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          }).then(async r => {
            let data = await r.json()
            //    console.log(data,"img") 
             setimg(data.url);
          }).catch(err => console.log(err))
      }
    async function showImagePicker(){
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            settogglealert("You've refused to allow this appp to access your photos!");
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            base64:true,
            allowsEditing: true,
            aspect: [4, 3]
        });
        // Explore the result
        console.log(result);
        if(result){
            setIsBottomSheet(false)
            setview(true)
        }
        if (!result.cancelled) {
             setPickedImagePath(result.uri);
             let base64Img = `data:image/jpg;base64,${result.base64}`;
            let data = {
            "file": base64Img,
            "upload_preset": "iyhf8gx0",
            }
          handle(data)
         
        }
      }
      async  function openCamera  ()  {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
          settogglealert("You've refused to allow this appp to access your camera!");
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
            base64:true,
            allowsEditing: true,
            aspect: [4, 3]
        });
        // Explore the result
        console.log(result);
        if(result){
            setIsBottomSheet(false)
            setview(true)

        }
        if (!result.cancelled) {
          setPickedImagePath(result.uri);
          let base64Img = `data:image/jpg;base64,${result.base64}`;
            let data = {
            "file": base64Img,
            "upload_preset": "iyhf8gx0",
            }
          handle(data)
        }
      }
    // function loginWithGoogleButton() {
    //     return (
    //         <View style={styles.loginWithGoogleButtonStyle}>
    //             <Image
    //                 source={require('../../assets/images/google.png')}
    //                 style={{ width: 28.0, height: 28.0, marginRight: Sizes.fixPadding + 5.0 }}
    //                 resizeMode="cover"
    //             />
    //             <Text style={{ ...Fonts.blackColor18Medium }}>
    //                 Log in with Google
    //             </Text>
    //         </View>
    //     )
    // }

    // function loginWithFacebookButton() {
    //     return (
    //         <View style={styles.loginWithFacebookButtonStyle}>
    //             <Image
    //                 source={require('../../assets/images/facebook.png')}
    //                 style={{ width: 28.0, height: 28.0, marginRight: Sizes.fixPadding + 5.0 }}
    //                 resizeMode="cover"
    //             />
    //             <Text style={{ ...Fonts.whiteColor18Medium }}>
    //                 Log in with Facebook
    //             </Text>
    //         </View>
    //     )
    // }

    function otpInfo(){
        return (
            <Text style={{
                ...Fonts.grayColor17Medium,
                textAlign: 'center',
                marginTop: Sizes.fixPadding,
            }}>
                We Hope That You're Like Our Service
            </Text>
        )
    }
     
    function continueButton() {
        const First=()=>{
            // if(email.length < 6 && pass.length < 8 && ID.length === 0 && img.length === 0){
            //     console.log(email,"sucsses")
            //     // setalert("Insert your Info")
            //     // settogglealert(true)
            // } else if(email.length < 6 ){
            //     // setalert("Not Valid Email")
            //     // settogglealert(true)
            // } else if(pass.length < 8 ){
            //     // setalert("Not Valid Password It shold contain 8 characters")
            //     // settogglealert(true)
            // } else if(ID.length === 0 ){
            //     // setalert("Tell Us ID Your-Self ")
            //     // settogglealert(true)
            // }  else if(pickedImagePath.length === 0 ){
            //     // setalert("Select Picture")
            //     // settogglealert(true)
            // } else if(cordinate.length === 0 ){
            //     // setalert("Allow The Location")
            //     // settogglealert(true)
            // }else{
            //     // setchange(false)  setchange2(true)
            // }
            setchange(false)
            setchange2(true)
           
        }
   
      
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={First}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function continueButton2() {     
        const Second=()=>{
            // if(address.length < 3 && location.length < 8 && value.length === 0){
                // setalert("Insert your Info")
                // settogglealert(true)
            // } else if(address.length < 3 ){
                // setalert("Not Valid Address")
                // settogglealert(true)
            // } else if(location.length < 8 ){
                // setalert("Not Valid Location")
                // settogglealert(true)
            // } else if(value.length === 0){
                // setalert("Select catougery")
                // settogglealert(true)
            // }else if(phone.length<8){
                // setalert("Set Valid Phone")
                // settogglealert(true)
            // }else{
                
                // setchange(false)
            // }
            setchange2(false)
            setchange3(true)
        }
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={Second}
                style={styles.continueButtonStyle2}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }
    function continueButton3() {
        const Thierd=()=>{
            // if(address.length < 3 && location.length < 8 && isSelected === false ){
                // console.log(email,"sucsses")
                // setalert("Insert your Info")
                // settogglealert(true)
            // } else if(address.length < 3 ){
                // setalert("Not Valid Address")
                // settogglealert(true)
            // } else if(location.length < 8 ){
                // setalert("Not Valid Location")
                // settogglealert(true)
            // } else if(!isSelected){
                // setalert("Select catougery")
                // settogglealert(true)
            // }else{
                // setchange(false)
                axios.post()
            // }
            navigation.navigate('BottomTabBar');
        }
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={Thierd}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }
    function signinInfo() {
        return (
            <Text style={{
                ...Fonts.grayColor17Medium, textAlign: 'center',
                marginBottom: Sizes.fixPadding + 4.0
            }}>
                SignUp with Us
            </Text>
        )
    }

    function deliveryBoyImage() {
        return (
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.deliveryBoyImageStyle}
                resizeMode="cover"
            />
        )
    }

    function EmailInfo() {
      return (
        <View style={styles.textFieldWrapStyle}>
            {change?
            <View style={styles.textFieldWrapStyle}>
                <Input 
                    onChangeText={ val => {setemail(val);settogglealert(false)}}
                    placeholder="Email"  
                    leftIcon={ 
                <Icon
                    style={styles.otpFieldsWrapStyle}
                    type= 'font-awesome'
                    name='at'
                    size={24}
                    color='black'
                />
                 }  />
                    <Input
                        placeholder="Password"  
                        onChangeText={(pass) => {setpass(pass);settogglealert(false)}}
                        leftIcon={ 
                            <Icon
                            style={{marginHorizontal:20}}
                                type= 'font-awesome'
                                name='lock'
                                size={24}
                                color='black'
                              />
                            }
                        secureTextEntry={true}
                    />
                   <Input 
                    onChangeText={ val => {setID(val);settogglealert(false)}}
                    placeholder="ID"  
                    multiline={true}
                    numberOfLines={10}
                    leftIcon={ 
                     <Icon
                        style={styles.otpFieldsWrapStyle}
                        type= 'font-awesome'
                        name='id-card'
                        size={24}
                        color='black'
                     />
                    }  
                    keyboardType="phone-pad"
                   />

                  <View  style={{
                    fontSize: 14.0,fontFamily: 'Roboto_Medium', textAlign: 'center',
                    marginBottom: Sizes.fixPadding}}>
                    {togglealert? 
                        <Text style={{color:'red'}}   > 
                            <Ionicons
                                name="close" 
                                size={20}
                                style={{textAlign: 'center',
                                marginBottom: Sizes.fixPadding, color:"red"}}
                            /> 
                            {alert}
                        </Text> 
                     :null
                    }
                    <Text style={{marginTop:-20}}>Picture For Your ID</Text>
                  </View>
                  
                <TouchableOpacity onPress={()=>setIsBottomSheet(true)}>     
                    <View style={styles.profilePhotoWrapStyle}>
                        
                        <View onPress={()=>setview(true)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                           
                          { view?  <Image source={{uri:pickedImagePath}}
                            style={styles.profilePhotoStyle}
                            resizeMode="cover"
                            
                        />:<Image source={require('../../assets/images/cam.png')}
                            style={styles.profilePhotoStyle}
                            resizeMode="cover"
                            
                        />}
                   
                            <View
                                activeOpacity={0.9}
                                style={styles.addPhotoContainerStyle}
                                >
                                <Ionicons name="ios-add" size={15} color="white" />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            :null}

            {
            change2?
                <View style={styles.textFieldWrapStyle2}>
                    <Input
                        placeholder="Address"  
                        onChangeText={(pass) => {setaddress(pass);settogglealert(false)}}
                        leftIcon={ 
                            <Icon
                            style={styles.otpFieldsWrapStyle}
                                type= 'font-awesome'
                                name='address-card'
                                size={24}
                                color='black'
                              />
                            }
                    />
                   <Input 
                        onChangeText={ val => {setlocation(val);settogglealert(false)}}
                        placeholder="Location"  
                        // multiline={true}
                        numberOfLines={10}
                        leftIcon={ 
                            <Icon
                                type= 'font-awesome'
                                style={styles.otpFieldsWrapStyle}
                                name='location-arrow'
                                size={24}
                                color='black'
                            />
                        }  
                   />
                     <Input
                        placeholder="Name Place"  
                        onChangeText={(pass) => {setnameplace(pass);settogglealert(false)}}
                        leftIcon={ 
                            <Icon
                            style={styles.otpFieldsWrapStyle}
                                type= 'font-awesome'
                                name='tag'
                                size={24}
                                color='black'
                            />
                        }
                    />
                     <Input
                        placeholder="Phone"  
                        onChangeText={(pass) => {setphone(pass);settogglealert(false)}}
                        leftIcon={ 
                            <Icon
                            style={styles.otpFieldsWrapStyle}
                                type= 'font-awesome'
                                name='phone'
                                size={24}
                                color='black'
                            />
                        }
                        keyboardType="phone-pad"
                    />
                    <View  style={{
                        fontSize: 14.0,fontFamily: 'Roboto_Medium', textAlign: 'center',
                        marginBottom: Sizes.fixPadding}}>
                        {togglealert? 
                            <Text style={{color:'red'}}   > 
                                <Ionicons
                                    name="close" 
                                    size={20}
                                    style={{textAlign: 'center',
                                    marginBottom: Sizes.fixPadding, color:"red"}}
                                /> 
                                {alert}
                            </Text> 
                        :null
                        }
                    </View>
                    <View > 
                        <View style={styles.container}>
                            <Picker
                              selectedValue={value}
                              style={{ height: 70, width: 370,marginBottom:105,
                                color: '#9E9E9E',fontSize: 16.0,fontFamily: 'Roboto_Medium',
                                
                              }}
                              onValueChange={(itemValue, itemIndex) => setvalue(itemValue)}
                            >
                              <Picker.Item label="Service Technicians" value="Service Technicians" />
                              <Picker.Item label="Brake and Transmission Technicians" value="Brake and Transmission Technicians" />
                              <Picker.Item label="Body Repair Technicians" value="Body Repair Technicians" />
                              <Picker.Item label="Vehicle Refinishers" value="Vehicle Refinishers" />
                              <Picker.Item label="Vehicle Inspectors" value="Vehicle Inspectors" />
                            </Picker>
                        </View>
                   </View>
                </View>
            :null
           }

{
            change3?
                <View style={styles.textFieldWrapStyle2}>
                    <Input
                        placeholder="Address"  
                        onChangeText={(pass) => {setaddress(pass);settogglealert(false)}}
                        leftIcon={ 
                            <Icon
                            style={styles.otpFieldsWrapStyle}
                                type= 'font-awesome'
                                name='address-card'
                                size={24}
                                color='black'
                            />
                        }
                        
                    />
                   <Input 
                        onChangeText={ val => {setlocation(val);settogglealert(false)}}
                        placeholder="Location"  
                        numberOfLines={10}
                        leftIcon={ 
                            <Icon
                                type= 'font-awesome'
                                style={styles.otpFieldsWrapStyle}
                                name='location-arrow'
                                size={24}
                                color='black'
                            />
                        }  
                   />
                  
                    <View  style={{
                        fontSize: 14.0,fontFamily: 'Roboto_Medium', textAlign: 'center',
                        marginBottom: Sizes.fixPadding}}>
                        {togglealert? 
                            <Text style={{color:'red'}}   > 
                                <Ionicons
                                    name="close" 
                                    size={20}
                                    style={{textAlign: 'center',
                                    marginBottom: Sizes.fixPadding, color:"red"}}
                                /> 
                                {alert}
                            </Text> 
                        :null
                        }
                    </View>
                   
                </View>
            :null
           }
        </View>
        )
    }
    // function profilePhoto() {
    //     return (
    //         <View style={styles.profilePhotoWrapStyle}>
    //             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //                 <Image source={require('../../assets/images/cam.png')}
    //                     style={styles.profilePhotoStyle}
    //                     resizeMode="cover"
    //                 />
    //                 <TouchableOpacity
    //                     activeOpacity={0.9}
    //                     onPress={() => setIsBottomSheet(true)}
    //                     style={styles.addPhotoContainerStyle}>
    //                     <Ionicons name="ios-add" size={20} color="white" />
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     )
    // }
    function showBottomSheet() {

        return (
            <BottomSheet
                isVisible={isBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    // onPress={() => setIsBottomSheet(false)}
                    style={styles.bottomSheetStyle}
                >

                    <Text style={{ ...Fonts.blackColor19Medium, textAlign: 'center', marginBottom: Sizes.fixPadding * 2.0 }}>
                        Choose Option
                    </Text>
                    <TouchableOpacity onPress={()=>{openCamera()}}  >
                    <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-camera" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View></TouchableOpacity>
                      <TouchableOpacity onPress={()=>{showImagePicker()}}  >
                    <View  style={{ flexDirection: 'row', marginTop: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setIsBottomSheet(false)}}  >
                    <View  style={{ flexDirection: 'row', marginTop: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                           cancel
                        </Text>
                    </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </BottomSheet>
        )
    }
}

const styles = StyleSheet.create({
    selectAreaModalStyle: {
        height: height - 200.0,
        width: 170.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0
    },
    phoneNumberTextFieldStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        height: 55.0,
        backgroundColor: Colors.whiteColor,
        marginTop: Sizes.fixPadding,
    },
    loginWithGoogleButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    loginWithFacebookButtonStyle: {
        backgroundColor: '#3B5998',
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 5.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 18.0,
    },
    deliveryBoyImageStyle: {
        height: 150.0,
        width: 220.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 1.0,
        marginBottom: Sizes.fixPadding * 3.0
    },
    otpFieldsWrapStyle: {
        marginHorizontal:15
    },
    textFieldWrapStyle: {
        height: 55.0,
        width: 335.0,
        elevation: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:15,
        marginTop:100
    },
     textFieldWrapStyle2: {
        height: 55.0,
        width: 335.0,
        elevation: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:15,
        marginTop:100
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    profilePhotoStyle: {
        height: 70.0,
        width: 70.0,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 4.0,
    },
    profilePhotoWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8.0,
        marginBottom: Sizes.fixPadding * 4.0,
    },
      addPhotoContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1.0,
        backgroundColor: '#FF9800',
        height: 16.0, width: 15.0,
        borderRadius: Sizes.fixPadding + 2.0,
        position: 'absolute',
        bottom: 2.0,
        right: 1.0,
    },
   
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop:5,
       width:30
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
      continueButtonStyle2:{
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 28.0,
      }
})

SigninScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SigninScreen);