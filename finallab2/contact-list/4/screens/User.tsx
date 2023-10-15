import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { fetchUserContact } from '../../../utility/api';
import ContactThumbnail from '../../../components/ContactThumbnail';
import colors from '../../../utility/colors';

const User: React.FC = () => {
  const [user, setUser] = useState({ avatar: '', name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load data
  useEffect(() => {
    fetchUserContact()
      .then((users) => {
        setUser(users);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const { avatar, name, phone } = user;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <ContactThumbnail avatar={avatar} name={name} phone={phone} textColor={'#BBBBBB'} onPress={null} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});

export default User;
