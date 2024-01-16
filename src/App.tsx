import React, { useEffect, useState } from "react";
import type { ButtonProps } from "react-native";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import Snackbar from "react-native-snackbar";
import { GameOverModal } from "./component/GameOverModal";
import { PlayerIcon } from "./component/PlayerIcon";
import { checkGameWinner } from "./game-logic";
import type { PlayerInput, Winner } from "./game-logic";

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
      <Text style={styles.title}>Tic Tac Toe</Text>
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
                    color: "white",
                  }}
                  style={styles.inputBtn}
                  onPress={() => handleBoxPress(rowIndex, colIndex)}>
                  <PlayerIcon name={colItem} />
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
    backgroundColor: "#616C6F",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontFamily: "cursive",
    color: "#E74292",
    fontSize: 52,
    fontWeight: "bold",
  },
  playerTurnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 60,
  },
  inputBtn: {
    padding: 35,
    backgroundColor: "#586776",
    borderWidth: 1,
    borderColor: "#8395A7",
  },
  flatListMainContainer: { maxHeight: "50%" },
  flatListContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
