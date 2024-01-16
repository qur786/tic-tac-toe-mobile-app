import React from "react";
import type { ButtonProps } from "react-native";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import type { Winner } from "../../game-logic";

interface GameOverModalProps {
  gameOver: boolean;
  winner: Winner;
  handleRestart: ButtonProps["onPress"];
}

export function GameOverModal({
  gameOver,
  winner,
  handleRestart,
}: GameOverModalProps): JSX.Element {
  return (
    <Modal visible={gameOver || typeof winner === "string"} transparent>
      <View style={styles.resultContainer}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.result,
            color: typeof winner === "string" ? "#67E6DC" : "#BA2F16",
          }}>
          {typeof winner === "string"
            ? `Player ${winner.toUpperCase()} Won`
            : "Game Over"}
        </Text>
        <Button title="Play Again" onPress={handleRestart} color="#E74292" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#758AA2",
    gap: 40,
  },
  result: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
});
