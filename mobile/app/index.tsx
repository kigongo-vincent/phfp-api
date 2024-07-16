import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { ScrollView } from 'tamagui'
import { DataInterface, ThemeInterface } from '~/utilities/types'
import { useSelector } from 'react-redux'
import { getTheme } from '~/model/theme'
import { getData } from '~/model/data'

const index = () => {

    const UI: ThemeInterface = useSelector(getTheme)

    const data: DataInterface = useSelector(getData)

    return (

        <View>

            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView backgroundColor={UI?.theme?.background}>

                {

                    data?.user?.is_logged_in

                        ?

                        <Redirect href={"home"} />

                        :

                        <Redirect href={"auth/splash"} />

                }

            </ScrollView>

        </View>

    )
}

export default index