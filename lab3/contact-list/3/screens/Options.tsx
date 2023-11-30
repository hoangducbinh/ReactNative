import React from 'react';
import { StyleSheet, View, Text,Button} from 'react-native';
import DetailListItem from '../../../components/DetailListItem';
import auth from '@react-native-firebase/auth';

const Options: React.FC = () => {

  const handleLogout = () => {
    auth().signOut().catch(error => console.log('Error logging out: ', error));
};

  return (
    <View style={styles.container}>
      <DetailListItem title="Update Profile" />
      <DetailListItem title="Change Language" />
      {/* <DetailListItem title="Sign Out" /> */}
      <Button title='Sign Out' onPress={handleLogout} />
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  borderlessButtonContainer: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center'
    }


});

export default Options;
