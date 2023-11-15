import { useState } from 'react'
import { Anchor, HoverCard, Menu } from '@mantine/core'


import { menGetInspiredUnwantedCats } from './header'
import { myKidsCats } from './header'
import { myWomenCats } from './header'
import { myMenCats } from './header'
import { myKidsUnwantedCats } from './header'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
function ShopComponent({ catigory }) {
  let withoutSubs = [];
  const location = useLocation()  
  const [filter,setFilter] = useState()
  console.log(filter)
  return (
    <div className='relative flex flex-row-reverse justify-end gap-16 ml-10'>
      <div>
        {catigory?.categories
          .filter((mainCat) => {
            if (catigory.name === "Men") {
              return myMenCats.includes(mainCat.name)
            } else if (catigory.name === "Women") {
              return myWomenCats.includes(mainCat.name)
            } else if (catigory.name === "Kids & Baby") {
              return myKidsCats.includes(mainCat.name)
            }
          })
          .map((subCat) => {
            if (subCat.categories && subCat.categories.length !== 0) {
              return (
                <HoverCard radius={'sm'} position='right-start' key={subCat.name} >  
                  <HoverCard.Target>
                    <Link onClick={()=>{setFilter(location)}} to={`/shop?${subCat?.seoURL?.match(/[^/]*\?(.*)/)[1]}`} className='block w-40 hover:underline'>{subCat.name}</Link>
                  </HoverCard.Target>
                  <HoverCard.Dropdown
                    classNames={{ dropdown: 'w-full p-3 min-h-[100px] min-w-[250px] w-full border-none shadow-md ' }}
                  >
                    {subCat?.categories
                      .filter((cat) => {
                        if (subCat.name === 'Get Inspired' && catigory.name === 'Men') {
                          return !menGetInspiredUnwantedCats.includes(cat.name)
                        } else if (subCat.name === 'Shop By Category' && catigory.name === 'Kids & Baby') {
                          return !myKidsUnwantedCats.includes(cat.name)
                        }
                       else return true
                      })
                      .map((subCat) => (
                        <Link  onClick={()=>{console.log(location)}}  to={`/shop?${subCat?.seoURL?.match(/[^/]*\?(.*)/)[1]}`} className='block hover:underline' key={subCat.name}>{subCat.name}</Link>
                      ))}
                  </HoverCard.Dropdown>
                </HoverCard>
              );
            } else {
              withoutSubs.push(subCat);
            }
          })}
      </div>
      <div>{withoutSubs.map((catigo) => <Link  onClick={()=>{console.log(location)}} to={`/shop?${catigo?.seoURL?.match(/[^/]*\?(.*)/)[1]}`} className='block hover:underline' key={catigo.name}>{catigo.name}</Link>)}</div>
    </div>
  );
}

export default ShopComponent;
