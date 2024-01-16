import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { IconComponent } from "./component/IconComponent";

export function App(): React.JSX.Element {
  const [gameState] = useState<string[][]>(
    new Array<string[]>(3).fill(new Array<string>(3).fill("empty"))
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={gameState}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          return (
            <FlatList
              key={item.join()}
              numColumns={3}
              data={item}
              renderItem={(value) => (
                <Pressable key={value.item} style={styles.inputBtn}>
                  <IconComponent name="empty" />
                </Pressable>
              )}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  inputBtn: {
    padding: 35,
    backgroundColor: "#2C3335",
    borderWidth: 1,
  },
  flatListContainer: { alignItems: "center" },
});
