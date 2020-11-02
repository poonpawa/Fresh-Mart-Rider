import React, { useState, useEffect } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import UserService from "../services/user-service";

const availaibilitySwitch = () => {
    let [isEnabled, setIsEnabled] = useState();

    useEffect(() => {
        UserService().getValue('IsAvailable').then((val) => {
            //to set the initial val from DB
            setIsEnabled(val)
        })
    }, [])


    const toggleSwitch = (value) => {
        setIsEnabled(previousState => !previousState);
        UserService().SetAvailability(value)
    }

    return (
        <View style={styles.container}>
        
        {!isEnabled? 
            <View style={{ alignItems: 'center'}}>
                <Text>You are offline</Text>
                <Text>You need to be online to start deliverying</Text>
            </View>
            :
            <View style={{alignItems: 'center'}}>
                <Text style={{color: 'blue'}}>You are now online</Text>
            </View>
        }
            <View style={styles.content}>
                <Text style={styles.switchText}>Start Delivering</Text>
                <View style={styles.switch}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#000000" }}
                        thumbColor={isEnabled ? "#C75300" : "#1aa3ff"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        
        </View>
     )}   

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        height: 100,
        padding: 20,
        flex: 1
    },
    switchText: {
        fontSize: 20,
        fontFamily: "NunitoSans-SemiBold",
        paddingHorizontal: 10
    },
    content: {
        flexDirection: 'row',
        width: 200,
        fontSize: 20,
    },
    switch: {
        width: 50
    }
})

export default availaibilitySwitch
