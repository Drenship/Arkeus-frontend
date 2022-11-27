import { useAddress, useContract } from '@thirdweb-dev/react';
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react';

// components
import { CounterAnimation, DotJumpLoader, MintButton, SubTitleText, TitleText } from '../../components/Custom';
import MotionTransition from '../../components/FramerMotion/MotionTransition';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../utils/typing';
import { useInterval } from '../../utils';


interface Props {
    collection: Collection
}

const Mint: NextPage<Props> = ( { collection }) => {

    const [claimedSupply, setClaimedSupply] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { contract, isLoading: contractLoading, error: contractError } = useContract(collection.address, "nft-drop");

    useEffect(() => {
        if(!contract) return;

        const fetchNFTDrop = async () => {
            let claimedNFTCount = await contract.totalClaimedSupply();
            let unclaimedNFTCount = await contract.totalUnclaimedSupply();

            setClaimedSupply(Number(claimedNFTCount))
            setTotalSupply(Number(claimedNFTCount)+Number(unclaimedNFTCount))
        }

        fetchNFTDrop()

    }, [contract])

    //useInterval(() => setClaimedSupply(1+claimedSupply), 1000);

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
                                src={urlFor(collection.preview).url()}
                                alt="mad panda"
                                className='object-cover w-44 rounded-xl lg:h-96 lg:w-72'
                            />
                        </div>
                        <div className='p-5 space-y-2 text-center'>
                            <TitleText title={ collection.nftCollectionName } textStyles="text-white" />
                            <h2 className='text-xl text-gray-200'>{ collection.description }</h2>
                        </div>
                    </div>
                </MotionTransition>  
                
                {/* right */}    
                <MotionTransition classname="lg:col-span-7">
                    <div className='flex flex-col items-center justify-between h-full px-5 py-10 space-y-5'>
                        <TitleText title={"Mint my own nft"} textStyles="text-black" />
                        <div className='flex flex-col items-center justify-between'>
                            <img 
                                src={ urlFor(collection.mainImage).url() }
                                alt="mad panda"
                                className='object-cover w-[75%] rounded-xl select-none'
                            />
                            <SubTitleText title={ collection.title } textStyles="text-black" />
                            {
                                contractLoading 
                                    ? <DotJumpLoader />
                                    : contractError
                                        ? "loading error"
                                        : (
                                            <div className='flex items-center justify-center space-x-1 text-green-600'>
                                                <CounterAnimation value={claimedSupply} hideDecimal={true} /> 
                                                <span>/</span> 
                                                <CounterAnimation value={totalSupply} hideDecimal={true} /> 
                                                <p>Nft's minted</p>
                                            </div>
                                        )
                            }
                        </div>
                        <MintButton 
                            title="Mint my mad panda for 0.1 eth"
                            isLoading={isLoading} 
                            success={false}
                            error={false}
                            disabled={isLoading || claimedSupply === totalSupply || contractLoading || contractError || !address }
                            onClick={() => setIsLoading(!isLoading)}
                        />
                    </div>
                </MotionTransition>

            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const query = `*[_type == "collection" && slug.current == $slug][0]`;
    const collection = await sanityClient.fetch(query, {
        slug: params?.slug
    });
    
    if(!collection) return { notFound: true }
  
    return {
        props : {
            collection: collection
        }
    }
  }

export default Mint