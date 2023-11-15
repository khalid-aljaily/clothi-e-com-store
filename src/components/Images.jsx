import { Flex, Image, Skeleton } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import demo from "../assets/demo.png";

function Images({ data, swatchColor }) {
  console.log(swatchColor);
  const regex = /_([^/]+)\?wid=/;
  const [color, setColor] = useState(data?.payload.products[0].images[0].url.match(regex)[1]);
  const [src, setSrc] = useState(data?.payload.products[0].altImages[0].url.replaceAll('50', '700'));
  const changeImage = (img) => {
    setSrc(img.src.replaceAll('180', '800'));
    [...document.querySelectorAll('.alt-image')].forEach((im) => im.classList.remove('border-[3px]'));
    img.classList.add('border-[3px]');
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} className='flex-1'>
      <Flex
        gap={14}
        direction={{ base: "column-reverse", md: "row" }}
        className="flex-1"
      >
        <Flex
          direction={{ base: "row", md: "column" }}
          gap={14}
          className="flex-[1]"
          justify={'space-between'}
        >
          <div className="cursor-pointer">
            {!data ? (
              <Skeleton className="aspect-square rounded-3xl object-cover alt-image border-gray-500 border-[3px]" />
            ) : (
              <Image
                src={data?.payload.products[0].altImages[0]?.url?.replace(/50(?!.*50.*50)/g, '180')}
                className="aspect-square rounded-3xl object-cover alt-image border-gray-500 border-[3px]"
                onClick={(e) => { changeImage(e.currentTarget) }}
              />
            )}
          </div>
          <div className="cursor-pointer">
            {!data ? (
              <Skeleton className="aspect-square rounded-3xl object-cover alt-image border-gray-500" />
            ) : (
              <Image
                src={data.payload.products[0].altImages[1]?.url?.replace(/50(?!.*50.*50)/g, '180')}
                className="aspect-square rounded-3xl object-cover alt-image border-gray-500"
                onClick={(e) => { changeImage(e.currentTarget) }}
              />
            )}
          </div>
          <div className="cursor-pointer">
            {!data ? (
              <Skeleton className="aspect-square rounded-3xl object-cover alt-image border-gray-500" />
            ) : (
              <Image
                src={data.payload.products[0].altImages[2]?.url?.replace(/50(?!.*50.*50)/g, '180')}
                className="aspect-square rounded-3xl object-cover alt-image border-gray-500"
                onClick={(e) => { changeImage(e.currentTarget) }}
              />
            )}
          </div>
        </Flex>
        <div className="shrink-0 aspect-square overflow-hidden rounded-3xl flex-[3] main-image">
          {!data ? (
            <Skeleton className="h-full w-full" c={'lime'} />
          ) : (
            <Image
              src={src || data?.payload.products[0].altImages[0]?.url?.replace(/50(?!.*50.*50)/g, '700')}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
      </Flex>
    </Flex>
  );
}

export default Images;