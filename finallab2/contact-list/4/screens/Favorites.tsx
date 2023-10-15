import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { fetchContacts } from '../../../utility/api';

import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from '../Store'; // Import your action creators from the actual path
import ContactThumbnail from '../../../components/ContactThumbnail';
import { useDispatch, useSelector } from 'react-redux';


type FavoritesProps = {
  navigation: any; // You should replace 'any' with the appropriate navigation type
};


const keyExtractor = ({ phone }: { phone: string }) => phone;

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  // State
  const { contacts, loading, error } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  // Load data
  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then((contacts: any) => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((e: any) => {
        dispatch(fetchContactsError());
      });
  }, []);

  const renderFavoriteThumbnail = ({ item }: { item: any }) => {
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigation.navigate('Profile', { contact: item })} name={'name'} phone={'phone'} textColor={'#D8D8D8'}      />
    );
  };

  const favorites = contacts.filter((contact: any) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
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
  list: {
    alignItems: 'center',
  },
});

export default Favorites;
