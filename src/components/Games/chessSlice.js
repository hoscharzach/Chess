import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    board: [
        "br", "bk", "bb", "bq", "bK", "bb", "bk", "br",
        "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bp",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "0", "0", "0", "0", "0", "0", "0", "0",
        "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy",
        "wr", "wk", "wb", "wq", "wK", "wb", "wk", "wr"
    ]
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
        }
    }
})


export const { movePawn, reset } = chessSlice.actions

export default chessSlice.reducer
