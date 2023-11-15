import { MantineProvider, createTheme} from '@mantine/core'
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



function App() {

const client = new QueryClient()

const theme = createTheme({
  primaryColor:'dark',
  defaultRadius:'lg',
  fontFamily:'Satoshi-medium'
 
  
})

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
