import {Button, Col, Form, Input, Modal, Radio, Row, TreeSelect} from "antd";
import {useContext, useState} from "react";
import ModalContext from "../../assets/js/context";
import {errorMsg, successMsg} from "../../assets/js/message";
import {editMenu, getMenuTreeSelect} from "../../api/menu/sysMenu";

const EditUser = ({getList}) => {

    const {openEdit, setOpenEdit, menuObj} = useContext(ModalContext)

    const [form] = Form.useForm()

    const [treeData, setTreeData] = useState([])

    const [defaultValue, setDefaultValue] = useState('0')

    const [title, setTitle] = useState('新增菜单')

    const [loading, setLoading] = useState(false)

    const [isPage, setIsPage] = useState(false)

    const [isButton, setIsButton] = useState(false)

    //  打开后执行的操作
    const afterOpenModal = (open) => {
        //  重置表单
        form.resetFields()
        //  重置title
        setTitle('新增菜单')
        setLoading(false)
        setDefaultValue('0')
        setIsPage(false)
        setIsButton(false)
        //  编辑
        if (open){
            if (menuObj && menuObj.id){
                //  设置title
                setTitle('编辑菜单')
                //  填充字段
                form.setFieldsValue(menuObj)
            }
            getMenuTreeFun()
        }
    }

    //  获取当前用户所有菜单权限树
    const getMenuTreeFun = () => {
        getMenuTreeSelect().then(res => {
            if (res.success){
                let parentData = [{
                    value: '0',
                    label: '顶级目录',
                    children: []
                }]
                parentData[0].children = res.data
                setTreeData(parentData)
            } else {
                errorMsg(res.msg)
            }
        })
    }

    //  修改类型
    const changeType = (e) => {
        const value = e.target.value
        setIsPage(false)
        setIsButton(false)
        if (value === '2'){
            setIsPage(true)
            setIsButton(false)
        } else if (value === '3'){
            setIsPage(false)
            setIsButton(true)
        }
    }

    //  提交
    const onFinish = (values) => {
        setLoading(true)
        const formData = {...values}
        editMenu(formData).then(res => {
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
                <Form form={form} name={'editMenu'} onFinish={onFinish} autoComplete={'off'}>
                    <Form.Item name={'id'} hidden={true}>
                        <Input></Input>
                    </Form.Item>
                    <Row gutter={20}>
                        <Col span={16}>
                            <Form.Item name={'parentId'} label={'上级目录'} rules={[{required: true, message: '上级目录不能为空'}]}>
                                <TreeSelect
                                    treeData={treeData}
                                    defaultValue={defaultValue}>
                                </TreeSelect>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={'sort'} label={'排序'} rules={[{required: true, message: '排序不能为空'}]}>
                                <Input placeholder={'请输入菜单排序'}></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name={'type'} label={'菜单类型'} rules={[{required: true, message: '菜单类型不能为空'}]}>
                        <Radio.Group defaultValue={'1'} onChange={changeType}>
                            <Radio value={'1'}>菜单</Radio>
                            <Radio value={'2'}>页面</Radio>
                            <Radio value={'3'}>按钮</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={'name'} label={'菜单名称'} rules={[{required: true, message: '菜单名称不能为空'}]}>
                        <Input placeholder={'请输入菜单名称'}></Input>
                    </Form.Item>
                    {(isPage || isButton) && <Form.Item name={'path'} label={'访问路径'} rules={[{required: true, message: '访问路径不能为空'}]}>
                        <Input placeholder={'请输入访问路径'}></Input>
                    </Form.Item>}
                    {isPage && <Form.Item name={'component'} label={'组件路径'} rules={[{required: true, message: '组件路径不能为空'}]}>
                        <Input placeholder={'请输入component'}></Input>
                    </Form.Item>}
                    {isButton && <Form.Item name={'permission'} label={'按钮权限'} rules={[{required: true, message: '按钮权限不能为空'}]}>
                        <Input placeholder={'请输入按钮权限'}></Input>
                    </Form.Item>}
                </Form>
            </Modal>
        </div>
    )
}

export default EditUser