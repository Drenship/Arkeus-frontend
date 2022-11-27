import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import React from 'react'
import { substringAddress } from '../../utils/utils'

export default function Metamask() {

    const connectWithMetamask = useMetamask();
    const address = useAddress(); 
    const disconnect = useDisconnect();

    return (
        address 
            ? <button className='text-white rounded-full button-click-effect bg-cyan-500' onClick={disconnect}>{substringAddress(address)}</button>
            : <button className='text-white rounded-full button-click-effect bg-cyan-500' onClick={connectWithMetamask}>Connect Wallet</button>
    )
}
