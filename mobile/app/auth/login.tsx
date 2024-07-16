import { View, Text, ScrollView, YStack } from 'tamagui'

import React, { useCallback, useState } from 'react'

import { Redirect, router, Stack } from 'expo-router'

import { StatusBar } from 'expo-status-bar'

import { DataInterface, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { ActivityIndicator, Alert, RefreshControl, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import PhoneInput from 'react-native-phone-input'

import { constants } from '~/utilities/constants'
import { getData } from '~/model/data'

const login = () => {

  const UI: ThemeInterface = useSelector(getTheme)

  const [contact, setContact] = useState("")

  const [loading, setLoading] = useState(false)

  const [refresh, setRefresh] = useState(false)

  const data: DataInterface = useSelector(getData)

  const onRefresh = useCallback(() => {

    setContact("")

    setLoading(false)

  }, [])

  const requestCode = async () => {

    setLoading(true)

    if (contact?.length != 13) {

      Alert.alert("invalid contact", "Phone number must have exactly 13 characters, please re-enter your phone number")

      setLoading(false)

    }

    else {

      try {

        const response = await fetch(`${constants.API_LINK}/signup/`, {

          method: "POST",

          body: JSON.stringify({

            contact,

            role: "farmer"

          }),

          headers: {

            "Content-type": "application/json"

          }

        })

        if (response.status == 201) {

          const data = await response.json()

          try {


            await fetch(`https://gateway.seven.io/api/sms`, {

              method: "POST",

              headers: {

                "X-Api-Key": "C99713D7b29236b6A8E0Db71740012dAdB2fc9d3740aD5a97ba2aE39FBfE1023",

                "Content-type": "application/json"

              },

              body: JSON.stringify({

                text: data?.code,

                to: contact,

                from: "Operation 2024",

              })

            })

          }

          catch (err) {

            Alert.alert("Failed to sign", "Please try again, something went wrong")

            console.log(err)

          }



          Alert.alert("Account created successfully", "Your account was created successfully, please verify your account by providing the OTP (one time password) code that was sent to you via SMS")

          router.navigate("auth/verify")



        }
        else if (response.status == 202) {

          const data = await response.json()

          Alert.alert("Account validation successfully", "Your account was validated successfully, please verify your account by providing the OTP (one time password) code that was sent to you via SMS")

          try {


            await fetch(`https://gateway.seven.io/api/sms`, {

              method: "POST",

              headers: {

                "X-Api-Key": "C99713D7b29236b6A8E0Db71740012dAdB2fc9d3740aD5a97ba2aE39FBfE1023",

                "Content-type": "application/json"

              },

              body: JSON.stringify({

                text: data?.code,

                to: contact,

                from: "Operation 2024",

              })

            })

          }

          catch (err) {

            Alert.alert("Failed to sign", "Please try again, something went wrong")

            console.log(err)

          }

          router.navigate("auth/verify")



        } else {

          Alert.alert("Failed to sign", "Please try again, something went wrong")

        }

      }

      catch (error) {

        Alert.alert("Failed to sign", "Please try again, something went wrong")

      }

      finally {

        setLoading(false)

      }

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

          <Text color={UI?.theme?.text} fontSize={24} fontWeight={600}>SIGN IN</Text>

          <Text color={UI?.theme?.text} marginTop="$4">Please provide your phone number</Text>

          <PhoneInput initialValue={contact} textStyle={{ color: UI?.theme?.text }} onChangePhoneNumber={setContact} style={{
            backgroundColor: UI?.theme?.paper, paddingVertical: 18, paddingHorizontal: 20, borderRadius: 30, marginTop: 20
          }} />

          <TouchableOpacity

            onPress={requestCode}

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

            <Text color={UI?.theme?.text} fontWeight={400}>Continue</Text>

            {

              loading

                ?

                <ActivityIndicator size={30} color={UI?.theme?.text} />

                :

                <Ionicons name='arrow-forward-circle' size={30} color={UI?.theme?.text} />

            }

          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.navigate("auth/verify")}>

            <Text textAlign='center' marginTop="$5" textDecorationLine='underline' color={UI?.theme?.text}>Already have an OTP</Text>

          </TouchableOpacity>


        </YStack>



      </ScrollView>


  )
}

export default login