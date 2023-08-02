import {Layout} from "antd";
import SysSider from "./SysSider";
import SysHeader from "./SysHeader";
import SysContent from "./SysContent";
import SysFooter from "./SysFooter";
const {Sider, Header, Content, Footer} = Layout
import {useCallback, useState} from "react";
import MenuContext from "../assets/js/context";

const siderStyle = {
    height: '100vh'
}

//  整体页面布局
const Index = () => {
    const [ collapsed, setCollapsed ] = useState(false)

    const handleChildValue = useCallback((newValue) => {
        setCollapsed(newValue)
    }, [])

    return(
        <Layout>
            <Sider style={siderStyle} collapsed={collapsed}>
                <MenuContext.Provider value={{ collapsed }}>
                    <SysSider handleValueChange={handleChildValue}/>
                </MenuContext.Provider>
            </Sider>
            <Layout>
                <Header>
                    <SysHeader/>
                </Header>
                <Content>
                    <SysContent/>
                </Content>
                <Footer>
                    <SysFooter/>
                </Footer>
            </Layout>
        </Layout>
    )
}

export default Index