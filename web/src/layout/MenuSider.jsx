import {Menu} from "antd";
import {useEffect, useState} from "react";
import {getMenuTree} from "../api/menu/sysMenu";
import {errorMsg} from "../assets/js/message";
import {NavLink, useNavigate} from 'react-router-dom'

const MenuSider = () => {

    const [items, setItems] = useState([])

    const navigate = useNavigate()

    //  获取菜单树
    const getMenu = () => {
        getMenuTree().then(res => {
            if (res.success){
                console.info(replaceNameRecursive(res.data))
                setItems(replaceNameRecursive(res.data))
            } else {
                errorMsg(res.msg)
            }
        })
    }

    const replaceNameRecursive = (arr) => {
        return arr.map(obj => {
            const newObj = { ...obj };
            newObj.label = <NavLink to={newObj.path}>{newObj.label}</NavLink>;
            if (newObj.children && newObj.children.length > 0) {
                newObj.children = replaceNameRecursive(newObj.children);
            }
            return newObj;
        });
    }

    //  菜单点击事件
    const onClick = ({item}) => {
        console.info('click:')
        console.info(item.props.path)
        const path = item.props.path
        navigate(path)
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

export default MenuSider