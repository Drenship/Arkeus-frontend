import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import Image from 'next/image';
import React from 'react'
import { substringAddress } from '../../utils/utils'

export default function Metamask({ ref, isOpen, setClose }) {

    const address = useAddress(); 
    const disconnect = useDisconnect();

    return (
        address 
            ? <button 
                onClick={disconnect}
                className='flex items-center justify-end px-4 py-2 rounded-full button-click-effect text-bold lg:space-x-2 lg:border-2 lg:border-black'
            >
                <Image 
                    src="/icons/logout.svg"
                    alt="menu-icon"
                    height={24} 
                    width={24}
                />
                <span className='hidden lg:block'>{ substringAddress(address) }</span>
            </button>
            : <button
                ref={ref}  
                onClick={()=> setClose(!isOpen)}  
                className='flex items-center justify-end px-4 py-2 rounded-full button-click-effect text-bold lg:space-x-2 lg:border-2 lg:border-black'
            > 
                <Image 
                    src="/icons/wallet.svg" 
                    alt="menu-icon"
                    height={24} 
                    width={24}
                />
                <span className='hidden lg:block'>Connect Wallet</span>
                
            </button>
    )
}
