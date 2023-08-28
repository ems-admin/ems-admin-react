import {Button, Image} from "antd";
import {useNavigate} from 'react-router-dom'
import errorImage from '../../assets/image/404.png'
import '../../assets/css/404.css'
const NotFound = () => {

    const navigate = useNavigate()

    const back = () => {
        navigate('/index')
    }

    return(
        <>
            <div className={'error'}>
                <div>
                    <h1>页面走丢了......</h1>
                </div>
                <div>
                    <Image src={errorImage} preview={false}/>
                </div>
                <div>
                    <Button onClick={() => back()}>返回</Button>
                </div>
            </div>
        </>
    )
}

export default NotFound