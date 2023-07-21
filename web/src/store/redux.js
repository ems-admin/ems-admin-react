import { createSlice } from '@reduxjs/toolkit';


const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: {
            token: null,
            username: null
        }
    },
    reducers: {
        updateToken: (state, {payload}) => {
            state.userInfo = {...state.userInfo, token: payload}
        }
    },
});


export const { updateToken } = userInfoSlice.actions

export default userInfoSlice.reducer
