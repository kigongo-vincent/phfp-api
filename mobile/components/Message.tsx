import { View, Text, YStack, XStack } from 'tamagui'

import React from 'react'

import { DataInterface, Message, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { getData } from '~/model/data'

import { getRelativeTime } from '~/utilities/getRelativeTime'
import { Ionicons } from '@expo/vector-icons'

export interface Props {

    message: Message

}

const MessageComponent = (props: Props) => {

    const UI: ThemeInterface = useSelector(getTheme)

    const data: DataInterface = useSelector(getData)

    return (

        <YStack

            alignSelf={

                props?.message?.sender == data?.user?.id

                    ?

                    "flex-end"

                    :

                    "flex-start"

            }

            minWidth={"50%"}

            marginBottom="$2"

            paddingHorizontal="$4"

            paddingVertical="$2"

            borderRadius={15}

            backgroundColor={

                props.message.sender == data?.user?.id

                    ?

                    UI?.theme?.primary

                    :

                    UI?.theme?.light

            }

        >

            <Text marginBottom="$2" lineHeight={24} color={UI?.theme?.text}>{props?.message?.body}</Text>

            <XStack alignItems='center' alignSelf='flex-end' opacity={.9}>

                <Ionicons name='time' style={{ marginRight: 5 }} size={14} color={UI?.theme?.text} />

                <Text fontSize={11} color={UI?.theme?.text}>{

                    getRelativeTime(props?.message?.time)?.includes("seconds")

                        ?

                        "just now"

                        :

                        getRelativeTime(props?.message?.time)

                }</Text>

            </XStack>



        </YStack>

    )
}

export default MessageComponent