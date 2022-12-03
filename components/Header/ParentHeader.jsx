import { useRef, useState } from "react"
import { useEscapeListener } from "../../utils";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { PopupSelectWallet } from './WalletConnection'

const ParentHeader = ({}) => {

    const toggleMenuRef = useRef();
    const toggleWalletConnectRef = useRef();
    
    const [openSidebar, setOpenSidebar] = useState(false)
    const [toggleConnectWallet, setToggleConnectWallet] = useState(false)
    
    //SIDEBAR
    useEscapeListener(toggleMenuRef, () => setOpenSidebar(false))
    //button add popup wallet connect
    useEscapeListener(toggleWalletConnectRef, () => setToggleConnectWallet(false))
    
    return (
        <header className="sticky top-0 z-50">
            
            { /* Navbar */ }
            <Navbar 
                toggleMenuRef={toggleMenuRef}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}

                toggleWalletConnectRef={toggleWalletConnectRef}
                toggleConnectWallet={toggleConnectWallet}
                setToggleConnectWallet={setToggleConnectWallet}
            />

            { /* Sidebar */ }
            <Sidebar openSidebar={openSidebar} />

            { /* Popup Select Wallet for connection */ }
            <PopupSelectWallet
                isOpen={toggleConnectWallet}
                setClose={setToggleConnectWallet}
            />

        </header>
    )
}

export default ParentHeader