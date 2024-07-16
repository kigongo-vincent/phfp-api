import { View, Text } from 'tamagui'

import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { Article, ColorMode } from '~/utilities/types'

import { FlatList } from 'react-native'

import Post from './Post'

export interface Props {

    posts: Article[],

    updatePosts(postID: number): void

}

const Posts = (props: Props) => {

    const UI = useSelector(getTheme)

    const theme: ColorMode = UI?.theme

    return (
        <View marginTop="$4" paddingBottom="$1">

            <Text marginBottom="$4" color={theme?.text}>Community Posts</Text>

            {/* <FlatList/> */}

            {

                props?.posts?.length == 0

                    ?

                    <Text marginTop="$4" color={theme?.text} opacity={.5}>No posts found, try refreshing the page</Text>

                    :

                    props?.posts?.map(post => (

                        <Post updatePosts={props?.updatePosts} post={post} key={post?.id} />

                    ))
            }

        </View>
    )
}

export default Posts