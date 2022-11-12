import { createSlice } from "@reduxjs/toolkit";
import { defaultArray } from "../../ChessHelperFuncs";

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
    offColor: defaultArray()
}
export const chessSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        movePawn: (state) => {
            state.board[8] = "0"
            state.board[16] = "bpy"
        },
        reset: state => {
            state.board = initialState.board
        },
        movePiece: (state, action) => {
            // console.log(action.payload)
            const { start, end } = action.payload
            console.log(start, end)

            const piece = state.board[start[0]][start[1]]
            // if it's pawn, remove the y, meaning it's made its first move
            if (piece === "wpy" || piece === "bpy") {
                state.board[end[0]][end[1]] = piece.slice(0, 2)
                state.board[start[0]][start[1]] = "0"
            } else {
                state.board[end[0]][end[1]] = piece
                state.board[start[0]][start[1]] = "0"
            }
        }
    }
})


export const { movePawn, reset, movePiece } = chessSlice.actions

export default chessSlice.reducer
