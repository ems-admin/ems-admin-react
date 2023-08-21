import React, {useState} from "react";
import {Button, Dropdown, Space} from "antd";
import store from "../store/store";
import '../assets/css/Header.css'
import {DownOutlined} from "@ant-design/icons";

const SysHeader = () => {

    //  当前登录用户昵称
    const nickName = store.getState().userInfo.userInfo.info.nickName

    const items = [
        {
            label: (
                <Button type={"link"}>修改密码</Button>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Button type={"link"}>退出登录</Button>
            ),
            key: '2',
        },
    ]

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
        </>
    )
}

export default SysHeader