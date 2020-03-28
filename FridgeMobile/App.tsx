import { StyleSheet, Text, View } from "react-native";
import React from "./node_modules/@types/react";
import SearchField from "./src/component/SearchField";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <SearchField />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
