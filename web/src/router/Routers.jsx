import {Route, useMatch, useNavigate, Routes} from "react-router-dom";
import {useEffect} from "react";
import Index from "../layout/Index.jsx";
import Login from "../views/Login";
import Home from "../views/Home";
import {useSelector} from "react-redux";
import NotFound from "../views/error/404";

// 自定义的路由拦截组件
const PrivateRoute = ({ path, element }) => {

    const token = useSelector(state => state.userInfo.userInfo.token)
    //  如果token存在
    const isAuthenticated = token !== null && token !== undefined;
    const navigate = useNavigate();
    const match = useMatch(path);
    useEffect(() => {
        console.info(path)
        if (!isAuthenticated && match) {
            // 如果用户未通过认证，并且匹配当前路由路径，则导航到登录页面
            navigate('/login', { replace: true });
        } else {
            //  如果用户手动跳转根目录,则直接进入主页,避免路由跳出当面主页面
            if (path === '/'){
                navigate('/index')
            //  如果是重复登录,则跳转到主页
            } else if (path === '/login' || path === '/index'){
                navigate('/index')
            //  如果是跳转到其他不存在的路由,跳转到404页面
            } else {
                navigate('/*')
            }
        }
    }, [])
    return element;
};

const routers = [
    {
        path: '/',
        element: <PrivateRoute path={'/'} element={<Index></Index>}></PrivateRoute>
    },
    {
        path: '/login',
        element: <PrivateRoute path={'/login'} element={<Login></Login>}></PrivateRoute>
    },
    {
        path: '/home',
        element: <PrivateRoute path={'/home'} element={<Home></Home>}></PrivateRoute>
    },
    {
        path: '/index',
        element: <PrivateRoute path={'/index'} element={<Index></Index>}></PrivateRoute>
    },
    {
        path: '/*',
        element: <NotFound></NotFound>
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