import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from "react-native-elements";
import OrderService from '../services/order-service';
import UserService from "../services/user-service";
import MapView, { Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const tracking = (props) => {
    const [orderData, setorderData] = useState()
    const [riderLocation, setRiderLocation] = useState(null)
    const [buyerLocation, setBuyerLocation] = useState(null)
    let orderId = props.route.params.orderId;
    useEffect(() => {
        OrderService().getOrderData(orderId).then((response) => {
            setorderData(response)
            firestore().collection("Buyers").doc(response.buyerId).get().then((doc) => {
                setBuyerLocation(doc.data()["Location"])
            })
        })

        UserService().getValue('Location').then((data) => {
            setRiderLocation(data)
        })
    }, [])

    const orderDelivered = (orderId) => {
        OrderService().updateData(orderId, 'riderStatus.status', 'Order Delivered')
        props.navigation.navigate('delivered')
    }

    return (
        <View>
            {orderData && buyerLocation && riderLocation ?
                <View style={styles.container}>
                    
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: riderLocation.latitude,
                                longitude: riderLocation.longitude,
                                latitudeDelta: 0.012,
                                longitudeDelta: 0.011,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: buyerLocation.latitude, longitude: buyerLocation.longitude }}
                                title="buyer"
                                image={require('../assets/Icons/Buyer_marker.png')}
                            />
                            <Marker
                                coordinate={{ latitude: riderLocation.latitude, longitude: riderLocation.longitude }}
                                title="Rider"
                                image={require('../assets/Icons/Rider_marker.png')}
                            />
                        </MapView>
                        <View style={styles.timeline}>
                            <Text style={styles.timelineOrderId}>Order ID:{orderId}</Text>
                            <View style={{height: 8, backgroundColor: '#F3F3F3'}}></View>
                            <Text style={styles.timelineAddress}>Address: {orderData.shippingAddress}</Text>
                            <View style={styles.timelineFooter}>
                                <Button buttonStyle={{ borderRadius: 4, backgroundColor: '#C75300', width: '90%', height: 36 }}
                                title='Order Delivered' onPress={() => orderDelivered(orderId)} />
                            </View>
                        </View>
                    </View>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                </View> : null
            }
        </View>
    )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

export default tracking

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 650,
        width: 450,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    timeline: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    timelineFooter: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    timelineAddress: {
        color: '#383F51', 
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        paddingLeft: 16,
        marginTop: 12,
        marginBottom: 12  
    },
    timelineOrderId: {
        color: '#383F51', 
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        paddingLeft: 16,
        marginTop: 12,
        marginBottom: 12
    }
})
