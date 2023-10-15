import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


import { fetchRandomContact } from '../../../utility/api';



import DetailListItem from '../../../components/DetailListItem';
import ContactThumbnail from '../../../components/ContactThumbnail';
import colors from '../../../utility/colors';

type Contact = {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  cell: string;
};

type RootStackParamList = {
  Profile: { contact: Contact };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type ProfileProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const Profile: React.FC<ProfileProps> = ({ route }) => {
  const { contact } = route.params;
  const { avatar, name, email, phone, cell } = contact;

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail
          avatar={avatar}
          name={name}
          phone={phone}
          textColor="#D8D8D8" // Add the appropriate text color value
          onPress={() => {
            // Define the onPress behavior
          }}
        />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email} />
        <DetailListItem icon="phone" title="Work" subtitle={phone} />
        <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Profile;
