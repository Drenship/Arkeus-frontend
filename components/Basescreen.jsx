import Head from 'next/head'
// components
import Header from './Header'
//import Footer from './Footer'


const BaseScreen = ({ title, headerPlaceholder, children }) => {

    const browserTitle = title ? `${title} - Arkeus` : "Arkeus";

    return (
        <div className='overflow-hidden bg-primary-black'>
            <Head>
                <title>{browserTitle}</title>
            </Head>

            { /* Header */ }
            <Header placeholder={headerPlaceholder || ''} />

            { /* Mainsite */ }
            <main className='px-8 mx-auto max-w-7xl sm:px-16'>
                { children  }
            </main>

            { /* Footer */ }
            { /* <Footer /> */ }
        </div>
    )
}

export default BaseScreen