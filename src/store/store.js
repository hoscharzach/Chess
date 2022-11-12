import { configureStore } from '@reduxjs/toolkit'
import chessSliceReducer from '../components/Games/chessSlice'
import authSliceReducer from '../authSlice'

export const store = configureStore({
    reducer: {
        chess: chessSliceReducer,
        auth: authSliceReducer
    },
})
