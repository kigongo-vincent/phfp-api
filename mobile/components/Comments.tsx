
import { XStack, Text, View, YStack } from 'tamagui'

import BottomSheet from './BottomSheet'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { Ionicons } from '@expo/vector-icons'

import { ColorMode, CommentInterface } from '~/utilities/types'

import { useCallback, useEffect, useState } from 'react'

import { GET } from '~/utilities/GET'

import { ActivityIndicator, FlatList } from 'react-native'

import Comment from './Comment'
import theme from '~/model/theme'
import { useFocusEffect } from 'expo-router'

export interface Props {

    theme: ColorMode,

    postID: number,

    comments: CommentInterface[],

    setComments: any,

    number_of_comments: number | undefined

}

const showComments = (comments: number | undefined) => {



    return (

        comments == 0

            ?

            ""

            :

            comments == 1

                ?

                "view 1 comment"

                :

                "view " + comments + " comments"

    )

}

const Comments = (props: Props) => {

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const [refreshComments, setRefreshComments] = useState(false)

    return (

        <BottomSheet


            // icon 
            icon={

                <TouchableOpacity onPress={() => GET(setLoading, setError, props?.setComments, `comments/${props?.postID}`)}>

                    <XStack marginTop="$4" opacity={.7}>

                        {

                            loading

                                ?

                                <ActivityIndicator style={{ marginRight: 7 }} size={20} color={props?.theme?.text} />

                                :

                                <Ionicons style={{ marginRight: 7 }} name='chatbubble' size={20} color={props?.theme?.text} />
                        }

                        <Text color={props?.theme?.text}>

                            {showComments(props?.number_of_comments)}

                        </Text>

                    </XStack>

                </TouchableOpacity>

            }

            // content 

            content={

                <YStack>

                    {

                        loading

                            ?

                            <YStack alignItems='center' padding="$5">

                                <ActivityIndicator size={25} color={props?.theme?.text} />

                                <Text marginTop="$4" color={props?.theme?.text} fontSize={24} fontWeight={"bold"}>Getting comments</Text>

                                <Text marginTop="$4" color={props?.theme?.text}>Please wait...</Text>

                            </YStack>

                            :

                            <>

                                <XStack justifyContent='space-between'>

                                    <Text fontWeight={600} color={props?.theme?.text}>Comments</Text>

                                    <Text

                                        backgroundColor={props?.theme?.error}

                                        paddingHorizontal="$3"

                                        borderRadius={50}

                                        paddingVertical="$1"

                                        color={"aliceblue"}>

                                        {props?.comments?.length}

                                    </Text>

                                </XStack>

                                <View>

                                    <FlatList showsVerticalScrollIndicator={false} data={props?.comments} renderItem={({ item }) => <Comment theme={props?.theme} comment={item} />} />

                                </View>
                            </>

                    }

                </YStack>

            }
        />

    )
}

export default Comments