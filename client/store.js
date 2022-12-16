import {configureStore} from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import dataReducer from './slices/dataSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        data:dataReducer,
    }
});