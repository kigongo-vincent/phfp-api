import { View, Text, ScrollView, Image, YStack, Paragraph } from 'tamagui'

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

export interface Equipment {

    id?: number,

    name?: string,

    image?: string,

    description?: string,

    instructions?: string

}

const Equipment = () => {

    const { id } = useLocalSearchParams()

    const equipment_id = id?.toString()?.split("-")[0]

    const equipment_name = id?.toString()?.split("-")[1]

    const UI: ThemeInterface = useSelector(getTheme)

    const [equipment, setEquipment] = useState<Equipment>({})

    const [refresh, setRefresh] = useState(false)

    const [error, setError] = useState(false)


    useFocusEffect(useCallback(() => {

        GET(setRefresh, setError, setEquipment, `get_equipment/${equipment_id}`)

    }, []))

    const onRefresh = useCallback(() => {

        GET(setRefresh, setError, setEquipment, `get_equipment/${equipment_id}`)

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

                title: `Details on ${equipment_name}`,

                headerTintColor: UI?.theme?.text,

                headerStyle: {

                    backgroundColor: UI?.theme?.paper

                }



            }} />


            {/* image  */}

            {

                equipment

                    ?

                    <YStack flex={1}>

                        <Image height={300} width={"100%"} source={{ uri: `${constants.API_LINK}${equipment?.image}` }} />

                        <View padding="$4">

                            {/* name  */}

                            <Text

                                marginBottom="$4"

                                fontWeight={"bold"}

                                color={UI?.theme?.text}

                                fontSize={24}>

                                {equipment?.name}

                            </Text>

                            {/* description  */}

                            <Paragraph

                                borderRadius={10}

                                backgroundColor={UI?.theme?.paper}

                                padding="$4"

                                color={UI?.theme?.text}>

                                {equipment?.description}

                            </Paragraph>

                            {/* instructions  */}

                            <BottomSheet

                                icon={<TouchableOpacity style={{

                                    backgroundColor: UI?.theme?.light,

                                    height: 50,

                                    borderRadius: 10,

                                    marginVertical: 10,

                                    display: "flex",

                                    flexDirection: 'row',

                                    alignItems: 'center',

                                    justifyContent: 'center'

                                }}>

                                    <Ionicons style={{ marginRight: 10 }} name='infinite-sharp' color={UI?.theme?.text} size={20} />

                                    <Text color={UI?.theme?.text}>View usage instructions</Text>

                                </TouchableOpacity>}


                                content={

                                    <YStack>

                                        <Text fontWeight={"bold"} fontSize={30} color={UI?.theme?.text}>Instructions</Text>

                                        <Paragraph

                                            padding="$4"

                                            borderRadius={10}

                                            backgroundColor={UI?.theme?.light}

                                            marginTop="$4">{equipment?.instructions}</Paragraph>

                                    </YStack>


                                }


                            />

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

export default Equipment