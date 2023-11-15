import { Skeleton, Title } from '@mantine/core'
import React, { useEffect, useRef } from 'react'

function ProductDetailsTab({details,brandDetails,brand}) {
  console.log(brand)
  const detail = useRef()
  const brandRef = useRef()
  const brandTitle = useRef()
  useEffect(()=>{if(details) {detail.current.innerHTML = details;brandRef.current.innerHTML = brandDetails;}},[details])
  if(!details)return<DetailsSkeleton/>;
  return (
    <>
        <Title order={2} ref={brandTitle} className=' mt-8 !font-Satoshi-bold text-2xl md:text-3xl '>About The Product</Title>
    <div ref={detail} className='detalils-container px-5 md:px-[70px] '>
    </div>
      
        <Title order={2} ref={brandTitle} className='px-5 md:px-[70px]  !font-Satoshi-bold text-2xl md:text-3xl mt-6 mb-4'>About The brand</Title>
        <Title order={3} ref={brandTitle} className='px-5 md:px-[70px] font-Satoshi-bold '>{brand}</Title>
      <div ref={brandRef} className='About-brand-container px-5 md:px-[70px] mt-5'>
      </div>
    </>
  )
}

function DetailsSkeleton() {
  return (
    
    <div  className='px-5 md:px-[70px]'>
    <Skeleton height={35} width={400} style={{ marginBottom: '1rem', borderRadius: '8px',marginTop:'2rem' }} />
    <Skeleton height={20} width={300} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={500} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={400} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={200} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={600} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={400} style={{ marginBottom: '1rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={800} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={600} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={500} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={300} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={35} width={400} style={{ marginBlock: '2rem', borderRadius: '4px' }} />
    <Skeleton height={25} width={700} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={800} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={300} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={600} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={400}  style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={400} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={700} style={{ marginBottom: '0.5rem', borderRadius: '4px' }} />
    <Skeleton height={20} width={500} style={{ marginBottom: '1rem', borderRadius: '4px' }} />
  </div>
    
  );
}



export default ProductDetailsTab