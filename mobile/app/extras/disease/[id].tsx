import { View, Text, ScrollView, Image, YStack, Paragraph, XStack } from 'tamagui'

import React, { useCallback, useState } from 'react'

import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { StatusBar } from 'expo-status-bar'
import { GET } from '~/utilities/GET'
import { RefreshControl } from 'react-native-gesture-handler'
import { constants } from '~/utilities/constants'
import BottomSheet from '~/components/BottomSheet'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export interface Pest {

    id?: number,

    name?: string,

    image?: string,

    description?: string,

    preferred_habitat?: string,

    common_damage?: string

}

const Disease = () => {

    const { id } = useLocalSearchParams()

    const pest_id = id?.toString()?.split("-")[0]

    const pest_name = id?.toString()?.split("-")[1]

    const UI: ThemeInterface = useSelector(getTheme)

    const [pest, setpest] = useState<Pest>({})

    const [refresh, setRefresh] = useState(false)

    const [error, setError] = useState(false)


    useFocusEffect(useCallback(() => {

        GET(setRefresh, setError, setpest, `get_pest/${pest_id}`)

    }, []))

    const onRefresh = useCallback(() => {

        GET(setRefresh, setError, setpest, `get_pest/${pest_id}`)

    }, [])

    return (

        <ScrollView

            showsVerticalScrollIndicator={false}

            backgroundColor={UI?.theme?.background}

            refreshControl={<RefreshControl

                colors={[UI?.theme?.text]}

                progressBackgroundColor={UI?.theme?.light}

                refreshing={refresh}

                onRefresh={onRefresh}

            />}>

            <StatusBar style='light' />

            <Stack.Screen options={{

                animation: "fade_from_bottom",

                title: `Details on ${pest_name}`,

                headerTintColor: UI?.theme?.text,

                headerStyle: {

                    backgroundColor: UI?.theme?.paper

                }



            }} />


            {/* image  */}

            {

                pest

                    ?

                    <YStack flex={1}>

                        <Image height={300} width={"100%"} source={{ uri: `${constants.API_LINK}${pest?.image}` }} />

                        <View padding="$4">

                            {/* name  */}

                            <Text

                                marginBottom="$4"

                                fontWeight={"bold"}

                                textAlign='center'

                                color={UI?.theme?.text}

                                fontSize={24}>

                                {pest?.name}

                            </Text>

                            {/* description  */}

                            <Paragraph

                                borderRadius={10}

                                backgroundColor={UI?.theme?.paper}

                                padding="$4"

                                color={UI?.theme?.text}>

                                {pest?.description}

                            </Paragraph>

                            {/* preferred habitat  */}

                            <YStack backgroundColor={UI?.theme?.paper} marginTop='$4' borderRadius={10} overflow='hidden'>

                                <XStack alignItems='center' backgroundColor={UI?.theme?.light} padding="$4">

                                    <Ionicons

                                        name='home-outline'

                                        color={UI?.theme?.text}

                                        size={25}

                                        style={{ marginRight: 5 }} />

                                    <Text col={UI?.theme?.text}>Preferred habitat by the pest</Text>


                                </XStack>

                                <Paragraph color={UI?.theme?.text} padding="$4">{pest?.preferred_habitat}</Paragraph>

                            </YStack>



                            {/* common damage  */}

                            <YStack backgroundColor={UI?.theme?.paper} marginTop='$4' borderRadius={10} overflow='hidden'>

                                <XStack alignItems='center' backgroundColor={UI?.theme?.primary} padding="$4">

                                    <Ionicons

                                        name='diamond'

                                        color={UI?.theme?.text}

                                        size={25}

                                        style={{ marginRight: 5 }} />

                                    <Text col={UI?.theme?.text}>Common Damage caused by the pest</Text>


                                </XStack>

                                <Paragraph color={UI?.theme?.text} padding="$4">{pest?.common_damage}</Paragraph>

                            </YStack>

                        </View>



                    </YStack>

                    :

                    !refresh &&

                    <Text

                        textAlign='center'

                        marginVertical="$4"

                        color={UI?.theme?.text}

                    >

                        Details not found, try refreshing the page

                    </Text>

            }

        </ScrollView>

    )
}

export default Disease