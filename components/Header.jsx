import Link from "next/link"


const Header = ({}) => (
    <header className="sticky top-0 z-50 grid h-16 grid-cols-3 px-5 py-5 bg-white shadow-md md:px-10">
        
        <Link href={"/"}  className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>Back home</Link>
        <Link href={"/location/dsfgv"}  className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>location</Link>
        <Link href={"/mint/dsfgv"}  className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>mint</Link>

    </header>
)

export default Header