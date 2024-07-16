import { View, Text, YStack, Avatar } from 'tamagui'

import { ActivityIndicator, Alert, Switch, TouchableOpacity } from 'react-native'

import React, { useEffect, useState } from 'react'

import Refresher from '~/components/Refresher'

import { useDispatch, useSelector } from 'react-redux'

import { getTheme, toggle_mode } from '~/model/theme'

import { DataInterface, ThemeInterface, User } from '~/utilities/types'

import { XStack } from 'tamagui'

import AvatarPhoto from '~/assets/avatar.jpg'

import { getData, logout, setUser } from '~/model/data'

import { constants } from '~/utilities/constants'

import { TextInput } from 'react-native-gesture-handler'

import { Ionicons } from '@expo/vector-icons'

import ImagePicker from '~/components/ImagePicker'
import { router } from 'expo-router'

const settings = () => {

  const [refresh, setRefresh] = useState(false)

  const UI: ThemeInterface = useSelector(getTheme)

  const data: DataInterface = useSelector(getData)

  const [image, setImage] = useState(null)

  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState(data?.user?.username)

  const dispatch = useDispatch()

  const onRefresh = () => {

    setUsername(data?.user?.username)

  }

  const uploadNewImage = async () => {


    if (image) {

      setLoading(true)

      const formData = new FormData()

      formData.append("photo", {

        uri: image?.uri,

        type: "image/png",

        name: "my-image.jpg"

      })


      try {

        const response = await fetch(`${constants.API_LINK}update_user/${data?.user?.id}`, {

          method: "PATCH",

          body: formData,

          headers: {

            "Content-type": "multipart/form-data"

          }

        })

        if (response.status == 201) {

          const new_data = await response.json()

          dispatch(setUser({ photo: new_data?.photo }))

          Alert.alert("Upload success", "You have successfully updated you profile picture")

        }

        else {

          Alert.alert("Update Failure", "failed to update your profile picture")

        }

      }

      catch (err) {

        Alert.alert("Update Failure", "failed to update your profile picture")


      }

      finally {

        setLoading(false)

      }



    }

  }


  useEffect(() => {

    if (image) {

      uploadNewImage()

    }

  }, [image])


  const handleTextSubmit = async () => {

    if (username?.length < 4) {

      Alert.alert("Username update failed", "Username must have atleast 4 characters, you provided less")

    } else {

      if (username == data?.user?.username) {

        return


      } else {

        try {

          dispatch(setUser({ username }))

          const formData = new FormData()

          formData.append("username", username)

          const response = await fetch(`${constants.API_LINK}update_user/${data?.user?.id}`, {

            method: "PATCH",

            body: formData

          })

          if (response.status != 201) {

            Alert.alert("Username update failed", "Please try again, something went wrong")

          }

        }
        catch (err) {

          Alert.alert("Username update failed", "Please try again, something went wrong")

        }

        finally {



        }

      }

    }

  }

  return (
    <Refresher onRefresh={onRefresh} refresh={refresh} setRefresh={setRefresh}>

      <YStack alignItems='center' justifyContent='center' paddingTop="$4">

        {
          data?.user?.photo?.length == 0

            ?

            <Avatar circular size={"$10"} >

              <Avatar.Image src={AvatarPhoto} />

            </Avatar>


            :

            <Avatar circular size={"$10"}>

              <Avatar.Image src={constants.API_LINK + data?.user?.photo} />

            </Avatar>

        }

        <TextInput

          onSubmitEditing={handleTextSubmit}

          style={{ marginTop: 10, color: UI?.theme?.text }} onChangeText={setUsername} value={username} />

        <Text color={UI?.theme?.text} marginVertical="$3">{data?.user?.contact}</Text>

        {/* change pic  */}

        <ImagePicker

          image={image}

          setImage={setImage}

          icon={

            <XStack

              backgroundColor={UI?.theme?.primary}

              marginVertical={5}

              style={{

                flexDirection: 'row',

                display: "flex", alignItems: "center", padding: 15, borderRadius: 10
              }}

            >

              {

                loading

                  ?

                  <ActivityIndicator color={UI?.theme?.text} size={20} style={{ marginRight: 10 }} />

                  :

                  <Ionicons name='camera' color={UI?.theme?.text} size={20} style={{ marginRight: 10 }} />

              }

              <Text color={UI?.theme?.text}>Change profile picture</Text>

            </XStack>
          }

        />


      </YStack>

      <YStack padding="$4" borderRadius={10} backgroundColor={UI?.theme?.paper}>

        <Text color={UI?.theme?.text} fontWeight={600} marginBottom="$2">Customize apperance (This feature is experimental)</Text>

        <XStack alignItems='center' justifyContent='space-between'>

          {

            UI?.theme_name == "dark"

              ?

              <Text color={UI?.theme?.text}>Activate light mode</Text>

              :

              <Text color={UI?.theme?.text}>Deactivate light mode</Text>

          }

          <Switch value={UI?.theme_name == "light"} onChange={() => dispatch(toggle_mode())} />

        </XStack>

      </YStack>

      <TouchableOpacity onPress={() => router.navigate("myposts")} style={{ width: "100%", marginTop: 5 }}>

        <XStack

          width={"100%"}

          backgroundColor={UI?.theme?.paper}

          style={{

            flexDirection: 'row',

            display: "flex", alignItems: "center", padding: 15, borderRadius: 10
          }}

        >


          <Ionicons name='people' color={UI?.theme?.text} size={20} style={{ marginRight: 5 }} />


          <Text color={UI?.theme?.text}>Posts that you created</Text>

        </XStack>

      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(logout())} style={{ width: "100%", marginTop: 5 }}>

        <XStack

          width={"100%"}

          backgroundColor={UI?.theme?.paper}

          style={{

            flexDirection: 'row',

            display: "flex", alignItems: "center", padding: 15, borderRadius: 10
          }}

        >


          <Ionicons name='log-out' color={UI?.theme?.text} size={20} style={{ marginRight: 10 }} />


          <Text color={UI?.theme?.text}>Logout</Text>

        </XStack>

      </TouchableOpacity>

    </Refresher >
  )
}

export default settings