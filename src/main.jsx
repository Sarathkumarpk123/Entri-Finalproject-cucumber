import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { CartProvider } from './components/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <CartProvider>
  
  <App />
  </CartProvider>
   
  </BrowserRouter>
  
    
    
  
)
