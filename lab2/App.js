import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, ScrollView, Text, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Todo from './src/todo';
import LinearGradient from 'react-native-linear-gradient';




function App() {
  const [todo, setTodo] = React.useState('');
  const [ loading, setLoading ] = React.useState(true);
  const [ todos, setTodos ] = React.useState([]);
  const ref = firestore().collection('todos');
  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

 // mục đích useEffect để quản lý vòng đời của của một component voi react-hood
  React.useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  });

  if (loading) {
    return null; // or a spinner
  }

  return (
<LinearGradient
    colors={['#33FFFF', '#FFC300']} // Mã màu gradient
    style={{ flex: 1 }}
   >

    <View style={[styles.container]}>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList 
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
      <TextInput label={'New Todo'} value={todo} onChangeText={(text) => setTodo(text)} />
      <Button onPress={addTodo}>Add TODO</Button>
    </View>

</LinearGradient>
  );
}

export default App;


const styles = StyleSheet.create({

  container :{
      flex : 1,

  },

  button : {
      borderColor : 'red'
  },

  headerAd : {
      color : 'red',
  },
})