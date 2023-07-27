import {Menu} from "antd";
import {lazy, useEffect, useState, Suspense} from "react";
import {getMenuTree} from "../api/menu/sysMenu";
import {errorMsg} from "../assets/js/message";
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {updateActiveKey, updateOpenTabs} from "../store/menuRedux";
import User from '../views/user/index'

const SysSider = () => {

    const [items, setItems] = useState([])

    const navigate = useNavigate()

    const dispatch = useDispatch()

    //  获取菜单树
    const getMenu = () => {
        getMenuTree().then(res => {
            if (res.success){
                // console.info(replaceNameRecursive(res.data))
                // setItems(replaceNameRecursive(res.data))
                setItems(res.data)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    // const replaceNameRecursive = (arr) => {
    //     return arr.map(obj => {
    //         const newObj = { ...obj };
    //         newObj.label = <NavLink to={newObj.path}>{newObj.label}</NavLink>;
    //         if (newObj.children && newObj.children.length > 0) {
    //             newObj.children = replaceNameRecursive(newObj.children);
    //         }
    //         return newObj;
    //     });
    // }

    //  菜单点击事件
    const onClick = ({item, domEvent}) => {
        console.info('click:')
        console.info(domEvent.target.innerHTML)
        const label = domEvent.target.innerHTML
        const path = item.props.path
        const UserComponent = lazy(() => import('../views/user/index'))
        dispatch(updateActiveKey(path))
        dispatch(updateOpenTabs({
            label: label,
            key: path,
            children: <Suspense><UserComponent/></Suspense>
        }))
    }

    useEffect(() => {
        getMenu()
    }, [])

    return(
        <>
            <Menu
                style={{width: '200px'}}
                onSelect={onClick}
                defaultSelectedKeys={['1']}
                mode={"inline"}
                items={items}
            />
        </>
    )
}

export default SysSider