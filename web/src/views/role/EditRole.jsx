import {Button, Form, Input, Modal} from "antd";
import {useContext, useState} from "react";
import ModalContext from "../../assets/js/context";
import {editRole} from "../../api/role/sysRole";
import {errorMsg, successMsg} from "../../assets/js/message";

const EditUser = ({getList}) => {

    const {openEdit, setOpenEdit, roleObj} = useContext(ModalContext)

    const [form] = Form.useForm()

    const { TextArea } = Input

    const [title, setTitle] = useState('新增角色')

    const [loading, setLoading] = useState(false)

    //  打开后执行的操作
    const afterOpenModal = (open) => {
        //  重置表单
        form.resetFields()
        //  重置title
        setTitle('新增角色')
        setLoading(false)
        //  编辑
        if (open && roleObj && roleObj.id){
            //  设置title
            setTitle('编辑角色')
            //  填充字段
            form.setFieldsValue(roleObj)
        }
    }
    //  提交
    const onFinish = (values) => {
        setLoading(true)
        const formData = {...values}
        editRole(formData).then(res => {
            if (res.success){
                successMsg(res.data)
                setOpenEdit(false)
                getList()
            } else {
                errorMsg(res.msg)
            }
            setLoading(false)
        })
    }

    return(
        <div>
            <Modal
                title={title}
                className={'edit-modal'}
                open={openEdit}
                width={'50%'}
                afterOpenChange={afterOpenModal}
                maskClosable={false}
                onCancel={() => setOpenEdit(false)}
                footer={[
                    <Button key={'reset'} onClick={() => form.resetFields()}>重置</Button>,
                    <Button key={'ok'} type={"primary"} loading={loading} onClick={() => form.submit()}>确认</Button>,
                ]}
                transitionName={'ant-fade'}
            >
                <Form form={form} name={'editRole'} onFinish={onFinish} autoComplete={'off'}>
                    <Form.Item name={'id'} hidden={true}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name={'roleName'} label={'角色名称'} rules={[{required: true}]}>
                        <Input placeholder={'请输入角色名称'}></Input>
                    </Form.Item>
                    <Form.Item name={'roleCode'} label={'角色代码'} rules={[{required: true}]}>
                        <Input placeholder={'请输入角色代码'}></Input>
                    </Form.Item>
                    <Form.Item name={'description'} label={'角色说明'} rules={[{required: true}]}>
                        <TextArea rows={5} placeholder={'请输入角色说明'}></TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default EditUser