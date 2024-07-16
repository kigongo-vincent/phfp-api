
import React, { useCallback, useEffect, useState } from 'react'

import { Redirect, router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { DataInterface, ThemeInterface } from "../../../utilities/types"

import { YStack, View, Text, XStack } from 'tamagui'

import { useSelector } from 'react-redux'

import { getTheme } from '../../../model/theme'

import { ActivityIndicator, Alert, TextInput } from 'react-native'

import { GET } from '~/utilities/GET'

import { getData } from '~/model/data'

import { constants } from '~/utilities/constants'

export interface CustomChatRoom {

    id?: number

}

export interface NewMessage {

    id?: number,

    chatroom?: number

}

const chat = () => {

    const { id } = useLocalSearchParams()

    const [loading, setloading] = useState(true)

    const [sending, setSending] = useState(false)

    const [newMessage, setNewMessage] = useState<NewMessage>({})

    const UI: ThemeInterface = useSelector(getTheme)

    const [body, setBody] = useState("")

    const [error, setError] = useState(null)

    const [chatroom, setChatroom] = useState<CustomChatRoom>({})

    const data: DataInterface = useSelector(getData)

    const sendMessage = async () => {

        setSending(true)

        try {

            const response = await fetch(`${constants.API_LINK}create_chatroom_and_add_message/`, {

                method: "POST",

                headers: {

                    "Content-type": "application/json"

                },

                body: JSON.stringify({

                    body,

                    sender: data?.user?.id,

                    veiwers: [data?.user?.id],

                    receiver: id?.toString()?.split("-")[0]

                })

            })

            if (response.status == 201) {

                const data = await response.json()

                setNewMessage(data)

            }

            else {

                Alert.alert("failed to send message")

            }

        }

        catch (error) {

            Alert.alert("failed to send message")

        }

        finally {

            setSending(false)

        }

    }

    useFocusEffect(useCallback(() => {

        GET(setloading, setError, setChatroom, `check_for_chatroom/${data?.user?.id}/${id?.toString()?.split("-")[0]}/`)

    }, []))

    useFocusEffect(useCallback(() => {

        if (chatroom?.id) {

            router.replace(`extras/messages/${chatroom?.id}`)


        }

    }, [chatroom]))

    useFocusEffect(useCallback(() => {

        if (newMessage?.chatroom) {

            router.replace(`extras/messages/${newMessage?.chatroom}`)

        }

    }, [newMessage]))




    return (



        <YStack backgroundColor={UI?.theme?.background} paddingHorizontal="$3" alignItems='center' style={{ flex: 1 }} justifyContent='center'>

            <Stack.Screen options={{ headerShown: false, animation: "fade_from_bottom" }} />

            {

                loading

                    ?

                    <YStack alignItems='center' justifyContent='center' padding="$4" width={"100%"} borderRadius={15} backgroundColor={UI?.theme?.paper}>


                        <ActivityIndicator size={40} style={{ marginVertical: 20 }} color={UI?.theme?.text} />

                        <Text color={UI?.theme?.text} fontWeight={600}>Checking for chat history</Text>

                        <Text color={UI?.theme?.text} marginVertical="$4">Please wait....</Text>


                    </YStack>

                    :

                    !chatroom

                    &&

                    <YStack justifyContent='center' padding="$4" width={"100%"} borderRadius={15} backgroundColor={UI?.theme?.paper}>

                        {

                            sending

                                ?

                                <>

                                    <XStack alignItems='center' marginVertical="$2">

                                        <ActivityIndicator size={20} color={UI?.theme?.text} style={{ marginRight: 10 }} />

                                        <Text color={UI?.theme?.text}>initiating conversation, please wait...</Text>

                                    </XStack>

                                </>

                                :

                                <>
                                    <Text color={UI?.theme?.text} fontWeight={600}>No chat history found</Text>

                                    <Text color={UI?.theme?.text} fontWeight={700} fontSize={25} marginVertical="$4">Say Hi to {id?.toString()?.split("-")[1]}</Text>

                                    <TextInput

                                        value={body}

                                        onChangeText={setBody}

                                        onSubmitEditing={sendMessage}

                                        style={{

                                            marginTop: 10,

                                            backgroundColor: UI?.theme?.light,

                                            paddingHorizontal: 30, height: 60,

                                            borderRadius: 10,

                                            color: UI?.theme?.text
                                        }}

                                        placeholder='Say something'

                                        placeholderTextColor={UI?.theme?.placeholder}

                                    />

                                </>

                        }

                    </YStack>

            }


        </YStack>
    )
}

export default chat