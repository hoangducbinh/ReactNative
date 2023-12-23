import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ListItem, Avatar, Icon, Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';
import { HelperText } from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast'

const ForgotPassword = ({ isVisible, onClose }) => {
    const [email, setEmail] = useState('');


    const isValidEmail = (email) => {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleForgotPassword = async () => {
        try {
            await auth().sendPasswordResetEmail(email);
            SimpleToast.show('Password reset email sent. Check your inbox.');
            onClose(); // Close the modal after sending the reset email
        } catch (error) {
            SimpleToast.show(error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <View style={styles.container}>
                <Icon
                    name="arrow-back" // Replace with the appropriate icon name
                    size={30}
                    color={COLORS.blue}
                    onPress={() => Navigation.back()}
                />

                <Text style={styles.header}>ForgotPassword</Text>
            </View>
            <Card
                containerStyle={{
                    borderRadius: 10,
                    elevation: 5,
                }}>

                <Text style={styles.modalDescription}>
                    Nhập địa chỉ Email tài khoản của bạn để xác minh lại mật khẩu
                </Text>
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                    <View style={styles.inputIconView}>
                        <Icon
                            name="gmail"
                            type="material-community"
                            color="#fff"
                            size={20}
                        />
                    </View>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Enter"
                        keyboardType="email-address"
                        underlineColorAndroid="transparent"
                        onChangeText={value => {
                            setEmail(value.toLowerCase());
                        }}
                        value={email}
                        placeholderTextColor={COLORS.liteBlack}
                    />
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={handleForgotPassword}>
                    <Text style={styles.btnText}>Reset Password</Text>
                </TouchableOpacity>
                <HelperText type="error" visible={email && !isValidEmail(email)}>
                    Email không đúng định dạng
                </HelperText>
            </Card>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    inputs: {
        borderBottomColor: COLORS.white,
        flex: 1,
        color: COLORS.black,
        paddingLeft: 10,
        fontFamily: FONTS.Regular,
    },

    header: {
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingLeft: 90,
        fontWeight: "bold"
    },
    btn: {
        backgroundColor: COLORS.liteblue,
        width: '100%',
        height: 50,
        borderRadius: 30,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontFamily: FONTS.SemiBold,
        fontSize: 14,
        marginTop: 2,
    },


    container: {
        height: 70,
        backgroundColor: COLORS.white,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    loginBtn: {
        height: 48,
        width: '95%',
        backgroundColor: COLORS.liteblue,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 6,
    },
    loginText: {
        color: COLORS.lightgray,
        fontSize: 18,
        fontFamily: FONTS.Regular,
    },
    buttonSec: { marginTop: 20, justifyContent: 'center', alignItems: 'center' },

    inputContainer: {
        width: '100%',
        borderRadius: 30,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: 15,
        elevation: 2,
    },
    inputIconView: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.liteblue,
        height: '100%',
        borderRadius: 30,
        alignSelf: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 0,

        elevation: 2,
    },
});

export default ForgotPassword;
