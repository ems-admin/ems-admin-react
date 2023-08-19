import {useEffect, useState} from "react";
import {Button, Input, Select, Table} from "antd";
import ModalContext from "../../assets/js/context";
import MyPagination from "../../components/MyPagination";
import {getLogList} from "../../api/log/sysLog";
import {errorMsg} from "../../assets/js/message";

const Index = () => {

    const [blurry, setBlurry] = useState(null)

    const [logType, setLogType] = useState(null)

    const [loading, setLoading] = useState(false)

    const [dataSource, setDataSource] = useState([])

    //  定义分页参数
    //  总条数
    const [total, setTotal] = useState(0)
    //  当面页码
    const [currentPage, setCurrentPage] = useState(1)
    //  每页条数
    const [pageSize, setPageSize] = useState(10)

    //  输入值变化
    const changeValue = (value) => {
        setBlurry(value)
    }

    //  日志类型变化
    const onChange = (value) => {
        setLogType(value)
    }

    const getLogs = () => {
        const params = {
            blurry: blurry,
            logType: logType,
            size: pageSize,
            currentPage: currentPage
        }
        setLoading(true)
        getLogList(params).then(res => {
            if (res.success){
                setDataSource(res.data.records)
                setTotal(res.data.total)
            } else {
                errorMsg(res.msg)
            }
        })
        setLoading(false)
    }
    //  子组件调用父组件方法
    const handleChild = () => {
        getLogs()
    }

    useEffect(() => {
        getLogs()
    }, [])

    return(
        <>
            <div className={'search-div'}>
                <Input
                    className={'search-input'}
                    value={blurry}
                    placeholder={'请输入操作人或说明'}
                    onChange={changeValue}
                    allowClear={true}
                ></Input>
                <Select
                    allowClear={true}
                    placeholder={'请选择日志类型'}
                    style={{width: 200, marginLeft: 20}}
                    options={[
                        {label: '成功', value: '1'},
                        {label: '失败', value: '2'},
                    ]}
                    onChange={onChange}
                ></Select>
                <Button
                    type={"primary"}
                    onClick={getLogs}
                >查询</Button>
            </div>
            <Table
                className={'page-table'}
                dataSource={dataSource}
                rowKey={'id'}
                bordered
                pagination={false}
                loading={loading}
            >
                <column key={'index'} title={'序号'} dataIndex={'index'} width={60} align={'center'}
                        render={(text, record, index) => (
                            (currentPage - 1) * pageSize + index + 1
                        )}></column>
                <column key={'username'} title={'操作人'} dataIndex={'username'} width={100}></column>
                <column key={'description'} title={'操作说明'} dataIndex={'description'} ellipsis={true}></column>
                <column key={'method'} title={'请求方法'} dataIndex={'method'} ellipsis={true}></column>
                <column key={'params'} title={'请求参数'} dataIndex={'params'} ellipsis={true}></column>
                <column key={'ip'} title={'IP'} dataIndex={'ip'} width={120}></column>
                <column key={'logType'} title={'日志类型'} dataIndex={'logType'} render={(logType) => (
                    logType === '1' ? '成功' : '失败'
                )}></column>
                <column key={'exceptionDetail'} title={'错误详情'} dataIndex={'exceptionDetail'} ellipsis={true}></column>
                <column key={'time'} title={'请求耗时'} dataIndex={'time'} width={100}></column>
                <column key={'createTime'} title={'操作时间'} dataIndex={'createTime'} width={150}></column>
            </Table>

            <ModalContext.Provider value={{pageSize, setPageSize, currentPage, setCurrentPage, total, setTotal}}>
                {/*分页*/}
                <MyPagination getList={handleChild}></MyPagination>
            </ModalContext.Provider>
        </>
    )
}

export default Index