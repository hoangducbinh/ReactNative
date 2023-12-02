import { StatusBar, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import { useEffect } from "react";


const App =()=>
{

  useEffect(() => {
    // Đặt màu sắc StatusBar theo màu của nền màn hình
    StatusBar.setBackgroundColor('violet'); // Màu nền không đục
    StatusBar.setBarStyle('light-content'); // Chọn kiểu hiển thị chữ đen

    return () => {
      // Trả lại cài đặt ban đầu khi màn hình được unmount (nếu cần)
      StatusBar.setBackgroundColor('#2c3e50'); // Màu nền của thanh trạng thái
      StatusBar.setBarStyle('dark-content'); // Chọn kiểu hiển thị chữ trắng
    };
  }, []);

  return (

    <View style = {styles.container}>
        <LoginScreen/>
    </View>

  );
};


const styles = StyleSheet.create({

  container: {
    flex : 1,
    justifyContent : "center",
    alignContent : "center",
  }

})






export default App;
