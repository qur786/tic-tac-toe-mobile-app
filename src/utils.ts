export type PlayerInput = "x" | "o" | "empty";
type Winner = "x" | "o" | null;

export function checkGameWinner(input: PlayerInput[][]): Winner {
  let winner: Winner = null;

  if (
    input[0][0] === input[0][1] &&
    input[0][0] === input[0][2] &&
    input[0][0] !== "empty"
  ) {
    winner = input[0][0];
  } else if (
    input[1][0] === input[1][1] &&
    input[1][0] === input[1][2] &&
    input[1][0] !== "empty"
  ) {
    winner = input[1][0];
  } else if (
    input[2][0] === input[2][1] &&
    input[2][0] === input[2][2] &&
    input[2][0] !== "empty"
  ) {
    winner = input[2][0];
  } else if (
    input[0][0] === input[1][0] &&
    input[0][0] === input[2][0] &&
    input[0][0] !== "empty"
  ) {
    winner = input[0][0];
  } else if (
    input[0][1] === input[1][1] &&
    input[0][1] === input[2][1] &&
    input[0][1] !== "empty"
  ) {
    winner = input[0][1];
  } else if (
    input[0][2] === input[1][2] &&
    input[0][2] === input[2][2] &&
    input[0][2] !== "empty"
  ) {
    winner = input[0][2];
  } else if (
    input[0][0] === input[1][1] &&
    input[0][0] === input[2][2] &&
    input[0][0] !== "empty"
  ) {
    winner = input[0][0];
  } else if (
    input[0][2] === input[1][1] &&
    input[0][2] === input[2][0] &&
    input[0][2] !== "empty"
  ) {
    winner = input[0][2];
  }

  return winner;
}
