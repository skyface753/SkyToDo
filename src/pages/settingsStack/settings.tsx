import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackPrams";
import { StackNavigationProp } from "@react-navigation/stack";

type loginScreenProp = StackNavigationProp<RootStackParamList, "Login">;
type registerScreenProp = StackNavigationProp<RootStackParamList, "Register">;

export default function SettingsScreen() {
  const navigation = useNavigation<loginScreenProp>();
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <Button
        title="Go to Register"
        onPress={() => {
          navigation.navigate("Register");
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
});
