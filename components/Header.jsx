import Link from "next/link"
import { Metamask } from './WalletConnection'

const Header = ({}) => (
    <header className="sticky top-0 z-50 grid h-16 grid-cols-3 px-5 py-2 bg-white shadow-md md:px-10">
        
        <div className="flex items-start justify-center h-full space-x-2">
            <Link href={"/"}  className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>Back home</Link>
            <Link href={"/location/dsfgv"}  className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>location</Link>
            <Link href={"/mint/dsfgv"}  className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>mint</Link>
        </div>
        
        <div></div>

        <Metamask />

    </header>
)

export default Header