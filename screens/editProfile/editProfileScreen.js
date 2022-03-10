import React, { useState ,useEffect} from "react";
import { Text, View, StatusBar, Image, TouchableOpacity, BackHandler, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Input, Icon } from 'react-native-elements';
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Feather } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { BottomSheet } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import { Component } from "react";
import { withNavigation } from "react-navigation";
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
const { width } = Dimensions.get("screen");

class EditProfileScreen extends Component {
  
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <EditProfile navigation={this.props.navigation} />
        )
    }
}

const EditProfile = ({ navigation }) => {
    const [data, setdata] = useState({});
    let retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // We have data!!
            console.log(value,"u-pro");
            setdata(JSON.parse(value))
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
    };  
    useEffect(()=>{retrieveData()},[])
    
    // const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState("");
    const [img,setimg] = useState('');
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [view, setview] = useState(false);
    const [pickedImage, setPickedImage] = useState('../../assets/images/cam.png');
    const [isBottomSheet, setIsBottomSheet] = useState(false);
    function handle(pic){
        fetch("https://api.cloudinary.com/v1_1/dod9yhmlt/image/upload",{
         body: JSON.stringify(pic),
         headers: {
           'content-type': 'application/json'
         },
         method: 'POST',
       }).then(async r => {
         let data = await r.json()
            console.log(data,"img") 
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
   function submit(){
    axios.post("http://192.168.22.195:5000/mechanic/update",{id:data.mechanic_id,email,password,phone,img})
    .then((res)=>{
        console.log(res)
    }).catch((err)=>console.log(err))
    navigation.goBack()
   }
    function backArrowAndSave() {
        return (
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                    onPress={() => navigation.pop()}
                />
                <View >
                    <Text style={{
                ...Fonts.blackColor22Medium,
                paddingHorizontal: Sizes.fixPadding * 0.0,
                paddingVertical: Sizes.fixPadding * 0.0,
            }}>EditProfile</Text> 
                </View>
                <TouchableOpacity activeOpacity={0.9} onPress={() => submit()}>
                    <Text style={{ ...Fonts.blueColor18Regular }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function profilePhoto() {
        return (
            <TouchableOpacity style={styles.profilePhotoWrapStyle} onPress={() => setIsBottomSheet(true)}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View onPress={()=>setview(true)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                           
                           { view?  <Image source={{uri:pickedImagePath}}
                             style={styles.profilePhotoStyle}
                             resizeMode="cover"
                             
                         />:<Image source={require('../../assets/images/cam.png')}
                             style={styles.profilePhotoStyle}
                             resizeMode="cover"
                             
                         />}
                         </View>
                    <View
                        activeOpacity={0.9}
                        
                        style={styles.addPhotoContainerStyle}>
                        <Ionicons name="ios-add" size={20} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    function editprofile() {
        return (
            <View style={styles.textFieldWrapStyle}>
            <Input 
                onChangeText={ val => {setEmail(val)}}
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
                    onChangeText={(pass) => {setPassword(pass)}}
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
                onChangeText={ val => {setPhone(val)}}
                placeholder="Phone"  
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
                    {/* <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%' }}>
                        <Input
                            selectionColor={Colors.primaryColor}
                            onChangeText={(value) => setChangeEmail(value)}
                            style={{ ...Fonts.blackColor17Medium, paddingBottom: Sizes.fixPadding }}
                        />
                    </View> */}
                   
                </View>
          
        )
    }

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                
                {backArrowAndSave()}
                <View style={{ height:500 ,borderRadius:20,marginVertical:30}}> 
                {profilePhoto()}
                {editprofile()}
                </View>
                {showBottomSheet()}
               
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backArrowAndSaveContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0
    },
    addPhotoContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1.0,
        backgroundColor: '#FF9800',
        height: 25.0, width: 25.0,
        borderRadius: Sizes.fixPadding + 2.0,
        position: 'absolute',
        bottom: 5.0,
        right: 5.0,
    },
    profilePhotoWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50.0,
        marginBottom: Sizes.fixPadding * 3.0,
        marginHorizontal: 120,
        borderRadius: 20,
    },
    formDataContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: Sizes.fixPadding - 5.0,
        height: 65.0,
        borderColor: '#F6F6F6',
        elevation: 1,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        borderWidth: 1.0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        alignSelf: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    profilePhotoStyle: {
        height: 100.0,
        width: 100.0,
        borderRadius: Sizes.fixPadding - 5.0,
        
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
})

EditProfileScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EditProfileScreen);