import React, { useState, useEffect } from 'react'; import {
    StyleSheet, Text,
    View, FlatList,
    ActivityIndicator,
} from 'react-native';
import { fetchContacts } from '../../../utility/api';
import ContactThumbnail from '../../../components/ContactThumbnail';
import { useDispatch, useSelector } from 'react-redux';

const keyExtractor = ({ phone }) => phone;
const Favorites = ()=>
{
    //state
    const {contacts,loading,error} = useSelector((state) =>state);
    const dispatch = useDispatch();
    //Load du lieu
    
    useEffect(()=>{
        dispatch(fetchContactsLoading()); fetchContacts()
        .then(
        contacts=> {
        dispatch(fetchContactsSuccess(contacts));
        }
        )
        .catch(
        e=>{
        dispatch(fetchContactsError());
        }
        )
        },[])

    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail avatar={avatar}
                onPress={() => navigation.navigate('Profile', { contact: item })}
            />
        );
    };

    const favorites = contacts.filter(contact => contact.favorite);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <FlatList
                    data={favorites} keyExtractor={keyExtractor} numColumns={3} contentContainerStyle={styles.list} renderItem={renderFavoriteThumbnail}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', justifyContent: 'center', flex: 1,
    },
    list: {
        alignItems: 'center',
    },

});

export default Favorites;

