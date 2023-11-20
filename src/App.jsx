import { MantineProvider, createTheme} from '@mantine/core'
import '@mantine/core/styles.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { HeaderMegaMenu } from './components/header/header'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import ProductsPage from './pages/ProductsPage'
import Cart from './pages/Cart'
import { createContext, useState } from 'react'

export const cartContext = createContext()

function App() {

const client = new QueryClient()
const [cartItems,setCartItems] = useState([])


const theme = createTheme({
  primaryColor:'dark',
  defaultRadius:'lg',
  fontFamily:'Satoshi-medium'
 
  
})

  return (
    <QueryClientProvider  client={client} >
    <MantineProvider theme={theme} >
      <cartContext.Provider value={{cartItems,setCartItems}}>
      <HeaderMegaMenu/> 
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/product/:id' element ={<ProductDetail/>}/>
        <Route  path='/shop'  element ={<ProductsPage/>}/>
        <Route  path='/cart' element = {<Cart/>} />
      </Routes>
      </cartContext.Provider>
        <Footer/>
    </MantineProvider>
    </QueryClientProvider>
  )
}

export default App

