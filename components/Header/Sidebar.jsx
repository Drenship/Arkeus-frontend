import React from 'react';
import Link from "next/link"
import Image from "next/image";

export default function Sidebar({ openSidebar }) {
    
    return (
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
            <Link href="/canlendar">
                <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
                    <Image 
                        src="/icons/calendar.svg" 
                        alt="menu-icon"
                        height={24} 
                        width={24}
                    /> 
                    <span>Canlendar</span>
                </div>
            </Link>
            <Link href="/marketplace">
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
            <Link href="/lottery">
                <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
                    <Image 
                        src="/icons/ticket.svg" 
                        alt="menu-icon"
                        height={24} 
                        width={24}
                    /> 
                    <span>Lottery</span>
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
            <Link href="/analytics">
                <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
                    <Image 
                        src="/icons/chart-pie.svg" 
                        alt="menu-icon"
                        height={24} 
                        width={24}
                    /> 
                    <span>Analytics</span>
                </div>
            </Link>
        </div>
    );
}
