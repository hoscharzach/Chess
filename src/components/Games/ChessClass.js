class ChessGame {
    constructor() {
        this.currentPlayer = 'white'
        this.board = [
            "br", "bk", "bb", "bq", "bK", "bb", "bk", "br",
            "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bp",
            "0", "0", "0", "0", "0", "0", "0", "0",
            "0", "0", "0", "0", "0", "0", "0", "0",
            "0", "0", "0", "0", "0", "0", "0", "0",
            "0", "0", "0", "0", "0", "0", "0", "0",
            "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy",
            "wr", "wk", "wb", "wq", "wK", "wb", "wk", "wr"
        ]
        // this.whitePieces = new Set("wp1", "wp2", "wp3", "wp4", "wp5", "wp6", "wp7", "wp8", "wr1", "wk1", "w1", "wq", "wk", "w2", "wk2", "wr2")
        // this.blackPieces = new Set("br1", "bk1", "bb1", "bq", "bk", "bb2", "bk2", "br2", "bp1", "bp2", "bp3", "bp4", "bp5", "bp6", "bp7", "bp8")
    }

    getCurrentPlayer() {
        return this.currentPlayer
    }

    switchPlayer() {
        this.currentPlayer === 'white' ? this.currentPlayer = 'black' : this.currentPlayer = 'white'
        return this.currentPlayer
    }

    movePiece(piece, currPosition, newPosition) {
        const [x, y] = [currPosition, newPosition]

        // if spot on board does not exist
        if (board[y] === undefined) return new Error("This tile is off the board")


        // assuming the tile exists, check if it's a valid move for
        if (this.validMoves(piece).includes(newPosition)) {
            // do something
        }
    }

    takePiece() {
        // remove the piece from both board and list of pieces
    }

    validMoves(piece, currPosition) {
        // returns array of valid moves for each type of piece
        let x = currPosition.toString()
        let arr = []
        switch (piece) {
            case "wpy":
                if (this.board[x - 17] && this.board[x - 16][0].slice[0] === '0') arr.push(x - 16)
                if (this.board[x - 9] && this.board[x - 9][0] === 'b') arr.push(x - 9)
                if (this.board[x - 8] && this.board[x - 8][0] === "0") arr.push(x - 8)
                if (this.board[x - 7] && this.board[x - 7][0] === 'b') arr.push(x - 7)
                // board is looking for strings
                return arr.map(el => el.toString())
            case "wpn":
                if (this.board[x - 9] && this.board[x - 9][0] === 'b') arr.push(x - 9)
                if (this.board[x - 8] && this.board[x - 8][0] === "0") arr.push(x - 8)
                if (this.board[x - 7] && this.board[x - 7][0] === 'b') arr.push(x - 7)
                return arr.map(el => el.toString())
            case "":
                return
            default:
                return
        }
    }

    isPawnOnFirstMove(piece) {
        // if it isn't a pawn throw exception
        if (piece[1] !== "p") {
            return new Error("This is only relevant to pawns")
        } else {
            return piece[piece.length - 1] === 'y'
        }
    }
}

export default ChessGame
