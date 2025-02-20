import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { store } from './Redux/store.js'
import "../init.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Toaster position='top-right' />
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
)

