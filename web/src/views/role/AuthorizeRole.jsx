import {Button, Modal, Tree} from "antd";
import {useContext, useState} from "react";
import ModalContext from "../../assets/js/context";
import {getMenuTable} from "../../api/menu/sysMenu";
import {errorMsg, successMsg} from "../../assets/js/message";
import {authorizeRole, getMenusByRoleId} from "../../api/role/sysRole";

const AuthorizeRole = () => {

    const {openAuth, setOpenAuth, roleId} = useContext(ModalContext)

    const [loading, setLoading] = useState(false)

    const [treeData, setTreeData] = useState([])

    const [checkedKeys, setCheckedKeys] = useState([])

    //  组件打开
    const openAfter = (open) => {
        if (open){
            setLoading(false)
            setTreeData([])
            getAuthorizedMenu()
        }
    }

    //  获取所有的菜单树
    const getMenuTree = () => {
        getMenuTable({}).then(res => {
            if (res.success){
                setTreeData(res.data)
            } else {
                errorMsg(res.msg)
            }
            setLoading(false)
        })
    }

    //  获取已授权的菜单树
    const getAuthorizedMenu = () => {
        getMenusByRoleId({roleId: roleId}).then(res => {
            if (res.success){
                getMenuTree()
                if (res.data && res.data.length > 0){
                    setCheckedKeys(res.data.map(item => item.menuId))
                }
            } else {
                errorMsg(res.msg)
            }
        })
    }

    //  获取已选中的菜单
    const onCheck = (checkedKeys) => {
        setCheckedKeys(checkedKeys);
    };

    //  授权
    const AuthRole = () => {
        setLoading(true)
        authorizeRole({roleId: roleId, menuIds: checkedKeys}).then(res => {
            if (res.success){
                successMsg(res.data)
                setOpenAuth(false)
            } else {
                errorMsg(res.msg)
            }
        })
        setLoading(false)
    }

    return(
        <>
            <Modal
                title={'角色授权'}
                className={'edit-modal'}
                width={'50%'}
                open={openAuth}
                maskClosable={false}
                onCancel={() => setOpenAuth(false)}
                afterOpenChange={openAfter}
                footer={[
                    <Button key={'cancel'} onClick={() => setOpenAuth(false)}>取消</Button>,
                    <Button key={'ok'} type={"primary"} loading={loading} onClick={AuthRole}>授权</Button>
                ]}
                transitionName={'ant-fade'}
            >
                {
                    treeData && treeData.length > 0 ? (<Tree
                        checkable={true}
                        defaultExpandAll={true}
                        treeData={treeData}
                        fieldNames={{
                            title: 'name',
                            key: 'id'
                        }}
                        defaultCheckedKeys={checkedKeys}
                        onCheck={onCheck}
                    ></Tree>) : (
                        'loading...'
                    )
                }
            </Modal>
        </>
    )
}

export default AuthorizeRole