import Image from "next/image";
import Link from "next/link"
import React, { useEffect, useRef, useState } from 'react'
import { Metamask } from './WalletConnection'
import { sanityClient, urlFor } from '../../sanity';
import { useEscapeListener, useTimeout } from "../../utils";

const SearchResultItem = ({ data, clickevent }) => {
    if(!data) return;

    const clickFunction = () => clickevent ? clickevent() : null;

    return <Link href={`/mint/${ data.slug.current }`} className="flex p-4 space-x-4 rounded-lg shadow-inner hover:shadow-lg" onClick={clickFunction}>
        <div>
            <Image
                width={56}
                height={56}
                src={ urlFor(data.preview).url() }
                alt={ data.title }
                className="rounded-lg"
            />
        </div>
        <div className="">
            <h3 className="font-bold">{ data.title }</h3>
            <span className="text-xs italic text-gray-500">By Drenship</span>
        </div>
    </Link>  
}

export default function Navbar({ toggleMenuRef, openSidebar, setOpenSidebar, toggleWalletConnectRef, toggleConnectWallet, setToggleConnectWallet }) {

    const searchBarMenuRef = useRef();
    const mobileSearchBarRef = useRef();
    
    const [query, setQuery] = useState(null);
    const [searchBarFocus, setSearchBarFocus] = useState(false);
    const [mobileSearchBar, setMobileSearchBars] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    const searchRequest = async () => {
        if(!query || query.length === 0) return;
        const collections = await sanityClient.fetch(`*[_type == "collection"]`)
        console.log(collections)
        setSearchResult(collections)
    }


    // searchbar => call fetch reasult, add delay for saving request
    useTimeout(searchRequest, 500, query)

    // escape research popup
    useEscapeListener(searchBarMenuRef, () => setSearchBarFocus(false))
    useEscapeListener(mobileSearchBarRef, () => setMobileSearchBars(false)) // mobile

    return (
        <div className="grid h-16 grid-cols-3 px-5 py-2 bg-white shadow-md md:px-10"> 
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
            
            { /* navbar navigator and tab */ }
            <div ref={searchBarMenuRef} className="relative items-center justify-center hidden w-full max-w-lg space-x-4 cursor-pointer md:flex">
                <div className="flex items-center justify-center p-1">
                    <Image 
                        src="/icons/search.svg" 
                        alt="menu-icon"
                        height={20} 
                        width={20}
                        className="absolute pb-1 left-50 top-50 md:left-6"
                    />
                </div>
                <div className="hidden w-full md:block">
                    <input 
                        type="text" 
                        placeholder="Collections, nfts, ..."
                        className="w-full pb-1 pl-6 border-b-2 border-gray-300 outline-none focus:border-black" 
                        onKeyUp={ (e) => { 
                            setQuery(e.currentTarget.value.trim());
                            setSearchBarFocus(true);
                            if (e.key === "Enter") {
                                //handleSearch()
                            }
                        } } 
                        onFocus={ (e) => { setSearchBarFocus(true) } }
                        onBlur={ (e) => { setTimeout(()=>{ setSearchBarFocus(false) }, 200) } }
                    />
                </div>


                { /* search result */ }
                {
                    (searchBarFocus && searchResult && query && query.length > 0) && (
                        <div className="absolute right-0 flex flex-col w-full h-10 mt-16">
                            <div className="py-4 mt-1 bg-white rounded-b-lg shadow-lg">
                                {/* reseult start */}
                                {
                                    searchResult.map((data, key) => <SearchResultItem 
                                        data={ data }
                                        key={ key }
                                    />)
                                }
                            </div>
                        </div>
                    )
                }

            </div>

            { /* navbar for mobile */ }
            <div ref={mobileSearchBarRef} className="flex items-center justify-center w-auto h-full md:hidden">
                <button 
                    className="p-3 border border-gray-700 rounded-full button-click-effect"
                    onClick={() => setMobileSearchBars(true)}
                >
                    <Image 
                        src="/icons/search.svg" 
                        alt="menu-icon"
                        height={20} 
                        width={20}
                        className=""
                    />
                </button>
                { /* popup */ }
                {
                    mobileSearchBar && (
                        <div className="absolute top-16 left-0 w-screen h-[calc(100vh-64px)] bg-white z-55 border-t-2 border-black px-6 flex flex-col justify-start">
                            { /* searchbar */ }
                            <div className="mt-5">
                                <input 
                                    type="text" 
                                    placeholder="Collections, nfts, ..."
                                    className="w-full pl-6 border-b-2 border-gray-300 outline-none focus:border-black" 
                                    onKeyUp={ (e) => { 
                                        setQuery(e.currentTarget.value.trim());
                                        setSearchBarFocus(true);
                                        if (e.key === "Enter") {
                                            //handleSearch()
                                        }
                                    } } 
                                    onFocus={ () => { setSearchBarFocus(true) } }
                                    onBlur={ () => { setTimeout(()=>{ setSearchBarFocus(false) }, 200) } }
                                />
                            </div>

                            { /* result */ }
                            {
                                searchResult && (
                                    <div className="flex flex-col w-full mt-5">
                                        <div className="py-4 mt-1 bg-white rounded-b-lg shadow-lg">
                                            {/* reseult start */}
                                            {
                                                searchResult.map((data, key) => <SearchResultItem 
                                                    data={ data }
                                                    key={ key }
                                                    clickevent={() => setMobileSearchBars(false)}
                                                />)
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }

            </div>
            
            { /* right menu */ }
            <div className="flex items-center justify-end space-x-4">
                <Metamask
                    isRef={toggleWalletConnectRef}
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
        </div>
    )
}
