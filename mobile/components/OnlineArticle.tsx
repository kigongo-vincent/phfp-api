import { View, Text, Paragraph, XStack } from 'tamagui'

import React, { useCallback } from 'react'

import { OnlineResource, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { Ionicons } from '@expo/vector-icons'

import { Alert, Linking } from 'react-native'

export interface Props {

    article: OnlineResource

}

const OnlineArticle = (props: Props) => {

    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(props?.article?.link);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(props?.article?.link);

        } else {

            Alert.alert(`Don't know how to open this URL: ${props?.article?.link}`);
        }
    }, [props?.article?.link]);

    const UI: ThemeInterface = useSelector(getTheme)

    return (
        <View marginBottom="$2" backgroundColor={UI?.theme?.light} borderRadius={10} padding="$4">

            <Text textDecorationLine='underline' color={UI?.theme?.text} fontSize={20} fontWeight={500}>{props?.article?.title}</Text>

            <Paragraph marginVertical="$4" color={UI?.theme?.text}>{props?.article?.snippet}</Paragraph>

            <TouchableOpacity

                onPress={handlePress}

                style={{

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    flexDirection: "row",

                    backgroundColor: UI?.theme?.paper,

                    borderRadius: 30,

                    padding: 15

                }}>

                <Ionicons color={UI?.theme?.text} size={20} style={{ marginRight: 10 }} name='link' />

                <Text color={UI?.theme?.text}>Go to site</Text>

            </TouchableOpacity>

        </View>
    )
}

export default OnlineArticle