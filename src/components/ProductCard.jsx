import { Badge, Card, Group, Image, Rating, Text } from '@mantine/core'
import React from 'react'
import star from '../assets/Star 3.svg'
import half from '../assets/Star 5.svg'
import StarRating from './Stars'
import { Link } from 'react-router-dom'

function ProductCard({prod}) {
  return (
    <Card   radius={0} p={0} className='max-w-[280px] flex flex-col'>
      <div className='aspect-square w-full overflow-hidden rounded-2xl' >
        <Image
          src={prod.image.url.replaceAll('180','300')}
          className=' aspect-square  max-w-[100%]'
        />
      </div>
      <Link to={`/product/${prod.webID}`}>
      <Text  ff={'Satoshi-bold'} className='text-[12px] sm:text-[16px] lg:text-[20px] mt-2 md:mt-5 hover:underline'>{prod.productTitle}</Text>
      </Link>
      <Group className='mt-auto'>
  { prod.rating.avgRating &&<StarRating rating={prod.rating.avgRating}/>}
   { prod.rating.count&&<Text className='text-xs'>({prod.rating.count})</Text>}
      </Group>


      <Group className={`sm:gap-5 ${!prod.rating.avgRating&&"mt-auto"}`}>
        {
          prod.prices[0].salePriceType?
       ( <>
       <Text className='text-[16px] lg:text-[24px]'>${prod.prices[0].salePrice.minPrice}</Text>
        <Text className='text-[16px] lg:text-[24px] text-gray-400 line-through'>${product.prices[0].regularPrice.minPrice}</Text>
      <Badge variant='light' color={'red'} ff={'Satoshi'} className='h-5 lg:h-8 w-12 lg:w-16 p-0 text-[12px] md:text-[16px]'>{(prod.prices[0].salePrice.minPrice/prod.prices[0].regularPrice.minPrice*100 - 100).toFixed(0) }%</Badge></>)
      :
<Text className='text-[16px] lg:text-[24px]'>${prod.prices[0].regularPrice.minPrice}</Text>
        }
      </Group>
   
    </Card>
  )
}


export default ProductCard