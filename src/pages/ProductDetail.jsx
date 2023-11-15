import {
  ActionIcon,
  Anchor,
  Badge,
  Breadcrumbs,
  Button,
  Divider,
  Flex,
  Group,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import arrow from "../assets/Frame.svg";

import StarRating from "../components/Stars";
import { useEffect, useRef, useState } from "react";
import { IconCheck, IconMinus, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Images from "../components/Images";
import Details from "../components/Details";
import Section from "../components/Section";
import { useParams } from "react-router-dom";
const items = [
  { title: "Home", href: "#" },
  { title: "Shop", href: "#" },
  { title: "Men", href: "#" },
  { title: "T-Shirts", href: "#" },
].map((item, index) => (
  <Anchor
    href={item.href}
    key={index}
    className="font-Satoshi-regular text-gray-400"
  >
    {item.title}
  </Anchor>
));

function ProductDetail() {
  const {id} = useParams()
  const [data,setData] = useState()
  const [count, setCount] = useState(0);
  const [swatchColor, setSwatchColor] = useState('');
  const descriptionRef = useRef()

  const changeSize = (e) => {
    let btns = document.querySelectorAll(".size-btn");
    btns.forEach((btn) => {
      btn.dataset.active = false;
    });
    e.currentTarget.dataset.active = true;
  };

  const options = {
    method: "GET",
    url: "https://kohls.p.rapidapi.com/products/detail",
    params: { webID: id },
    headers: {
      "X-RapidAPI-Key": '71b967bd13mshbc4acad8ad7d6dbp1ece9fjsnc65d97d6dea7',
      "X-RapidAPI-Host": "kohls.p.rapidapi.com",
    },
  };
  useEffect(()=>{
    const fetchData = async ()=> {
      const response = await axios.request(options);
      setSwatchColor(response.data.payload.products[0].swatchImages[0].color);
      setData(response.data);
      descriptionRef.current.innerHTML = data?.payload.products[0].description.shortDescription
    }
    fetchData()
  },[])
 


console.log(data)
 
  return (
    <>
      <div className="flex-1 lg:h-[calc(100vh-96px)] overflow-hidden items-center px-5 md:px-[70px] ">
        <Divider />
        <Breadcrumbs className="my-4 md:my-6" separator={<img src={arrow} />}>
          {items}
        </Breadcrumbs>
        <Flex direction={{ base: "column", md: "row" }} gap={40}>
          <Images data={data} swatchColor={swatchColor} />
          <div className="flex-1">
            <div>
              {!data ? (
                <>
                  <Skeleton height={25} />
                  <Skeleton height={25} width={"40%"} mt={5} />
                </>
              ) : (
                <Title className="uppercase mb-1 " order={2}>
                  {data.payload.products[0].productTitle}
                </Title>
              )}
              {!data ? (
                <div className="flex gap-2 my-2">
                  <Skeleton height={35} width={200} />
                  <Skeleton height={35} width={50} />
                </div>
              ) : (
                <div className="flex">
                  <StarRating rating={data.payload.products[0].avgRating} />
                  <p className="text-gray-500">
                    {data?.payload.products[0].avgRating}
                    <span className="text-black">/5</span>{" "}
                  </p>
                </div>
              )}
              <Group gap={20} className="">
                {!data ? (
                  <Skeleton height={40} w={100} mb={5} />
                ) : (
                  <Group className={`sm:gap-5 ${!data.payload.products[0].avgRating&&"mt-auto"}`}>
        {
          data.payload.products[0].price.salePriceStatus
          ?
       ( <>
       <Text className='text-[16px] lg:text-[24px]'>${data.payload.products[0].price.salePrice.minPrice}</Text>
        <Text className='text-[16px] lg:text-[24px] text-gray-400 line-through'>${data.payload.products[0].price.regularPrice.minPrice}</Text>
      <Badge variant='light' color={'red'} ff={'Satoshi'} className='h-5 lg:h-8 w-12 lg:w-16 p-0 text-[12px] md:text-[16px]'>{(data.payload.products[0].price.salePrice.minPrice/data.payload.products[0].price.regularPrice.minPrice*100 - 100).toFixed(0) }%</Badge></>)
      :
<Text className='text-[16px] lg:text-[24px]'>${data.payload.products[0].price.regularPrice.minPrice}</Text>
        }
      </Group>
                )}
                {/* <Text className="text-[24px] text-gray-400 line-through">
                  $160
                </Text>
                <Badge
                  variant="light"
                  color={"red"}
                  ff={"Satoshi"}
                  className="y-4 px-2 text-[16px]"
                >
                  -30%
                </Badge> */}
              </Group>
              {!data ? (
                <div className="mb-2">
                  <Skeleton height={25} />
                  <Skeleton height={25} width={"60%"} mt={10} />
                </div>
              ) : (
                <Text ref={descriptionRef} className="text-gray-500 font-Satoshi-regular mb-4 description">
                  
                </Text>
              )}
            </div>
            <Divider />
            <div className="my-2">
              <Title order={4} className="font-Satoshi-regular mb-2">
                Select Color
              </Title>
              <div className="flex gap-2">
                {!data
                  ? [0, 1, 2, 3, 4, 5, 6].map((n,i) => (
                      <Skeleton height={32} circle key={i} />
                    ))
                  : data.payload.products[0].swatchImages
                      .slice(0, 7)
                      .map((img,i) => (
                        <div className="relative" key={i}>
                          <img
                            src={img.URL}
                            className={`h-8 aspect-square rounded-full cursor-pointer`}
                            onClick={() => setSwatchColor(img.color)}
                          />
                          {swatchColor == img.color && (
                            <IconCheck className="absolute z-30 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white w-4" />
                          )}
                        </div>
                      ))}
              </div>
            </div>
            <Divider />
            <div className="mt-1">
              <Title order={4}>Select Size</Title>
              <Group className="my-3">
                <Button
                  data-active={false}
                  className="
                text-gray-800 font-Satoshi-regular bg-gray-100 px-5 py-2 rounded-3xl data-[active=true]:bg-black data-[active=true]:text-white  size-btn"
                  onClick={(e) => changeSize(e)}
                  unstyled
                >
                  Small
                </Button>
                <Button
                  data-active={true}
                  className="
                text-gray-800 font-Satoshi-regular bg-gray-100 px-5 py-2 rounded-3xl data-[active=true]:bg-black data-[active=true]:text-white size-btn"
                  onClick={(e) => changeSize(e)}
                  unstyled
                >
                  Medium
                </Button>
                <Button
                  data-active={false}
                  className="
                text-gray-800 font-Satoshi-regular bg-gray-100 px-5 py-2 rounded-3xl data-[active=true]:bg-black data-[active=true]:text-white size-btn"
                  onClick={(e) => changeSize(e)}
                  unstyled
                >
                  Large
                </Button>
                <Button
                  data-active={false}
                  className="
                text-gray-800 font-Satoshi-regular bg-gray-100 px-5 py-2 rounded-3xl data-[active=true]:bg-black data-[active=true]:text-white size-btn"
                  onClick={(e) => changeSize(e)}
                  unstyled
                >
                  X-Large
                </Button>
              </Group>
            </div>
            <Divider />
            <Group className="mt-3">
              <Group className="bg-gray-100 px-6 py-3 rounded-3xl">
                <ActionIcon
                  unstyled
                  onClick={() => count != 0 && setCount(count - 1)}
                >
                  <IconMinus className="active:scale-90" />
                </ActionIcon>
                <Text className="w-1 text-center">{count}</Text>
                <ActionIcon unstyled onClick={() => setCount(count + 1)}>
                  <IconPlus className="active:scale-90" />
                </ActionIcon>
              </Group>
              <Button
                className="bg-black text-white h-auto rounded-3xl flex-1"
                classNames={{ inner: "py-[16px]" }}
              >
                Add To Cart
              </Button>
            </Group>
          </div>
        </Flex>
      </div>
        <Details id={id} brandDetails = {data?.payload.products[0].aboutTheBrand}  details = {data?.payload.products[0].productDetails
} brand ={data?.payload.products[0].brand}  />
<Section title="you might also like"/>
        
    </>
  );
}

export default ProductDetail;
