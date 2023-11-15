import React,{ useEffect, useState } from 'react'

import './App.css'

import {Button, MantineProvider, createTheme, useMantineTheme} from '@mantine/core'
import '@mantine/core/styles.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import NewArrivals from './pages/NewArrivals'
import OnSale from './pages/OnSale'
import { HeaderMegaMenu } from './components/header/header'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import ProductsPage from './pages/ProductsPage'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Cart from './pages/Cart'
import axios from 'axios'


function App() {

const client = new QueryClient()

const theme = createTheme({
  primaryColor:'dark',
  defaultRadius:'lg',
  fontFamily:'Satoshi-medium'
 
  
})
const url = "http://localhost:5173/shop/catalog/sports-fan.jsp?CN=Occasion:Sports%20Fan&cc=mens-TN2.0-S-sportsfanshop";

// Use regex to match and capture everything after the last '/'
const match = url.match(/[^/]*\?(.*)/)[1];

// Extract the captured part (everything after the last '/')
const queryString = match ? match[1] : '';


console.log(match);
  return (
    <QueryClientProvider  client={client} >
    <MantineProvider theme={theme}>
      <HeaderMegaMenu/> 
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/onSale' element={<OnSale/>}/>
        <Route  path='/NewArrivals' element={<NewArrivals/>}/>
        <Route  path='/product/:id' element ={<ProductDetail/>}/>
        <Route  path='/shop'  element ={<ProductsPage/>}/>
        <Route  path='/cart' element = {<Cart/>} />
      </Routes>
        <ReactQueryDevtools initialIsOpen />
        <Footer/>
    </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
