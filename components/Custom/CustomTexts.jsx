import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../../utils/motion';

export const TitleText = ({ title, textStyles }) => (
  <motion.h1
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] text-2xl md:text-4xl font-bold text-white ${textStyles}`}
  >
    {title}
  </motion.h1>
);

export const SubTitleText = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-2xl text-xl text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);

export const TypingText = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer}
    className={`font-eudoxus font-normal text-[14px] text-[#c7c7c7] ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);