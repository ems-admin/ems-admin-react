import {Layout} from "antd";
import SysSider from "./SysSider.jsx";
import SysHeader from "./SysHeader.jsx";
import SysContent from "./SysContent.jsx";
const {Sider, Header, Content} = Layout
import {useState} from "react";
import MenuContext from "../assets/js/context";

const siderStyle = {
    height: '100vh'
}

//  整体页面布局
const Index = () => {
    const [ collapsed, setCollapsed ] = useState(false)

    // const handleChildValue = useCallback((newValue) => {
    //     setCollapsed(newValue)
    // }, [])

    return(
        <Layout>
            <Sider style={siderStyle} collapsed={collapsed}>
                <MenuContext.Provider value={{ collapsed, setCollapsed }}>
                    <SysSider/>
                </MenuContext.Provider>
            </Sider>
            <Layout>
                <Header>
                    <SysHeader/>
                </Header>
                <Content>
                    <SysContent/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Index