import {Form, Input, Modal, Select} from "antd";
import {useContext} from "react";
import ModalContext from "../../assets/js/context";

const EditUser = () => {

    const {openModal, setOpenModal} = useContext(ModalContext)

    const onFinish = () => {

    }

    return(
        <>
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
            >
                <Form name={'editUser'} onFinish={onFinish} autoComplete={false}>
                    <Form.Item name={'username'} label={'用户名'} rules={[{required: true, message: '用户名不能为空'}]}>
                        <Input placeholder={'请输入用户名'}></Input>
                    </Form.Item>
                    <Form.Item name={'nickName'} label={'昵称'} rules={[{required: true, message: '昵称不能为空'}]}>
                        <Input placeholder={'请输入昵称'}></Input>
                    </Form.Item>
                    <Form.Item name={'roleId'} label={'角色'} rules={[{required: true, message: '角色不能为空'}]}>
                        <Select></Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditUser