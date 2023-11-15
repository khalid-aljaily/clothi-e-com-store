import React ,{useEffect} from 'react';
import NewArrivalsCard from './NewArrivalsCard';
import { Button } from '@mantine/core';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

function Section({title,sortID}) {
  
  const navigate = useNavigate()
  const options = {
    method: 'GET',
    url: 'https://kohls.p.rapidapi.com/products/list',
    params: {
      limit: '4',
      dimensionValueID: 'Department:Clothing',
      sortID
    },
    headers: {
      'X-RapidAPI-Key': '71b967bd13mshbc4acad8ad7d6dbp1ece9fjsnc65d97d6dea7',
      'X-RapidAPI-Host': 'kohls.p.rapidapi.com'
    }
  };

  const { data,refetch } = useQuery({
    queryKey: [title],
    queryFn: async () => {
      // const response = await axios.request(options);
      // return response.data.payload
    }
    ,staleTime:'infinity'
    ,enabled:false
  });
  useEffect(()=>{refetch()},[])
  
console.log(data)
  return (
    <div className='py-16 px-5 md:px-[70px]'>
      <h2 className='text-center text-[32px] md:text-[48px] mb-8 md:mb-14'>{title}</h2>
      <div className='flex justify-between gap-4 overflow-auto snap-x snap-mandatory'>
        {data?.products.map((product) => (
          <div key={product.webID} className='snap-center'>
            <NewArrivalsCard product = {product} />
          </div>
        ))}
      </div>
      {title === "New Arrivals"||title==="Best Sellers"?
        <Button
        variant='outline'
        classNames={{ inner: 'font-Satoshi-medium text-base' }}
        className='border-gray-300 mx-auto block mt-10'
        w={218}
        h={52}
        radius={50}
        
      >
        <Link to={( '/shop?'+'CN=Department:Clothing'
  )} state={sortID}>
        View All
        </Link>
      </Button>:null}
    </div>
  );
}

export default Section;
// 