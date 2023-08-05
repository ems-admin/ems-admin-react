import {Button, Input, Switch, Table} from "antd";
import {useEffect, useState} from "react";
import {getUserList} from "../../api/user/sysUser";
import {errorMsg} from "../../assets/js/message";

const Index = () => {

    //  定义查询参数
    const [blurry, setBlurry] = useState(null)

    //  定义源数据
    const [dataSource, setDataSource] = useState([])

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
            render: (enabled) => {
                return <Switch checkedChildren={'启用'} unCheckedChildren={'停用'} defaultChecked={enabled}/>
            }
        },
        {
            key: 'operate',
            title: '操作',
            dataIndex: 'operate',
            align: 'center',
            render: () => {
                return <>
                    <Button type={"primary"} size={"small"} >编辑</Button>
                    <Button type={"primary"} size={"small"} danger>删除</Button>
                </>

            },
            width: 200
        }
    ]

    //  获取用户列表
    const getUserTable = () => {
        getUserList({blurry: blurry}).then(res => {
            if (res.success) {
                setDataSource(res.data.records)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    //  查询框输入
    const changeValue = (e) => {
        setBlurry(e.target.value)
    }

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
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                bordered
                pagination={false}
            ></Table>
        </>
    )
}

export default Index