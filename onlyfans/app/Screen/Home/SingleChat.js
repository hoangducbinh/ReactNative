// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator
} from 'react-native';
import database from '@react-native-firebase/database';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import ChatHeader from '../../Component/Header/ChatHeader';
import MsgComponent from '../../Component/Chat/MsgComponent';
import { COLORS } from '../../Component/Constant/Color';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';



const SingleChat = (props) => {
  const { userData } = useSelector((state) => state.User);
  const { receiverData } = props.route.params;

  const [msg, setMsg] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [allChat, setAllChat] = useState([]);

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPath, setAudioPath] = useState('');

  const [isRecordingModalVisible, setRecordingModalVisible] = useState(false);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + receiverData.roomId)
      .on('child_added', (snapshot) => {
        setAllChat((state) => [snapshot.val(), ...state]);
      });

    return () =>
      database()
        .ref('/messages/' + receiverData.roomId)
        .off('child_added', onChildAdd);
  }, [receiverData.roomId]);

  const msgValid = (txt) => txt && txt.trim().length > 0;

  const sendMsg = () => {
    if (!msgValid(msg)) {
      SimpleToast.show('Enter something....');
      return;
    }

    setDisabled(true);
    const msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: userData?.id,
      to: receiverData.id,
      sendTime: moment().format(''),
      msgType: 'text',
    };

    updateMessagesToFirebase(msgData);
  };

  const updateMessagesToFirebase = async (msgData) => {
    const newReference = database()
      .ref('/messages/' + receiverData.roomId)
      .push();
    msgData.id = newReference.key;

    try {
      if (msgData.msgType === 'text' || msgData.msgType === 'image') {
        await newReference.set(msgData);
      } else if (msgData.msgType === 'audio') {
        const audioFileName = `audio_${Date.now()}.aac`;
        const audioReference = storage().ref(`chatMedia/${audioFileName}`);
        await audioReference.putFile(msgData.message);
        const audioUrl = await audioReference.getDownloadURL();
        msgData.message = audioUrl;
        await newReference.set(msgData);
      }

      const chatListUpdate = {
        lastMsg: msgData.message,
        sendTime: msgData.sendTime,
        msgType: msgData.msgType,
      };

      await Promise.all([
        database()
          .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
          .update(chatListUpdate),
        database()
          .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
          .update(chatListUpdate),
      ]);

      setMsg('');
    } catch (error) {
      console.error('Error updating messages: ', error);
    } finally {
      setDisabled(false);
    }
  };
  const uploadImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: false,
      });

      const imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
      const ext = imgName.split('.').pop();
      const name = imgName.split('.')[0];
      const newName = name + Date.now() + '.' + ext;

      const reference = storage().ref('chatMedia/' + newName);
      await reference.putFile(image.path);
      const imgUrl = await storage().ref('chatMedia/' + newName).getDownloadURL();

      const msgData = {
        roomId: receiverData.roomId,
        message: imgUrl,
        from: userData?.id,
        to: receiverData.id,
        sendTime: moment().format(''),
        msgType: 'image',
      };

      updateMessagesToFirebase(msgData);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };




  const startRecording = async () => {
    try {
      const path = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      setAudioPath(path);
      setRecordingModalVisible(true);
    } catch (error) {
      console.error('Error starting recording: ', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      setRecordingModalVisible(false);
    } catch (error) {
      console.error('Error stopping recording: ', error);
    }
  };

  const cancelRecording = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      setRecordingModalVisible(false);
    } catch (error) {
      console.error('Error canceling recording: ', error);
    }
  };

  const sendAudioMsg = async () => {
    if (!audioPath) {
      SimpleToast.show('Record an audio message first.');
      return;
    }

    setDisabled(true);
    const msgData = {
      roomId: receiverData.roomId,
      message: audioPath,
      from: userData?.id,
      to: receiverData.id,
      sendTime: moment().format(''),
      msgType: 'audio',
    };

    updateMessagesToFirebase(msgData);
  };


  
  





  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader data={receiverData} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <FlatList
          style={styles.messageList}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          inverted
          renderItem={({ item }) => <MsgComponent sender={item.from == userData.id} item={item} />}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton} disabled={disabled}>
            <Icon color={COLORS.blue} name="add-circle-outline" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} disabled={disabled}>
            <Icon color={COLORS.blue} name="camera-outline" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} disabled={disabled} onPress={uploadImage}>
            <Icon color={COLORS.blue} name="image-outline" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            disabled={disabled}
            onPress={isRecording ? stopRecording : startRecording}>
            <Icon color={COLORS.blue} name={isRecording ? 'stop' : 'mic-outline'} type="ionicon" />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.iconButton}
            disabled={disabled}
            onPress={sendAudioMsg}>
            <Icon color={COLORS.blue} name="musical-notes-outline" type="ionicon" />
          </TouchableOpacity> */}

          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.black}
            multiline={true}
            numberOfLines={5}
            value={msg}
            onChangeText={(val) => setMsg(val)}
          />

          <TouchableOpacity style={styles.iconButton} disabled={disabled} onPress={sendMsg}>
            <Icon color={COLORS.blue} name="paper-plane-sharp" type="ionicon" size={30} />
          </TouchableOpacity>

          <Modal
        animationType="slide"
        transparent={true}
        visible={isRecordingModalVisible}
        onRequestClose={() => setRecordingModalVisible(false)}>
        <View style={styles.recordingModalContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <TouchableOpacity onPress={cancelRecording}>
            <Text style={styles.cancelRecordingText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  messageList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.lightgray,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightgray,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.black,
    height: 45,
  },
  iconButton: {
    marginRight: 10,
  },
  recordingModalContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10, // Add border radius for a rounded appearance
    borderWidth: 2, // Add border width for a border
    borderColor: COLORS.blue, // Specify border color
  },

  recordingText: {
    color: COLORS.white,
    fontSize: 18,
  },
  cancelRecordingText: {
    color: COLORS.red,
    fontSize: 16,
    marginTop: 10,
  },
});

export default SingleChat;
