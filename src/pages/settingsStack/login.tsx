import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { appwrite } from "../../appwrite";
import { Account } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const account = new Account(appwrite);

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
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
      <Button
        title="Login"
        onPress={() => {
          account.createEmailSession(email, password).then(() => {
            navigation.navigate("HomeStack", { screen: "Home" });
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
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});
