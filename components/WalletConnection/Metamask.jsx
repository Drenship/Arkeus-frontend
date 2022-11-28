import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import React from 'react'
import { substringAddress } from '../../utils/utils'

export default function Metamask() {

    const connectWithMetamask = useMetamask();
    const address = useAddress(); 
    const disconnect = useDisconnect();

    return (
        address 
            ? <button className='px-4 py-2 border-2 border-black rounded-full button-click-effect text-bold' onClick={disconnect}>{substringAddress(address)}</button>
            : <button className='px-4 py-2 border-2 border-black rounded-full button-click-effect text-bold' onClick={connectWithMetamask}>Connect Wallet</button>
    )
}
