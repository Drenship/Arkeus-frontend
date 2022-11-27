import type { NextPage } from 'next'
import Link from 'next/link';

// components
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
        slug: String
    }
}

const Location: NextPage<Props> = ({ location }) => {


    return (
        <MotionTransition classname="relative z-10 px-6 py-12 sm:p-16 xs:p-8">
            <TypingText title={location.title} textStyles="text-center" />
        </MotionTransition>
    )
}

export async function getServerSideProps(context: Props) {

    const { query: { slug } } = context;

    const searchResults = await fetch('https://www.jsonkeeper.com/b/5NPS')
        .then((res) => res.json())
        .catch((err) => {}) 
  
    const filterLocation = searchResults.filter((s: Props['location']) => s.title === slug)[0] || searchResults[0] || {}

    return {
        props : {
            location: filterLocation
        }
    }
}

export default Location