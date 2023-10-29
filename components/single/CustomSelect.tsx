import React, {FC} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai'
import {BsCheck} from 'react-icons/bs'
import clsx from 'clsx'
interface Props{
 placeholder:string
 setValue: (it:string)=>void
 value:string
 items:string[]
}
const CustomSelect:FC<Props> = (
 {placeholder, setValue, value, items}

) => {
 const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className='w-full relative cursor-pointer '>
      <div
        className={clsx(
          'w-full py-2 pl-2 rounded border  border-gray-300  text-sm  relative ',
          !value && 'text-gray-400'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? value : placeholder}
        <div className=' absolute top-1.5  right-2 text-gray-400 '>
          {!isOpen ? (
            <AiOutlineDownCircle className='w-7 h-7' />
          ) : (
            <AiOutlineUpCircle className='w-7 h-7' />
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <div className='absolute z-50  w-full '>
            <div className='mb-5'>
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'fit-content', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className='overflow-y-scroll max-h-52 rounded bg-slate-200 text-black'
              >
                {items.map((it) => {
                  return (
                    <li
                      className='text-sm font-medium opacity-80 py-2 px-5 hover:opacity-75 hover:bg-primary-600 relative transition-all cursor-pointer '
                      onClick={() => {
                        setValue(it)
                        setIsOpen(!isOpen)
                      }}
                    >
                      {it}
                      {/* <BsCheck className='w-6 h-6 absolute right-2 top-2  hover:text-white'/> */}
                    </li>
                  )
                })}
              </motion.ul>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomSelect