import { createSlice } from "@reduxjs/toolkit";
import { defaultArray } from "../../ChessHelperFuncs";

const initialState = {
    board: [
        "br", "bk", "bb", "bq", "bK", "bb", "bk", "br",
        "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy",
        "wr", "wk", "wb", "wq", "wK", "wb", "wk", "wr"
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
            const s = Number(action.payload.start)
            const e = Number(action.payload.end)

            const piece = state.board[s]
            state.board[e] = piece
            state.board[s] = "0"
        }
    }
})


export const { movePawn, reset, movePiece } = chessSlice.actions

export default chessSlice.reducer
