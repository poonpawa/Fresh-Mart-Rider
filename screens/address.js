import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Geolocation from "../components/geolocation";
import { Button } from "react-native-elements";

export default function address(props) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Geolocation />
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.btnProceed}>
                    <Text style={styles.textProceed}>
                        Proceed
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnProceed: {
        width: 300,
        borderRadius: 4,
        backgroundColor: '#C75300',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProceed: {
        color: 'white',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16,
    }
})
