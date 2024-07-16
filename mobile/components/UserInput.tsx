import { useSelector } from 'react-redux'

import { Avatar } from 'tamagui'

import { View, Text, XStack } from 'tamagui'

import { getData } from '~/model/data'

import { ColorMode, CommentInterface, User } from '~/utilities/types'

import AvatarPhoto from '~/assets/avatar.jpg'

import { constants } from '~/utilities/constants'

import { TextInput, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { useState } from 'react'

export interface Props {

    theme: ColorMode,

    updateComments(body: string): void

}

const UserInput = (props: Props) => {

    const data = useSelector(getData)

    const [body, setBody] = useState<string>("")

    const user: User = data?.user

    return (


        <XStack marginTop="$7" alignItems='center'>

            {
                !user?.photo

                    ?

                    <Avatar size={38} circular marginRight="$3">

                        <Avatar.Image src={AvatarPhoto} />

                    </Avatar>

                    :

                    <Avatar size={38} circular marginRight="$3">

                        <Avatar.Image src={constants.API_LINK + user?.photo} />

                    </Avatar>

            }

            <TextInput



                value={body}

                onChangeText={setBody}

                onSubmitEditing={() => { props?.updateComments(body); setBody("") }}

                style={{ flex: 1, color: props?.theme?.text }}

                placeholder='Say something'

                placeholderTextColor={props?.theme?.placeholder} />

            {/* <TouchableOpacity

                onPress={() => { props?.updateComments(body); setBody("") }}>

                <Ionicons

                    size={20} name='paper-plane'

                    color={"aliceblue"}

                    style={{

                        backgroundColor: props?.theme?.primary,

                        paddingVertical: 9.5,

                        paddingHorizontal: 10,

                        borderRadius: 100

                    }}

                />

            </TouchableOpacity> */}

        </XStack>
    )
}

export default UserInput