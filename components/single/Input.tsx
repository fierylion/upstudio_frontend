import React, {HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef} from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const inputVariants = cva('  rounded', {
  variants: {
    variant: {
      default: 'border text-black focus:bg-white focus:border-2 placeholder:pl-2 place-holder:text-gray-500',
      search: 'border text-black focus:bg-white focus:border-2',
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