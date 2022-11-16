export function defaultArray() {
    let array = []
    let offset = 0

    // make rows
    for (let i = 0; i < 8; i++) {
        let row = []
        // make boxes in row
        for (let j = 0; j < 8; j++) {
            // push a 1 if the color is offset, otherwise push a 0
            // these are mapped to tiles in the chess.jsx component
            row.push((j + offset) % 2 === 0 ? 1 : 0)
        }
        array.push(row)
        // every iteration of a new row, increase offset to have checkerboard color
        offset++
    }
    return array
}

export function getValidMoves(board, piece, x, y) {
    switch (true) {
        case piece === "wk" || piece === "bk":
            return getKnightMoves(board, piece, x, y)
        case piece === "wpy" || piece === "bpy" || piece === "bp" || piece === "wp":
            return getPawnMoves(board, piece, x, y)
        case piece === "wb" || piece === "bb":
            return getDirectionalMoves(board, piece, x, y, "diagonal")
        case piece === "wr" || piece === "br":
            return getDirectionalMoves(board, piece, x, y, "normal")
        case piece === "wq" || piece === "bq":
            return getDirectionalMoves(board, piece, x, y, "queen")
        case piece === "bK" || piece === "wK":
            return getKingMoves(board, piece, x, y)
        default:
            return []
    }
}

function getKingMoves(board, piece, x, y) {
    const directions = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1]
    ]

    let mvs = []
    for (let index = 0; index < directions.length; index++) {
        const [a, b] = directions[index];
        if (board[x + a] && board[x + a][y + b] && board[x + a][y + b][0] !== piece[0]) {
            mvs.push([a + x, y + b])
        }
    }

    return mvs.map(coord => `${coord[0]}-${coord[1]}`)
}

function isCheck(board, piece, x, y) {
    let mvs = []
    // if king can move for ward with valid pawn move attack
    // that means king can die to pawn
    mvs.concat(getPawnMoves(board, piece, x, y))
    // same applies for all other types

    // check for all types of moves originating from the king instead
    console.log(mvs)
    // return mvs.map(mv => `The ${piece[0] === "b" ? 'black' : 'white'} is in check from mv`)
    // array of moves is more than 0, king is in check?
}


function getPawnMoves(board, piece, x, y) {
    let mvs = []
    const firstMove = piece[piece.length - 1] === "y"
    const color = piece[0]
    if (color === "b") {
        if (board[x + 1] &&
            board[x + 1][y] &&
            board[x + 1][y] === "0") {
            // down one - check for empty space
            mvs.push([x + 1, y])
        }

        if (firstMove &&
            board[x + 2] &&
            board[x + 2][y] &&
            board[x + 2][y] === "0" &&
            board[x + 1][y] === "0") {
            // down two - check if first move and down one and down two
            mvs.push([x + 2, y])
        }

        if (board[x + 1] &&
            board[x + 1][y - 1] &&
            board[x + 1][y - 1][0] === "w") {
            // down one, left one - check if enemy piece
            mvs.push([x + 1, y - 1])
        }

        if (board[x + 1] &&
            board[x + 1][y + 1] &&
            board[x + 1][y + 1][0] === "w") {
            // down one, right one - check if enemy piece
            mvs.push([x + 1, y + 1])
        }

    } else {

        if (board[x - 1] &&
            board[x - 1][y] &&
            board[x - 1][y] === "0") {
            // up one - check for empty space
            mvs.push([x - 1, y])
        }

        if (firstMove &&
            board[x - 2] &&
            board[x - 2][y] &&
            board[x - 2][y] === "0" &&
            board[x - 1][y] === "0") {
            // up two - check both for empty space
            mvs.push([x - 2, y])
        }

        if (board[x - 1] &&
            board[x - 1][y - 1] &&
            board[x - 1][y - 1][0] === "b") {
            // up one, left one - check for enemy piece
            mvs.push([x - 1, y - 1])
        }

        if (board[x - 1] &&
            board[x - 1][y + 1] &&
            board[x - 1][y + 1][0] === "b") {
            // up one, right one - check for enemy piece
            mvs.push([x - 1, y + 1])
        }
    }
    // console.log(mvs)
    return mvs.map(coord => `${coord[0]}-${coord[1]}`)
}
function getKnightMoves(board, piece, x, y) {
    const knightMoves = [
        [-1, 2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [2, 1],
        [2, -1],
        [1, 2],
        [1, -2]
    ]

    let valid = []

    // for each l possible knight move
    for (let i = 0; i < knightMoves.length; i++) {
        let xDiff = knightMoves[i][0] + x
        let yDiff = knightMoves[i][1] + y

        // check if the tile exists on the board and if it's an enemy
        // knight can go to occupied tile as long as it's an enemy
        if (board[xDiff]?.[yDiff] && board[xDiff]?.[yDiff][0] !== piece[0]) {
            valid.push([xDiff, yDiff])
        }
    }

    return valid.map(coord => `${coord[0]}-${coord[1]}`)
}


function getDirectionalMoves(board, piece, x, y, type) {
    let directions

    // bishop
    if (type === "diagonal") {
        directions = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ]
    }

    // rook
    else if (type === "normal") {
        directions = [
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, 0]
        ]
    }

    // queen
    else {
        directions = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ]
    }

    let mvs = []

    for (let i = 0; i < directions.length; i++) {

        // start with direction
        let a = directions[i][0]
        let b = directions[i][1]

        // while the tile exists on the board
        while (board[x + a] && board[x + a][y + b]) {

            // if tile is empty in that direction, push the tile to valid moves array
            if (board[x + a][y + b] === "0") {
                mvs.push([x + a, y + b])
                // and go one more tile in that direction
                a += directions[i][0]
                b += directions[i][1]

            }

            // if it's an enemy piece, add it to the moves array and then
            // break out of the loop because we have to stop going in that direction
            else if (board[x + a][y + b][0] !== piece[0]) {
                mvs.push([x + a, y + b])
                break
            }

            // otherwise if we hit an allied piece so just break out of the loop
            else {
                break
            }
        }
    }

    return mvs.map(coord => `${coord[0]}-${coord[1]}`)

}
