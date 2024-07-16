import { View, Text, ScrollView, YStack } from 'tamagui'

import React, { useCallback, useState } from 'react'

import { Redirect, router, Stack } from 'expo-router'

import { StatusBar } from 'expo-status-bar'

import { DataInterface, ThemeInterface } from '~/utilities/types'

import { useDispatch, useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { ActivityIndicator, Alert, RefreshControl, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import PhoneInput from 'react-native-phone-input'

import { constants } from '~/utilities/constants'
import { getData, loginUser } from '~/model/data'

const login = () => {

    const UI: ThemeInterface = useSelector(getTheme)

    const [code, setCode] = useState("")

    const [loading, setLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const dispatch = useDispatch()

    const data: DataInterface = useSelector(getData)

    const onRefresh = useCallback(() => {

        setCode("")

        setLoading(false)

    }, [])

    const verifyCode = async () => {

        setLoading(true)

        try {

            const response = await fetch(`${constants.API_LINK}verify_account/`, {

                method: "POST",

                body: JSON.stringify({ OTP: code }),

                headers: {

                    "Content-type": "application/json"

                }

            })

            if (response.status == 202) {

                const data = await response.json()

                dispatch(loginUser(data))

                router.navigate('home')


            } else {

                Alert.alert("Invalid code", "Your provided a wrong code, please check your SMS and try again")

            }


        }
        catch (error) {

            Alert.alert("Invalid code", "Your provided a wrong code, please check your SMS and try again")

            console.log(error)

        }

        finally {

            setLoading(false)

        }

    }

    return (

        data?.user?.is_logged_in

            ?

            <Redirect href={"home"} />

            :

            <ScrollView backgroundColor={UI?.theme?.background} refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>

                <StatusBar hidden networkActivityIndicatorVisible />

                <Stack.Screen options={{ headerShown: false }} />

                <YStack alignItems='center' style={{ flex: 1 }} paddingVertical="$20" paddingHorizontal="$4" >

                    <Text color={UI?.theme?.text} fontSize={24} fontWeight={600}>VERIFY OTP CODE</Text>

                    <Text color={UI?.theme?.text} marginTop="$4">Please provide the OTP code that was sent to your phone</Text>

                    <TextInput

                        placeholder='Enter your code...'

                        placeholderTextColor={UI?.theme?.text}

                        value={code}

                        onChangeText={setCode}

                        style={{

                            color: UI?.theme?.text,

                            marginTop: 20,

                            display: 'flex',

                            alignItems: 'center',

                            justifyContent: "space-between",

                            paddingHorizontal: 20,

                            paddingVertical: 12,

                            backgroundColor: UI?.theme?.paper,

                            borderRadius: 30,

                            flexDirection: 'row',

                            width: "100%"

                        }}

                    />

                    <TouchableOpacity

                        onPress={verifyCode}

                        style={{

                            marginTop: 20,

                            display: 'flex',

                            alignItems: 'center',

                            justifyContent: "space-between",

                            paddingHorizontal: 20,

                            paddingVertical: 12,

                            backgroundColor: UI?.theme?.primary,

                            borderRadius: 30,

                            flexDirection: 'row',

                            width: "100%"

                        }}

                    >

                        <Text color={UI?.theme?.text} fontWeight={400}>Verify</Text>

                        {

                            loading

                                ?

                                <ActivityIndicator size={30} color={UI?.theme?.text} />

                                :

                                <Ionicons name='arrow-forward-circle' size={30} color={UI?.theme?.text} />

                        }

                    </TouchableOpacity>


                </YStack>



            </ScrollView>
    )
}

export default login