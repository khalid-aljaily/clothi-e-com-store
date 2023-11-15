import Hero from '../components/Hero'
import { Divider } from '@mantine/core'
import ShopByStyle from '../components/ShopByStyle'
import Testimonials from '../components/Testimonials'
import Section from '../components/Section'


function Home() {
  return (
    <div>
      <Hero/>
      <Section title="New Arrivals" sortID={'2'}/> 
      <Divider/>
      <Section title="Best Sellers" sortID={'3'}/> 
      <ShopByStyle/>
      <Testimonials/>
    </div>
  )
}

export default Home