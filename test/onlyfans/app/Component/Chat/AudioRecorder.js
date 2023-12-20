import React, { Component } from 'react';
import { View, Text, Button, PermissionsAndroid } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

class AudioRecorderPlayerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordSecs: 0,
      recordTime: '00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00',
      duration: '00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  onStartRecord = async () => {
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    console.log(result);
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };


  onSaveRecord = async () => {
    try {
      // Check if the recorder is currently recording
      if (!this.audioRecorderPlayer.isRecording) {
        console.log('Recording is not active.');
        return;
      }
  
      const downloadsPath = RNFS.DownloadDirectoryPath;
      const path = downloadsPath + '/recorded_audio.mp3';
  
      // Get the recorded file path
      const audioFilePath = await this.audioRecorderPlayer.stopRecorder();
  
      // Move the recorded file to the Downloads directory
      await RNFS.moveFile(audioFilePath, path);
  
      console.log('File saved successfully:', path);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };
  
  
  
  

  render() {
    return (
      <View>
        <Text>Record Time: {this.state.recordTime}</Text>
        <Button title="Start Record" onPress={this.onStartRecord} />
        <Button title="Stop Record" onPress={this.onStopRecord} />
        <Button title="Save Record" onPress={this.onSaveRecord} />
        <Text>Play Time: {this.state.playTime}</Text>
        <Text>Duration: {this.state.duration}</Text>
        <Button title="Start Play" onPress={this.onStartPlay} />
        <Button title="Pause Play" onPress={this.onPausePlay} />
        <Button title="Stop Play" onPress={this.onStopPlay} />
      </View>
    );
  }
}

export default AudioRecorderPlayerComponent;
