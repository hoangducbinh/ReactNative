import React, { useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import Navigation from '../../Service/Navigation';
import uuid from 'react-native-uuid';
import SimpleToast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import { Card, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

function Register() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [about, setabout] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };



  const registerUser = async () => {
    if (!validatePassword()) {
      return;
    }
    if (name == '' || email == '' || pass == '' || about == '') {
           SimpleToast.show('Fill in all the fields!');
          return false;
         }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, pass);

      if (userCredential && userCredential.user) {
        const { uid } = userCredential.user;

        let data = {
          id: uid,
          name: name,
          emailId: email,
          password: pass,
          about: about,
          img: 'https://s.net.vn/quIk',
        };

        // Update user data in Realtime Database
        await database()
          .ref(`/users/${uid}`)
          .set(data);

        SimpleToast.show('Register Successfully!');
        setname('');
        setemail('');
        setpass('');
        setabout('');
        Navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Registration Error:', error.message);
      SimpleToast.show('Registration failed. Please try again.');
    }
  };




  const validatePassword = () => {
    if (pass !== confirmPassword) {
      SimpleToast.show('Passwords do not match');
      return false;
    }
    return true;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        backgroundColor={COLORS.liteblue}
        barStyle="light-content"
        hidden={false}
      />
      <View style={styles.uppercard}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 35 }}
          source={{
            uri: 'https://s.net.vn/quu5',
          }}
        />
        
        <Text style={{ color: '#fff', fontFamily: FONTS.Bold, fontSize: 25 }}>
          OnlyFans
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}>
          <Card
            containerStyle={{
              borderRadius: 10,
              elevation: 5,
            }}>
            <Text style={styles.Login}>Register</Text>
            <Text style={styles.smallTxt}>
              In order to Register your account please fill out all fields
            </Text>
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
              <View style={styles.inputIconView}>
                <Icon name="person" type="ionicon" color="#fff" size={20} />
              </View>
              <TextInput
                style={styles.inputs}
                placeholder="Enter Full Name"
                underlineColorAndroid="transparent"
                onChangeText={value => setname(value)}
                value={name}
                placeholderTextColor={COLORS.liteBlack}
              />
            </View>
            <View style={styles.inputContainer}>
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
                placeholder="Enter Email Id"
                underlineColorAndroid="transparent"
                onChangeText={value => setemail(value)}
                value={email}
                placeholderTextColor={COLORS.liteBlack}
              />
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
                placeholder="Enter Password"
                underlineColorAndroid="transparent"
                onChangeText={value => setpass(value)}
                value={pass}
                secureTextEntry={!showPassword}
                placeholderTextColor={COLORS.liteBlack}
              />
              <TouchableOpacity
                style={styles.inputIconView}
                onPress={togglePasswordVisibility}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
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
                onChangeText={value => setConfirmPassword(value)}
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
            <View style={styles.inputContainer}>
              <View style={styles.inputIconView}>
                <Icon
                  name="help-circle-outline"
                  type="ionicon"
                  color="#fff"
                  size={20}
                />
              </View>
              <TextInput
                style={styles.inputs}
                placeholder="Enter About"
                underlineColorAndroid="transparent"
                onChangeText={value => setabout(value)}
                value={about}
                placeholderTextColor={COLORS.liteBlack}
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={registerUser}>
              <Text style={styles.btnText}>Register Now</Text>
            </TouchableOpacity>

            <View style={styles.contactView}>
              <Text style={styles.smallTxt}>Existing user?</Text>
              <TouchableOpacity
                style={{ marginLeft: 4 }}
                onPress={() => Navigation.navigate('Login')}>
                <Text style={styles.register}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  uppercard: {
    height: height / 4,
    backgroundColor: COLORS.liteblue,
    borderBottomLeftRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
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
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
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
  smallTxt: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    marginTop: 10,
    opacity: 0.5,
    textAlign: 'center',
  },
  register: {
    fontSize: 13,
    fontFamily: FONTS.SemiBold,
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.textInput,
    textDecorationLine: 'underline',
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  Login: {
    alignSelf: 'center',
    fontFamily: FONTS.Medium,
    color: COLORS.textInput,
    fontSize: 20,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
});