import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Todo from './src/todo';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 

function App() {
  const [todo, setTodo] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [todos, setTodos] = React.useState([]);
  const ref = firestore().collection('todos');

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

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
  }, []);

  if (loading) {
    return null; // or a spinner
  }

  return (
    <SafeAreaProvider>
    <LinearGradient
      colors={['#FFEFD5', '#FF3366']} // Mã màu gradient
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor="#FFEFD5" barStyle="dark-content" />
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title={'List'} style={styles.titles} />
        </Appbar.Header>
        <FlatList
          style={{ flex: 1 }}
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Todo {...item} />}
        />
        <View style={styles.inputContainer}>
          <TextInput
            label={'New Todo'}
            value={todo}
            onChangeText={text => setTodo(text)}
            style={styles.input}
          />
          <Button mode="contained" onPress={addTodo} style={styles.button}>
            Add TODO
          </Button>
        </View>
      </View>
    </LinearGradient>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#FFC300',
    width: 100,
    height: 40,
    justifyContent: 'center',
  },

  titles : {
    justifyContent: "center",
    alignItems : "center"
  }
});
