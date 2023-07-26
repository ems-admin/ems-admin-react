import {Layout, Space} from "antd";
import MenuSider from "./MenuSider";
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
                        <MenuSider/>
                    </Sider>
                    <Layout>
                        <Header></Header>
                        <Content></Content>
                        <Footer></Footer>
                    </Layout>
                </Layout>
            </Space>
        </>
    )
}

export default Index