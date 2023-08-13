import {Button, Input, Modal, Switch, Table} from "antd";
import {useCallback, useEffect, useState} from "react";
import {delUser, enabledUser, getUserList} from "../../api/user/sysUser";
import {errorMsg, infoMsg, successMsg} from "../../assets/js/message";
import ModalContext from "../../assets/js/context";
import PageContext from "../../assets/js/context";
import EditUser from "./EditUser";
import MyPagination from "../../components/MyPagination";

const Index = () => {

    //  定义查询参数
    const [blurry, setBlurry] = useState(null)

    //  定义源数据
    const [dataSource, setDataSource] = useState([])

    //  编辑弹窗控制
    const [openModal, setOpenModal] = useState(false)

    //  定义一个用户对象,用于编辑时传入子组件中
    const [userObj, setUserObj] = useState({})

    //  定义分页参数
    //  总条数
    const [total, setTotal] = useState(0)
    //  当面页码
    const [currentPage, setCurrentPage] = useState(1)
    //  每页条数
    const [pageSize, setPageSize] = useState(10)

    //  定义列
    const columns = [
        {
            key: 'id',
            title: '用户名',
            dataIndex: 'username'
        },
        {
            key: 'id',
            title: '昵称',
            dataIndex: 'nickName'
        },
        {
            key: 'id',
            title: '角色',
            dataIndex: 'roles'
        },
        {
            key: 'id',
            title: '状态',
            dataIndex: 'enabled',
            render: (enabled, record) => {
                return <Switch checkedChildren={'启用'} unCheckedChildren={'停用'} defaultChecked={enabled}
                               onChange={(checked => changeStatus(checked, record))}/>
            }
        },
        {
            key: 'operate',
            title: '操作',
            dataIndex: 'operate',
            align: 'center',
            render: (_, record) => {
                return <>
                    <Button type={"primary"} size={"small"}
                            onClick={() => editUser(JSON.parse(JSON.stringify(record)))}>编辑</Button>
                    <Button type={"primary"} size={"small"} danger onClick={() => deleteUser(record.id)}>删除</Button>
                </>

            },
            width: 200
        }
    ]

    //  获取用户列表
    const getUserTable = () => {
        console.info('pageSize: ' + pageSize)
        console.info('currentPage: ' + currentPage)
        const params = {
            blurry: blurry,
            size: pageSize,
            currentPage: currentPage
        }
        getUserList(params).then(res => {
            if (res.success) {
                setDataSource(res.data.records)
                setTotal(res.data.total)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    //  查询框输入
    const changeValue = (e) => {
        setBlurry(e.target.value)
    }

    //  修改用户状态
    const changeStatus = (checked, row) => {
        row.enabled = checked
        enabledUser(row).then(res => {
            if (res.success) {
                successMsg(res.data)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    //  编辑用户
    const editUser = (data) => {
        setOpenModal(true)
        setUserObj(data)
    }

    const {confirm} = Modal
    //  删除用户
    const deleteUser = (userId) => {
        confirm({
            title: '删除用户',
            content: '确认删除当前用户?',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                delUser({id: userId}).then(res => {
                    if (res.success) {
                        successMsg(res.data)
                        getUserTable()
                    } else {
                        errorMsg(res.msg)
                    }
                })
            },
            onCancel() {
                infoMsg('操作已取消')
            }
        })
    }

    //  子组件调用父组件方法
    const handleChild = useCallback(() => {
        getUserTable()
    }, [pageSize, currentPage])

    useEffect(() => {
        getUserTable()
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
                    onClick={getUserTable}
                >查询</Button>
                <Button
                    className={'add-btn'}
                    onClick={editUser}
                >新增</Button>
            </div>
            <Table
                className={'page-table'}
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                bordered
                pagination={false}
            ></Table>

            <ModalContext.Provider value={{openModal, setOpenModal, userObj,
                pageSize, setPageSize, currentPage, setCurrentPage, total, setTotal}}>
                {/*分页*/}
                <MyPagination getList={handleChild}></MyPagination>
                {/*编辑Modal*/}
                <EditUser getList={handleChild}></EditUser>

            </ModalContext.Provider>
        </>
    )
}

export default Index