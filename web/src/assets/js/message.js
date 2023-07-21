import {message} from "antd";

export const infoMsg = (msg) => {
    message.info(msg)
}

export const successMsg = (msg) => {
    message.success(msg)
}

export const errorMsg = (msg) => {
    message.error(msg)
}

export const warningMsg = (msg) => {
    message.warning(msg)
}