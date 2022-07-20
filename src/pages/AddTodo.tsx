import { Text, Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackPrams";
import { appwrite } from "../appwrite";
import { Databases } from "appwrite";
import { config } from "../../config";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const database = new Databases(appwrite, config.appwrite.databaseId);

export default function AddTodoScreen({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "AddTodo">;
}) {
  const [todo, setTodo] = useState("");
  return (
    <View>
      <Text>Add Todo Screen</Text>
      <TextInput
        // style={styles.input}
        placeholder="Todo"
        onChangeText={(text) => setTodo(text)}
        value={todo}
      />
      <Button
        // title="Add Todo"
        onPress={() => {
          if (todo.length < 1) {
            showMessage({
              message: "Todo is empty",
              type: "danger",
            });
            return;
          }
          database
            .createDocument(
              config.appwrite.collections.todoElements,
              "unique()",
              {
                task: todo,
                completed: false,
              }
            )
            .then(() => {
              showMessage({
                message: "Todo added",
                type: "info",
              });
              navigation.goBack();
            })
            .catch((err) => {
              console.log(err);
              showMessage({
                message: "Error",
                type: "info",
              });
            });
        }}
      >
        Add Todo
      </Button>
    </View>
  );
}
