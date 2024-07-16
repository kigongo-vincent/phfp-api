import { View, Text, ScrollView } from 'tamagui'

import React, { useEffect, useMemo, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import { ColorMode, DataInterface, NotificationInterface } from '../utilities/types'

import BottomSheet from '~/components/BottomSheet'

import UserProfile from './UserProfile'

import { constants } from '~/utilities/constants'

import { GET } from '~/utilities/GET'

import { getData } from '~/model/data'

import { getRelativeTime } from '~/utilities/getRelativeTime'
import { useGlobalSearchParams } from 'expo-router'


const Notification = () => {

  const [notifications, setNotifications] = useState<NotificationInterface[]>([])

  const UI = useSelector(getTheme)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)

  const [unread, setUnread] = useState({ unread_notifiications_count: 0 })

  const data: DataInterface = useSelector(getData)

  const location = useGlobalSearchParams()

  useEffect(() => {

    GET(setLoading, setError, setUnread, `get_unread_notifications/${data?.user?.id}`)

  }, [location])

  // useEffect(() => {



  // }, [])


  useEffect(() => {

    if (notifications) {

      fetch(`${constants.API_LINK}/view_notifications/${data?.user?.id}`)

    }


  }, [notifications])


  const theme: ColorMode = UI?.theme

  return (

    <BottomSheet

      icon={

        <TouchableOpacity onPress={() => GET(setLoading, setError, setNotifications, `notification/${data?.user?.id}`)}>

          <View height={47} width={47} borderRadius={100} backgroundColor={UI?.theme?.light} display='flex' alignItems='center' justifyContent='center'>

            <View position='relative'>

              {/* icon  */}
              <Ionicons style={{ position: "absolute", left: -12, top: -12 }} color={UI?.theme?.text} name='notifications' size={24} />


              {/* new status  */}

              {

                unread?.unread_notifiications_count != 0 && !loading

                &&

                <View left={2} top={-10} position='absolute' height={10} width={10} borderRadius={5} backgroundColor={theme?.error}></View>

              }

            </View>

          </View>

        </TouchableOpacity>

      }

      // content 

      content={

        <View height={550}>

          <Text fontWeight={600} color={UI?.theme?.text}>Notifications</Text>

          {

            loading

              ?

              <ActivityIndicator style={{ marginVertical: 30 }} color={UI?.theme?.text} size={40} />

              :

              <View marginTop={"$4"}>

                {

                  notifications?.length == 0

                    ?

                    <Text color={UI?.theme?.text}>No notifications found</Text>

                    :

                    <FlatList showsVerticalScrollIndicator={false} data={notifications} renderItem={({ item }) =>

                      <View marginTop="$6">

                        <UserProfile

                          id={item?.action_taker}

                          time={getRelativeTime(item?.time)}

                          username={item?.username}

                          organization={item?.action}

                          photo={item?.user_photo && `${constants.API_LINK}${item?.user_photo}`} />

                      </View>

                    } />

                }

              </View>

          }

        </View>

      }

    />


  )
}

export default Notification