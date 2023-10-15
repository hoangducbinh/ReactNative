import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import ContactListItem from '../components/ContactListItem';
import { fetchContacts } from '../utility/api';

interface Contact {
  name: string;
  avatar: string;
  phone: string;
}

const keyExtractor = ({ phone }: Contact) => phone;

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        setError(false);
        const contacts = await fetchContacts();
        setContacts(contacts);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const contactsSorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  const renderContact = ({ item }: { item: Contact }) => {
    const { name, avatar, phone } = item;
    return <ContactListItem name={name} avatar={avatar} phone={phone} onPress={() => { }} />;
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList data={contactsSorted} keyExtractor={keyExtractor} renderItem={renderContact} />
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
