import React, { useCallback, useState } from 'react'

import { ScrollView, View } from 'tamagui'

import { RefreshControl } from 'react-native-gesture-handler'

import { useSelector } from 'react-redux'

import theme, { getTheme } from '~/model/theme'

import { StatusBar } from 'expo-status-bar'

import { Stack } from 'expo-router'

import { ImageBackground } from 'react-native'

import Background from "~/assets/backgrounds/bg1.jpg"

const Refresher = ({ children, onRefresh, refresh, setRefresh }) => {

  const UI = useSelector(getTheme)

  return (
    <View backgroundColor={UI?.theme?.background} style={{ flex: 1, padding: 10 }}>

      <ScrollView

        showsVerticalScrollIndicator={false}

        refreshControl={

          <RefreshControl colors={[UI?.theme?.text]} progressBackgroundColor={UI?.theme?.paper} refreshing={refresh} onRefresh={onRefresh} />

        }>

        <StatusBar style='light' />


        {children}


      </ScrollView>

    </View>
  )
}

export default Refresher