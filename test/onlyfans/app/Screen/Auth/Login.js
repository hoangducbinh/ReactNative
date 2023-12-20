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
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import { Card, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

function Login() {
  const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const loginUser = async () => {
  //   database()
  //     .ref('users/')
  //     .orderByChild('emailId')
  //     .equalTo(email)
  //     .once('value')
  //     .then(async snapshot => {
  //       if (snapshot.val() == null) {
  //         SimpleToast.show('Invalid Email Id!');
  //         return false;
  //       }
  //       let userData = Object.values(snapshot.val())[0];
  //       if (userData?.password != pass) {
  //         SimpleToast.show('Invalid Password!');
  //         return false;
  //       }

  //       console.log('User data: ', userData);
  //       dispatch(setUser(userData));
  //       await Auth.setAccount(userData);
  //       SimpleToast.show('Login Successfully!');
  //     })
  //     .catch(e => {
  //       SimpleToast.show(e.message);
  //     });
  // };
  

  const loginUser = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, pass);
      const user = userCredential.user;
  
      // Sử dụng uid thay vì email để truy cập dữ liệu người dùng
      const userSnapshot = await database().ref(`users/${user.uid}`).once('value');
      const userData = userSnapshot.val();
  
      if (!userData) {
        SimpleToast.show('Invalid User Data!');
        return false;
      }
  
      // Thực hiện các thao tác với userData theo ý bạn
      dispatch(setUser(userData));
      await Auth.setAccount(userData);
  
      SimpleToast.show('Login Successfully!');
    } catch (error) {
      SimpleToast.show(error.message);
    }
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Card
            containerStyle={{
              borderRadius: 10,
              elevation: 5,
            }}>
            <Text style={styles.Login}>Login</Text>
            <Text style={styles.smallTxt}>
              In order to login your account please enter credentials
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
                placeholder="Enter Email Id"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={value => {
                  setemail(value.toLowerCase());
                }}
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
                onChangeText={(value) => {
                  setpass(value);
                }}
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

            <TouchableOpacity style={styles.btn} onPress={loginUser}>
              <Text style={styles.btnText}>Login Now</Text>
            </TouchableOpacity>

            <View style={styles.contactView}>
              <Text style={styles.smallTxt}>New user?</Text>
              <TouchableOpacity
                style={{ marginLeft: 4 }}
                onPress={() => Navigation.navigate('Register')}>
                <Text style={styles.register}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

export default Login;

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
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
});