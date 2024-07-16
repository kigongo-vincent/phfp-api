import { View, Text } from 'tamagui'

import React, { useCallback, useState } from 'react'

import Refresher from '~/components/Refresher'

import { ChatRoom, DataInterface, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getData } from '~/model/data'

import { GET } from '~/utilities/GET'

import { getTheme } from '~/model/theme'

import { FlatList, ScrollView } from 'react-native'

import Chat from '~/components/Chat'

import { useFocusEffect } from 'expo-router'


const chats = () => {

  const UI: ThemeInterface = useSelector(getTheme)

  const [refresh, setRefresh] = useState(false)

  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([])

  const data: DataInterface = useSelector(getData)

  const onRefresh = useCallback(() => {

    GET(setRefresh, null, setChatrooms, `get_chatrooms/${data?.user?.id}`)

  }, [])

  useFocusEffect(React.useCallback(() => {

    GET(setRefresh, null, setChatrooms, `get_chatrooms/${data?.user?.id}`)

  }, []))

  return (

    <Refresher refresh={refresh} onRefresh={onRefresh} setRefresh={setRefresh}>

      {

        chatrooms?.length == 0

          ?

          <Text marginVertical="$5" textAlign='center' fontWeight={500} fontSize={"$6"} color={UI?.theme?.text}>No chats found</Text>

          :

          chatrooms?.map(chatroom => (

            <Chat key={chatroom?.id} chatroom={chatroom} />

          ))

      }

    </Refresher>
  )
}

export default chats