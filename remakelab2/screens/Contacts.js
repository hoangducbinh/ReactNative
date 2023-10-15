import React, { useState, useEffect } from 'react';
import {Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';



import ContactListItem from '../components/ContactListItem';
import { fetchContacts } from '../utility/api';
const keyExtractor = ({ phone }) => phone;
const Contacts = () => {
    //state
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    //Load du lieu
    useEffect(() => {
        fetchContacts()
            .then(
                contacts => {
                    setContacts(contacts);
                    setError(false);
                    setLoading(false);
                }
            )
            .catch(
                e => {
                    console.log(e);
                    setLoading(false);
                    setError(true);
                }
            )
    }, [])


    //sort
    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const renderContact = ({ item }) => {
        const { name, avatar, phone } = item;
        return <ContactListItem
            name={name}
            avatar={avatar}
            phone={phone}
            onPress={() => { }}
        />;
    };
    //Render
    return (
        < View style={styles.container}>
            {loading && <ActivityIndicator color="blue" size="large" />}
            {error && <Text>Error...</Text>}
            {!loading && error && (
                <FlatList
                    data={contactsSorted}
                    keyExtractor={keyExtractor} renderItem={renderContact}
                />
            )}

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
});
export default Contacts;