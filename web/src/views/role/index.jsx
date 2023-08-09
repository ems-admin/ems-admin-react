import {Button, Input, Table} from "antd";
import {useCallback, useEffect, useState} from "react";
import {errorMsg} from "../../assets/js/message";
import ModalContext from "../../assets/js/context";
import {getRoleList} from "../../api/role/sysRole";
import EditRole from "./EditRole";

const Index = () => {

    //  定义查询参数
    const [blurry, setBlurry] = useState(null)

    //  定义源数据
    const [dataSource, setDataSource] = useState([])

    //  编辑弹窗控制
    const [openModal, setOpenModal] = useState(false)

    //  定义一个角色对象,作为传入子组件的变量
    const [roleObj, setRoleObj] = useState({})

    //  定义列
    const columns = [
        {
            key: 'id',
            title: '角色名称',
            dataIndex: 'roleName'
        },
        {
            key: 'id',
            title: '角色代码',
            dataIndex: 'roleCode'
        },
        {
            key: 'id',
            title: '角色说明',
            dataIndex: 'description'
        },
        {
            key: 'operate',
            title: '操作',
            dataIndex: 'operate',
            align: 'center',
            render: (_, record) => {
                return <>
                    <Button className={'success'}>授权</Button>
                    <Button type={"primary"} onClick={() => editRole(JSON.parse(JSON.stringify(record)))}>编辑</Button>
                    <Button type={"primary"} danger>删除</Button>
                </>

            },
            width: 200
        }
    ]

    //  获取用户列表
    const getRoleTable = () => {
        getRoleList({blurry: blurry}).then(res => {
            if (res.success) {
                setDataSource(res.data)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    //  子组件调用父组件方法
    const handleChild = useCallback(() => {
        getRoleTable()
    }, [])

    //  查询框输入
    const changeValue = (e) => {
        setBlurry(e.target.value)
    }

    //  编辑用户
    const editRole = (data) => {
        setOpenModal(true)
        setRoleObj(data)
    }

    useEffect(() => {
        getRoleTable()
    }, [])

    return (
        <>
            <div className={'search-div'}>
                <Input
                    className={'search-input'}
                    value={blurry}
                    placeholder={'请输入用户名或昵称'}
                    onChange={changeValue}
                    allowClear={true}
                ></Input>
                <Button
                    type={"primary"}
                    onClick={getRoleTable}
                >查询</Button>
                <Button
                    className={'add-btn'}
                    onClick={editRole}
                >新增</Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                bordered
                pagination={false}
            ></Table>

            {/*角色编辑页面*/}
            <ModalContext.Provider value={{openModal, setOpenModal, roleObj}}>
                <EditRole getList={handleChild}></EditRole>
            </ModalContext.Provider>
        </>
    )
}

export default Index