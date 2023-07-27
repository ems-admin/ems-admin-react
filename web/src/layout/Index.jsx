import {Layout, Space} from "antd";
import SysSider from "./SysSider";
import SysHeader from "./SysHeader";
import SysContent from "./SysContent";
import SysFooter from "./SysFooter";
const {Sider, Header, Content, Footer} = Layout

const siderStyle = {
    height: '100vh'
}

//  整体页面布局
const Index = () => {
    return(
        <>
            <Space direction={"vertical"} style={{width: '100%'}} size={[0, 48]}>
                <Layout>
                    <Sider style={siderStyle}>
                        <SysSider/>
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
            </Space>
        </>
    )
}

export default Index