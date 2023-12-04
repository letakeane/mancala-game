const board = {
  player1: {
    board: [
    {well1: 4, head: false},
    {well2: 4, head: false},
    {well3: 4, head: false},
    {well4: 4, head: false},
    {well5: 4, head: false},
    {well6: 4, head: false},
    {well7: 0, head: true},
    ],
    current: true
  },
  player2: {
    board: [
    {well1: 4, head: false},
    {well2: 4, head: false},
    {well3: 4, head: false},
    {well4: 4, head: false},
    {well5: 4, head: false},
    {well6: 4, head: false},
    {well7: 0, head: true},
    ],
    current: false
  },
}

const turn = () => {

}

const updatePlayers = () => {
  board.player1.current = !board.player1.current;
  board.player2.current = !board.player1.current;
}