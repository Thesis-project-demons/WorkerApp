import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, BackHandler, TouchableOpacity, Dimensions ,Alert} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { Bounce } from 'react-native-animated-spinkit';
import { Input, Icon } from 'react-native-elements';
const { width } = Dimensions.get('screen');
import { AsyncStorage } from 'react-native';
import axios from 'axios'
class VerificationScreen extends Component {
    state = {
        isLoading: false,
        password: '',
        id:null,
    }
    componentDidMount() {
        this.setState({id:this.props.navigation.state.params.id})
        // .getParam((res)=>{console.log(res)})
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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.backArrow()}
                        {this.verificationInfo()}
                        {this.otpFields()}
                        {this.resendInfo()}
                        {this.submitButton()}
                    </ScrollView>
                </View>
                {this.loading()}
            </SafeAreaView>
        )
    }

    resendInfo() {
        return (
            <View style={styles.resendInfoWrapStyle}>
                <Text style={{ ...Fonts.grayColor15Medium }}>
                    Didn't receive OTP Code!
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                    Resend
                </Text>
            </View>
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Bounce size={40} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    otpFields() {
        return (
            <View >
                <View style={styles.textFieldWrapStyle}>
                    <Input
                        placeholder="Password"  
                        onChangeText={(text) => {
                            this.setState({ password: text })
                        }}
                        leftIcon={ 
                            <Icon
                            style={styles.otpFieldsWrapStyle}
                                type= 'font-awesome'
                                name='lock'
                                size={24}
                                color='black'
                              />
                            }
                        secureTextEntry={true}
                    />
                </View>
            </View>
        )
    }

    submitButton() {
        const Password=()=>{
            // this.setState({ isLoading: true })
            setTimeout(()=>{
                axios.post("http://192.168.22.163:5000/mechanic/login/password",{id:this.state.id,password:this.state.password})
                .then((res)=>{
                   console.log(res.data)
                   if(res.data.msg === "Logged in!"){
                    // this.setState({isLoading:false})
                    this.props.navigation.navigate('BottomTabBar');
                     let storeData = async () => {
                       try {
                         await AsyncStorage.setItem('user',JSON.stringify(res.data.user));
                       } catch (error) {
                         // Error saving data
                         console.log(error)
                       }
                     };
                     storeData()
                   }else{
                     Alert.alert(res.data.msg)
                   }
                }).catch(err=>console.log(err))
            },2000)
            
        }
                //   _retrieveData = async () => {this.props.navigation.navigate('BottomTabBar')
                //     try {
                //       const value = await AsyncStorage.getItem('TASKS');
                //       if (value !== null) {
                //         // We have data!!
                //         console.log(value);
                //       }
                //     } catch (error) {
                //       // Error retrieving data
                //       console.log(error)
                //     }
                //   };
       
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={Password}
                style={{ ...styles.submitButtonStyle }}>
                <Text style={{ ...Fonts.whiteColor18Medium }}>
                    Submit
                </Text>
            </TouchableOpacity >
        )
    }

    verificationInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor22Medium }}>
                    Verification
                </Text>
                <Text style={{ ...Fonts.grayColor15Medium, marginTop: Sizes.fixPadding }}>
                    Enter the OTP code from the phone we just sent you.
                </Text>
            </View>
        )
    }

    backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                style={{ margin: Sizes.fixPadding * 2.0 }}
                onPress={() => this.props.navigation.goBack()}
            />
        )
    }
}

const styles = StyleSheet.create({
    submitButtonStyle: {
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.primaryColor,
        marginTop: Sizes.fixPadding * 3.0
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
        marginHorizontal:15
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 60,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    resendInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: Sizes.fixPadding * 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    }
})

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(VerificationScreen);