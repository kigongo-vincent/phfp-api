import { View, Text, XStack } from 'tamagui'

import React from 'react'

import { ChatBuddy, ChatRoom, ColorMode, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { TouchableOpacity } from 'react-native'

import UserProfile from './UserProfile'

import { constants } from '~/utilities/constants'

import { router } from 'expo-router'
import { getRelativeTime } from '~/utilities/getRelativeTime'

export interface Props {

    chatroom: ChatRoom

}

const Chat = (props: Props) => {

    const UI: ThemeInterface = useSelector(getTheme)

    return (

        <TouchableOpacity onPress={() => router.navigate(`/extras/messages/${props?.chatroom?.id}`)}>

            <XStack

                marginBottom="$2"

                backgroundColor={UI?.theme?.light}

                borderRadius={"$2"}

                padding="$4"

                alignItems='center'

                justifyContent='space-between'>

                {/* profile  */}

                <UserProfile

                    photo={props?.chatroom?.chat_buddy?.photo && `${constants.API_LINK}${props?.chatroom?.chat_buddy?.photo}`}


                    // id={props?.chat?.id}

                    username={props?.chatroom?.chat_buddy?.username}

                />

                {

                    props?.chatroom?.chat_buddy?.new_messages_count != 0

                    &&

                    <View

                        height={25}

                        padding="$1"

                        borderRadius={12.5}

                        width={25}

                        backgroundColor={UI?.theme?.error}

                        display='flex' alignItems='center'

                        justifyContent='center'>

                        <Text color={"aliceblue"} fontWeight={600}>{props?.chatroom?.chat_buddy?.new_messages_count}</Text>

                    </View>

                }

            </XStack>

        </TouchableOpacity>

    )

}

export default Chat