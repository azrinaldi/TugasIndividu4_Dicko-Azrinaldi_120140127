import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { addTodo, deleteTodo, fetchTodos } from './src/actions/todoActions';
import store from './src/store';

export default function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const [text, setText] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = () => {
    dispatch(addTodo({
      title: text,
      description: description,
    }));
    setText('');
    setDescription('');
  };

  const handleDelete = id => {
    dispatch(deleteTodo({
      id,
    }));
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>To-Do List</Text>
        <TextInput
          style={styles.input}
          placeholder="Add title..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
        />
        <TextInput
          style={styles.input}
          placeholder="Add description..."
          value={description}
          onChangeText={setDescription}
          onSubmitEditing={handleSubmit}
        />
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todo}>
              <View>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text style={styles.todoDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
  },
  todoTitle: {
    fontSize: 18,
  },
  todoDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});