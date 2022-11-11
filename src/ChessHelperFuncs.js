export function defaultArray() {
    let array = []
    let offset = 0
    // every 8 squares, skip one to have alternating tiles
    for (let i = 0; i < 8; i++) {
        let row = []
        for (let j = 0; j < 8; j++) {
            row.push((j + offset) % 2 === 0 ? 1 : 0)
        }
        array.push(row)
        offset++
        // initialize board with default pieces as found in new game class
    }
    return array
}

export function getValidMoves(board, piece, start) {
    let x = Number(num)
    let moves = []
    if (piece === "0") return moves
    if (piece === "wpy") {
        if (board[x - 8] === "0") moves.push(x - 8)
        if (board[x - 16] === "0") moves.push(x - 16)
        if (board[x - 7]?.[0] === "b") moves.push(x - 7)
        if (board[x - 9]?.[0] === "b") moves.push(x - 8)
    } else if (piece === "wp") {
        if (board[x - 8] === "0") moves.push(x - 8)
        if (board[x - 7]?.[0] === "b") moves.push(x - 7)
        if (board[x - 9]?.[0] === "b") moves.push(x - 8)
    }
    if (piece === "wk" || piece === "bk") getKnightMoves(piece, board, start)
    // else if (piece === "wk" || piece === "bk") {
    //     if (board[x - 10] === "0" || (piece === "bk" && board[x - 10]?.[0] === "w") || (piece === "wk" && board[x - 10]?.[0] === "b")) moves.push(x - 10)
    //     if (board[x - 6] === "0" || (piece === "bk" && board[x - 6]?.[0] === "w") || (piece === "wk" && board[x - 6]?.[0] === "b")) moves.push(x - 6)
    //     if (board[x - 15] === "0" || (piece === "bk" && board[x - 15]?.[0] === "w") || (piece === "wk" && board[x - 15]?.[0] === "b")) moves.push(x - 15)
    //     if (board[x + 15] === "0" || (piece === "bk" && board[x + 15]?.[0] === "w") || (piece === "wk" && board[x + 15]?.[0] === "b")) moves.push(x + 15)
    //     if (board[x + 17] === "0" || (piece === "bk" && board[x + 17]?.[0] === "w") || (piece === "wk" && board[x + 17]?.[0] === "b")) moves.push(x + 17)
    //     if (board[x - 17] === "0" || (piece === "bk" && board[x - 17]?.[0] === "w") || (piece === "wk" && board[x - 17]?.[0] === "b")) moves.push(x - 17)
    //     if (board[x + 6] === "0" || (piece === "bk" && board[x + 6]?.[0] === "w") || (piece === "wk" && board[x + 6]?.[0] === "b")) moves.push(x + 6)
    //     if (board[x + 10] === "0" || (piece === "bk" && board[x + 10]?.[0] === "w") || (piece === "wk" && board[x + 10]?.[0] === "b")) moves.push(x + 10)
    // }

    return moves.map(mv => mv.toString())
}

function getKnightMoves(piece, board, start) {
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

    for (let i = 0; i < knightMoves.length; i++) {
        let mvx = knightMoves[i][0]
        let mvy = knightMoves[i][1]
        if (board[mvx][mvy] && board[mvx][mvy][0] !== piece[0]) {
            valid.push([mvx, mvy])
        }
    }
    console.log(valid)
}

export function sum(a, b) {
    return a + b
}
