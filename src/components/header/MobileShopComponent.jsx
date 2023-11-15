import { Accordion } from '@mantine/core'
import { menGetInspiredUnwantedCats } from '../../utils/catigories'
import { myKidsCats } from '../../utils/catigories'
import { myWomenCats } from '../../utils/catigories'
import { myMenCats } from '../../utils/catigories'
import { myKidsUnwantedCats } from '../../utils/catigories'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function MobileShopComponent({ catigory }) {
  let withoutSubs = [];
  const location = useLocation()  
  return (
    <div className='relative flex flex-col justify-end gap-2 mt-3'>
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
                <Accordion radius={'sm'}  key={subCat.name} >  
                <Accordion.Item value={subCat.name}  className='border-b-0'>
                
                  <Accordion.Control className='h-8 ' classNames={{control:'data-[active=true]:bg-gray-50'}}>
                    <Link onClick={()=>{setFilter(location)}} to={`/shop?${subCat?.seoURL?.match(/[^/]*\?(.*)/)[1]}`} className='block w-40 hover:underline'>{subCat.name}</Link>
                  </Accordion.Control>
                  <Accordion.Panel className='bg-gray-50'>
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
                        <Link  onClick={()=>{console.log(location)}}  to={`/shop?${subCat?.seoURL?.match(/[^/]*\?(.*)/)[1]}`} className='block hover:underline text-[15px]' key={subCat.name}>{subCat.name}</Link>
                      ))}
                  </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              );
            } else {
              withoutSubs.push(subCat);
            }
          })}
      </div>
      <div className='px-4 space-y-2'>{withoutSubs.map((catigo) => <Link  onClick={()=>{console.log(location)}} to={`/shop?${catigo?.seoURL?.match(/[^/]*\?(.*)/)[1]}`} className='block hover:underline' key={catigo.name}>{catigo.name}</Link>)}</div>
    </div>
  );
}

export default MobileShopComponent;
