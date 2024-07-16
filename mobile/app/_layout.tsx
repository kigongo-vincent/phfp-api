import { useFonts } from 'expo-font';

import { Stack, SplashScreen, } from 'expo-router';

import React, { useEffect, useState } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { TamaguiProvider } from 'tamagui';

import { Provider, useSelector } from 'react-redux'

import config from '../tamagui.config';

import { persistor, store } from '~/model/store';

import { getTheme } from '~/model/theme';

import UserProfile from '~/components/UserProfile';

import { ColorMode, DataInterface, ThemeInterface } from '~/utilities/types';

import Notifications from '~/components/Notifications'
import { getData } from '~/model/data';
import { constants } from '~/utilities/constants';
import { PersistGate } from 'redux-persist/integration/react';


SplashScreen.preventAutoHideAsync();

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: 'home',

// };

const UI_SETTER = ({ setUI }) => {

  const UI: ThemeInterface = useSelector(getTheme)

  useEffect(() => {

    setUI(UI)

  }, [UI])

  return (

    <>

      {/* empty  */}

    </>

  )

}
const DATA_SETTER = ({ setData }) => {

  const data: DataInterface = useSelector(getData)

  useEffect(() => {

    setData(data)

  }, [data])

  return (

    <>

      {/* empty  */}

    </>

  )

}


export default function RootLayout() {

  const [UI, setUI] = useState<ThemeInterface>({})

  const [data, setData] = useState<DataInterface>({})

  const theme = UI?.theme

  const [loaded] = useFonts({

    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),

    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {

    if (loaded) {

      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) return null;

  return (

    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>

        <UI_SETTER setUI={setUI} />

        <DATA_SETTER setData={setData} />

        <TamaguiProvider config={config}>

          <GestureHandlerRootView style={{ flex: 1 }}>

            <Stack>

              <Stack.Screen name='auth/login' options={{ animation: "fade_from_bottom" }} />

              <Stack.Screen name='auth/splash' options={{ animation: "fade_from_bottom" }} />

              <Stack.Screen name='auth/verify' options={{ animation: "fade_from_bottom" }} />

              <Stack.Screen



                name='(tabs)'

                options={{

                  headerRight: () => <Notifications />,

                  headerLeft: () => <UserProfile photo={data?.user?.photo?.length != 0 && constants.API_LINK + data?.user?.photo} username={data?.user?.username} />,

                  title: "",

                  headerStyle: {

                    backgroundColor: theme?.paper,

                  }

                }}


              />

            </Stack>

          </GestureHandlerRootView>

        </TamaguiProvider>

      </PersistGate>

    </Provider>
  );
}
