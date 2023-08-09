import React from 'react'
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";
import {ConfigProvider} from "antd";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={'程序加载中...'} persistor={persistor}>
                <ConfigProvider componentSize={'small'}>
                    <App />
                </ConfigProvider>
            </PersistGate>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
)
