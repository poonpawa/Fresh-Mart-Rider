import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Geolocation from "../components/geolocation";
import { Button } from "react-native-elements";

export default function address(props) {
    return (
        <View style={styles.container}>
            <Geolocation />
            <Button
                buttonStyle={{ borderRadius: 4, marginVertical: 10, marginHorizontal: 0, backgroundColor: '#C75300',}}
                title='Proceed' onPress={() => props.navigation.navigate('Home')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
