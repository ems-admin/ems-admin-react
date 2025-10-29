import {create} from "zustand/react";
import {persist} from "zustand/middleware/persist";
import {immer} from "zustand/middleware/immer";

const useMenuStore = create(
    persist(
        immer((set) => ({
            //  定义&修改激活菜单
            activeKey: '/home',
            updateActiveKey: (payload) => set((state) => {
                state.activeKey = payload
            }),
            //  定义&更新已开启窗口
            openTabs: [
                { label: '首页', key: '/home', realpath: 'Home', closable: false }
            ],
            updateOpenTabs: (payload) => set((state) => {
                if (!state.openTabs.some(item => item.key === payload.key)) {
                    state.openTabs.push(payload)
                }
            }),
            //  关闭已打开的菜单
            removeTab: (payload) => set((state) => {
                state.openTabs = state.openTabs.filter(item => item.key !== payload.key)
            }),
        }))
    ),
    { name: 'menu-storage' }
)

export default useMenuStore;