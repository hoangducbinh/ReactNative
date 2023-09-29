
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import  {FirebaseStorage} from 'firebase/storage'

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm biến trạng thái isLoggedIn
//   const [userInfo, setUserInfo] = useState(null); // Thêm biến trạng thái userInfo
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleLogin = () => {
//     // Điều này là nơi bạn có thể thực hiện xác thực và xử lý đăng nhập thực tế.
//     if (email && password) {
//       // Thực hiện xử lý đăng nhập ở đây. Ví dụ:
//       // Simulate a successful login
//       const user = { email };
//       setUserInfo(user);
//       setIsLoggedIn(true);
//       setIsModalVisible(true); // Hiển thị modal thông báo
//     } else {
//       setErrorMessage('Vui lòng điền đầy đủ thông tin đăng nhập.');
//       setIsModalVisible(true); // Hiển thị modal thông báo
//     }
//   };

//   return (
//     <LinearGradient
//     colors={['#33FFFF', '#FFC300']} // Mã màu gradient
//     style={{ flex: 1 }}
//   >

//     <View style={styles.container}>
//       <Text style={styles.title}>Login xem nào</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mật khẩu"
//         onChangeText={(text) => setPassword(text)}
//         value={password}
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => {
//           setIsModalVisible(false);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {isLoggedIn ? (
//               <>
//                 <Text style={styles.modalText}>Đăng nhập thành công!</Text>
//                 <Text style={styles.modalText}>Email: {userInfo.email}</Text>
//               </>
//             ) : (
//               <Text style={styles.modalText}>{errorMessage}</Text>
//             )}
//             <Button title="Đóng" onPress={() => setIsModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>

//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,
//     color : '#BB0000'
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 8,
//     elevation: 5,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 16,
//   },
// });

// export default LoginScreen;

