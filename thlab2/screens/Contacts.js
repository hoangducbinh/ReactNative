import React, { StrictMode, useEffect, useState } from "react";
import { fetchContacts } from "../utility/api";
import ContactListItem from '../components/ContactListItem';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";


import { useDispatch, useSelector } from 'react-redux'
import { fetchContactsError, fetchContactsLoading, fetchContactsSuccess } from "../utility/store";





const keyExtractor = ({phone}) => phone;
const Contacts = ({navigation}) =>
{
 
    const [contacts, loading, error] = useSelector((state)=> state);
    const dispatch = useDispatch();

    //load data

    useEffect(() =>
    {
        dispatch(fetchContactsLoading());
        fetchContacts()
        .then(
            contacts =>
            {
               dispatch(fetchContactsSuccess(contacts));
            }
        )
        .catch(
            e=>{
              dispatch(fetchContactsError());
            }
        )
    },[])

    // sort
    

    const contactsSorted = contacts.slice().sort((a,b) => a.name.localeCompare(b.name));
    const renderContacts = ({item}) => {
        const {name,avatar,phone} = item;
        return <ContactListItem 
        
                name={name}
                avatar ={avatar}
                phone ={phone}
                onPress = {() => navigator.navigate("Profile",{contact: item})}
        />;
    };

    //render
    return (
        <View 
        style={styles.container}>
             {loading && <ActivityIndicator color="blue" size= "large" />}
             {error && <Text>Error...</Text>}
             {!loading && !error &&
                (
                    <FlatList
                        data={contactsSorted}
                        keyExtractor={keyExtractor}
                        renderItem={renderContacts}
                    />
                )

             }

        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        justifyContent : 'center',
        flex : 1,
    },
});

export default Contacts