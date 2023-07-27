import {Route, useMatch, useNavigate, Routes} from "react-router-dom";
import {useEffect} from "react";
import store from "../store/store";
import Index from "../layout";
import Login from "../views/Login";
import Home from "../views/Home";
import {queryAllMenu} from "../api/menu/sysMenu";
import {errorMsg} from "../assets/js/message";
import {updateLoadMenu} from "../store/userRedux";
import {useSelector} from "react-redux";

// 自定义的路由拦截组件
const PrivateRoute = ({ path, element }) => {

    const token = useSelector(state => state.userInfo.userInfo.token)

    console.info('路径:' + path)
    console.info(token)
    //  如果token存在
    const isAuthenticated = token !== null && token !== undefined;
    const navigate = useNavigate();
    const match = useMatch(path);
    console.info('状态:' + isAuthenticated)
    useEffect(() => {
        if (!isAuthenticated && match) {
            console.info('判断')
            // 如果用户未通过认证，并且匹配当前路由路径，则导航到登录页面
            navigate('/login', { replace: true });
        } else {
            //  如果用户手动跳转根目录,则直接回退,避免路由跳出当面主页面
            if (path === '/'){
                navigate(-1)
            }
            //  如果是重复登录,则跳转到主页
            if (path === '/login'){
                navigate('/index')
            } else {
                console.info('提取用户菜单状态:' + store.getState().userInfo.userInfo.isLoadMenu)
                //  如果没有拉取过用户菜单列表
                if (!store.getState().userInfo.userInfo.isLoadMenu){
                    loadMenu()
                }
            }
        }
    })
    return element;
};

const loadMenu = () => {
    console.info('拉取菜单')
    queryAllMenu().then(res => {
        if (res.success){
            if (res.data && res.data.length > 0){
                //  修改是否拉取菜单状态
                store.dispatch(updateLoadMenu)
                //  同时将菜单与系统菜单合并
                res.data.forEach((item) => {
                    const route = {
                        path: item.path,
                        element: item.component
                    }
                    routers.push(route)
                    console.info(routers)
                })
            }
        } else {
            errorMsg(res.msg)
        }
    })
}

const routers = [
    {
        path: '/',
        element: <PrivateRoute path={'/'} element={<Index></Index>}></PrivateRoute>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/home',
        element: <PrivateRoute path={'/home'} element={<Home></Home>}></PrivateRoute>
    },
    {
        path: '/index',
        element: <PrivateRoute path={'/index'} element={<Index></Index>}></PrivateRoute>
    }
]

const Routers = () => {
    return(
        <Routes>
            {routers.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}

export default Routers