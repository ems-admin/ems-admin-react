import {Button, Input, Modal, Table} from "antd";
import {useCallback, useEffect, useState} from "react";
import {errorMsg, infoMsg, successMsg} from "../../assets/js/message";
import ModalContext from "../../assets/js/context";
import {delRole, getRoleList} from "../../api/role/sysRole";
import EditRole from "./EditRole";
import AuthorizeRole from "./AuthorizeRole";

const Index = () => {

    //  定义查询参数
    const [blurry, setBlurry] = useState(null)

    //  定义源数据
    const [dataSource, setDataSource] = useState([])

    //  编辑弹窗控制
    const [openEdit, setOpenEdit] = useState(false)

    //  授权弹窗控制
    const [openAuth, setOpenAuth] = useState(false)

    //  定义一个角色对象,作为传入子组件的变量
    const [roleObj, setRoleObj] = useState({})

    //  定义当前角色ID,作为传入子组件的变量
    const [roleId, setRoleId] = useState(null)

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

    //  角色授权
    const authorizeRole = (roleId) => {
        setOpenAuth(true)
        setRoleId(roleId)
    }

    //  编辑角色
    const editRole = (data) => {
        setOpenEdit(true)
        setRoleObj(data)
    }

    const {confirm} = Modal
    //  删除角色
    const deleteRole = (roleId) => {
        confirm({
            title: '删除角色',
            content: '确认删除当前角色?',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                delRole({id: roleId}).then(res => {
                    if (res.success){
                        successMsg(res.data)
                        getRoleTable()
                    } else {
                        errorMsg(res.msg)
                    }
                })
            },
            onCancel(){
                infoMsg('操作已取消')
            },
            transitionName: 'ant-fade'
        })
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
                    placeholder={'请输入角色名称或代码'}
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
                className={'no-page-table'}
                dataSource={dataSource}
                rowKey={'id'}
                bordered
                pagination={false}
            >
                <column key={'roleName'} title={'角色名称'} dataIndex={'roleName'}></column>
                <column key={'roleCode'} title={'角色代码'} dataIndex={'roleCode'}></column>
                <column key={'description'} title={'角色说明'} dataIndex={'description'}></column>
                <column key={'operate'} title={'操作'} dataIndex={'operate'} width={240} align={'center'}
                        render={(_, record) => (
                            <>
                                <Button className={'success'} onClick={() => authorizeRole(record.id)}>授权</Button>
                                <Button type={"primary"} onClick={() => editRole(JSON.parse(JSON.stringify(record)))}>编辑</Button>
                                <Button type={"primary"} danger onClick={() => deleteRole(record.id)}>删除</Button>
                            </>
                        )}></column>
            </Table>

            {/*角色编辑页面*/}
            <ModalContext.Provider value={{openEdit, setOpenEdit, roleObj}}>
                <EditRole getList={handleChild}></EditRole>
            </ModalContext.Provider>

            {/*角色授权页面*/}
            <ModalContext.Provider value={{openAuth, setOpenAuth, roleId}}>
                <AuthorizeRole></AuthorizeRole>
            </ModalContext.Provider>
        </>
    )
}

export default Index