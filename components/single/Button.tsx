import React, {ButtonHTMLAttributes, forwardRef} from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  ' items-center justify-center rounded',
  {
    variants: {
      variant: {
        default:
          'border   text-primary-800 border-primary hover:opacity-80',
        outline:
          'bg-primary-600 text-white hover:opacity-80 font-light rounded-3xl',
        outline1:
          'border text-black dark:text-primaryLight1 bg-inherit border-primary dark:border-primaryLight1',
        outline2:
          'border text-white bg-black bg-opacity-60 border-primaryLight border-opacity-70   ',
        outline3:
        '',
      },
      size: {
        default: 'py-2 px-6',
        medium:'p-2 px-6',
        small: 'h-10 py-2 px-1 w-full text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps <typeof buttonVariants>{}
const Button = forwardRef<HTMLButtonElement, ButtonProps>( ({ className, size, variant,...props}, ref) => {
  return (
    <button
    ref={ref}
    className={cn(buttonVariants({ size, variant, className }))}
    {...props}
    
    />
  )
}
)
export default Button