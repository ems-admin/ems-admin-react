import {Button, Form, Image, Input} from "antd";
import '../assets/css/Login.css'
import {useEffect, useState} from "react";
import {getVerifyCode, login} from "../api/login/login";
import {errorMsg} from "../assets/js/message";
import {useDispatch} from "react-redux";
import {updateToken} from "../store/redux";

const Login = () => {

    const dispatch = useDispatch()
    //  提交登录
    const onFinish = (value) => {
        setLoading(true)
        const formData = {...value, uuid: uuid}

        login(formData).then(res => {
            if (res.success){
                console.info(res.data.token)
                dispatch(updateToken(res.data.token))
            } else {
                errorMsg(res.msg)
            }
            setLoading(false)
        })

    }

    //  定义loading状态
    const [loading, setLoading] = useState(false)

    //  定义验证码返回的uuid
    const [uuid, setUuid] = useState(null)

    //  定义验证码图片地址
    const [image, setImage] = useState(null)

    useEffect(() => {
        getCode()
    }, [])

    //  获取验证码
    const getCode = () => {
        getVerifyCode().then(res => {
            setUuid(res.uuid)
            setImage(res.img)
        })
    }

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
                    <Form.Item style={{display: "inline-block", width: '110px', margin: '0 8px'}}>
                        <Image src={image}></Image>
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