import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeaderMegaMenu } from "./components/header/header";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import CartContext from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  const client = new QueryClient();
  const theme = createTheme({
    primaryColor: "dark",
    defaultRadius: "lg",
    fontFamily: "Satoshi-medium",
  });

  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme}>
        <CartContext>
          <HeaderMegaMenu />
          <ProductProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/shop" element={<ProductsPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </ProductProvider>
        </CartContext>
        <Footer />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
