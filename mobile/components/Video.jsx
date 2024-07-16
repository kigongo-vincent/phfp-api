import * as React from 'react';

import { View, StyleSheet, Button, Pressable, Text, TouchableOpacity } from 'react-native';

import { Video, ResizeMode } from 'expo-av';

import { Ionicons } from '@expo/vector-icons';

import { useSelector } from 'react-redux';

import { getTheme } from '~/model/theme';

export default function VideoComp({ src }) {

  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});

  const UI = useSelector(getTheme)

  return (

    <Pressable

      onPress={() =>

        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()

      }>
      <View style={styles.container}>


        <Video

          ref={video}

          style={styles.video}

          source={{ uri: src }}

          useNativeControls={false}

          resizeMode={ResizeMode.CONTAIN}

          isLooping

          onPlaybackStatusUpdate={status => setStatus(() => status)}

        />

        {




          !status.isPlaying && <TouchableOpacity

            onPress={() => { video.current.playAsync() }}

            style={{

              backgroundColor: UI?.theme?.paper,

              height: 40,

              width: 40,

              borderRadius: 20,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              margin: "auto",

            }}

          >

            <Ionicons name='play' color={UI?.theme?.text} size={20} />

          </TouchableOpacity>


        }


      </View>
    </Pressable>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    height: 200,

  },

  video: {

    position: "absolute",

    alignSelf: 'center',

    width: "100%",

    height: 200,

  }

});
