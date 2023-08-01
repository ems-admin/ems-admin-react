import { createSlice } from '@reduxjs/toolkit';

//  定义菜单相关切片
const menuInfoSlice = createSlice({
    name: 'menuInfo',
    initialState: {
        menuInfo: {
            activeKey: '/home',
            openTabs: [
                {
                    label: '首页',
                    key: '/home',
                    realpath: 'Home'
                }
            ]
        }
    },
    reducers: {
        //  缓存激活菜单key
        updateActiveKey: (state, {payload}) => {
            state.menuInfo = {...state.menuInfo, activeKey: payload}
        },
        //  缓存已打开的菜单
        updateOpenTabs: (state, {payload}) => {
            if (!state.menuInfo.openTabs.some(obj => obj.key === payload.key)){
                state.menuInfo = {...state.menuInfo, openTabs: [...state.menuInfo.openTabs, payload]}
            }
        },
        //  关闭已打开的菜单
        removeTab: (state, {payload}) => {
            state.menuInfo = {...state.menuInfo, openTabs: state.menuInfo.openTabs.filter(item => item.key !== payload)}
        }
    },
})

export const { updateActiveKey, updateOpenTabs, removeTab } = menuInfoSlice.actions

export default menuInfoSlice.reducer


