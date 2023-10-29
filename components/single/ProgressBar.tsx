'use client'
import React, { FC } from 'react'
import clsx from 'clsx'
import { VariantProps, cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'


interface ProgressProps{
 heightClass:string;
 progress:number;
 colorClass:string


}
const ProgressBar:FC<ProgressProps> = ({heightClass, progress, colorClass}) => {
  return (
    <AnimatePresence>
      <div
        className={`w-full rounded-lg bg-gray-300 flex  items-center ${heightClass}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full rounded-lg ${colorClass} relative`}
        >
          <span className=' text-black font-semibold text-xs absolute  right-1 '>
            {progress}%
          </span>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ProgressBar