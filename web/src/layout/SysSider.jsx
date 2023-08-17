import {Image, Menu} from "antd";
import {useContext, useEffect, useState} from "react";
import {getMenuTree} from "../api/menu/sysMenu";
import {errorMsg} from "../assets/js/message";
import {useDispatch, useSelector} from "react-redux";
import {updateActiveKey, updateOpenTabs} from "../store/menuRedux";
import Logo from '../assets/image/ems.png'
import MenuContext from "../assets/js/context";
import IconFont from "../components/IconFont";

const SysSider = () => {

    const [items, setItems] = useState([])

    const [menuStyle, setMenuStyle] = useState({width: '200px', height: 'calc(100vh - 64px)'})

    const dispatch = useDispatch()

    const {collapsed, setCollapsed} = useContext(MenuContext);

    //  获取当前激活tab标签的key值
    const activeKey = useSelector(state => state.menuInfo.menuInfo.activeKey)

    //  首页不需要权限配置,所以不用保存在数据库中动态获取,在此处定义首页的菜单对象
    const homeItem = {
        key: '/home',
        label: '首页',
        path: '/home',
        realpath: 'Home',
        icon: <IconFont type={'icon-home'}/>
    }

    //  获取菜单树
    const getMenu = () => {
        getMenuTree().then(res => {
            if (res.success) {
                getItem(res.data)
                res.data.unshift(homeItem)
                console.info(res.data)
                setItems(res.data)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    const getItem = (items) => {
        if (items && items.length > 0) {
            items.map(item => {
                item.icon = <IconFont type={item.icon}/>
                if (item.children && item.children.length > 0) {
                    getItem(item.children)
                }
            })
        }
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
        alignItems: 'center',
        cursor: 'pointer'
    }

    //  点击logo,收缩菜单
    const clickLogo = () => {
        setCollapsed(!collapsed)
        if (!collapsed) {
            setMenuStyle({width: '80px', height: 'calc(100vh - 64px)'})
        } else {
            setMenuStyle({width: '200px', height: 'calc(100vh - 64px)'})
        }
    }

    useEffect(() => {
        getMenu()
    }, [])

    return (
        <>
            <div style={logoStyle} onClick={clickLogo}>
                <Image src={Logo} height={40} preview={false}/>
            </div>
            <Menu
                style={menuStyle}
                onSelect={onClick}
                selectedKeys={[activeKey]}
                defaultOpenKeys={[activeKey]}
                mode={"inline"}
                items={items}
            />
        </>
    )
}

export default SysSider