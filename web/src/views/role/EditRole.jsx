import {Button, Form, Input, Modal} from "antd";
import {useContext, useState} from "react";
import ModalContext from "../../assets/js/context";
import {editRole} from "../../api/role/sysRole";
import {errorMsg} from "../../assets/js/message";

const EditUser = ({getList}) => {

    const {openModal, setOpenModal, roleObj} = useContext(ModalContext)

    const [form] = Form.useForm()

    const { TextArea } = Input

    const [title, setTitle] = useState('新增角色')

    const [loading, setLoading] = useState(false)

    const modalBodyStyle = {
        'max-height': '500px',
        'min-height': '300px',
        'overflow-y': 'auto',
        'padding': '20px 30px'
    }

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
                setOpenModal(false)
                getList()
            } else {
                errorMsg(res.msg)
            }
            setLoading(false)
        })
    }

    return(
        <>
            <Modal
                title={title}
                open={openModal}
                width={'50%'}
                bodyStyle={modalBodyStyle}
                afterOpenChange={afterOpenModal}
                maskClosable={false}
                onCancel={() => setOpenModal(false)}
                footer={[
                    <Button key={'reset'} onClick={() => form.resetFields()}>重置</Button>,
                    <Button key={'ok'} type={"primary"} loading={loading} onClick={() => form.submit()}>确认</Button>,
                ]}
            >
                <Form form={form} name={'ediRole'} onFinish={onFinish} autoComplete={'off'}>
                    <Form.Item name={'id'} hidden={true}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name={'roleName'} label={'角色名称'} rules={[{required: true, message: '角色名称不能为空'}]}>
                        <Input placeholder={'请输入角色名称'}></Input>
                    </Form.Item>
                    <Form.Item name={'roleCode'} label={'角色代码'} rules={[{required: true, message: '角色代码不能为空'}]}>
                        <Input placeholder={'请输入角色代码'}></Input>
                    </Form.Item>
                    <Form.Item name={'description'} label={'角色说明'} rules={[{required: true, message: '角色说明不能为空'}]}>
                        <TextArea rows={5} placeholder={'请输入角色说明'}></TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditUser