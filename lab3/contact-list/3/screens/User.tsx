import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { fetchUserContact } from '../../../utility/api';
import ContactThumbnail from '../../../components/ContactThumbnail';
import colors from '../../../utility/colors';

type User = {
  avatar: string;
  name: string;
  phone: string;
};

const User: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load data
  useEffect(() => {
    fetchUserContact()
      .then((userData) => {
        setUser(userData);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error...</Text>
      </View>
    );
  }

  if (user) {
    const { avatar, name, phone } = user;
    return (
      <View style={styles.container}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} textColor={'#BBBBBB'} onPress={null} />
      </View>
    );
  }

  return null;
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
