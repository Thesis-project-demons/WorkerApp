import React ,{useState,useEffect}from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { AsyncStorage } from 'react-native';

// const historyOrdersList = [
//     {
//         id: '1',
//         orderId: 'OID123456789',
//         paymentMethod: 'Cash on Delivery',
//         payableAmount: 8.50,
//         pickupAddress: '28 Mott Stret',
//         deliveryAddress: '56 Andheri East'
//     },
//     {
//         id: '2',
//         orderId: 'OID123789654',
//         paymentMethod: 'Payed',
//         payableAmount: 12.50,
//         pickupAddress: '91 Opera Street',
//         deliveryAddress: '231 Abc Circle'
//     },
//     {
//         id: '3',
//         orderId: 'OID957546521',
//         paymentMethod: 'Pated',
//         payableAmount: 15.00,
//         pickupAddress: '28 Mott Stret',
//         deliveryAddress: '91 Yogi Circle'
//     },
//     {
//         id: '4',
//         orderId: 'OID652347952',
//         paymentMethod: 'Cash on Delivery',
//         payableAmount: 7.90,
//         pickupAddress: '28 Mott Stret',
//         deliveryAddress: '54 Xyz...'
//     },
//     {
//         id: '5',
//         orderId: 'OID658246972',
//         paymentMethod: 'Cash on Delivery',
//         payableAmount: 19.90,
//         pickupAddress: '29 Bar Street',
//         deliveryAddress: '56 Andheri East'
//     }
// ];

const HistoryOrders = () => {
    const [newOrdersList, setNewOrderList] = useState([]);

    useEffect(()=>{
        axios.get("http://192.168.1.102:5000/mechanic/reservation")
        .then((res)=>{setNewOrderList(res.data) })
        .catch(err=>console.log(err))
    },[])
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

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            {orders()}
        </View>
    )
//  if(data.mechanic_id === item.mechanic_id ){
    // if( item.response === "accept" || item.response === "refuser"){ 
        // parse=item.reservation.split(',')
    function orders() {
      let parse;
        console.log(newOrdersList,"fil")
        const renderItem = ({ item }) => {
            if(data.mechanic_id === item.mechanic_id ){
            if(item.response.toLowerCase() == "accept" || item.response == "refuser"){
                parse=item.reservation.split(',')
                return(
                    <View style={styles.orderDetailWrapStyle}>
                    {console.log(item.id,"dd")}
                    <View style={styles.orderAndPaymentDetailWrapStyle}>
                        <View style={{ flexDirection: 'row' }}>
                            
                            <View style={{ marginLeft: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.blackColor18Medium }}>
                                    {item.id}
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding + 10.0 }}>
                                    <Text style={{ ...Fonts.grayColor16Medium }}>
                                        Payment Mode
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor18Medium }}>
                                        Cash
                                    </Text>
                                </View>
                            </View>
                        </View>
    
                        <View>
                            <View
                                activeOpacity={0.9}
                                style={styles.deliveredButtonStyle}>
                                <Text style={{ ...Fonts.whiteColor18Medium }}>
                                    {item.response}
                                </Text>
                            </View>
    
                           
                        </View>
                    </View>
                {/* grey  */}
              
                    <View style={styles.deliveryAndPickupAddressWrapStyle}>
                        <Text style={{
                            ...Fonts.blackColor16Medium,
                            flex: 0.31,
                        }}>
                            
                             {console.log(parse)}
                            {parse[0]}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 0.31,
                        }}>
                            <View style={styles.deliveryAndPickupAddressWrapStyle}>
                                <Text style={{
                                    ...Fonts.blackColor16Medium,
                                    flex: 1,
                                }}>
                                  {parse[1]}
                                </Text>
                            </View>
                         
                        </View>
                        <Text style={{
                            ...Fonts.blackColor16Medium,
                            flex: 0.31,
                        }}>
                           {parse[2]}
                        </Text>
                    </View>
                </View>
                )
            }else{
                return(
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F4' }}>
                        <MaterialCommunityIcons name="shopping" size={60}
                        color={Colors.grayColor}
                        />
                    </View>
                )
            }
        }
    }

        return (
            <FlatList
                data={newOrdersList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding,
                    paddingBottom: Sizes.fixPadding * 6.0,
                }}
            />
        )

}}

const styles = StyleSheet.create({
    dotStyle: {
        height: 5.0, width: 5.0,
        borderRadius: 2.5,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 7.0
    },
    deliveredButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    deliveryAndPickupAddressWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        flexDirection: 'row',
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
    },
    orderAndPaymentDetailWrapStyle: {
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: 'space-between'
    },
    orderDetailWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    }
})

export default HistoryOrders;