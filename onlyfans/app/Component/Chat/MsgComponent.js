import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Icon } from 'react-native-elements';
import ImageView from 'react-native-image-viewing';
import { COLORS } from '../Constant/Color';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Svg, { Path } from 'react-native-svg';

const MsgComponent = ({ sender, item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const startPlayingAudio = async () => {
    try {
      await audioRecorderPlayer.startPlayer(item.message);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio: ', error);
    }
  };

  const stopPlayingAudio = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error stopping audio playback: ', error);
    }
  };

  const openImageView = () => {
    setIsImageViewVisible(true);
  };

  const closeImageView = () => {
    setIsImageViewVisible(false);
  };

  const renderAudioWave = () => {
    // Replace this with your actual audio data processing logic
    const audioData = [0.2, 0.6, 0.8, 0.4, 0.1, 0.7, 0.5, 0.3];

    // Calculate the width and height of the wave
    const waveWidth = 100;
    const waveHeight = 40;

    // Calculate the distance between two points in the wave
    const waveInterval = waveWidth / (audioData.length - 1);

    // Build the path for the wave
    const wavePath = audioData.reduce((path, amplitude, index) => {
      const x = index * waveInterval;
      const y = amplitude * waveHeight;
      return path + `${index === 0 ? 'M' : 'L'}${x},${y}`;
    }, '');

    return <Path d={wavePath} fill={sender ? COLORS.blue : COLORS.lightgray} />;
  };



  return (
    <View style={[styles.container, sender ? styles.sentContainer : styles.receivedContainer]}>
      {item.msgType === 'text' ? (
        <Text style={sender ? styles.sentText : styles.receivedText}>
          {item.message}
        </Text>
      ) : item.msgType === 'image' ? (
        <>
          <TouchableOpacity onPress={openImageView}>
            <Image source={{ uri: item.message }} style={styles.image} />
          </TouchableOpacity>
          <ImageView
            images={[{ uri: item.message }]}
            imageIndex={0}
            visible={isImageViewVisible}
            onRequestClose={closeImageView}
          />
        </>
      ) : item.msgType === 'audio' ? (
        <View style={[styles.audioContainer, sender ? styles.sentAudioContainer : styles.receivedAudioContainer]}>
          <TouchableOpacity
            style={[
              styles.playButton,
              {
                backgroundColor: sender ? COLORS.blue : COLORS.lightgray,
                borderRadius: 15,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                elevation: 3,
              },
            ]}
            onPress={isPlaying ? stopPlayingAudio : startPlayingAudio}>
            <Icon
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              type="ionicon"
              size={30}
              color={sender ? COLORS.white : COLORS.black}
            />
          </TouchableOpacity>
          <Svg width={100} height={40} style={styles.audioWave}>
            {renderAudioWave()}
          </Svg>
          <Text style={[styles.audioDurationText, { color: sender ? COLORS.white : COLORS.black }]}>
            Duration: {audioRecorderPlayer.audioLength} seconds
          </Text>
        </View>
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  sentContainer: {
    alignSelf: 'flex-end',
  },
  receivedContainer: {
    alignSelf: 'flex-start',
  },
  sentText: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 15,
    color: COLORS.white,
    maxWidth: '80%',
  },
  receivedText: {
    backgroundColor: COLORS.lightgray,
    padding: 10,
    borderRadius: 15,
    color: COLORS.black,
    maxWidth: '80%',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  sentAudioContainer: {
    alignSelf: 'flex-end',
  },
  receivedAudioContainer: {
    alignSelf: 'flex-start',
  },
  
  audioDurationText: {
    marginLeft: 10,
    color: COLORS.lightgray,
    fontSize: 12,
  },

  playButton: {
    padding: 12,
    borderRadius: 50,
  },
 
  image: {
    width: 200, // Set your preferred width
    height: 200, // Set your preferred height
    borderRadius: 15, // Add a border radius to remove sharp corners
    resizeMode: 'cover', // Adjust resizeMode as needed
    alignSelf: 'flex-end', // Align images of sent messages to the right
  },
});

export default MsgComponent;
