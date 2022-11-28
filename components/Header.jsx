import Image from "next/image";
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { Metamask } from './WalletConnection'

const Header = ({}) => {

    const toggleMenuRef = useRef();
    const [openSidebar, setOpenSidebar] = useState(false)


    // sidebar open / close
    const _toggleSidebar = () => {
        const toggle = openSidebar ? false : true
        setOpenSidebar(toggle)
    }

    // sidebar click event close
    const clickListener = useCallback(e => {
        if (toggleMenuRef.current && !toggleMenuRef.current.contains(e.target)) setOpenSidebar(false)
    }, [toggleMenuRef])

    // sidebar keyboard event close
    const escapeListener = useCallback(e => {
        if (e.key === 'Escape') {
            setOpenSidebar(false)
        }
    }, [])

    // sidebar init event
    useEffect(() => {
        if(toggleMenuRef){
            document.addEventListener('click', clickListener)
            document.addEventListener('keyup', escapeListener)
        }
        return () => {
            document.removeEventListener('click', clickListener)
            document.removeEventListener('keyup', escapeListener)
        }
    }, [clickListener, escapeListener, toggleMenuRef])

    return (
        <header className="sticky top-0 z-50 grid h-16 grid-cols-3 px-5 py-2 bg-white shadow-md md:px-10">
            
            { /* left logo */ }
            <div className="flex items-center justify-start space-x-4">
                <Link href={"/"}  className='rounded-full max-w-[80px] flex justify-start space-x-1'>
                    <Image 
                        src="/icons/logo.svg" 
                        alt="menu-icon"
                        height={36} 
                        width={24}
                    />
                    <h3 className="text-xl font-black uppercase">Arkeus</h3>
                </Link>
            </div>
            
            { /* navbar */ }
            <div></div>
            
            { /* right menu */ }
            <div className="flex items-center justify-end space-x-4">
                <Metamask />
                <div className="flex p-2 space-x-2 rounded-full cursor-pointer" ref={ toggleMenuRef } onClick={_toggleSidebar}>
                    <Image 
                        src="/icons/menu.svg" 
                        alt="menu-icon"
                        height={24} 
                        width={24}
                    />
                </div>
            </div>

            { /* Sidebar */ }
            <div className={`absolute top-0 z-50 w-full h-[100vh] bg-white border-l shadow-xl sm:w-[300px] transition duration-20 sidebar transition-all ${openSidebar ? 'active' : ''}`}>
                <h3 className="p-4 text-xl font-bold">Menu</h3>
                <Link href="/">
                    <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
                        <Image 
                            src="/icons/home.svg" 
                            alt="menu-icon"
                            height={24} 
                            width={24}
                        /> 
                        <span>Accueil</span>
                    </div>
                </Link>
                <Link href="/Marketplace">
                    <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
                        <Image 
                            src="/icons/cube.svg" 
                            alt="menu-icon"
                            height={24} 
                            width={24}
                        /> 
                        <span>Marketplace</span>
                    </div>
                </Link>
                <Link href="/next/imo">
                    <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
                        <Image 
                            src="/icons/ticket.svg" 
                            alt="menu-icon"
                            height={24} 
                            width={24}
                        /> 
                        <span>Next IMO</span>
                    </div>
                </Link>
                <Link href="/user/profil">
                    <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
                        <Image 
                            src="/icons/user.svg" 
                            alt="menu-icon"
                            height={24} 
                            width={24}
                        /> 
                        <span>Profil</span>
                    </div>
                </Link>
            </div>

        </header>
    )
}

export default Header