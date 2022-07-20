import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { appwrite } from "../../appwrite";
import { Account } from "appwrite";
import { RootStackParamList } from "../RootStackPrams";
import { StackNavigationProp } from "@react-navigation/stack";

type loginScreenProp = StackNavigationProp<RootStackParamList, "Login">;

const account = new Account(appwrite);

export default function RegisterScreen() {
  const navigation = useNavigation<loginScreenProp>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setPasswordConfirm(text)}
        value={passwordConfirm}
        secureTextEntry={true}
      />
      <Button
        title="Register"
        onPress={() => {
          //Register
          account.create("unique()", email, password, username).then(() => {
            // Login
            account.createEmailSession(email, password).then(() => {
              // Verify email
              account
                //TODO: CHANGE
                .createVerification("http://localhost:3000/verify")
                .then((response) => {
                  console.log(response);
                });
              navigation.navigate("Login");
            });
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    width: 200,
    borderRadius: 10,
  },
});
