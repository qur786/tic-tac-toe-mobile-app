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
  const [currentPlayer, setCurrentPlayer] = useState<"x" | "o">("x");
  const [gameState, setGameState] = useState<string[][]>(
    new Array<string[]>(3).fill(new Array<string>(3).fill("empty"))
  );

  const handleButtonPress = (rowIndex: number, colIndex: number) => {
    if (gameState[rowIndex][colIndex] === "empty") {
      setGameState((prev) => {
        const newState = [...prev];
        const newInnerState = [...newState[rowIndex]];
        newInnerState[colIndex] = currentPlayer;
        newState[rowIndex] = newInnerState;
        return newState;
      });
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    } else {
      // TODO: add snackbar notification.
      console.log("Can't take input in already filled box.");
    }
    // TODO: add check game winner function call.
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={gameState}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item: rowItem, index: rowIndex }) => {
          return (
            <FlatList
              key={rowItem.join()}
              numColumns={3}
              data={rowItem}
              renderItem={({ item: colItem, index: colIndex }) => (
                <Pressable
                  key={colItem}
                  android_ripple={{
                    color: "yellow",
                  }}
                  style={styles.inputBtn}
                  onPress={() => handleButtonPress(rowIndex, colIndex)}>
                  <IconComponent name={colItem} />
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
