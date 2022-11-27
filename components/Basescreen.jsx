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
            <main>
                { children  }
            </main>

            { /* Footer */ }
            { /* <Footer /> */ }
        </div>
    )
}

export default BaseScreen;