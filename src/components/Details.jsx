import { Tabs } from '@mantine/core'
import ReviewsTab from './ReviewsTab'
import ProductDetailsTab from './ProductDetailsTab'
import Quas from './Quas'

function Details({id,details,brandDetails,brand}) {
  return (
    <Tabs defaultValue="product-details" className='p-5 md:p-[70px] !pb-0'>
      <Tabs.List>
        <Tabs.Tab value="product-details" className='flex-1 data-[active=true]:font-Satoshi-bold text-gray-500 data-[active=true]:text-black font-Satoshi-medium text-[20px]'>
          Product Details
        </Tabs.Tab>
        <Tabs.Tab value="reviews" className='flex-1 data-[active=true]:font-Satoshi-bold text-gray-500 data-[active=true]:text-black font-Satoshi-medium text-[20px]'>
          Rating & Reviews
        </Tabs.Tab>
        <Tabs.Tab value="q&a" className='flex-1 data-[active=true]:font-Satoshi-bold text-gray-500 data-[active=true]:text-black font-Satoshi-medium text-[20px]'>
          Q&As
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="product-details">
        <ProductDetailsTab details = {details} brandDetails={brandDetails} brand ={brand}/>
      </Tabs.Panel>

      <Tabs.Panel value="reviews">
        <ReviewsTab id={id}/>
      </Tabs.Panel>

      <Tabs.Panel value="q&a">
        <Quas id={id}/>
      </Tabs.Panel>
    </Tabs>
  )
}

export default Details