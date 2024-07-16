import { View, Text, XStack } from 'tamagui'

import React from 'react'

import { Organization, ThemeInterface } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import UserProfile from './UserProfile'

import { constants } from '~/utilities/constants'
import { Ionicons } from '@expo/vector-icons'
import { Linking, Platform, TouchableOpacity } from 'react-native'

export interface Props {

    organization: Organization
}

const OrganizationComponent = (props: Props) => {

    const UI: ThemeInterface = useSelector(getTheme)

    const onPressMobileNumberClick = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${props?.organization?.contact}`;
        } else {
            phoneNumber = `telprompt:${props?.organization?.contact}`;
        }

        Linking.openURL(phoneNumber);
    }

    const openInMaps = () => {

        const url: any = Platform.select({

            ios: `maps:0,0?q=${props?.organization?.address + props?.organization?.name}`,

            android: `geo:0,0?q=${props?.organization?.address + props?.organization?.name}`,
        })

        Linking.openURL(url)

    }

    return (

        <View backgroundColor={UI?.theme?.paper} marginBottom='$2' borderRadius={10} padding="$4">

            <Text color={UI?.theme?.text} fontSize={24} fontWeight={500}>{props?.organization?.name}</Text>

            <TouchableOpacity onPress={openInMaps}>

                <XStack alignItems='center' marginVertical="$4">

                    <Ionicons name='location' size={20} color={UI?.theme?.text} style={{ marginRight: 10 }} />

                    <Text color={UI?.theme?.text}>{props?.organization?.address}</Text>

                </XStack>

            </TouchableOpacity>

            <XStack alignItems='center' marginBottom="$4">

                <Ionicons name='call' size={20} color={UI?.theme?.text} style={{ marginRight: 10 }} />

                <TouchableOpacity onPress={onPressMobileNumberClick}>

                    <Text color={UI?.theme?.text}>{props?.organization?.contact}</Text>

                </TouchableOpacity>

            </XStack>

            <Text color={UI?.theme?.text} marginBottom="$4" opacity={.5} textDecorationLine='underline'>Organization's communications officer</Text>

            <UserProfile

                id={props?.organization?.officer}

                username={props?.organization?.username}

                photo={`${constants.API_LINK}${props?.organization?.user_photo}`}

                organization={props?.organization?.name}

            />


        </View>

    )
}

export default OrganizationComponent