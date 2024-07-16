import { View, Text, YStack } from 'tamagui'

import { ColorMode, CommentInterface } from '~/utilities/types'

import UserProfile from './UserProfile'

import { getRelativeTime } from '~/utilities/getRelativeTime'

import { constants } from '~/utilities/constants'

export interface Props {

    comment: CommentInterface,

    theme: ColorMode

}

const Comment = (props: Props) => {
    return (

        <YStack marginTop="$5">

            <UserProfile

                username={props?.comment?.username}

                id={props?.comment?.author}

                photo={props?.comment?.user_photo && constants.API_LINK + props?.comment?.user_photo}

                time={getRelativeTime(props?.comment?.time)}

            />

            <Text alignSelf='flex-start' marginTop="$3" color={props?.theme?.text} backgroundColor={props?.theme?.light} padding="$5" borderRadius={15}>

                {props?.comment.body}

            </Text>

        </YStack>
    )
}

export default Comment