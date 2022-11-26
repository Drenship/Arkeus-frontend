import { motion } from 'framer-motion';

import { TitleText, TypingText } from '../components';
import { fadeIn, staggerContainer } from '../utils/motion';

const World = () => (
  <section className="relative z-10 paddings">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative z-10 px-6 py-12 sm:p-16 xs:p-8"
    >
      <motion.div className="2xl:max-w-[1280px] w-full mx-auto flex flex-col">

        <TypingText title="| People on the World" textStyles="text-center" />
        <TitleText
          title="Invest in real estate worldwide and collect monthly rent"
          textStyles="text-center"
        />

        <button className='bg-white rounded-full max-w-[80px] flex justify-center button-filters'>test</button>

        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className="relative mt-[68px] flex w-full h-[550px]"
        >
          <img src="/assets/map.png" alt="map" className="object-cover w-full h-full" />

          <div className="absolute bottom-20 right-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680]">
            <img src="/assets/people-01.png" alt="people" className="w-full h-full" />
          </div>

          <div className="absolute top-1/2 left-[45%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680]">
            <img src="/assets/people-02.png" alt="people" className="w-full h-full" />
          </div>

          <div className="absolute top-10 left-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680]">
            <img src="/assets/people-03.png" alt="people" className="w-full h-full" />
          </div>
          
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);

export default World;