import React from 'react'
import { motion } from 'framer-motion';

import { staggerContainer } from '../../utils/motion';

export default function MotionTransition({classname, children}) {
  return (
    <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={classname}
    >
      {children}
    </motion.div>
  )
}
