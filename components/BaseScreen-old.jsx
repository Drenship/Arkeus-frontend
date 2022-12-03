import { Header } from './Header/index';
// components

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