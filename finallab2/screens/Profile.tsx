import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import { fetchRandomContact } from '../utility/api';
import colors from '../utility/colors';

interface Contact {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  cell: string;
}

const Profile: React.FC = () => {
  const [contact, setContact] = useState<Contact | {}>({});

  useEffect(() => {
    fetchRandomContact().then((contact) => setContact(contact));
  }, []);

  const { avatar, name, email, phone, cell } = contact as Contact;

  return (
    <View style={styles.container}>
      <View style={styles.avatarsection}>
        <ContactThumbnail
          avatar={avatar}
          name={name}
          phone={phone}
          textColor={colors.black} // Provide a textColor prop
          onPress={() => { }} // Provide an onPress prop
        />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email} />
        <DetailListItem icon="phone" title="work" subtitle={phone} />
        <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarsection: {
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
