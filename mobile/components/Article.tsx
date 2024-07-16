import { View, Text, XStack, YStack, Paragraph } from 'tamagui'

import React, { useState } from 'react'

import { Information, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { TouchableOpacity } from 'react-native'

import UserProfile from './UserProfile'

import { constants } from '~/utilities/constants'

import { getRelativeTime } from '~/utilities/getRelativeTime'

import Video from '~/components/Video'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet from './BottomSheet'
import { router } from 'expo-router'

export interface Props {

    article: Information,

    isSearcResult?: boolean

}

const Article = (props: Props) => {

    const UI: ThemeInterface = useSelector(getTheme)

    const [summarise, setSummarise] = useState(true)


    const CropText = (text: string): any => {

        return (

            summarise

                ?

                <XStack alignItems='center'>

                    <Text lineHeight={25} color={UI?.theme?.text}>{text.substring(0, 37) + "..."}</Text>

                    <TouchableOpacity onPress={() => setSummarise(false)}>

                        <Text color={UI?.theme?.primary}>view more</Text>

                    </TouchableOpacity>

                </XStack>

                :

                <YStack>


                    <Text lineHeight={27} color={UI?.theme?.text}>{text}</Text>

                    <TouchableOpacity onPress={() => setSummarise(true)}>

                        <Text marginTop="$2" color={UI?.theme?.primary}>View less</Text>

                    </TouchableOpacity>

                </YStack>


        )

    }

    return (

        <View backgroundColor={UI?.theme?.paper} borderRadius={10} marginBottom="$4">

            {/* header  */}

            <View padding="$3">

                <UserProfile

                    id={props?.article?.author}

                    organization={props?.article?.org_name}

                    photo={`${constants.API_LINK}${props?.article?.user_photo}`}

                    time={getRelativeTime(props?.article?.time)}

                    username={props?.article?.username}

                />

            </View>


            {/* video  */}

            <Video src={`${constants.API_LINK}${props?.article?.tutorial}`} />


            <View padding="$3">

                {/* title  */}
                <Text

                    lineHeight={30}

                    marginBottom="$2"

                    color={UI?.theme?.text}

                    fontWeight={600}

                    fontSize={20}>{props?.article?.title} {props?.isSearcResult && `(applicable for ${props?.article?.crop_name})`}</Text>


                {/* extra title  */}

                {

                    props?.article?.equipment_name

                        ?

                        <TouchableOpacity onPress={() => router.navigate(`extras/equipment/${props?.article?.equipment}-${props?.article?.equipment_name}`)}>

                            <Text marginVertical="$2" fontWeight={"bold"} color={UI?.theme?.primary}>(This technique can be well executed with the use of {props?.article?.equipment_name})</Text>

                        </TouchableOpacity>

                        :

                        props?.article?.pest_name

                            ?

                            <TouchableOpacity onPress={() => router.navigate(`extras/disease/${props?.article?.pest}-${props?.article?.pest_name}`)}>

                                <Text marginVertical="$2" fontWeight={"bold"} color={UI?.theme?.primary}>(This measure is used to prevent {props?.article?.pest_name})</Text>

                            </TouchableOpacity>

                            :

                            ""

                }


                {/* description  */}


                {

                    props?.article?.description?.length > 40

                        ?

                        CropText(props?.article?.description)

                        :

                        <Text color={UI?.theme?.text}>{props?.article?.description}</Text>

                }

                {/* intructions  */}

                <BottomSheet

                    icon={<TouchableOpacity style={{

                        backgroundColor: UI?.theme?.light,

                        height: 50,

                        borderRadius: 25,

                        marginVertical: 10,

                        display: "flex",

                        flexDirection: 'row',

                        alignItems: 'center',

                        justifyContent: 'center'

                    }}>

                        <Ionicons style={{ marginRight: 10 }} name='infinite-sharp' color={UI?.theme?.text} size={20} />

                        <Text color={UI?.theme?.text}>View Instructions</Text>

                    </TouchableOpacity>}


                    content={

                        <YStack>

                            <Text fontWeight={"bold"} fontSize={30} color={UI?.theme?.text}>Instructions</Text>

                            <Paragraph

                                padding="$4"

                                borderRadius={10}

                                backgroundColor={UI?.theme?.light}

                                marginTop="$4">{props?.article?.instructions}</Paragraph>

                        </YStack>


                    }


                />


            </View>

        </View>

    )
}

export default Article