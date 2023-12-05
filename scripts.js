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
// Select a hole
// one at a time, distribute its stones to the next holes
  // Opponent bank? SKIP that bank and continue in my first hole
// until only one bead is left:
    // My bank/goal? Restart with a hole of the player's choice
    // a hole? 
        // Are there stones in it before you add your last bead?
            // Yes
              // Restart turn, but beginning with THAT hole
            // No
              // Opponent hole? End turn
              // My hole? Pick up opponent's stones in across well
                    // add to My bank/goal
                    // End

function takeTurn(holeIndex) {
  let currentStones = board.holes[holeIndex].stones;
  // debugger
  board.holes[holeIndex].stones = 0; // take out all the stones from the chosen hole
  let i;

  // start at chosen index; repeat stone's number of times minus 1; increase once
  for (i = holeIndex; i < currentStones + 2; i++) {
    if (i > 13) { // if our index has gotten bigger than 13
      i = 0;      // loop back around to the beginning of the array
    }
    
    // add a stone as long as the well is NOT the opponent's bank
    if ((i + 1) !== board.opponentBank) {
        board.holes[i + 1].stones += 1;                  // add a stone
    }
    // if (board.holes[i + 1].player === board.currentPlayer) { // it's our holes
    // } else if (board.holes[i + 1].player !== board.currentPlayer && ) { // it's not our holes AND it's not their bank
    //   board.holes[i + 1].stones += 1;                  // add a stone
    // }
  }

  let j = i + 1;

  // now we only have one stone left:
  if (j > 13) { // if our index has gotten bigger than 13
      j = 0  // loop back around to the beginning of the array
    }
  let nextHole = board.holes[j];
  if (nextHole.bank && nextHole.player === board.currentPlayer) {
    nextHole.stones += 1;
    // continue playing.
  }
  if (nextHole.player !== board.currentPlayer) {
    changePlayerTurn();
    return; // end function (end turn)
  }

  // if  it's our hole and there are NO stones
  if (nextHole.stones === 0) {
    // place that stone in bank
    nextHole.stones += 1;
    // add corresponding well's stones to my bank
    let oppositeHolesStones = board.holes[nextHole.corresponding].stones;
    board.holes[board.currentPlayersBank].stones += oppositeHolesStones;
    // set corresponding well's stones to 0
    board.holes[nextHole.corresponding].stones = 0;
    changePlayerTurn();
    return;
  }

  // if it's our hole and there are stones:
  if (nextHole.stones > 0) {
    // place stone in hole
    nextHole.stones += 1;
    // restart turn but with that hole as the starting index
    takeTurn(j);
  }

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

