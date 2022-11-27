import type { NextPage } from 'next'
import Header from '../components/Header';
import { World } from '../components/sections';

const Home: NextPage = () => {
  return (
    <div className='overflow-hidden bg-primary-black'>
      <Header />
      <World />
    </div>
  )
}

export default Home
