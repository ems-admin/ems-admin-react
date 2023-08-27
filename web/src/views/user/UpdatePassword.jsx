import {Button, Form, Input, Modal, Select} from "antd";
import {useContext, useState} from "react";
import ModalContext from "../../assets/js/context";
import {updatePwd} from "../../api/user/sysUser";
import {errorMsg, successMsg} from "../../assets/js/message";

const UpdatePassword = ({out}) => {

    const {openModal, setOpenModal} = useContext(ModalContext)

    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    //  弹窗打开后执行
    const afterOpenChange = (open) => {
        if (open){
            setLoading(false)
            form.resetFields()
        }
    }

    //  校验新密码
    const checkNew = () => {
        // 获取新密码
        const newPassword = form.getFieldValue('newPassword')
        console.info(newPassword)
        // 密码长度为6-18位数
        if (!newPassword || newPassword.length < 6 || newPassword.length > 18) {
            return Promise.reject('请输入6-18位密码');
        }
        // 通过验证
        return Promise.resolve();
    }

    //  校验确认密码
    const checkConfirm = () => {
        //  获取表单数据
        const formData = form.getFieldsValue()
        //  校验两次输入的密码是否相同
        if (formData.newPassword !== formData.confirmPassword){
            return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
    }

    //  提交
    const onFinish = (values) => {
        setLoading(true)
        const formData = {...values}
        updatePwd(formData).then(res => {
            if (res.success){
                successMsg(res.data)
                setOpenModal(false)
                out()
            } else {
                errorMsg(res.msg)
            }
        })
        setLoading(false)
    }

    return(
        <>
            <Modal
                title={'修改密码'}
                className={'edit-modal'}
                width={'50%'}
                open={openModal}
                afterOpenChange={afterOpenChange}
                maskClosable={false}
                onCancel={() => setOpenModal(false)}
                footer={[
                    <Button key={'reset'} onClick={() => form.resetFields()}>重置</Button>,
                    <Button key={'ok'} type={"primary"} loading={loading} onClick={() => form.submit()}>确认</Button>,
                ]}
                transitionName={'ant-fade'}
            >
                <Form form={form} name={'updatePassword'} onFinish={onFinish} autoComplete={'off'} labelCol={{span: 3}}>
                    <Form.Item name={'password'} label={'原密码'} rules={[{required: true}]}>
                        <Input type={"password"} placeholder={'请输入原密码'}></Input>
                    </Form.Item>
                    <Form.Item name={'newPassword'} label={'新密码'}
                               validateTrigger={'onBlur'}
                               rules={[{required: true, message: ''}, {validator: checkNew}]}>
                        <Input type={"password"} placeholder={'请输入新密码'}></Input>
                    </Form.Item>
                    <Form.Item name={'confirmPassword'} label={'确认密码'}
                               validateTrigger={'onBlur'}
                               rules={[{required: true, message: ''}, {validator: checkConfirm}]}>
                        <Input type={"password"} placeholder={'请输入确认密码'}></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdatePassword