import axios from "axios";
import store from '../../store/store'
import {errorMsg} from "./message";
import {updateRefreshToken, updateToken} from "../../store/userRedux";

//  创建axios实例
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',
    timeout: 60000   //  请求超时时间（毫秒）
})

//  request拦截器
instance.interceptors.request.use(
    config => {
        const token = store.getState().userInfo.userInfo.token
        //  如果已登录
        if (token){
            //  在请求头添加token
            config.headers['Authorization'] = 'Bearer ' + token
        }
        //  统一请求类型json
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    error => {
        Promise.reject(error)
    }
)

//  response拦截器
instance.interceptors.response.use(
    response => {
        //  请求成功，直接返回数据
        return response.data
    },
    error => {
        if (!error.response){
            errorMsg(error.message)
        } else {
            //  请求返回码
            let code;
            if (error.response){
                code = error.response.status
            }
            //  请求返回错误
            const data = error.response.data
            if (code){
                //  如果是未授权
                if (code === 401){
                    //  说明token过期，使用refreshToken对当前token进行刷新
                    const refresh = store.getState().userInfo.userInfo.refreshToken
                    //  如果存在
                    if (refresh){
                        return againRequest(refresh, error)
                    //  否则
                    } else {
                        //  清空token
                        store.dispatch(updateToken(null))
                        //  并跳转到登录页面，进行重新登录
                        this.props.history.push('/login')
                    }
                    //  如果是没有权限
                } else if (code === 403){
                    //  直接跳转至401页面
                    // routers.replace({path: '/401'})
                    //  如果是服务器异常或其他异常
                } else {
                    //  如果存在异常信息，显示异常信息
                    if (data){
                        errorMsg(data.detail)
                    }
                }
            } else {
                errorMsg('接口请求失败')
            }
        }
        return Promise.reject(error)
    }
)

/**
 * 重新请求
 * @param error
 * @returns {Promise<void>}
 */
async function againRequest(refresh, error){
    await refreshToken(refresh)
    const config = error.response.config
    config.headers['Authorization'] = 'Bearer ' + store.getState().userInfo.userInfo.token
    const res = await axios.request(config)
    return res.data
}

/**
 * 刷新token
 * @param refresh
 */
function refreshToken(refresh){
    //  刷新token
    return axios({
        url: '/auth/refresh',
        method: 'put',
        headers: {
            Authorization: `Bearer ${refresh}`
        }
    }).then(res => {
        if (res.data.success){
            //  刷新token
            store.dispatch(updateToken(res.data.data))
        } else {
            errorMsg(res.msg)
            //  清空token
            store.dispatch(updateToken(null))
        }
    }).catch(() => {
        //  如果刷新token失败,则直接清空refreshToken,避免重复请求
        store.dispatch(updateRefreshToken(null))
    })
}

export default instance