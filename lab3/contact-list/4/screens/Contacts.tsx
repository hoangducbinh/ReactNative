import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import ContactListItem from '../../../components/ContactListItem';
import { fetchContacts } from '../../../utility/api';
import { fetchContactsError, fetchContactsLoading, fetchContactsSuccess } from '../Store';
import { useDispatch, useSelector } from 'react-redux';


interface Contact {
  name: string;
  avatar: string;
  phone: string;
}

const keyExtractor = ({ phone }: Contact) => phone;

const Contacts: React.FC<{ navigation: any }> = ({ navigation }) => {
  // State
  const { contacts, loading, error } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  // Load data
  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then((contacts: Contact[]) => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((e: any) => {
        dispatch(fetchContactsError());
      });
  }, []);

  // Sort
  const contactsSorted = contacts.slice().sort((a: Contact, b: Contact) =>
    a.name.localeCompare(b.name)
  );

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
