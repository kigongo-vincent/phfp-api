import { View, Text, XStack } from 'tamagui'

import React, { useCallback, useState } from 'react'

import Refresher from '~/components/Refresher'

import { DataInterface, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native'

import ImagePicker from '~/components/ImagePicker'

import { Ionicons } from '@expo/vector-icons'

import { Image } from 'tamagui'

import { constants } from '~/utilities/constants'

import { getData } from '~/model/data'

import { router } from 'expo-router'

import axios from 'axios'


export interface ImageData {

  uri?: string | undefined

}

const add_post = () => {

  const [refresh, setRefresh] = useState(false)

  const [caption, setCaption] = useState<string>("")

  const [image, setImage] = useState<ImageData>(null)

  const UI: ThemeInterface = useSelector(getTheme)

  const [posting, setPosting] = useState(false)

  const data: DataInterface = useSelector(getData)

  const createPost = async () => {

    setPosting(true)

    const formData = new FormData()

    formData.append("caption", caption)

    formData.append("author", data?.user?.id)

    image && formData.append("image", {

      uri: image?.uri,

      type: "image/png",

      name: "my-image.png"

    })

    const response = await fetch(`${constants.API_LINK}createPost/`, {

      method: "POST",

      body: formData,

      headers: {
        "Content-type": "multipart/form-data"
      }

    })

    if (response.status == 201) {

      setPosting(false)

      Alert.alert("Post success", "post added successfully")

      setCaption("")

      setImage(null)

      router.navigate("home")

    } else {

      setPosting(false)

      Alert.alert("Post failure", "failed to add post")

    }

  }

  const onRefresh = useCallback(() => {

    setCaption("")

    setImage(null)

    setPosting(false)

  }, [])



  return (


    <Refresher refresh={refresh} setRefresh={setRefresh} onRefresh={onRefresh}>

      <Text

        marginVertical="$4"

        color={UI?.theme?.text}

        fontWeight={500}

        fontSize={"$6"}

      >Create a post</Text>




      <TextInput



        value={caption}

        onChangeText={setCaption}

        placeholder='What would wish to say, or ask'

        placeholderTextColor={UI?.theme?.placeholder}



        style={{

          color: UI?.theme?.text,

          padding: 20,

          textAlignVertical: "top",

          height: 100,

          backgroundColor: UI?.theme?.paper,

          borderRadius: 10,

          marginBottom: image && 7

        }}

      />

      {

        image

        &&

        <Image marginTop="$5" source={{ uri: image?.uri }} height={180} borderRadius={10} />


      }


      {

        image

          ?

          <XStack alignItems='center' marginVertical="$2">

            <TouchableOpacity onPress={() => setImage(null)}>

              <XStack

                alignItems='center'

                backgroundColor={UI?.theme?.paper}

                padding='$4' borderRadius={10} marginRight="$2">

                <Ionicons style={{ marginRight: 5 }} name='trash' size={20} color={UI?.theme?.text} />

                <Text color={UI?.theme?.text}>Remove photo</Text>

              </XStack>

            </TouchableOpacity>


            <ImagePicker

              // image state mgmt 

              image={image}

              setImage={setImage}

              icon={

                // icon 



                <View

                  width={"55%"}

                  flexDirection='row'

                  alignItems='center'

                  padding="$4"

                  backgroundColor={UI?.theme?.paper}

                  borderRadius={10}

                >

                  <Ionicons

                    name='camera' size={20} style={{ marginRight: 5 }} color={UI?.theme?.text} />

                  <Text color={UI?.theme?.text}>select another photo</Text>

                </View>



              } />


          </XStack>

          :

          <ImagePicker

            // image state mgmt 

            image={image}

            setImage={setImage}

            icon={

              // icon 

              <View

                alignItems='center'

                flexDirection='row'

                backgroundColor={UI?.theme?.paper}

                justifyContent='center'

                paddingHorizontal="$5"

                marginVertical="$2"

                borderRadius={5}

                height={50}

              >

                <Ionicons

                  style={{ marginRight: 5 }}

                  name='camera' size={20} color={UI?.theme?.text} />

                <Text color={UI?.theme?.text}>attach an image to the post</Text>

              </View>

            } />

      }


      {

        <TouchableOpacity onPress={createPost}>

          <View

            alignItems='center'

            flexDirection='row'

            justifyContent='center'

            backgroundColor={UI?.theme?.primary}

            paddingHorizontal="$5"

            borderRadius={5}

            height={50}

          >

            {

              posting

                ?

                <ActivityIndicator style={{ marginRight: 5 }} color={"aliceblue"} size={20} />

                :

                <Ionicons style={{ marginRight: 5 }} name='cloud-upload' size={20} color={"aliceblue"} />

            }

            <Text color={"aliceblue"}>publish</Text>

          </View>

        </TouchableOpacity>

      }




    </Refresher>
  )
}

export default add_post