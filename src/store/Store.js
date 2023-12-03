import { configureStore } from '@reduxjs/toolkit';
import ApiReducer from 'reducers/ApiReducer';

const store = configureStore({
    reducer: {
        apiConfig: ApiReducer,
    },
});

export default store;
