import { createSlice } from '@reduxjs/toolkit';


const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null
    },
    reducers: {
        updateToken: (state, payload) => {
            state.token = payload
        }
    },
});


export const { updateToken } = tokenSlice.actions

export default tokenSlice.reducer
