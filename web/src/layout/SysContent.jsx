import {Tabs} from "antd";
import {useSelector, useDispatch} from "react-redux";
// import {removeTab, updateActiveKey} from "@/store/menuRedux.js";
import useMenuStore from "@/store/useMenuStore.js";
import {lazy, Suspense} from "react";
import '@/assets/css/Tabs.css'

const SysContent = () => {

    //  获取当前项目views目录下所有的组件
    const modules = import.meta.glob('../views/**/*.jsx')

    const {activeKey, removeTab, updateActiveKey, openTabs} = useMenuStore()

    //  获取所有已打开菜单列表
    // const items = useSelector(state => state.menuInfo.menuInfo.openTabs)
    const items = openTabs

    //  深拷贝已打开的菜单,避免修改里面children的时候,将缓存中的值一起修改了
    const newItems = JSON.parse(JSON.stringify(items))

    //  定义dispatch用来修改缓存中的方法
    const dispatch = useDispatch()

    //  获取当前激活tab标签的key值
    // const activeKey = useSelector(state => state.menuInfo.menuInfo.activeKey)

    //  获取当前对象
    const currentItem = newItems.find(item => item.key === activeKey)

    //  组装获取的modules的key值
    const moduleKey = '../views/' + currentItem.realpath + '.jsx'

    if (currentItem){
        //  将当前对象中的组件路径加载为组件
        const MyComponent = lazy(modules[moduleKey]);
        currentItem.children = <Suspense><MyComponent/></Suspense>
    }

    //  移除标签
    const onEdit = (targetKey, action) => {
        if (action !== 'add') {
            const targetIndex = items.findIndex((pane) => pane.key === targetKey)
            const newPanes = items.filter((pane) => pane.key !== targetKey)
            console.log(newPanes)
            console.log(targetKey, activeKey)
            if (newPanes.length && targetKey === activeKey) {
                const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
                // dispatch(updateActiveKey(key))
                updateActiveKey(key)
            }
            // dispatch(removeTab(targetKey))
            removeTab(targetKey)
        }
    }

    //  切换标签
    const onChange = (newActiveKey) => {
        // dispatch(updateActiveKey(newActiveKey))
        updateActiveKey(newActiveKey)
    }

    return(
        <>
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                type="editable-card"
                items={newItems}
                onEdit={onEdit}
            />
        </>
    )
}

export default SysContent