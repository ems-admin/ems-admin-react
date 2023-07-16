import React from 'react'
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from "./views/Login";
import './assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Login />
      </BrowserRouter>
  </React.StrictMode>,
)
