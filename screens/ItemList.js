import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from "react-native-elements";
import ReachedStoreBtn from "../components/reachedStoreBtn";
import UserService from '../services/user-service';
import OrderService from '../services/order-service';
import * as _ from 'lodash';

const ItemList = ({ navigation }) => {
    const [productData, setProductData] = useState([])
    useEffect(() => {
        UserService().getValue('orderID').then((id) => {
            OrderService().getOrderData(id).then((data) => {
                console.log('productData' + data);
                if (!_.isObject(data.products)) {
                    data.products = JSON.parse(data.products)
                } 
                setProductData(data);
                
                
            })
        })
    }, [])

    return (
        <View style={styles.container}>
            {productData? <View>
                {
                productData.products && productData.products.map((prop, key) => {
                    {
                        return (
                            <View style={styles.eachproduct}
                                key={prop.ProductId}>
                                <Text style={styles.eachproductName}>
                                    {prop.quantity} x {prop.ProductName}
                                </Text>
                                <Text style={styles.eachproductPrice}>
                                € {prop.Price} 
                                </Text>
                            </View>
                        )
                    }
                })
            }
            <View style={styles.itemsTotalContainer}>
                <Text style={styles.itemsTotal}>Items Total</Text>
                <Text style={styles.itemsTotalPrice}> € {productData.totalPrice}</Text>
            </View>
            <ReachedStoreBtn orderId={productData.id} navigate={navigation.navigate} />

        </View> : null
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        height: '100%'
    },
    eachproduct: {
        flexDirection: 'row',
        borderColor: 'transparent',
        borderBottomColor: '#EFF2F9',
        borderWidth: 1,
        marginTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eachproductName: {
        fontSize: 16,
        color: '#3C465E',
        fontFamily: "NunitoSans-SemiBold",
    },
    eachproductPrice: {
        textAlign: 'right',
        color: '#3C465E',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16,
    },
    itemsTotalContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemsTotal: {
        color: '#383F51',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 16,
    },
    itemsTotalPrice: {
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16
    }
})

export default ItemList
