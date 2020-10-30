import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import Geolocation from "../components/geolocation";
import NotificationTokenService from "../services/notification-token-service";
import AvailabilitySwitch from "../components/availaibilitySwitch";
import messaging from '@react-native-firebase/messaging';

const home = (props) => {
    let useObj = {}
    const { navigate } = props.navigation;
    const displayName = firebase.auth().currentUser.displayName;

    useEffect(() => {
        //get Token for every logged-in user & store in db
        NotificationTokenService().getTokenAndStore()
        messaging().onMessage((payload) => {
            navigate('orderListing', { payload })
        });
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.heading}>Welcome </Text><Text style={{color: '#C75300', fontSize: 25}}>{displayName}</Text>
            </View>
            <Image style={{marginTop: -100}}
                    source={require('../assets/Images/RiderClipart.png')}
                    style={{ width: 200, height: 250 }}
            />
            
            <AvailabilitySwitch />
            <Geolocation />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        fontFamily: "NunitoSans-SemiBold",
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        color: '#383F51', 
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 25,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    btn: {
        width: 100,
        backgroundColor: "#C75300",
        marginTop: 40
    }
})

export default home
