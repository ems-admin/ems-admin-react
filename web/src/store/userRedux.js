import { createSlice } from '@reduxjs/toolkit';

//  定义用户信息切片
const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: {
            token: null,
            refreshToken: null,
            info: null,
            isLoadMenu: false,
            router: null
        }
    },
    reducers: {
        //  缓存token
        updateToken: (state, {payload}) => {
            state.userInfo = {...state.userInfo, token: payload}
        },
        //  缓存refreshToken
        updateRefreshToken: (state, {payload}) => {
            state.userInfo = {...state.userInfo, refreshToken: payload}
        },
        //  缓存登录用户名
        updateInfo: (state, {payload}) => {
            state.userInfo = {...state.userInfo, info: payload}
        },
        //  缓存拉取菜单状态
        updateLoadMenu: (state) => {
            state.userInfo = {...state.userInfo, isLoadMenu: true}
        },
        //  缓存拉取的菜单
        updateRouter: (state, {payload}) => {
            state.userInfo = {...state.userInfo, router: payload}
        }
    },
});


export const { updateToken, updateRefreshToken, updateInfo, updateLoadMenu, updateRouter } = userInfoSlice.actions


export default userInfoSlice.reducer


