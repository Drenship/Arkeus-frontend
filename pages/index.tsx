import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import Header from '../components/Header';
import { World } from '../components/sections';
import { sanityClient, urlFor } from '../sanity';
import { Collection } from '../utils/typing';

interface Props {
  collections: Collection[]
}

const Home: NextPage<Props> = ({ collections }) => {

  return (
    <div className='overflow-hidden bg-primary-black'>
      <Header />
      <div className='gap-6 p-2 px-8 mx-auto grid-default max-w-7xl sm:px-16'>
        {
          collections.map(collection => (
            <Link href={`/mint/${collection.slug.current}`} className='w-full bg-white cursor-pointer rounded-xl button-click-effect max-w-[360px] mx-auto'>
              <img 
                className='object-cover w-full select-none rounded-xl'
                src={urlFor(collection.preview).url()} 
                alt="" 
              />
              <div className='p-4'>
                <h2>{ collection.title }</h2>
                <p>{ collection.description }</p>
              </div>
            </Link>
          ))
        }
      </div>
      <World />
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {

  const query = `*[_type == "collection"]`;
  const collections = await sanityClient.fetch(query)

  return {
    props : {
      collections: collections
    }
  }
}

export default Home