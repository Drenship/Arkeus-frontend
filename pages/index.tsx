import type { GetServerSideProps, NextPage } from 'next'
import BaseScreen from '../components/BaseScreen-old';
import { HomeMint, HomeWorld } from '../components/sections';
import { sanityClient } from '../sanity';
import { Collection } from '../utils/typing';

interface Props {
  collections: Collection[]
}

const Home: NextPage<Props> = ({ collections }) => {

  return (
    <BaseScreen>
      <div className='bg-primary-black'>
        <HomeMint collections={collections} />
        <HomeWorld />
      </div>
    </BaseScreen>
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