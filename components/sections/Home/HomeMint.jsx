import { motion } from 'framer-motion';

import { urlFor } from '../../../sanity';
import { TitleText, TypingText } from '../../Custom';
import { fadeIn, staggerContainer } from '../../../utils/motion';
import Link from 'next/link';

const HomeMint = ({ collections }) => (

    <section className="relative z-10 paddings">
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative z-10 px-6 py-12 sm:p-16 xs:p-8"
        >
            <motion.div className="2xl:max-w-[1280px] w-full mx-auto flex flex-col">

                <TypingText 
                    title="| Last mint" 
                    textStyles="text-center" 
                />
                <TitleText
                    title="Invest in real estate worldwide and collect monthly rent"
                    textStyles="text-center"
                />

                <motion.div
                    variants={fadeIn('up', 'tween', 0.3, 1)}
                    className="relative mt-[68px] flex w-full"
                >

                    <div className='gap-6 p-2 px-8 mx-auto grid-default max-w-7xl sm:px-16'>
                        {
                            collections.map(collection => (
                                <Link href={`/mint/${collection.slug.current}`} className='w-full bg-white cursor-pointer rounded-xl button-click-effect max-w-[360px] mx-auto'>
                                    <img 
                                        className='object-cover w-full select-none rounded-xl'
                                        src={urlFor(collection.preview).url()} 
                                        alt="" 
                                    />
                                    <div className='p-4'>
                                        <h2>{ collection.title }</h2>
                                        <p>{ collection.description }</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                
                </motion.div>
            </motion.div>
        </motion.div>
    </section>
);

export default HomeMint;