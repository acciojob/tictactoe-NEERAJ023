let currentPlayer;
    let board = ['', '', '', '', '', '', '', '', ''];
    const players = {
        'player-1': '',
        'player-2': ''
    };

    function startGame() {
        players['player-1'] = document.getElementById('player-1').value;
        players['player-2'] = document.getElementById('player-2').value;

        document.getElementById('inputPage').style.display = 'none';
        document.getElementById('boardPage').style.display = 'block';

        currentPlayer = 'player-1';
        updateMessage();

        createBoard();
    }

    function createBoard() {
        const boardElement = document.getElementById('board');
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = (i + 1).toString();
            cell.addEventListener('click', () => cellClick(i));
            boardElement.appendChild(cell);
        }
    }

    function cellClick(index) {
        if (board[index] === '' && !checkWinner()) {
            board[index] = currentPlayer === 'player-1' ? 'X' : 'O';
            document.getElementById((index + 1).toString()).textContent = board[index];
            
            if (checkWinner()) {
                document.getElementById('message').textContent = `${players[currentPlayer]} congratulations you won!`;
            } else {
                currentPlayer = currentPlayer === 'player-1' ? 'player-2' : 'player-1';
                updateMessage();
            }
        }
    }

    function updateMessage() {
        document.getElementById('message').textContent = `${players[currentPlayer]}, you're up!`;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }