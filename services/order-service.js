import React from 'react'
import firestore from '@react-native-firebase/firestore'
import UserService from "../services/user-service";
import firebase from "@react-native-firebase/app";

const OrderService = () => {
    const createOrderCollection = async (orderId, orderdata) => {
        let orderDbData = await firestore().collection('Orders').doc(orderId).get();
        let riderID = firebase.auth().currentUser.uid;
        let orderData = JSON.parse(orderdata.buyer);
        let riderData = await UserService().getRiderData(riderID)
        let products = JSON.parse(orderdata.products);
        

        //check wheather the order data already exits
        if (!orderDbData.exists) {
            return await firestore().collection('Orders').doc(orderId).set({
                id: orderdata.orderNumber,
                shippingAddress: orderData.address,
                store: orderdata.store,
                riderStatus: {
                    status: 'Rider Assigned',
                    timeUpdated: orderdata.time
                },
                destination: orderData.location,
                riderToken: riderData.NotificationTokens,
                riderId: riderID,
                buyerId: orderData.id,
                buyerToken: orderData.token,
                riderName: riderData.Name,
                riderPhone: '0987865637',
                products: JSON.parse(orderdata.products),
                totalPrice: orderdata.totalprice,
                active: true
            })
        }
    }

    const getOrderData = async (id) => {
        let data;
        await firestore().collection('Orders').doc(id).get().then((doc) => {
            data = doc.data();
        })
        return data;
    }

    //To update values in  order collection
    const updateData = (orderId, key, value) => {
        if (value) {
            let data = {}
            data[key] = value
            firestore().collection('Orders').doc(orderId).update(data)
        }
    }

    const getAllOrders = async (riderId) => {
        let allOrders = [];
        await firestore().collection('Orders').where('riderId', '==', riderId).get().then((doc) => {
            doc.forEach(item => {
                allOrders.push(item.data())
            });
        })
        return allOrders
    }

    return {
        getOrderData, updateData, getAllOrders, createOrderCollection
    }
}

export default OrderService
