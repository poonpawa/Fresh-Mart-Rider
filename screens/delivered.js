import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

const delivered = (props) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/Icons/OrderDelivered.png')}
                style={{ width: 72, height: 72 }}
            />
            <Text style={styles.heading}>Order Delivered</Text>
            <Text style={styles.title}>Your Order was Delivered</Text>
            <Text style={styles.linkText} onPress={() => props.navigation.navigate('Home')}>Deliver Another Order</Text>
        </View>
    )
}

export default delivered

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white'
    },
    heading: {
        color: '#383F51', 
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 18,
        marginTop: 16,
    },
    title: {
        color: '#6A748A', 
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 16,
    },
    linkText: {
        color: '#C75300',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16,
        marginTop: 12
    }
})
