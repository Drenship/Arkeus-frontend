import Image from "next/image";
import Link from "next/link"
import { useRef, useState } from "react"
import { useEscapeListener } from "../utils";
import { Metamask, PopupSelectWallet } from './WalletConnection'

const Header = ({}) => {

    const toggleMenuRef = useRef();
    const toggleWalletConnectRef = useRef();
    
    const [openSidebar, setOpenSidebar] = useState(false)
    const [toggleConnectWallet, setToggleConnectWallet] = useState(false)

    //SIDEBAR
    useEscapeListener(toggleMenuRef, () => setOpenSidebar(false))
    //button add popup wallet connect
    useEscapeListener(toggleWalletConnectRef, () => setToggleConnectWallet(false))
    
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
                <Metamask
                    ref={toggleWalletConnectRef}
                    isOpen={toggleConnectWallet}
                    setClose={setToggleConnectWallet}
                />
                <div className="flex p-2 space-x-2 rounded-full cursor-pointer button-click-effect" ref={ toggleMenuRef } onClick={() => setOpenSidebar(!openSidebar)}>
                    <Image 
                        src="/icons/menu.svg" 
                        alt="menu-icon"
                        height={24} 
                        width={24}
                    />
                </div>
            </div>

            { /* Popup Select Wallet for connection */ }
            <PopupSelectWallet
                isOpen={toggleConnectWallet}
                setClose={setToggleConnectWallet}
            />

            { /* Sidebar */ }
            <div className={`absolute top-0 z-50 w-full h-[100vh] bg-white border-l shadow-xl sm:w-[300px] transition duration-20 sidebar ${openSidebar ? 'active' : ''}`}>
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