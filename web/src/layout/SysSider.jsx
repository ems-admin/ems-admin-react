import {Image, Menu} from "antd";
import {useContext, useEffect, useState} from "react";
import {getMenuTree} from "../api/menu/sysMenu";
import {errorMsg} from "../assets/js/message";
import {useDispatch} from "react-redux";
import {updateActiveKey, updateOpenTabs} from "../store/menuRedux";
import Logo from '../assets/image/ems.png'
import MenuContext from "../assets/js/context";

const SysSider = ({handleValueChange}) => {

    const [items, setItems] = useState([])

    const dispatch = useDispatch()

    // const handleChildValue = useContext(MenuContext);

    const { collapsed } = useContext(MenuContext);

    //  首页不需要权限配置,所以不用保存在数据库中动态获取,在此处定义首页的菜单对象
    const homeItem = {
        label: '首页',
        path: '/home',
        realpath: 'Home'
    }

    //  获取菜单树
    const getMenu = () => {
        getMenuTree().then(res => {
            if (res.success) {
                res.data.unshift(homeItem)
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

    //  logo样式
    const logoStyle = {
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    //  点击logo,收缩菜单
    const clickLogo = () => {
        handleValueChange(!collapsed)
    }

    useEffect(() => {
        getMenu()
    }, [])

    return (
        <>
            <div style={logoStyle}>
                <Image src={Logo} height={40} preview={false} onClick={clickLogo}/>
            </div>
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