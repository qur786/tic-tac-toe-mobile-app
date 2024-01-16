import React from "react";
import type { ButtonProps } from "react-native";
import { Modal, View, Text, Button } from "react-native";
import type { Winner } from "../../utils";

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#758AA2",
          gap: 40,
        }}>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            color: typeof winner === "string" ? "#67E6DC" : "red",
            fontSize: 32,
            fontWeight: "bold",
          }}>
          {typeof winner === "string"
            ? `Player ${winner.toUpperCase()} Won`
            : "Game Over"}
        </Text>
        <Button title="Play Again" onPress={handleRestart} />
      </View>
    </Modal>
  );
}
