import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';

const account = (props) => {

    const signOut = (navigate) => {
        auth().signOut()
            .then(() => {
                console.log('User signed out!')
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        key: null,
                        routes: [{name: 'Login'}]
                    })
                )
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.fixHead}>Account</Text>
            <ScrollView>
                <Text style={styles.head}>ACCOUNT</Text>
                <View>
                    <ListItem
                        title={'Logout'}
                        titleStyle={{ color: '#6A748A', fontFamily: "NunitoSans-SemiBold",fontSize: 16, }}
                        onPress={() => { signOut(props.navigation.navigate) }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default account

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
    head: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 14,
        marginTop: 12,
        marginBottom: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
})
