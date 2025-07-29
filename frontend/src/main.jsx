import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalProvider } from "./utils/GlobalContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <GlobalProvider>
    <App />
    </GlobalProvider>
    </BrowserRouter>
  </StrictMode>,
)
