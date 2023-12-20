import React, { useState } from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../../Component/Constant/Color';
import Navigation from '../../Service/Navigation';
import { useDispatch, useSelector } from 'react-redux';


const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleChangePassword = async () => {
        try {
            if (!password || !newPassword || !confirmPassword) {
                setErrorMessage('Please fill in all fields');
                return;
            }
    
            if (newPassword !== confirmPassword) {
                setErrorMessage('New password and confirm password do not match');
                return;
            }
    
            const credentials = auth.EmailAuthProvider.credential(auth().currentUser.email, password);
    
            try {
                // Reauthenticate user with the provided credentials
                await auth().currentUser.reauthenticateWithCredential(credentials);
    
                // If reauthentication is successful, update the password
                await auth().currentUser.updatePassword(newPassword);
    
                setErrorMessage('');
                setPassword('');
                setNewPassword('');
                setConfirmPassword('');
    
                // Display success message
                Alert.alert(
                    'Password Changed',
                    'Your password has been changed successfully.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                // Navigate back to UserProfile screen
                                Navigation.navigate('UserProfile');
                                dispatch(removeUser());
                            },
                        },
                    ]
                );
            } catch (reauthError) {
                console.error('Reauthentication error:', reauthError.message);
    
                if (reauthError.code === 'auth/too-many-requests') {
                    // Display alert for too many requests
                    Alert.alert(
                        'Too Many Requests',
                        'Access to this account has been temporarily disabled due to many failed login attempts. Please try again later or reset your password.',
                        [
                            {
                                text: 'OK',
                            },
                        ]
                    );
                } else {
                    // Display alert for other reauthentication errors
                    setErrorMessage('Incorrect current password. Please try again.');
                }
            }
        } catch (error) {
            console.error('Password change error:', error.message);
            setErrorMessage('Failed to change password. Please check your current password.');
        }
    };
    

    return (

        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <Icon
                    name="arrow-back" // Replace with the appropriate icon name
                    size={30}
                    color={COLORS.blue}
                    onPress={() => Navigation.back()}
                />
                <Text style={{
                    fontSize: 22,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    paddingLeft: 70,
                    fontWeight: "bold"
                }}>Change password</Text>
            </View>

            <View style={{ padding: 20, }}>
                <Input
                    placeholder="Current Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <Input
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.input}
                />
                <Input
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                />
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
                <Button
                    title="Change Password"
                    onPress={handleChangePassword}
                    buttonStyle={styles.button}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: COLORS.white
    },


    headerStyle: {
        height: 70,
        backgroundColor: COLORS.white,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },


    input: {
        marginBottom: 15,
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#3498db', // Use your preferred color
    },
});

export default ChangePassword;
