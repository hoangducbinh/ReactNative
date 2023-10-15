import React, { useState, useEffect } from 'react';
import { Stylesheet, View, Text } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import { fetchRandomContact } from '../utility/api';
import { StyleSheet } from 'react-native';
import colors from '../utility/colors';

const Profile = () => {
    const [contact, setContact] = useState({});
    useEffect(() => {
        fetchRandomContact().then(
            contact => setContact(contact)
        )
    }
        , []);


    const { avatar, name, email, phone, cell } = contact;
    return (
        <View style={styles.container}>
            <View style={styles.avatarsection}>
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem icon="mail" title="Email" subtitle={email} />
                <DetailListItem icon="phone" title="work" subtitle={phone} />
                <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
            </View>
        </View>
    );
}
export default Profile;




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

