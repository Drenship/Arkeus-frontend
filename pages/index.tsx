import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import Header from '../components/Header';
import { HomeMint, HomeWorld } from '../components/sections';
import { sanityClient, urlFor } from '../sanity';
import { Collection } from '../utils/typing';

interface Props {
  collections: Collection[]
}

const Home: NextPage<Props> = ({ collections }) => {

  return (
    <div className='overflow-hidden bg-primary-black'>
      <Header />
      <HomeMint collections={collections} />
      <HomeWorld />
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