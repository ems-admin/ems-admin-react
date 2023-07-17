import {Route, Routes, useNavigate, useMatch} from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import {useEffect} from "react";


function App() {

    // 自定义的路由拦截组件
    const PrivateRoute = ({ path, element }) => {
        const isAuthenticated = false; // 根据实际情况获取用户是否已经通过认证
        const navigate = useNavigate();
        const match = useMatch(path);

        useEffect(() => {
            if (!isAuthenticated && match) {
                console.info('判断')
                // 如果用户未通过认证，并且匹配当前路由路径，则导航到登录页面
                navigate('/login', { replace: true });
            }
        })
        return element;
    };

    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={"/"} element={<PrivateRoute path="/" element={<Home />} />}></Route>
            <Route path="/home" element={<PrivateRoute path="/home" element={<Home />} />} />
        </Routes>
    )
}

export default App
