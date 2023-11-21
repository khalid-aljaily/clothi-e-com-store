import { Badge, Card, Group, Image, Text } from '@mantine/core'
import StarRating from './Stars'
import { Link } from 'react-router-dom'

function ProductCard({prod}) {
  return (
    <Card   radius={0} p={0} className='max-w-[280px] 2flex flex-col'>
      <div className='aspect-square w-full overflow-hidden rounded-2xl' >
        <Image
          src={prod.image.url.replaceAll('180','300')}
          className=' aspect-square  max-w-[100%]'
        />
      </div>
      <Link to={`/product/${prod.webID}`} onClick={()=>{window.scrollTo({
            top: 0,
            behavior: 'instant',
          })}}>
      <Text  ff={'Satoshi-bold'} className='text-[16px] lg:text-[20px] mt-2 md:mt-5 hover:underline mb-1'>{prod.productTitle}</Text>
      </Link>
      <Group className='mt-auto'>
  { prod.rating.avgRating ?<StarRating rating={prod.rating.avgRating}/>: <Text className='text-[9px]'>No rating for this pooduct yet</Text>}
   { prod.rating.count&&<Text className='text-[9px] sm:text-xs'>({prod.rating.count})</Text>}
      </Group>


      <Group className={`gap-2 sm:gap-5  mt-1 md:mt-2`}>
        {
          prod.prices[0].salePriceStatus
          ?
       ( <>
       <Text className='text-[14px] sm:text-base lg:text-[24px]'>${prod.prices[0].salePrice.minPrice}</Text>
        <Text className='text-[14px] sm:text-base lg:text-[24px] text-gray-400 line-through'>${prod.prices[0].regularPrice.minPrice}</Text>
      <Badge variant='light' color={'red'} ff={'Satoshi'} className='h-4 sm:h-6 sm:w-14 lg:h-8 w-9 lg:w-16 p-0 text-[10px] sm:text-base md:text-[16px] '>{(prod.prices[0].salePrice.minPrice/prod.prices[0].regularPrice.minPrice*100 - 100).toFixed(0) }%</Badge></>)
      :
<Text className='text-[14px] sm:text-base lg:text-[24px]'>${prod.prices[0].regularPrice.minPrice}</Text>
        }
      </Group>
   
    </Card>
  )
}


export default ProductCard