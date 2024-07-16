import { View, Text, Image, XStack, YStack } from 'tamagui'

import React, { useState } from 'react'

import { Article, ColorMode, CommentInterface, DataInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import UserProfile from './UserProfile'

import { constants } from '~/utilities/constants'

import { getRelativeTime } from '~/utilities/getRelativeTime'

import { Alert, TouchableOpacity } from 'react-native'

import Comments from './Comments'

import UserInput from './UserInput'
import { getData } from '~/model/data'

export interface Props {

    post: Article,

    updatePosts(postID: number): void

}

const Post = (props: Props) => {

    const UI = useSelector(getTheme)

    const theme: ColorMode = UI?.theme

    const API_LINK = constants.API_LINK

    const [summarise, setSummarise] = useState(true)

    const [comments, setComments] = useState<CommentInterface[]>([])

    const data: DataInterface = useSelector(getData)

    const updateComments = async (body: string) => {

        props?.updatePosts(props?.post?.id)

        const response = await fetch(`${constants.API_LINK}/add_comment/`, {

            method: "POST",

            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({

                author: data.user.id,

                body: body,

                post: props?.post?.id

            })

        })

        if (response.status == 201) {

            // Alert.alert("Comment status", "Comment sent successfully")


        } else {

            Alert.alert("Comment status", "Failed to send comment, please try again")

        }

    }

    const CropText = (text: string): any => {

        return (

            summarise

                ?

                <XStack alignItems='center'>

                    <Text lineHeight={25} color={theme?.text}>{text.substring(0, 37) + "..."}</Text>

                    <TouchableOpacity onPress={() => setSummarise(false)}>

                        <Text color={theme?.primary}>view more</Text>

                    </TouchableOpacity>

                </XStack>

                :

                <YStack>


                    <Text lineHeight={27} color={theme?.text}>{text}</Text>

                    <TouchableOpacity onPress={() => setSummarise(true)}>

                        <Text marginTop="$2" color={theme?.primary}>View less</Text>

                    </TouchableOpacity>

                </YStack>


        )

    }

    return (

        <View marginBottom={"$2"} paddingBottom="$5" backgroundColor={theme?.paper} borderRadius={10}>

            <View padding="$4">

                <UserProfile

                    id={props?.post?.author}

                    photo={props?.post?.user_photo && API_LINK + props?.post?.user_photo}

                    username={props?.post?.username}

                    time={getRelativeTime(props?.post?.time)}

                    organization={props?.post?.org_name}
                />

            </View>

            {

                props?.post?.image

                &&

                <Image width={"100%"} height={300} src={API_LINK + props?.post?.image} />

            }

            <View padding="$4">

                <Text color={theme?.text} marginBottom="$3" opacity={.5}>Caption</Text>


                {

                    props?.post?.caption?.length > 40

                        ?

                        CropText(props?.post?.caption)

                        :

                        <Text color={theme?.text}>{props?.post?.caption}</Text>

                }

                {

                    props?.post?.comments != 0

                    &&

                    <Comments

                        comments={comments}

                        setComments={setComments}

                        theme={theme}

                        postID={props?.post?.id}

                        number_of_comments={props?.post?.comments} />


                }

                <UserInput theme={theme} updateComments={updateComments} />

            </View>

        </View>
    )
}

export default Post