export function defaultArray() {
    let array = []
    let offset = 0
    // every 8 squares, skip one to have alternating tiles
    for (let i = 0; i < 64; i++) {
        if (i % 8 === 0) offset++
        // initialize board with default pieces as found in new game class
        array.push((i + offset) % 2 === 0 ? 1 : 0)
    }
    return array
}

export function getValidMoves(board, piece, x) {
    console.log(x)
    let moves = []
    if (piece === "0") return moves
    if (piece === "wpy") {
        if (board[x - 8] === "0") moves.push(x - 8)
        if (board[x - 16] === "0") moves.push(x - 16)
        if (board[x - 7]?.slice[0] === "b") moves.push(x - 7)
        if (board[x - 9]?.slice[0] === "b") moves.push(x - 8)
    }

    return moves.map(mv => mv.toString())
}
