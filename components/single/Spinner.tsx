
import React, { FC, HTMLAttributes } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
const spinnerVariants = cva('  rounded-full', {
  variants: {
    variant: {
      default: 'border-t-4 border-white border-solid animate-spin',
      spinner1: 'border-t-4 border-primary border-solid animate-spin',
    },

    sizeVariant: {
      default: 'w-8 h-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    sizeVariant: 'default',
  },
})
interface SpinnerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants>{}
const Spinner:FC<SpinnerProps> = ({className, variant, sizeVariant}) => {
  

  return (

     
        <div
          // initial={{ opacity: 0, scale: 0 }}
          // animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 0, scale: 0 }}
          // transition={{
          //   type: 'spring',
          //   stiffness: 260,
          //   damping: 20,
          //   duration: 1.5,
          // }}
          className={cn(spinnerVariants({ variant, sizeVariant, className }))}
        ></div>
      
 
  );
};

export default Spinner