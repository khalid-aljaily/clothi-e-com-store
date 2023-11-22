import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const location = useLocation();
  const [id, setId] = useState(location.pathname.split("/")[2]);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [swatchColor, setSwatchColor] = useState("");

  const options = {
    method: "GET",
    url: "https://kohls.p.rapidapi.com/products/detail",
    params: { webID: id },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "kohls.p.rapidapi.com",
    },
  };
  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      console.log("fetching");
      setData(response.data);
      setSwatchColor(response.data.payload.products[0].swatchImages[0].color);
      setIsLoading(false);
    } catch (err) {
      if (err.response?.status === 429) {
        try {
          const newOptions = {
            ...options,
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_2,
              "X-RapidAPI-Host": "kohls.p.rapidapi.com",
            },
          };
          const newResponse = await axios.request(newOptions);
          setData(newResponse.data);
          setSwatchColor(
            newResponse.data.payload.products[0].swatchImages[0].color
          );
          setIsLoading(false);
        } catch (err) {
          if (err.response?.status === 429) {
            const newOptions = {
              ...options,
              headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_3,
                "X-RapidAPI-Host": "kohls.p.rapidapi.com",
              },
            };
            const newResponse = await axios.request(newOptions);
            setData(newResponse.data);
            setSwatchColor(
              newResponse.data.payload.products[0].swatchImages[0].color
            );
            setIsLoading(false);
          }
        }
      } else {
        console.error("err:", err.message);
      }
    }
  };
  useEffect(() => {
    if (location.pathname.includes("product")) {
      setId(location.pathname.split("/")[2]);
    }
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <ProductContext.Provider
      value={{ data, isLoading, setIsLoading, swatchColor, setSwatchColor }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
