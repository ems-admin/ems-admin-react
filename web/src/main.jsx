import React from 'react'
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
// import { Provider } from 'react-redux'
// import store from "@/store/store.js";
// import {PersistGate} from 'redux-persist/integration/react'
// import {persistStore} from "redux-persist";
import {ConfigProvider} from "antd";
import '@/assets/css/Common.css'

// let persistor = persistStore(store);

const validateMessages = {
    required: "${label}不能为空",
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <ConfigProvider componentSize={'small'} form={{validateMessages}}>
              <App />
          </ConfigProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
