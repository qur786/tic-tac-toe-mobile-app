import React, { useEffect, useState } from "react";
import type { ButtonProps } from "react-native";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import Snackbar from "react-native-snackbar";
import { GameOverModal } from "./component/GameOverModal";
import { IconComponent } from "./component/IconComponent";
import { checkGameWinner } from "./utils";
import type { PlayerInput, Winner } from "./utils";

export function App(): React.JSX.Element {
  const [currentPlayer, setCurrentPlayer] =
    useState<Exclude<PlayerInput, "empty">>("x");
  const [winner, setWinner] = useState<Winner>(null);
  const [gameState, setGameState] = useState<PlayerInput[][]>(
    new Array<PlayerInput[]>(3).fill(new Array<PlayerInput>(3).fill("empty"))
  );
  const [gameOver, setGameOver] = useState(false);

  const handleBoxPress = (rowIndex: number, colIndex: number) => {
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
    setGameOver(false);
  };

  useEffect(() => {
    const win = checkGameWinner(gameState);
    if (typeof win === "string") {
      setWinner(win);
    } else if (gameState.flat(2).some((ele) => ele === "empty") !== true) {
      setGameOver(true);
    }
  }, [gameState]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.playerTurnText}>
        {`Player ${currentPlayer.toUpperCase()}'s Turn `}
      </Text>
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
                  onPress={() => handleBoxPress(rowIndex, colIndex)}>
                  <IconComponent name={colItem} />
                </Pressable>
              )}
            />
          );
        }}
      />
      <Button title="Reload Game" onPress={handleReloadPress} color="#E74292" />
      <GameOverModal
        gameOver={gameOver}
        winner={winner}
        handleRestart={handleReloadPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingVertical: 20,
  },
  playerTurnText: {
    backgroundColor: "#E74292",
    color: "white",
    height: 80,
    marginHorizontal: 40,
    borderRadius: 6,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 24,
    paddingHorizontal: 50,
  },
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
});
