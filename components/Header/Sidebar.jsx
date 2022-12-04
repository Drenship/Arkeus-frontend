import React from 'react';
import Link from "next/link"
import Image from "next/image";

const MenuItem = ({ href, image, title }) => (
    <Link href={ href }>
        <div className="flex p-4 space-x-2 font-semibold border-t border-b cursor-pointer button-click-effect">
            <Image 
                src={ image }
                alt="menu-icon"
                height={24} 
                width={24}
            /> 
            <span>{ title }</span>
        </div>
    </Link>
)

export default function Sidebar({ openSidebar }) {
    
    return (
        <div className={`absolute top-0 z-50 w-full h-[100vh] bg-white border-l shadow-xl sm:w-[300px] transition duration-20 sidebar ${openSidebar ? 'active' : ''}`}>
            <h3 className="p-4 text-xl font-bold">Menu</h3>
            <MenuItem 
                href="/" 
                image="/icons/home.svg" 
                title="Accueil"
            />
            <MenuItem 
                href="/canlendar" 
                image="/icons/calendar.svg" 
                title="Canlendar"
            />
            <MenuItem 
                href="/marketplace" 
                image="/icons/cube.svg" 
                title="Marketplace"
            />
            <MenuItem 
                href="/lottery" 
                image="/icons/ticket.svg" 
                title="Lottery"
            />
            <MenuItem 
                href="/profil" 
                image="/icons/user.svg" 
                title="Profil"
            />
            <MenuItem 
                href="/analytics" 
                image="/icons/chart-pie.svg" 
                title="Analytics"
            />
        </div>
    );
}
