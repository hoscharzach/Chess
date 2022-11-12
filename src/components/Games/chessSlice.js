import { createSlice } from "@reduxjs/toolkit";
import { defaultArray } from "../../ChessHelperFuncs";
import { current } from '@reduxjs/toolkit'

const initialState = {
    board: [
        ["br", "bk", "bb", "bq", "bK", "bb", "bk", "br"],
        ["bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy"],
        ["wr", "wk", "wb", "wq", "wK", "wb", "wk", "wr"]
    ],
    offColor: defaultArray(),
    blackKingPosition: [0, 4],
    whiteKingPosition: [7, 4],
    currentTurn: 'w',
    whitePlayer: null,
    blackPlayer: null
}
export const chessSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        setWhitePlayer: (state, action) => {
            state.whitePlayer = action.payload
        },
        setBlackPlayer: (state, action) => {
            state.blackPlayer = action.payload
        },
        movePawn: (state) => {
            state.board[8] = "0"
            state.board[16] = "bpy"
        },
        reset: state => {
            state.board = initialState.board
        },
        updateKingPosition: (state, action) => {
            const x = action.payload.newPosition[0]
            const y = action.payload.newPosition[1]
            action.payload.piece === "wK" ?
                state.whiteKingPosition = [x, y]
                : state.blackKingPosition = [x, y]

        },
        movePiece: (state, action) => {

            const { start, end } = action.payload

            const piece = state.board[start[0]][start[1]]
            // if it's pawn, remove the y, meaning it's made its first move
            if (piece === "wpy" || piece === "bpy") {
                state.board[end[0]][end[1]] = piece.slice(0, 2)
                state.board[start[0]][start[1]] = "0"
            } else {
                state.board[end[0]][end[1]] = piece
                state.board[start[0]][start[1]] = "0"
            }
        },
        changeTurns: (state) => {
            state.currentTurn === "w" ? state.currentTurn = "b" : state.currentTurn = "w"
        }
    }
})


export const { movePawn, reset, movePiece, updateKingPosition, changeTurns, setWhitePlayer, setBlackPlayer } = chessSlice.actions

export default chessSlice.reducer
