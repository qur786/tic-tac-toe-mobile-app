import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { IconComponent } from "./component/IconComponent";
import { checkGameWinner } from "./utils";
import type { PlayerInput } from "./utils";

export function App(): React.JSX.Element {
  const [currentPlayer, setCurrentPlayer] =
    useState<Exclude<PlayerInput, "empty">>("x");
  const [gameState, setGameState] = useState<PlayerInput[][]>(
    new Array<PlayerInput[]>(3).fill(new Array<PlayerInput>(3).fill("empty"))
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
    // TODO: call it inside a useEffect of useMemo hook
    const winner = checkGameWinner(gameState);
    console.log(winner);
    if (
      gameState.flat(2).some((ele) => ele === "empty") !== true &&
      winner === null
    ) {
      console.log("game over");
    }
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
