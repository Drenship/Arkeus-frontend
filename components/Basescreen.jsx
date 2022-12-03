import React from 'react'
import { Header } from './Header'

export default function BaseScreen({ children }) {
    return (
        <div className='relative h-screen overflow-x-hidden overflow-y-scroll'>

            { /* Header */ }
            <Header />

            { /* Mainsite */ }
            <main>
                { children  }
            </main>

            { /* Footer */ }
            { /* <Footer /> */ }
        </div>
    )
}
