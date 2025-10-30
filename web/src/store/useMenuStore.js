import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {produce} from "immer";

const useMenuStore = create(
    persist(
        (set) => ({
            //  定义&修改激活菜单
            activeKey: '/home',
            updateActiveKey: (payload) => set(produce((state) => {
                console.log('updateActiveKey', payload)
                state.activeKey = payload
            })),
            //  定义&更新已开启窗口
            openTabs: [
                { label: '首页', key: '/home', realpath: 'Home', closable: false }
            ],
            updateOpenTabs: (payload) => set(produce((state) => {
                if (!state.openTabs.some(item => item.key === payload.key)) {
                    return {openTabs: [...state.openTabs, payload]}
                }
            })),
            //  关闭已打开的菜单
            removeTab: (payload) => set(produce((state) => {
                console.log('payload', payload)
                state.openTabs = state.openTabs.filter(item => item.key !== payload)
            })),
        }),
{
            name: 'menu-storage'
        }
    ),
)

export default useMenuStore;