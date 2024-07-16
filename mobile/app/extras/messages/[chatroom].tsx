import { View, Text, YStack } from 'tamagui'

import { ScrollView } from 'react-native'

import React, { useCallback, useRef, useState } from 'react'

import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { DataInterface, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { GET } from '~/utilities/GET'

import MessageComponent from '~/components/Message'

import { Alert, TextInput } from 'react-native'

import { getData } from '~/model/data'

import { constants } from '~/utilities/constants'

import { RefreshControl } from 'react-native-gesture-handler'

export interface Message {

    id: number,

    body: string,

    time: string,

    chatroom?: number,

    sender?: number,

    viewers?: number[],

    sender_details?: {

        username: string,

        photo?: string

    }

}

const messages = () => {

    const { chatroom } = useLocalSearchParams()

    const [refresh, setRefresh] = useState(false)

    const [messages, setMessages] = useState<Message[]>([])

    const [message, setMessage] = useState("")

    const savedData: DataInterface = useSelector(getData)

    const scrollViewRef = useRef<ScrollView>(null);

    const onRefresh = useCallback(() => {

        GET(setRefresh, null, setMessages, `get_messages_by_chatroom/${chatroom}`)

    }, [])


    useFocusEffect(useCallback(() => {

        GET(setRefresh, null, setMessages, `get_messages_by_chatroom/${chatroom}`)

    }, []))

    useFocusEffect(useCallback(() => {

        if (messages?.length != 0) {

            fetch(`${constants.API_LINK}view_messages/${savedData?.user?.id}/${chatroom}`)

        }

    }, [messages]))



    const sendMessage = async () => {

        const now = new Date()

        try {

            if (!message) {

                return

            }

            const new_message: Message = {

                id: messages?.length + 1,

                body: message,

                chatroom: chatroom ? +chatroom : Math.random(),

                sender: savedData?.user?.id,

                time: now.toISOString()

            }

            setMessages([...messages, new_message])


            await fetch(`${constants.API_LINK}add_message_to_chatroom/`, {

                method: "POST",

                body: JSON.stringify({

                    chatroom: chatroom,

                    body: message,

                    viewers: [savedData?.user?.id],

                    sender: savedData?.user?.id

                }),

                headers: {

                    "Content-type": "application/json"

                }

            })



        }
        catch (error) {

            Alert.alert("Message not Sent", "Something went wrong, please try again later")

        }

        finally {

            setMessage("")

        }

    }

    const UI: ThemeInterface = useSelector(getTheme)

    return (
        <YStack flex={1} backgroundColor={UI?.theme?.background}>

            <Stack.Screen

                options={{

                    title: "messages",

                    headerTintColor: UI?.theme?.text,

                    animation: "fade_from_bottom",

                    headerStyle: {

                        backgroundColor: UI?.theme?.paper,

                    }


                }}

            />

            {

                messages?.length == 0

                    ?

                    <Text

                        color={UI?.theme?.text}

                        fontWeight={600}

                        fontSize={"$6"}

                        marginVertical="$4">

                        No messages found

                    </Text>

                    :

                    // <View backgroundColor={"red"} height={"100%"}>

                    <View flex={1} padding="$4">

                        <ScrollView

                            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
                            ref={scrollViewRef}


                            refreshControl={<RefreshControl colors={[UI?.theme?.text]} progressBackgroundColor={UI?.theme?.paper} refreshing={refresh} onRefresh={onRefresh} />}

                            showsVerticalScrollIndicator={false}>

                            {messages?.map(message => <MessageComponent key={message?.id} message={message} />)}

                        </ScrollView>

                        <TextInput

                            value={message}

                            onChangeText={setMessage}

                            onSubmitEditing={sendMessage}

                            style={{

                                marginTop: 10,

                                backgroundColor: UI?.theme?.light,

                                paddingHorizontal: 30, height: 60,

                                borderRadius: 30,

                                color: UI?.theme?.text
                            }}

                            placeholder='Say something'

                            placeholderTextColor={UI?.theme?.placeholder}

                        />

                    </View>
            }

        </YStack>
    )
}

export default messages