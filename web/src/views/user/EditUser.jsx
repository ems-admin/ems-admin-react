import {Button, Form, Input, Modal, Select} from "antd";
import {useContext, useState} from "react";
import ModalContext from "../../assets/js/context";
import {getRoleList} from "../../api/role/sysRole";
import {errorMsg, successMsg} from "../../assets/js/message";
import {editUser} from "../../api/user/sysUser";

const EditUser = ({getList}) => {

    const {openModal, setOpenModal, userObj} = useContext(ModalContext)

    const [title, setTitle] = useState('新增用户')

    const [loading, setLoading] = useState(false)

    const [roleData, setRoleData] = useState([])

    const [roleIds, setRoleIds] = useState([])

    const [form] = Form.useForm()

    //  弹窗打开后执行
    const afterOpenChange = (open) => {
        setTitle('新增用户')
        setLoading(false)
        setRoleIds([])
        form.resetFields()
        if (open && userObj && userObj.id) {
            console.info(userObj)
            setTitle('编辑用户')
            //  获取角色ID数组字符串
            const roleIdStr = userObj.roleIds[0]
            if (roleIdStr){
                //  将字符串转为数字,以匹配角色列表的ID
                userObj.roleIds = roleIdStr.split(',').map(Number)
            }
            form.setFieldsValue(userObj)
        }
        getRoleListFun()
    }

    //  获取当前用户所有的角色权限
    const getRoleListFun = () => {
        getRoleList({}).then(res => {
            if (res.success) {
                setRoleData(res.data)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    const onFinish = (values) => {
        setLoading(true)
        const formData = {...values}
        editUser(formData).then(res => {
            if (res.success){
                successMsg(res.data)
                //  调用父页面方法
                getList()
                //  关闭弹窗
                setOpenModal(false)
            } else {
                errorMsg(res.msg)
            }
        })
        setLoading(false)
    }

    return (
        <>
            <Modal
                title={title}
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
            >
                <Form form={form} name={'editUser'} onFinish={onFinish} autoComplete={'off'} labelCol={{span: 2}}>
                    <Form.Item name={'id'} hidden={true}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name={'username'} label={'用户名'} rules={[{required: true, message: '用户名不能为空'}]}>
                        <Input placeholder={'请输入用户名'}></Input>
                    </Form.Item>
                    <Form.Item name={'nickName'} label={'昵称'} rules={[{required: true, message: '昵称不能为空'}]}>
                        <Input placeholder={'请输入昵称'}></Input>
                    </Form.Item>
                    <Form.Item name={'roleIds'} label={'角色'} rules={[{required: true, message: '角色不能为空'}]}>
                        <Select
                            allowClear={true}
                            fieldNames={{label: 'roleName', value: 'id'}}
                            options={roleData}
                            defaultValue={roleIds}
                            mode={'multiple'}
                        ></Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditUser