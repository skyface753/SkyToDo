import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  Animated,
} from "react-native";
import { appwrite } from "../appwrite";
import { Account, Databases, Models } from "appwrite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackPrams";
import { useState, useEffect } from "react";
import { config } from "../../config";
const account = new Account(appwrite);
const databases = new Databases(appwrite, config.appwrite.databaseId);
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  account
    .get()
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      navigation.navigate("SettingsStack", { screen: "Login" });
    });

  const [todos, setTodos] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadTodos();
  }, []);

  function loadTodos() {
    databases
      .listDocuments(config.appwrite.collections.todoElements)
      .then((response) => {
        console.log(response.documents);
        setTodos(response.documents);
        setLoading(false);
      })
      .catch((err) => {
        showMessage({
          message: "Error",
          type: "danger",
        });
        setLoading(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              loadTodos();
            }}
          />
        }
        style={styles.containerView}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          todos.map((todo, index) => (
            <View style={styles.todoView} key={todo.$id}>
              <Text style={styles.todoText}>{todo.task}</Text>
              <TouchableOpacity
                onPress={() => {
                  todos[index].completed = !todo.completed;
                  setTodos([...todos]);

                  databases
                    .updateDocument(
                      config.appwrite.collections.todoElements,
                      todo.$id,
                      {
                        completed: todos[index].completed,
                      }
                    )
                    .then(() => {})
                    .catch((err) => {
                      showMessage({
                        message: "Error",
                        type: "info",
                      });
                      todos[index].completed = !todos[index].completed;
                      setTodos([...todos]);
                    });
                }}
              >
                <MaterialCommunityIcons
                  name={
                    todo.completed
                      ? "checkbox-marked"
                      : "checkbox-blank-outline"
                  }
                  size={30}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          position: "absolute",
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: "#fff",
          borderRadius: 100,
        }}
        onPress={() => {
          navigation.navigate("AddTodo");
        }}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",

    backgroundColor: "#fff",
  },
  containerView: {
    width: "100%",
    height: "100%",
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  listItem: {
    height: 80,
    marginLeft: -100,
    justifyContent: "center",
    backgroundColor: "red",
  },
  absoluteCell: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerCell: {
    width: "100%",
    height: 80,
    marginLeft: 100,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  todoView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
