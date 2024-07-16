import { View, Text, ScrollView } from 'tamagui'

import React, { useCallback, useState } from 'react'

import { Article, DataInterface, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { getData } from '~/model/data'

import { Stack, useFocusEffect } from 'expo-router'

import { GET } from '~/utilities/GET'
import { RefreshControl } from 'react-native-gesture-handler'
import Post from '~/components/Post'
import { StatusBar } from 'expo-status-bar'

const myposts = () => {

    const UI: ThemeInterface = useSelector(getTheme)

    const data: DataInterface = useSelector(getData)

    const [posts, setPosts] = useState<Article[]>([])

    const [refresh, setRefresh] = useState(false)

    const [error, setError] = useState(false)

    const onRefresh = useCallback(() => {

        GET(setRefresh, setError, setPosts, `get_posts_by_author/${data?.user?.id}`)

    }, [])

    useFocusEffect(useCallback(() => {

        GET(setRefresh, setError, setPosts, `get_posts_by_author/${data?.user?.id}`)

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

        <ScrollView

            padding="$3" paddingBottom="$8"

            backgroundColor={UI?.theme?.background}

            refreshControl={

                <RefreshControl

                    colors={[UI?.theme?.text]}

                    progressBackgroundColor={UI?.theme?.light}

                    refreshing={refresh} onRefresh={onRefresh}
                />}


        >

            <StatusBar style='light' />

            <Stack.Screen options={{

                animation: "fade_from_bottom",

                title: "Your posts",

                headerTintColor: UI?.theme?.text,

                headerStyle: {

                    backgroundColor: UI?.theme?.paper

                }

            }} />


            {

                posts?.length == 0 && !refresh

                    ?

                    <Text color={UI?.theme?.text}>No posts found</Text>

                    :

                    posts?.map(post => <Post updatePosts={updatePosts} key={post?.id} post={post} />)


            }



        </ScrollView>
    )
}

export default myposts