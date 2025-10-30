import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {produce} from "immer";

const useUserStore = create(
    persist(
        (set) => ({
            token: null,
            updateToken: (payload) => set(produce((state) => {
                state.token = payload;
            })),
            refreshToken: null,
            updateRefreshToken: (payload) => set(produce((state) => {
                state.refreshToken = payload;
            })),
            info: null,
            updateInfo: (payload) => set(produce((state) => {
                state.info = payload;
            })),
            isLoadMenu: false,
            updateLoadMenu: () => set(produce((state) => {
                state.isLoadMenu = true;
            })),
            router: null,
            updateRouter: (payload) => set(produce((state) => {
                state.router = payload;
            }))
        }),
        {
            name: 'user-storage'
        }
    )
)

export default useUserStore;