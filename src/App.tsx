import React, { useEffect, useState } from "react";
import type { ButtonProps } from "react-native";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Snackbar from "react-native-snackbar";
import { IconComponent } from "./component/IconComponent";
import { checkGameWinner } from "./utils";
import type { PlayerInput, Winner } from "./utils";

export function App(): React.JSX.Element {
  const [currentPlayer, setCurrentPlayer] =
    useState<Exclude<PlayerInput, "empty">>("x");
  const [, setWinner] = useState<Winner>(null);
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
      Snackbar.show({
        text: "Cannot update the current box, already filled, choose other.",
        textColor: "white",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "red",
      });
    }
  };

  const handleReloadPress: ButtonProps["onPress"] = () => {
    setCurrentPlayer("x");
    setWinner(null);
    setGameState(
      new Array<PlayerInput[]>(3).fill(new Array<PlayerInput>(3).fill("empty"))
    );
  };

  useEffect(() => {
    const win = checkGameWinner(gameState);
    if (
      gameState.flat(2).some((ele) => ele === "empty") !== true &&
      win === null
    ) {
      // TODO: replace it with modal
      Snackbar.show({
        text: "Game Over",
        textColor: "white",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "red",
      });
    }

    if (win !== null) {
      // TODO: replace it with modal
      setWinner(win);
      Snackbar.show({
        text: `${win} has won the match.`,
        textColor: "white",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "red",
      });
    }
  }, [gameState]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={gameState}
        style={styles.flatListMainContainer}
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
      <View style={styles.reloadBtn}>
        <Button
          title="Reload Game"
          onPress={handleReloadPress}
          color="#0A79DF"
        />
      </View>
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
  flatListMainContainer: { maxHeight: "50%" },
  flatListContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  reloadBtn: { width: 180, alignSelf: "center" },
});
