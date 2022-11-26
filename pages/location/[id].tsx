import type { NextPage } from 'next'
import Link from 'next/link';

import BaseScreen from '../../components/BaseScreen';
import { TypingText } from '../../components/Custom';
import MotionTransition from '../../components/FramerMotion/MotionTransition';

interface Props {
    location: {
        img: '',
        title: String,
        description: String,
        star: number,
    }
    query: {
        id: String
    }
}

const Location: NextPage<Props> = ({ location }) => {

    return (
        <BaseScreen title={location.title} headerPlaceholder=''>
            <MotionTransition classname="relative z-10 px-6 py-12 sm:p-16 xs:p-8">
                <Link href={"/"}  className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>Back home</Link>
                <TypingText title={location.title} textStyles="text-center" />
            </MotionTransition>
        </BaseScreen>
    )
}

export async function getServerSideProps(context: Props) {

    const { query: { id } } = context

    const searchResults = await fetch('https://www.jsonkeeper.com/b/5NPS')
        .then((res) => res.json())
        .catch((err) => {}) 
  
    const filterLocation = searchResults.filter((s: Props['location']) => s.title === id)[0] || searchResults[0] || {}

    return {
        props : {
            location: filterLocation
        }
    }
  }

export default Location