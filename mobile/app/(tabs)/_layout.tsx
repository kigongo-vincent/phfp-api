import { Redirect, router, Tabs, useFocusEffect, useGlobalSearchParams, useNavigation } from "expo-router"

import { Ionicons } from '@expo/vector-icons'

import { useSelector } from "react-redux"

import { getTheme } from "~/model/theme"

import { View, Text } from "tamagui"

import { useCallback, useState } from "react"

import { GET } from "~/utilities/GET"

import { DataInterface } from "~/utilities/types"

import { getData } from "~/model/data"

const _layout = () => {

  const UI = useSelector(getTheme)

  const data: DataInterface = useSelector(getData)

  const [unread, setUnread] = useState(null)

  const [empty, setEmpty] = useState(false)

  const location = useGlobalSearchParams()

  useFocusEffect(useCallback(() => {

    GET(setEmpty, setEmpty, setUnread, `get_unread_messages/${data?.user?.id}`)

    if (!data?.user?.is_logged_in) {

      router.navigate("auth/splash")
    }

  }, [location]))



  return (

    data?.user?.is_logged_in

      ?

      <Tabs

        screenOptions={{

          tabBarActiveTintColor: UI?.theme?.primary,

          tabBarInactiveTintColor: UI.theme?.placeholder,

          tabBarStyle: {

            height: 80,

            paddingBottom: 20,

            paddingTop: 5,

            backgroundColor: UI?.theme?.paper,

            borderWidth: 0,

            borderColor: UI?.theme?.paper,

          },

        }}

      >

        {/* landing page  */}
        <Tabs.Screen name="home"

          options={{

            title: "home",

            headerShown: false,

            tabBarIcon: ({ color }) => <Ionicons size={30} color={color} name="home" />

          }} />

        {/* chats  */}
        {

          unread?.unread_messages_count == 0

            ?

            <Tabs.Screen name="chats" options={{

              title: "chats",

              headerShown: false,

              tabBarIcon: ({ color }) => <Ionicons size={30} color={color} name="chatbox" />

            }} />

            :

            <Tabs.Screen name="chats" options={{

              tabBarBadge: unread?.unread_messages_count,

              title: "chats",

              headerShown: false,

              tabBarIcon: ({ color }) => <Ionicons size={30} color={color} name="chatbox" />

            }} />

        }

        {/* add post  */}
        <Tabs.Screen name="add_post" options={{

          title: "add-post",

          headerShown: false,

          tabBarIcon: ({ color }) => <Ionicons size={30} color={color} name="add-circle" />

        }} />



        {/* settings  */}
        <Tabs.Screen name="settings" options={{

          title: "settings",

          headerShown: false,

          tabBarIcon: ({ color }) => <Ionicons size={30} color={color} name="settings" />

        }} />

      </Tabs>

      :

      <Redirect href={"auth/splash"} />
  )
}

export default _layout