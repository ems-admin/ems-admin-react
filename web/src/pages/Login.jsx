import {Button, Form, Image, Input} from "antd";
import login from '../assets/css/login.css'
import {useState} from "react";


const Login = () =>{
    const [loading, setLoading] = useState(false)

    //  登录提交
    const onFinish = (value) => {
        setLoading(true)
    }

    return (
      <div className="login">
          <Form name="login" wrapperCol={{span: 24}} size="small" className="form" layout="horizontal" onFinish={onFinish}>
              <h1>用  户  登  录</h1>
              <Form.Item name="username" rules={[{required: true, message: '用户名不能为空'}]}>
                  <Input placeholder="请输入用户名"></Input>
              </Form.Item>
              <Form.Item name="password" rules={[{required: true, message: '密码不能为空'}]}>
                  <Input type={"password"} placeholder="请输入密码"></Input>
              </Form.Item>
              <Form.Item style={{marginBottom: 20,}}>
                  <Form.Item name="code" rules={[{required: true, message: '验证码不能为空'}]} style={{display: 'inline-block', width: 'calc(100% - 126px)'}}>
                      <Input placeholder="请输入验证码"></Input>
                  </Form.Item>
                  <Form.Item name="captcha" style={{display: 'inline-block', width: '110px', marginLeft: '16px'}} >
                      <Image src="../assets/image/logo.png" />
                  </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="button" loading={loading}>登录</Button>
              </Form.Item>
          </Form>
      </div>
    );
}

export default Login