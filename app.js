document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winningCombinations = [
            [0,1,2], [3,4,5],[6,7,8], //Horizontal
            [0,3,6], [1,4,7],[2,5,8], //vertical
            [0,4,8], [2,4,6] //Diagonal
        ];
        for(const combo of winningCombinations){
            const [a,b,c] = combo;
            if(boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]){
                return boardState[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return !boardState.includes('');
    };

    const announceResult = (result) =>{
        if(result) {
            status.textContent = `O jogador ${result} Venceu!`;
        }else{
            status.textContent = `O jogo Empatou!`;
        }
        gameActive = false;
    };

    const handleCellClick = (index) => {
        if(gameActive && boardState[index] === ''){
            boardState[index] = currentPlayer;
            board.children[index].textContent = currentPlayer;
            const winner = checkWinner();
            if(winner){
                announceResult(winner);
            }else if (checkDraw()){
                announceResult(null);
            }else{
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Vez do jogador ${currentPlayer}`;
            }
        }
    };

    const resetGame = () => {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = 'Vez do Jogador X';
        board.innerHTML = '';
        for(let i = 0; i < 9; i++){
            const cell = document.createElement('div');
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
    }
    resetButton.addEventListener('click', resetGame);

    resetGame();
})