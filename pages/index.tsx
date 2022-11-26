import type { NextPage } from 'next'
import { World } from '../components/sections';

const Home: NextPage = () => {
  return (
    <div className='overflow-hidden bg-primary-black'>
      <World />
    </div>
  )
}

export default Home
