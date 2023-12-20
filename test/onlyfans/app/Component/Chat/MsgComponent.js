import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native-modal';
import ImageView from 'react-native-image-viewing';
import { COLORS } from '../Constant/Color';

const MsgComponent = ({ sender, item }) => {
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const openImageView = () => {
    setIsImageViewVisible(true);
  };

  const closeImageView = () => {
    setIsImageViewVisible(false);
  };
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time as HH:mm
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedTime;
  };

  const formatDateTime = (date) => {
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    const formattedTime = formatTime(date);

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <View style={[styles.container, sender ? styles.sentContainer : styles.receivedContainer]}>
      {sender && (
       <Text style={styles.sentTime}>
       {formatTime(new Date(item.sendTime))}
     </Text>
      )}
      <View style={styles.messageContainer}>
        {item.msgType === 'text' ? (
          <Text style={sender ? styles.sentText : styles.receivedText}>
            {item.message}
          </Text>
        ) : (
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
        )}
      </View>
      {!sender && (
        <Text style={styles.receivedTime}>
          {formatTime(new Date(item.sendTime))}
        </Text>
      )}
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
  sentTime: {
    alignSelf: 'flex-end',
    color: COLORS.gray,
    fontSize: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  receivedTime: {
    alignSelf: 'flex-start',
    color: COLORS.gray,
    fontSize: 10,
    marginLeft: 5,
    marginBottom: 5,
  },
  
  messageContainer: {
    maxWidth: '70%',
  },
  sentText: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 15,
    color: COLORS.white,
  },
  receivedText: {
    backgroundColor: COLORS.lightgray,
    padding: 10,
    borderRadius: 15,
    color: COLORS.black,
  },
  
  image: {
    marginVertical: 5, // Add margin to the top and bottom
    width: 200,
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
    alignSelf: 'flex-end',
  },
});

export default MsgComponent;
