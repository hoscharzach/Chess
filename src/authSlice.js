import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    username: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        }
    }
})

export const { setUser, setUsername, addMessage, setConn } = authSlice.actions

export default authSlice.reducer
