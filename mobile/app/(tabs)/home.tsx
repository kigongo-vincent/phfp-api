import { View, Text, FlatList } from 'react-native'

import React, { useCallback, useEffect, useState } from 'react'

import Refresher from '~/components/Refresher'

import { GET } from '~/utilities/GET'

import { Article, Crop } from '~/utilities/types'

import UserProfile from '~/components/UserProfile'

import { constants } from '~/utilities/constants'

import { useSelector } from 'react-redux'

import { getData } from '~/model/data'

import Searchbar from '~/components/Searchbar'

import CropSelection from '~/components/CropSelection'

import { YStack } from 'tamagui'

import Posts from '~/components/Posts'

import { useFocusEffect, useNavigation } from 'expo-router'

const home = () => {

  const data = useSelector(getData)

  const [crops, setCrops] = useState<Crop[]>([])

  const [posts, setPosts] = useState<Article[]>([])

  const [refresh, setRefresh] = useState(false)

  const [error, setError] = useState(null)

  const [query, setQuery] = useState("")

  const location = useNavigation()

  const onRefresh = useCallback(() => {

    GET(setRefresh, setError, setCrops, "crops")

    GET(setRefresh, setError, setPosts, "posts")

  }, [])

  useFocusEffect(useCallback(() => {

    GET(setRefresh, setError, setCrops, "crops")

    GET(setRefresh, setError, setPosts, "posts")

  }, []))

  const updatePosts = (postID: number) => {

    setPosts(posts.map(

      post => post?.id == postID

        ?

        { ...post, comments: post?.comments + 1 }

        :

        post

    ))

  }

  return (
    <Refresher refresh={refresh} setRefresh={setRefresh} onRefresh={onRefresh}>

      <YStack>

        <Searchbar query={query} setQuery={setQuery} />

        <CropSelection crops={crops} />

        <Posts updatePosts={updatePosts} posts={posts} />

      </YStack>

    </Refresher>
  )
}

export default home