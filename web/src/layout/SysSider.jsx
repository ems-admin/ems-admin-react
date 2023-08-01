import {Menu} from "antd";
import { useEffect, useState} from "react";
import {getMenuTree} from "../api/menu/sysMenu";
import {errorMsg} from "../assets/js/message";
import {useDispatch} from "react-redux";
import {updateActiveKey, updateOpenTabs} from "../store/menuRedux";
import { useNavigate } from "react-router-dom";

const SysSider = () => {

    const [items, setItems] = useState([])

    const dispatch = useDispatch()

    //  获取菜单树
    const getMenu = () => {
        getMenuTree().then(res => {
            if (res.success){
                setItems(res.data)
            } else {
                errorMsg(res.msg)
            }
        })
    }


    //  菜单点击事件
    const onClick = ({item, domEvent}) => {
        const label = domEvent.target.innerHTML
        const path = item.props.path
        const realpath = item.props.realpath
        dispatch(updateActiveKey(path))
        dispatch(updateOpenTabs({
            label: label,
            key: path,
            realpath: realpath
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