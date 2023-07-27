import {Tabs} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {removeTab, updateActiveKey} from "../store/menuRedux";

const SysContent = () => {

    const items = useSelector(state => state.menuInfo.menuInfo.openTabs)

    const dispatch = useDispatch()

    console.info('打开 的菜单')
    console.info(items)

    const activeKey = useSelector(state => state.menuInfo.menuInfo.activeKey)

    const onEdit = (targetKey, action) => {
        if (action !== 'add') {
            const targetIndex = items.findIndex((pane) => pane.key === targetKey)
            const newPanes = items.filter((pane) => pane.key !== targetKey)
            if (newPanes.length && targetKey === activeKey) {
                const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
                dispatch(updateActiveKey(key))
            }
            dispatch(removeTab(targetKey))
        }
    }
    return(
        <>
            <Tabs
                hideAdd
                activeKey={activeKey}
                type="editable-card"
                items={items}
                onEdit={onEdit}
            />
        </>
    )
}

export default SysContent