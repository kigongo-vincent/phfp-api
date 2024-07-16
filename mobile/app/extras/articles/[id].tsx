import { View, Text, YStack, XStack, ScrollView } from 'tamagui'

import React, { useCallback, useEffect, useState } from 'react'

import { Information, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { StatusBar } from 'expo-status-bar'

import { TouchableOpacity } from 'react-native'

import { RefreshControl } from 'react-native-gesture-handler'

import { GET } from '~/utilities/GET'
import Article from '~/components/Article'


const Articles = () => {

  const { id } = useLocalSearchParams()

  const cropName = id?.toString()?.split("-")[1]

  const [selectedCategory, setSelectedCategory] = useState("post-harvest technique")

  const [articles, setArticles] = useState<Information[]>([])

  const [filteredArticles, setFilteredArticles] = useState<Information[]>([])

  const cropId = id?.toString()?.split("-")[0]

  const UI: ThemeInterface = useSelector(getTheme)

  const [refresh, setRefresh] = useState(false)

  const [error, setError] = useState(false)

  const onRefresh = useCallback(() => {

    GET(setRefresh, setError, setArticles, `get_articles/${cropId}`)

  }, [])


  useFocusEffect(useCallback(() => {

    if (cropId) {

      GET(setRefresh, setError, setArticles, `get_articles/${cropId}`)

    }

  }, []))


  useEffect(() => {

    if (articles && selectedCategory) {

      setFilteredArticles(articles?.filter(article => (article?.category).toString() == selectedCategory.toString()))

    }

  }, [articles, selectedCategory])


  return (
    <YStack flex={1} backgroundColor={UI?.theme?.background} padding="$3">

      <StatusBar style='light' />

      <Stack.Screen options={{

        animation: "fade_from_bottom",

        title: "Articles",

        headerStyle: {

          backgroundColor: UI?.theme?.paper

        },

        headerTintColor: UI?.theme?.text

      }} />

      <ScrollView

        showsVerticalScrollIndicator={false}

        refreshControl={<RefreshControl

          colors={[UI.theme?.text]}

          progressBackgroundColor={UI?.theme?.background}

          refreshing={refresh} onRefresh={onRefresh} />}

      >

        <Text

          backgroundColor={UI?.theme?.light}

          padding="$4"

          borderRadius={10}

          marginVertical="$1"

          lineHeight={30}

          color={UI?.theme?.text}>Please select the kind of information you would wish to know about {cropName}</Text>



        {/* information category selection  */}

        <XStack marginVertical="$3" justifyContent='space-between' alignItems='center'>

          <TouchableOpacity

            onPress={() => setSelectedCategory("post-harvest technique")}

            style={{

              backgroundColor: selectedCategory == "post-harvest technique" ? UI?.theme?.primary : UI?.theme?.paper,

              paddingVertical: 15,

              paddingHorizontal: 20,

              borderRadius: 5

            }}>

            <Text color={UI?.theme?.text}>post-harvest tecnique</Text>

          </TouchableOpacity>


          <TouchableOpacity

            onPress={() => setSelectedCategory("pest control measure")}

            style={{

              backgroundColor: selectedCategory == "pest control measure" ? UI?.theme?.primary : UI?.theme?.paper,

              paddingVertical: 15,

              paddingHorizontal: 20,

              borderRadius: 5

            }}

          >

            <Text color={UI?.theme?.text}>pest control measure</Text>

          </TouchableOpacity>

        </XStack>

        {/* end information category selection  */}


        {/* articels loop  */}

        {

          filteredArticles.length == 0 && !refresh

            ?

            <Text

              backgroundColor={UI?.theme?.light}

              padding="$4"

              borderRadius={5}

              color={UI?.theme?.text}

              textAlign='center'

              fontWeight={500}

            >No Articles found</Text>

            :

            filteredArticles.map(article => (

              <Article article={article} key={article?.id} />

            ))

        }

        {/* end articels loop  */}

      </ScrollView>

    </YStack>
  )
}

export default Articles