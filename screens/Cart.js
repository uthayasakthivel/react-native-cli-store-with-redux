import { Image, FlatList, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import Icon from 'react-native-vector-icons/AntDesign'
// import { useDispatch } from 'react-redux'
// import { showCart } from '../src/Features/Cart/cartSlice'
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import useFetch from '../custom_hooks/useFetch'

const Product = () => {
    // const productsId = useSelector((state) => state.cart.product);
    const AllProducts = useSelector((state) => state.cart.product);
    const TotalPrice = useSelector((state) => state.cart.Total);
    console.log(AllProducts)
    // console.log(Array.isArray(productsId))
    // const count = useSelector((state) => state.cart.value)
    const url = 'https://fakestoreapi.com/products'

    const [product, loading] = useFetch(url)
    // const dispatch = useDispatch()

    return (
        <>
            {
                loading
                    ? <Text>...Loading</Text>
                    : <SafeAreaView>
            <FlatList
                data={product}
                renderItem={({ item }) => (
                    Object.keys(AllProducts).map((EachProductKey) => (
                        Number(EachProductKey) === item.id && (

                            <View style={[styles.cards, { flexDirection: 'row' }]} key={nanoid()}>
                                <Image source={{ uri: item.image }} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                                <Text style={styles.cardsTitle}>{item.title}</Text>
                                {/* <Text style={styles.cardsDescription}>{item.description}</Text> */}
                                <Text>{`Count : ${AllProducts[item.id]}`} </Text>
                                <Text style={styles.cardsPrice}> {`ProductPrice : ${AllProducts[item.id] * item.price}`} </Text>
                                {/* <Text style={styles.cardsTags}>Rating : {item.rating.rate} ({item.rating.count})</Text> */}
                            </View>
                        )
                    ))

                )
                }
                        />

            <Text>{`Total Price :  ${Number(TotalPrice).toFixed(2)}`}</Text>
        </SafeAreaView>
            }
        </>

    )
}

export default Product

const styles = StyleSheet.create({
    cards: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        flexWrap: 'wrap'
    },
    cardsTitle: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        flexWrap: 'wrap'
    },
    cardsPrice: {
        textAlign: 'center'
    }
})