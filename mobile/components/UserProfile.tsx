import { Ionicons } from '@expo/vector-icons'

import React from 'react'

import { TouchableOpacity } from 'react-native'

import { useSelector } from 'react-redux'

import { Avatar, Text, XStack, YStack } from 'tamagui'

import { getTheme } from '~/model/theme'

import AvatarPhoto from '~/assets/avatar.jpg'

import { getData } from '~/model/data'

import { router } from 'expo-router'

export interface Props {

  id?: number,

  username?: string,

  photo?: string | null,

  organization?: string,

  time?: string,

}


const TextCropper = (text: string): string => {

  return text?.length > 30 ? `${text?.substring(0, 30)}...` : text

}


const UserProfile = (props: Props) => {

  const data = useSelector(getData)

  const UI = useSelector(getTheme)

  return (
    <XStack alignItems='center' style={{ flex: 1 }} justifyContent='space-between'>

      <XStack alignItems='center'>

        {/* photo  */}

        {
          !props?.photo

            ?

            <Avatar circular marginRight="$3">

              <Avatar.Image src={AvatarPhoto} />

            </Avatar>

            :

            <Avatar circular marginRight="$3">

              <Avatar.Image src={props?.photo} />

            </Avatar>

        }



        <YStack justifyContent='center' style={{ justifySelf: "flex-start" }}>

          {/* username  */}

          {props?.username && <Text fontWeight={600} color={UI?.theme?.text}>{TextCropper(props?.username)}</Text>}

          {/* organization  */}

          {props?.organization && <Text marginTop="$1" color={UI?.theme?.text}>{TextCropper(props?.organization)}</Text>}

          {/* time */}

          {

            props?.time

            &&

            <XStack alignItems='center' opacity={.5} marginTop="$1">

              <Ionicons name='globe' style={{ marginRight: 5 }} size={12} color={UI?.theme?.placeholder} />

              <Text fontSize={12} color={UI?.theme?.text}>{props?.time}</Text>

            </XStack>

          }


        </YStack>

      </XStack>


      {/* chat  */}

      {

        props?.id

        &&

        props.id != data?.user?.id

        &&

        <TouchableOpacity

          onPress={() => router.navigate(`extras/chat/${props?.id}-${props?.username}`)}

          style={{

            backgroundColor: UI?.theme?.background,

            paddingHorizontal: 14,

            paddingVertical: 7,

            borderRadius: 100,

            display: "flex",

            alignItems: "center",

            flexDirection: 'row'
          }}>



          <Ionicons

            color={UI?.theme?.text}

            name='chatbox'

            size={15}

            style={{ marginRight: 5 }} />

          <Text color={UI?.theme?.text} fontSize={12}>Chat</Text>

        </TouchableOpacity>

      }


    </XStack>
  )
}

export default UserProfile