const board = {
  holes: [
    {player: 1, stones: 4, bank: false, corresponding: 7}, // index 0
    {player: 1, stones: 4, bank: false, corresponding: 8}, // index 1
    {player: 1, stones: 4, bank: false, corresponding: 9}, // index 2 * player chooses this
    {player: 1, stones: 4, bank: false, corresponding: 10}, // index 3
    {player: 1, stones: 4, bank: false, corresponding: 11}, // index 4
    {player: 1, stones: 4, bank: false, corresponding: 12}, // index 5
    {player: 1, stones: 0, bank: true},  // index 6
    {player: 2, stones: 4, bank: false, corresponding: 0}, // index 7
    {player: 2, stones: 4, bank: false, corresponding: 1}, // index 8
    {player: 2, stones: 4, bank: false, corresponding: 2}, // index 9
    {player: 2, stones: 4, bank: false, corresponding: 3}, // index 10
    {player: 2, stones: 4, bank: false, corresponding: 4}, // index 11
    {player: 2, stones: 4, bank: false, corresponding: 5}, // index 12
    {player: 2, stones: 0, bank: true},  // index 13
  ],
  currentPlayer: 1,
  currentPlayersBank: 6,
  opponentBank: 13
}

function getNextHole(currentIndex) {
  if (currentIndex === 13) {
    return board.holes[0]
  }

  return board.holes[currentIndex + 1]
}

function takeTurn(chosenIndex) {
  debugger;
  let currentHole = board.holes[chosenIndex];
  let currentStones = currentHole.stones;
  let nextHole;
  let i;
  currentHole.stones = 0;

  for (i = chosenIndex; i <= currentStones; i++) {
    nextHole = getNextHole(i);

    // place a stone in all next holes except the opponent's bank
    if (i !== board.opponentBank) {
      nextHole.stones += 1;
    }
  }

  nextHole = getNextHole(i);

  // keep playing:
  // when you end in a hole (not bank) with stones in it
  if (confirmNotBank(nextHole) && nextHole.stones > 0) {
    nextHole.stones += 1;
    takeTurn(i + 1);
  }

  // end turn
  // when you end in your bank
  if ((i + 1) === board.currentPlayersBank) {
    nextHole.stones += 1;
    changePlayerTurn();
    return;
  }
  
  // when you end in an empty hole on the opponent's side
  if (nextHole.stones === 0 && !confirmMine(nextHole)) {
    nextHole.stones += 1;
    changePlayerTurn();
    return;
  }
  
  // when you end in an empty hole on your side
  if (nextHole.stones === 0 && confirmMine(nextHole)) {
    // take opposite hole's stone + your last stone & add to your bank
    board.holes[board.currentPlayersBank].stones += board.holes[nextHole.corresponding].stones;
    board.holes[board.currentPlayersBank].stones += 1;
    board.holes[nextHole.corresponding].stones = 0;
    changePlayerTurn();
    return;
  }
}

function confirmMine(nextHole) {
  return nextHole.player === board.currentPlayer
}

function confirmNotBank(nextHole) {
  return !nextHole.bank
}

function changePlayerTurn() {
  if (board.currentPlayer === 1) {
    board.currentPlayer = 2
    board.currentPlayersBank = 13
    board.opponentBank = 6
  } else {
    board.currentPlayer = 1
    board.currentPlayersBank = 6
    board.opponentBank = 13
  }
}

