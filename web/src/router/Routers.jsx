import {Route, useMatch, useNavigate, Routes} from "react-router-dom";
import {useEffect} from "react";
import Index from "../layout";
import Login from "../views/Login";
import Home from "../views/Home";
import User from '../views/user/index'
import {useSelector} from "react-redux";

// 自定义的路由拦截组件
const PrivateRoute = ({ path, element }) => {

    const token = useSelector(state => state.userInfo.userInfo.token)
    //  如果token存在
    const isAuthenticated = token !== null && token !== undefined;
    const navigate = useNavigate();
    const match = useMatch(path);
    useEffect(() => {
        if (!isAuthenticated && match) {
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
                console.info('后续处理')
            }
        }
    })
    return element;
};

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
    },

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