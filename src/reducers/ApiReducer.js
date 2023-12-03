import { createSlice } from '@reduxjs/toolkit';
import StorageService from 'store/StorageService';

const initialState = {
    appName: StorageService.getItem(StorageService.APP_NAME_SELECTED),
    sections: StorageService.getItem(StorageService.SECTIONS_SELECTED),
    config: StorageService.getItem(StorageService.CONFIG_SELECTED),
};

export const ApiSlice = createSlice({
    name: 'apiConfig',
    initialState: initialState,
    reducers: {
        setConfig: (state, action) => {
            const { appName, sections } = action.payload;
            state.appName = appName;
            StorageService.setItem(StorageService.APP_NAME_SELECTED, appName);
            state.sections = sections;
            StorageService.setItem(StorageService.SECTIONS_SELECTED, sections);
            state.config = action.payload;
            StorageService.setItem(StorageService.CONFIG_SELECTED, action.payload);
        },
    },
});

export const { setConfig } = ApiSlice.actions;

export default ApiSlice.reducer;
