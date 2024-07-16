import { View, Text, ScrollView, YStack } from 'tamagui'

import React from 'react'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ThemeInterface } from '~/utilities/types'
import { useSelector } from 'react-redux'
import { getTheme } from '~/model/theme'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Splash = () => {

    const UI: ThemeInterface = useSelector(getTheme)

    return (
        <ScrollView backgroundColor={UI?.theme?.background} >

            <StatusBar hidden networkActivityIndicatorVisible />

            <Stack.Screen options={{ headerShown: false, animation: "fade_from_bottom" }} />

            <YStack alignItems='center' style={{ flex: 1 }} paddingVertical="$20" paddingHorizontal="$4" >

                <Text color={UI?.theme?.text} fontSize={24} fontWeight={600}>WELCOME</Text>

                <Text color={UI?.theme?.text} marginTop="$4">To the post harvest farmers information portal</Text>

                {/* <TouchableOpacity

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

                    <Text color={UI?.theme?.text} fontWeight={400}>Continue as guest</Text>

                    <Ionicons name='arrow-forward-circle' size={30} color={UI?.theme?.text} />

                </TouchableOpacity> */}


                <TouchableOpacity

                    onPress={() => router.navigate("auth/login")}

                    style={{

                        marginTop: 20,

                        display: 'flex',

                        alignItems: 'center',

                        paddingHorizontal: 20,

                        paddingVertical: 12,

                        borderColor: UI?.theme?.primary,

                        borderRadius: 30,

                        borderWidth: StyleSheet.hairlineWidth,

                        flexDirection: 'row',

                        width: "100%"

                    }}

                >

                    <Ionicons name='call' size={25} style={{ marginRight: 10 }} color={UI?.theme?.primary} />

                    <Text color={UI?.theme?.primary} fontWeight={400}>Sign in with your phone number</Text>


                </TouchableOpacity>

            </YStack>

        </ScrollView>
    )
}

export default Splash