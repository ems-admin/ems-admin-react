import {useState} from "react";
import {Button, Dropdown, Modal, Space} from "antd";
import '@/assets/css/Header.css'
import {DownOutlined} from "@ant-design/icons";
import ModalContext from "@/assets/js/context.js";
import UpdatePassword from '@/views/user/UpdatePassword.jsx'
import useUserStore from "@/store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {infoMsg} from "@/assets/js/message.js";

const SysHeader = () => {

    const {info, updateToken} = useUserStore();
    //  当前登录用户昵称
    const nickName = info ==  null ? '' : info.nickName

    const navigate = useNavigate();

    //  修改密码
    const [openModal, setOpenModal] = useState(false)

    const items = [
        {
            label: (
                <Button type={"link"} onClick={() => setOpenModal(true)}>修改密码</Button>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Button type={"link"} onClick={() => logout()}>退出登录</Button>
            ),
            key: '2',
        },
    ]

    const [modal, contextHolder] = Modal.useModal();
    //  退出登录
    const logout = () => {
        modal.confirm({
            title: '退出登录',
            content: '确认退出当前登录?',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                out()
            },
            onCancel() {
                infoMsg('操作已取消')
            },
            transitionName: 'ant-fade'
        })
    }
    //  退出操作
    const out = () => {
        //  清空token
        updateToken(null)
        //  跳转到登录页面
        navigate('/login', { replace: true });
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    EMS后台管理系统
                </div>
                <div>
                    <Dropdown
                        menu={{items}}
                        placement="bottom">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {nickName}
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
            {contextHolder}
            {/*修改密码*/}
            <ModalContext.Provider value={{openModal, setOpenModal}}>
                <UpdatePassword out={out}></UpdatePassword>
            </ModalContext.Provider>
        </>
    )
}

export default SysHeader