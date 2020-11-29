import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import OrderService from '../services/order-service'
import firebase from "@react-native-firebase/app"
import { ListItem, Button, Text } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';

const orderHistory = (props) => {
    const isFocused = useIsFocused();
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
        OrderService().getAllOrders(userId).then((data) => {
            setOrders(data)
        })
    },[isFocused])


    return (
        <View style={styles.container}>
            <Text style={styles.fixHead}>Order history</Text>
            <ScrollView>
                <Text style={styles.head}>PREVIOUS ORDERS</Text>
                <View>
                    {
                        orders.map((item, key) => (

                            <View key={key} style={styles.previousContainer}>
                                <View style={styles.eachOrder}>
                                    <Text style={styles.firstTitle}>Order Id: {item.id}</Text>
                                    <Text style={styles.secondTitle}>Store: {item.store}</Text>
                                    <Text style={styles.lastTitle}>Amount Paid: € {item.totalPrice}</Text>
                                </View>
                            </View>

                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        height: '100%'
    },
    fixHead: {
        color: '#383F51',
        textAlign: 'center',
        fontFamily: "NunitoSans-Bold",
        fontSize: 22,
        height: 60,
        lineHeight: 60,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1,
        backgroundColor: 'white'
    },
    previousContainer: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16
    },
    head: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 14,
        marginTop: 12,
        marginBottom: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    firstTitle: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 15,
        marginTop: 12,
    },
    secondTitle: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 15,
        marginTop: 8
    },
    lastTitle: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 15,
        marginTop: 8,
        marginBottom: 16,
    },
    eachOrder: {
        borderBottomColor: '#ECECF6',
        borderBottomWidth: 1,   
    }
})

export default orderHistory
