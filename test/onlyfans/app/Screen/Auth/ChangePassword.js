import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../../Component/Constant/Color';
import Navigation from '../../Service/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { HelperText } from 'react-native-paper';
import { FONTS } from '../../Component/Constant/Font';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showCurrentPassword, setCurrentShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassWord, setShowNewpassword] = useState(false);
    const dispatch = useDispatch();



    const toggleCurrentPasswordVisibility = () => {
        setCurrentShowPassword(!showCurrentPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewpassword(!showNewPassWord);
    };



    const validatePassword = (inputPassword) => {
        if (inputPassword.length < 6) {
            setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự');
            if (inputPassword.input != password) {
                setErrorMessage('Mật khẩu cũ không chính xác, kiểm tra lại')
            }
        } else {
            setErrorMessage('');
        }
    };

    const handleChangePassword = async () => {
        try {
            setErrorMessage('');

            if (!password || !newPassword || !confirmPassword) {
                setErrorMessage('Vui lòng điền đầy đủ thông tin');
                return;
            }

            if (newPassword !== confirmPassword) {
                setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
                return;
            }

            if (newPassword.length < 6) {
                setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự');
                return;
            }

            const credentials = auth.EmailAuthProvider.credential(
                auth().currentUser.email,
                password
            );
            await auth().currentUser.reauthenticateWithCredential(credentials);

            await auth().currentUser.updatePassword(newPassword);

            setPassword('');
            setNewPassword('');
            setConfirmPassword('');

            Alert.alert(
                'Thay Đổi Mật Khẩu',
                'Mật khẩu của bạn đã được thay đổi thành công.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            Navigation.navigate('UserProfile');
                            dispatch(removeUser());
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Lỗi thay đổi mật khẩu:', error.message);
            setErrorMessage('Không thể thay đổi mật khẩu. Vui lòng kiểm tra mật khẩu hiện tại của bạn.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <Icon
                    name="arrow-back"
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

            <HelperText type="error" visible={errorMessage !== ''}>
                {errorMessage}
            </HelperText>
            <View style={{ padding: 20, }}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputIconView}>
                        <Icon
                            name="key"
                            type="material-community"
                            color="#fff"
                            size={20}
                        />
                    </View>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Current Password"
                        underlineColorAndroid="transparent"
                        onChangeText={value => {
                            setPassword(value)
                            validatePassword(value);
                        }}

                        value={password}
                        secureTextEntry={!showCurrentPassword}
                        placeholderTextColor={COLORS.liteBlack}
                    />
                    <TouchableOpacity
                        style={styles.inputIconView}
                        onPress={toggleCurrentPasswordVisibility}
                    >
                        <Icon
                            name={showCurrentPassword ? 'eye-off' : 'eye'}
                            type="material-community"
                            color="#fff"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputIconView}>
                        <Icon
                            name="key"
                            type="material-community"
                            color="#fff"
                            size={20}
                        />
                    </View>
                    <TextInput
                        style={styles.inputs}
                        placeholder="New Password"
                        underlineColorAndroid="transparent"
                        onChangeText={value => {
                            setNewPassword(value);
                            validatePassword(value);
                        }

                        }
                        value={newPassword}
                        secureTextEntry={!showNewPassWord}
                        placeholderTextColor={COLORS.liteBlack}
                    />
                    <TouchableOpacity
                        style={styles.inputIconView}
                        onPress={toggleNewPasswordVisibility}
                    >
                        <Icon
                            name={showNewPassWord ? 'eye-off' : 'eye'}
                            type="material-community"
                            color="#fff"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputIconView}>
                        <Icon
                            name="key"
                            type="material-community"
                            color="#fff"
                            size={20}
                        />
                    </View>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Confirm Password"
                        underlineColorAndroid="transparent"
                        onChangeText={value => {
                            setConfirmPassword(value);
                            validatePassword(value);

                        }}
                        value={confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        placeholderTextColor={COLORS.liteBlack}
                    />
                    <TouchableOpacity
                        style={styles.inputIconView}
                        onPress={toggleConfirmPasswordVisibility}
                    >
                        <Icon
                            name={showConfirmPassword ? 'eye-off' : 'eye'}
                            type="material-community"
                            color="#fff"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleChangePassword}>
                    <Text style={styles.btnText}>Change Password</Text>
                </TouchableOpacity>
                {/* <Button
                    title="Change Password"
                    onPress={handleChangePassword}
                    buttonStyle={styles.button}
                /> */}
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
    button: {
        backgroundColor: '#3498db',
    },
    inputs: {
        borderBottomColor: COLORS.white,
        flex: 1,
        color: COLORS.black,
        paddingLeft: 10,
        fontFamily: FONTS.Regular,
    },
    inputContainer: {
        borderRadius: 30,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: 10,
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
    btnText: {
        color: '#fff',
        fontFamily: FONTS.SemiBold,
        fontSize: 14,
        marginTop: 2,
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
});

export default ChangePassword;
