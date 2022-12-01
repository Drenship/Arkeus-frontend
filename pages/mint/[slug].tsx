import { useAddress, useContract } from '@thirdweb-dev/react';
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react';

// components
import { ButtonLoader, CounterAnimation, DotJumpLoader, MintButton, SubTitleText, TitleText } from '../../components/Custom';
import MotionTransition from '../../components/FramerMotion/MotionTransition';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../utils/typing';
import { useInterval } from '../../utils';
import Image from 'next/image';


interface Props {
    collection: Collection
}

const Mint: NextPage<Props> = ( { collection }) => {

    const [priceInEth, setPriceInEth] = useState<string>('???');
    const [claimConditions, setClaimConditions] = useState<any>({});
    const [claimedSupply, setClaimedSupply] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const address = useAddress(); 
    const { contract, isLoading: contractLoading, error: contractError } = useContract(collection.address, "nft-drop");

    const fetchNFTDrop = async () => {
        if(!contract) return;
        let claimedNFTCount = await contract.totalClaimedSupply();
        let unclaimedNFTCount = await contract.totalUnclaimedSupply();
        setClaimedSupply(Number(claimedNFTCount))
        setTotalSupply(Number(claimedNFTCount)+Number(unclaimedNFTCount))
    }

    const fetchClaimConditions = async () => {
        if(!contract) return;
        const claimConditions = await contract.claimConditions.getAll();
        setClaimConditions(claimConditions[0])
        setPriceInEth(claimConditions?.[0].currencyMetadata?.displayValue)
    }

    const mintNFT = async () => {
        if(!contract || !address) return;
        setIsLoading(true) // add loader
        const quantity = 1; // how many unique NFTs you want to claim
        contract.claimTo(address, quantity).then(async (tx) => {
            const receipt = tx[0].receipt; // the transaction receipt
            const claimedTokenId = tx[0].id; // the id of the NFT claimed
            const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata
            console.log(receipt, claimedTokenId, claimedNFT)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false) // remove loader
        })
    }

    useEffect(() => {
        fetchNFTDrop()
        fetchClaimConditions()
    }, [contract])

    useInterval(fetchNFTDrop, 30000); // 30s update

        
    return (
        <div>
            <Header />
            <div className='flex flex-col h-[calc(100vh-64px)] grid-cols-10 lg:grid'>
                {/* left */}
                <MotionTransition classname="px-5 py-5 bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-3">
                    <div className='flex flex-col items-center justify-center py-2 lg:min-h-full'>
                        <div className='p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
                            <Image 
                                width={288}
                                height={384}
                                src={urlFor(collection.preview).url()}
                                alt="mad panda"
                                className='object-cover w-44 rounded-xl lg:h-96 lg:w-72'
                            />
                        </div>
                        <div className='p-5 space-y-2 text-center'>
                            <TitleText title={ collection.nftCollectionName } textStyles="text-white" />
                            <h2 className='text-left text-gray-200 text-md'>{ collection.description }</h2>
                        </div>
                    </div>
                </MotionTransition>  
                
                {/* right */}    
                <MotionTransition classname="lg:col-span-7">
                    <div className='flex flex-col items-center justify-between h-full px-5 py-10 space-y-5'>
                        <TitleText title={"Mint my own nft"} textStyles="text-black" />
                        <div className='flex flex-col items-center justify-between'>
                            <Image 
                                width={978}
                                height={326}
                                src={ urlFor(collection.mainImage).url() }
                                alt={ collection.title }
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
                            title={
                                contractLoading
                                    ? <ButtonLoader />
                                    : claimedSupply === totalSupply && totalSupply !== 0
                                        ? "SOLD OUT"  
                                        : !address
                                            ? "Sign in to mint"
                                            : `Mint NFT for ${priceInEth} ETH`
                            }
                            isLoading={isLoading} 
                            success={false}
                            error={false}
                            disabled={isLoading || claimedSupply === totalSupply || contractLoading || contractError || !address }
                            onClick={() => mintNFT()}
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