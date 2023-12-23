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
  Image,

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
import AudioRecorderPlayerComponent from '../../Component/Chat/AudioRecorder';
import { Button } from 'react-native-paper';
import SpeechToText from '../../Component/Chat/SpeechToText';
import Navigation from '../../Service/Navigation';
import Voice from '@react-native-voice/voice';
import { ScrollView } from 'react-native-gesture-handler';


const SingleChat = (props) => {
  const { userData } = useSelector((state) => state.User);
  const { receiverData } = props.route.params;

  const [msg, setMsg] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [allChat, setAllChat] = useState([]);

  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    console.log(e);
    setStarted(':OK');
  };

  const onSpeechEnd = (e) => {
    console.log(e);
    setEnded(':OK');
  };

  const onSpeechResults = (e) => {
    console.log(e);
    const hypotheses = e.value;

    if (hypotheses.length > 0) {
      const highestConfidenceText = hypotheses[0];
      console.log('Recognized text:', highestConfidenceText);
      setResults([highestConfidenceText]); // Chỉ hiển thị kết quả cao nhất
      // ...
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setStarted('');
      setEnded('');
      setResults('');
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
      setStarted('');
      setEnded('');
      setResults('');
    } catch (e) {
      console.log(e);
    }
  };


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

  // const sendMsg = () => {
  //   if (!msgValid(msg)) {
  //     SimpleToast.show('Enter something....');
  //     return;
  //   }

  //   setDisabled(true);
  //   const msgData = {
  //     roomId: receiverData.roomId,
  //     message: msg,
  //     from: userData?.id,
  //     to: receiverData.id,
  //     sendTime: moment().format(''),
  //     msgType: 'text',
  //   };

  //   updateMessagesToFirebase(msgData);
  // };
  const sendMsg = async () => {
    try {
      if (!msgValid(msg) && (!results || results.length === 0)) {
        SimpleToast.show('Enter something or record a message.');
        return;
      }

      setDisabled(true);

      let messageContent = msg;

      // If there are recognized speech results, use them as the message content
      if (results && results.length > 0) {
        messageContent = results[0];
      }

      const msgData = {
        roomId: receiverData.roomId,
        message: messageContent,
        from: userData?.id,
        to: receiverData.id,
        sendTime: moment().format(''),
        msgType: 'text',  // You can adjust the msgType based on your requirements
      };
      setMsg('');
      await updateMessagesToFirebase(msgData);

      // Stop recording
    stopRecognizing();
    
    // Close the modal only if it is currently open
    

    } catch (error) {
      console.error('Error sending message: ', error);
    } finally {
      setDisabled(false);
      if (isRecordingModalVisible) {
        toggleRecordingModal();
      }
    }
  };

  const updateMessagesToFirebase = async (msgData) => {
    const newReference = database()
      .ref('/messages/' + receiverData.roomId)
      .push();
    msgData.id = newReference.key;

    try {
      await newReference.set(msgData);

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

      if (!image) {
        console.log('Image selection canceled by the user');
        return;
      }

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
      if (error.message === 'User cancelled image selection') {
        console.log('Image selection canceled by the user');
      } else {
        // Log other errors
        console.error('Error uploading image: ', error);
      }
     
    }
  };

  const [isRecordingModalVisible, setIsRecordingModalVisible] = useState(false);

  const toggleRecordingModal = () => {
    setIsRecordingModalVisible(!isRecordingModalVisible);
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
            <Icon color={COLORS.blue} name="add-circle" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} disabled={disabled}>
            <Icon color={COLORS.blue} name="camera" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} disabled={disabled} onPress={uploadImage}>
            <Icon color={COLORS.blue} name="image" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            disabled={disabled}
            onPress={toggleRecordingModal}
          >
            <Icon color={COLORS.blue} name="mic" type="ionicon" />
          </TouchableOpacity>


          {/* <TouchableOpacity onPress={toggleRecordingModal}>
        <Text>Toggle Recording Modal</Text>
      </TouchableOpacity> */}



          {/* Modal chứa component AudioRecorder*/}
          <Modal
            visible={isRecordingModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
              <View style={[styles.modalContainer]}>
                <Text style={{ color: COLORS.white, alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
                  Voice to Message
                </Text>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50 }} onPress={() => startRecognizing()}>
                  <Image source={require('../../Assets/mic.jpg')} style={{ width: 100, height: 100 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 50, justifyContent: 'space-evenly' }}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Started{started}</Text>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Ended {ended} </Text>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }} onPress={stopRecognizing}>Restart </Text>

                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }} onPress={toggleRecordingModal}>Exit</Text>

                </View>
                <View style={{ flex: 1, backgroundColor: COLORS.white, borderRadius: 25 }}>
                  <TextInput
                    horizontal
                    style={{ alignSelf: 'center', marginTop: 50 }}
                    
                    onChangeText={(val) => setMsg(val)}
                  >
                    {results && results.length > 0 ? (
                      results.map((item, index) => (
                        <Text key={index} style={{ textAlign: 'center', fontSize: 16 }}>
                          {item}
                        </Text>
                      ))
                    ) : (
                      <Text>No results available</Text>
                    )}
                  </TextInput>
                </View>

                <TouchableOpacity disabled={disabled} onPress={sendMsg} style={styles.closeButton}>
                  <Button style={styles.closeButtonText} >Send message </Button>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


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
            <Icon color={COLORS.blue} name="paper-plane-sharp" type="ionicon" />
          </TouchableOpacity>
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

  modalContainer: {
    flex: 1,
    padding: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
    backgroundColor: COLORS.liteblue,
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  closeButtonText: {
    color: COLORS.red,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SingleChat;