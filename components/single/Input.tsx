import React, {HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef} from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const inputVariants = cva(' border-0  rounded outline-none', {
  variants: {
    variant: {
      default: 'border text-black focus:bg-white focus:border-2 placeholder:pl-2 place-holder:text-gray-500',
      search: ' focus:border-primary focus:border-2 text-gray-500  font-light ',
      search1: 'border text-black focus:bg-white focus:border-2',
    },
    sizeVariant: {
      default: 'py-1 px-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    sizeVariant: 'default',
  },
})
interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants>{}
const Input = forwardRef<HTMLInputElement, InputProps>( ({className, variant, sizeVariant, ...props}, ref) => {
  return (
    <input 
    className={cn(inputVariants({className, variant, sizeVariant}))}
    ref={ref}
    {...props}

    />
  )
}
)

export default Input