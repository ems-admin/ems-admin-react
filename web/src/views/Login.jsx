import {Button, Form, Image, Input} from "antd";
import '../assets/css/Login.css'
import {useState} from "react";

const Login = () => {

    const onFinish = (value) => {
        setLoading(true)
        console.info(value)
    }

    const [loading, setLoading] = useState(false)

    return(
        <div className={"login"}>
            <Form name="login" onFinish={onFinish} autoComplete="off" className={"form"}>
                <h1 style={{fontSize: '2.2em'}}>用    户    登    录</h1>
                <Form.Item name="username" rules={[{required: true, message: "用户名不能为空"}]}>
                    <Input placeholder="请输入用户名"></Input>
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: "密码不能为空"}]}>
                    <Input type={"password"} placeholder="请输入密码"></Input>
                </Form.Item>
                <Form.Item style={{marginBottom: 0}}>
                    <Form.Item name={"code"} rules={[{required: true, message: "验证码不能为空"}]}
                               style={{display: "inline-block", width: 'calc(100% - 126px)'}}>
                        <Input placeholder={"请输入验证码"}></Input>
                    </Form.Item>
                    <Form.Item name={"img"} style={{display: "inline-block", width: '110px', margin: '0 8px'}}>
                        <Image src="../assets/image/logo.png"></Image>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"} className={"button"} loading={loading}>登  录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login