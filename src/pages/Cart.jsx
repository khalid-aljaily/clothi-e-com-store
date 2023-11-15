import { ActionIcon, Anchor, Breadcrumbs, Button, Divider, Flex, Group, Image, Stack, Text, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react'
import arrow from "../assets/Frame.svg";
import demo from '../assets/demo.png'
import { IconArrowRight, IconMinus, IconPlus, IconTag, IconTrash } from '@tabler/icons-react';
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
function Cart() {
    let discount = null
  return (
    <div className='px-5 md:px-[70px] '>
         <Divider />
          <Breadcrumbs className="my-4 md:my-6" separator={<img src={arrow} />}>
            {items}
          </Breadcrumbs>
          <Title order={2} className='md:text-[40px] md:my-10 my-5'>Your Cart</Title>
          <Flex className='flex-col md:flex-row flex-wrap gap-5 '>
            <div className='border flex-1 sm:min-w-[500px] p-5'>
                <CartCard/>
            </div>
            <div className='flex-1  sm:min-w-[500px] border p-5'>
                <Title order={3}>Order Summary</Title>
                <Stack>
                    <Group className='justify-between'>
                        <Text className='text-[16px] sm:text-[18px] text-gray-500'>Subtotal</Text>
                        <Text className='text-[16px] sm:text-[18px] font-Satoshi-bold'>$150</Text>
                    </Group>
                    {
                        discount&&
                        <Group className='justify-between'>
                             <Text className='text-[16px] sm:text-[18px] text-gray-500'>Discount(-20%)</Text>
                        <Text className='text-[16px] sm:text-[18px] text-red-600 font-Satoshi-bold'>-$10</Text>
                        </Group>
                        
                    }
                       <Group className='justify-between'>
                             <Text className='text-[16px] sm:text-[18px] text-gray-500'>Delivery Fee</Text>
                        <Text className='text-[16px] sm:text-[18px] font-Satoshi-bold'>$15</Text>
                        </Group>
                        <Divider/>
                        <Group className='justify-between'>
                             <Text className='text-[16px] sm:text-[18px]'>Total</Text>
                        <Text className='text-[16px] sm:text-[18px] font-Satoshi-bold'>$15</Text>
                        </Group>
                        <Group>
                        <TextInput
            placeholder="Search for products.."
            classNames={{
              root: " flex-1  ",

              input: "pl-12 font-Satoshi-regular border-none bg-gray-100 text-sm md:text-[16px] py-5 md:py-6",
            }}
            leftSection={
                <IconTag stroke={2} color={'gray'}  className='ml-3 w-5'/>
            }
            radius={"xl"}
          />
                            <Button className='bg-black text-white w-32 h-[40px] md:h-[48px]  rounded-3xl'> Apply</Button>
                        </Group>
                        <Button className='bg-black text-white  h-[40px] md:h-[48px]  rounded-3xl'> 
                        Go To Checkout
                        <IconArrowRight color='white'/>
                        </Button>
                        
           
                </Stack>
            </div>
          </Flex>
    </div>
  )
}

const CartCard = () => {
    const [count,setCount] = useState(0)
    return(
        <div >
           
            <Group className='h-[100px] sm:h-[150px] relative ' >
                
                <img src={demo} alt="" className=' object-cover rounded-2xl h-full aspect-square ' />
            
           
            <div className='flex flex-col h-full '>
                <Title order={3} className=' sm:mb-2
                text-base sm:text-2xl mt-1'>Graphic T-shirt</Title>
                <Text className='sm:mb-1 text-[12px] sm:text-[16px]'>Size:<Text className='text-gray-700 inline text-[12px] sm:text-[16px]'>XL</Text></Text>
                <Text className='text-[12px] sm:text-[16px]'>Color:<Text className='text-gray-700 inline text-[12px] sm:text-[16px]'>Green</Text></Text>
                <Text className='mt-auto text-lg sm:text-4xl !font-Satoshi-bold'>$150</Text>
            </div>
            <ActionIcon className='absolute top-0 right-0'><IconTrash color='red' className='w-10' /></ActionIcon>
            <Group className="bg-gray-100 px-3 py-2 sm:px-5 sm:py-3 rounded-3xl absolute right-0 bottom-0">
                <ActionIcon
                  unstyled
                  onClick={() => count != 0 && setCount(count - 1)}
                >
                  <IconMinus className="active:scale-90 w-4 sm:w-6" />
                </ActionIcon>
                <Text className="w-3 text-center ">{count}</Text>
                <ActionIcon unstyled onClick={() => setCount(count + 1)}>
                  <IconPlus className="active:scale-90 w-4 sm:w-6" />
                </ActionIcon>
              </Group>
               
            </Group>
        </div>
    )
}
export default Cart