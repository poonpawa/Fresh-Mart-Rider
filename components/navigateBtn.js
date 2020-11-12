import React from 'react'
import { StyleSheet, View, Linking, TouchableOpacity } from 'react-native'
import { Button } from "react-native-elements";
import OrderService from '../services/order-service';

const navigateBtn = (props) => {
    const startNavigation = () => {
        OrderService().getOrderData(props.orderId).then((result) => {
            let coordinates = JSON.parse(result.destination);
            const url = `google.navigation:q=${coordinates._latitude},${coordinates._longitude}`;
            const supported = Linking.canOpenURL(url);
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        })

    }

    return (
        <View>
            <TouchableOpacity onPress={() => startNavigation()} style={styles.btnOrderDetails}>
                <Text style={styles.textOrderDetails}>
                    Navigate
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default navigateBtn

const styles = StyleSheet.create({
    textOrderDetails: {
        color: '#C75300',
        fontFamily: "NunitoSans-Bold",
        fontSize: 14,
    }
})
