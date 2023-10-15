import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import ContactListItem from '../../../components/ContactListItem';
import { fetchContacts } from '../../../utility/api';

type Contact = {
  name: string;
  avatar: string;
  phone: string;
};

type ContactsProps = {
  navigation: any; // You should replace 'any' with the appropriate navigation type
};

const Contacts: React.FC<ContactsProps> = ({ navigation }) => {
  const keyExtractor = ({ phone }: Contact) => phone;

  // State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Load data
  useEffect(() => {
    fetchContacts()
      .then((contacts) => {
        setContacts(contacts);
        setError(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError(true);
      });
  }, []);

  // Sort
  const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
  const renderContact = ({ item }: { item: Contact }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  // Render
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Contacts;
