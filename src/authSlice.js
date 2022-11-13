import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    username: null,
    messages: [],
    conn: null
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
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload.message)
        },
        setConn: (state, action) => {
            state.conn = action.payload.conn
        }

    }
})

export const { setUser, setUsername, setMessages, setConn } = authSlice.actions

export default authSlice.reducer
