import {Button, Input, Modal, Table} from "antd";
import {useCallback, useEffect, useState} from "react";
import {errorMsg, infoMsg, successMsg} from "../../assets/js/message";
import ModalContext from "../../assets/js/context";
import {delMenu, getMenuTable} from "../../api/menu/sysMenu";
import EditMenu from "./EditMenu";

const Index = () => {

    //  定义查询参数
    const [blurry, setBlurry] = useState(null)

    //  定义源数据
    const [dataSource, setDataSource] = useState([])

    //  编辑弹窗控制
    const [openEdit, setOpenEdit] = useState(false)

    //  定义一个菜单对象,作为传入子组件的变量
    const [menuObj, setMenuObj] = useState({})

    //  获取用户列表
    const getMenuList = () => {
        getMenuTable({blurry: blurry}).then(res => {
            if (res.success) {
                setDataSource(res.data)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    //  子组件调用父组件方法
    const handleChild = useCallback(() => {
        getMenuList()
    }, [])

    //  查询框输入
    const changeValue = (e) => {
        setBlurry(e.target.value)
    }

    //  编辑菜单
    const editMenu = (data) => {
        setMenuObj(data)
        setOpenEdit(true)
    }

    const {confirm} = Modal
    //  删除菜单
    const deleteMenu = (menuId) => {
        confirm({
            title: '删除菜单',
            content: '确认删除当前菜单?',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                delMenu({id: menuId}).then(res => {
                    if (res.success){
                        successMsg(res.data)
                        getMenuList()
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
        getMenuList()
    }, [])

    return (
        <>
            <div className={'search-div'}>
                <Input
                    className={'search-input'}
                    value={blurry}
                    placeholder={'请输入菜单名称'}
                    onChange={changeValue}
                    allowClear={true}
                ></Input>
                <Button
                    type={"primary"}
                    onClick={getMenuList}
                >查询</Button>
                <Button
                    className={'add-btn'}
                    onClick={editMenu}
                >新增</Button>
            </div>
            <Table
                className={'no-page-table'}
                dataSource={dataSource}
                rowKey={'id'}
                bordered
                pagination={false}
            >
                <column title={'菜单名称'} dataIndex={'name'} key={'name'}></column>
                <column title={'菜单路径'} dataIndex={'path'} key={'path'}></column>
                <column title={'组件地址'} dataIndex={'realpath'} key={'realpath'}></column>
                <column title={'权限'} dataIndex={'permission'} key={'permission'}></column>
                <column title={'类型'} dataIndex={'type'} key={'type'} render={(type) => {
                    if (type === '1'){
                        return '菜单'
                    } else if (type === '2'){
                        return '页面'
                    } else if (type === '3'){
                        return '按钮'
                    }
                }}></column>
                <column title={'排序'} dataIndex={'sort'} key={'sort'}></column>
                <column title={'操作'} dataIndex={'option'} key={'option'} width={150} align={'center'} render={(_, record) => (
                    <>
                        <Button type={"primary"} onClick={() => editMenu(JSON.parse(JSON.stringify(record)))}>编辑</Button>
                        <Button type={"primary"} danger onClick={() => deleteMenu(record.id)}>删除</Button>
                    </>
                )}></column>
            </Table>

            {/*菜单编辑页面*/}
            <ModalContext.Provider value={{openEdit, setOpenEdit, menuObj}}>
                <EditMenu getList={handleChild}></EditMenu>
            </ModalContext.Provider>
        </>
    )
}

export default Index