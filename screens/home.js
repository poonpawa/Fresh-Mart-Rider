import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import NotificationTokenService from "../services/notification-token-service";
import AvailabilitySwitch from "../components/availaibilitySwitch";
import messaging from '@react-native-firebase/messaging';

const home = (props) => {
    let useObj = {}
    const { navigate } = props.navigation;
     const [name, setname] = useState(null)
     

    useEffect(() => {
        setname(firebase.auth().currentUser.displayName)
        //get Token for every logged-in user & store in db
        NotificationTokenService().getTokenAndStore()
        messaging().onMessage((payload) => {
            navigate('orderListing', { payload })
        });
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome {name}</Text>
            <Image  source={require('../assets/Images/RiderClipart.png')} />
            <AvailabilitySwitch />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        color: '#383F51',
        fontSize: 22,
        fontFamily: "NunitoSans-Bold",
        marginTop: 32,
    },
})

export default home
