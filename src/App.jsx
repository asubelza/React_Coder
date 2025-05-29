import React from 'react'
import Navbar from './components/Navbar'
import { PrimeReactProvider } from 'primereact/api';
import ItemListContainer from './components/ItemListContainer';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer';
import { useState, useEffect } from'react'
import Loading from './components/Loading';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

  const [loading, setLoading] = useState(true)
  const [elementos, setElementos] = useState([])
  useEffect(() => {
    setTimeout(() => {
      setElementos(["Producto1","Producto2","Producto3","Producto4","Producto5"])
      setLoading(false)
    }, 5000)
  },[]) 

  if (loading) {
    return <Loading />
  }

  return (
   <PrimeReactProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <Navbar />
            <Routes>
             
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/category/:category" element={<ItemListContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<ItemListContainer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </ShoppingCartProvider>  
    </PrimeReactProvider> 
  
  )
}

export default App