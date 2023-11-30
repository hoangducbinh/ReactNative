import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { AuthenticatedUserProvider } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
import TabNavigator from './contact-list/3/routes';
import { View } from './components';


const App = () => {
  useEffect(() => {
    // Đặt màu sắc StatusBar theo màu của nền màn hình
    StatusBar.setBackgroundColor('transparent'); // Màu nền không đục
    StatusBar.setBarStyle('dark-content'); // Chọn kiểu hiển thị chữ đen

    return () => {
      // Trả lại cài đặt ban đầu khi màn hình được unmount (nếu cần)
      StatusBar.setBackgroundColor('#2c3e50'); // Màu nền của thanh trạng thái
      StatusBar.setBarStyle('light-content'); // Chọn kiểu hiển thị chữ trắng
    };
  }, []);

  return (
    
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          
          <RootNavigator />
         
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
  );
};



export default App;



const styles = StyleSheet.create({
  container: {
    flex : 1,
  },

})