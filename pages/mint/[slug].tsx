import { useAddress } from '@thirdweb-dev/react';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

// components
import { CounterAnimation, MintButton, SubTitleText, TitleText } from '../../components/Custom';
import MotionTransition from '../../components/FramerMotion/MotionTransition';
import Header from '../../components/Header';
import { useInterval } from '../../utils';


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

const Mint: NextPage<Props> = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [minted, setMinted] = useState(0);

    useInterval(() => setMinted(1+minted), 1000);

    const address = useAddress(); 
        
    return (
        <div>
            <Header />
            <div className='flex flex-col h-[calc(100vh-64px)] grid-cols-10 lg:grid'>
                {/* left */}
                <MotionTransition classname="px-5 py-5 bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-3">
                    <div className='flex flex-col items-center justify-center py-2 lg:min-h-full'>
                        <div className='p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
                            <img 
                                src="/nfts/mad-panda.png"
                                alt="mad panda"
                                className='object-cover w-44 rounded-xl lg:h-96 lg:w-72'
                            />
                        </div>
                        <div className='p-5 space-y-2 text-center'>
                            <TitleText title={"MAD PANDA"} textStyles="text-white" />
                            <h2 className='text-xl text-gray-200'>A collection of MAD PANDA who live & breathe React !</h2>
                        </div>
                    </div>
                </MotionTransition>  
                
                {/* right */}    
                <MotionTransition classname="lg:col-span-7">
                    <div className='flex flex-col items-center justify-between h-full px-5 py-10 space-y-5'>
                        <TitleText title={"Mint my own nft"} textStyles="text-black" />
                        <div className='flex flex-col items-center justify-between'>
                            <img 
                                src="/nfts/banner-mad-panda.png"
                                alt="mad panda"
                                className='object-cover w-[75%] rounded-xl select-none'
                            />
                            <SubTitleText title={"Mint my own nft"} textStyles="text-black" />
                        </div>
                        <div>
                           <CounterAnimation value={minted} hideDecimal={true} /> / 1000
                        </div>
                        <MintButton 
                            title="Mint my mad panda for 0.1 eth"
                            isLoading={isLoading} 
                            success={false}
                            error={false}
                            onClick={() => setIsLoading(!isLoading)}
                        />
                    </div>

                </MotionTransition>
            </div>
        
        </div>
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

export default Mint