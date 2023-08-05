import {Button, Form, Image, Input} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {getVerifyCode, login} from "../api/login/login";
import {errorMsg} from "../assets/js/message";
import {useDispatch} from "react-redux";
import {updateToken, updateRefreshToken, updateInfo} from "../store/userRedux";
import IconFont from "../components/IconFont";
import '../assets/css/Login.css'


const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    //  提交登录
    const onFinish = (value) => {
        setLoading(true)
        //  将uuid添加到提交的数据中(因为form表单中没有uuid)
        const formData = {...value, uuid: uuid}
        login(formData).then(res => {
            if (res.success){
                //  缓存token
                dispatch(updateToken(res.data.token))
                //  缓存刷新token
                dispatch(updateRefreshToken(res.data.refreshToken))
                //  缓存当前登录用户信息
                dispatch(updateInfo(res.data.userDto))
                //  跳转到主页
                navigate('/index')
            } else {
                errorMsg(res.msg)
                getCode()
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
    }, [navigate])

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
                    <Input prefix={<IconFont type={'icon-username'} />} placeholder="请输入用户名"></Input>
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: "密码不能为空"}]}>
                    <Input prefix={<IconFont type={'icon-password'} />} type={"password"} placeholder="请输入密码"></Input>
                </Form.Item>
                <Form.Item style={{marginBottom: 0}}>
                    <Form.Item name={"code"} rules={[{required: true, message: "验证码不能为空"}]}
                               style={{display: "inline-block", width: 'calc(100% - 126px)'}}>
                        <Input prefix={<IconFont type={'icon-captcha'} />} placeholder={"请输入验证码"}></Input>
                    </Form.Item>
                    <Form.Item style={{display: "inline-block", width: '110px', margin: '0 8px'}}>
                        <Image src={image} onClick={getCode}></Image>
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