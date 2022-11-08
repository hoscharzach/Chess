import { configureStore } from '@reduxjs/toolkit'
import chessSliceReducer from '../components/Games/chessSlice'

export const store = configureStore({
    reducer: {
        chess: chessSliceReducer
    },
})
