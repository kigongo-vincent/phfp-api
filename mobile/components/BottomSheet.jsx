
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import { Popover, Adapt, ScrollView, Button, View, YStack } from 'tamagui'
import { getTheme } from '~/model/theme'



const BottomSheet = ({ icon, content }) => {


  const UI = useSelector(getTheme)

  return (
    <Popover size="$5" allowFlip >
      <Popover.Trigger asChild>
        {icon}
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          {/* <Popover.Sheet.Frame > */}
          {/* <Adapt.Contents /> */}
          {/* </Popover.Sheet.Frame> */}
          <Popover.Sheet.Overlay
            animation="quick"

          />

          <YStack style={{ flex: 100 }} padding="$5" paddingBottom="$10" borderRadius={15} backgroundColor={UI?.theme?.paper}>
            {content}
          </YStack>


        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={0}

        enterStyle={{ y: -2, opacity: 0 }}
        exitStyle={{ y: -2, opacity: 0 }}
        elevate
        animation={[
          'bouncy'
        ]}
      >

      </Popover.Content>
    </Popover>
  )
}

export default BottomSheet