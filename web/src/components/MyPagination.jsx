import {Pagination} from "antd";
import {useContext} from "react";
import PageContext from "../assets/js/context";

const MyPagination = ({getList}) => {

    const {total, currentPage, setCurrentPage, pageSize, setPageSize} = useContext(PageContext)

    //  修改页码或每页条数
    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
        getList()
    }

    const showTotal = (total) => {
        return `共 ${total} 条`
    };

    return(
        <>
            <Pagination
                total={total}
                showTotal={showTotal}
                current={currentPage}
                pageSize={pageSize}
                defaultCurrent={1}
                defaultPageSize={10}
                onChange={onChange}
            ></Pagination>
        </>
    )
}

export default MyPagination