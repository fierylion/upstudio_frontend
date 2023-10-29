'use client'
import React, { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { LearnerType } from '@/lib/types'
import { AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai'
import Link from 'next/link'
import { BsCheck } from 'react-icons/bs'
interface Props{
 currentStudent:LearnerType,
 learners:LearnerType[]
}
const Form:FC<Props> = ({currentStudent, learners}) => {
 const [isOpen, setIsOpen] = React.useState(false)
 const currentStudentName = currentStudent.firstName + ' ' + currentStudent.lastName

 const formRef = React.useRef<HTMLDivElement|null>(null)
 React.useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if(formRef.current && !formRef.current.contains(target)){
   
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [])


  return (
    <div className='w-full relative cursor-pointer  '  id='selectForm' ref={formRef}>
      <div
      
        className={clsx(
          'w-full py-3 px-2 rounded-3xl  border-2  border-primary-600 font-semibold text-center  relative '
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentStudentName}
        <div className=' absolute top-2.5  right-2 text-gray-400 '>
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
                className=' max-h-52 rounded-lg bg-white shadow-lg text-black'
              >
                {learners.map((ln) => {
                  return (
                    <Link href={`/profile/family/${ln.studentID}`}>
                      <li
                        className='text-sm font-semibold opacity-80 py-2 px-5 hover:opacity-75 hover:bg-primary-600 relative transition-all cursor-pointer hover:text-white '
                        onClick={() => {
                         
                          setIsOpen(!isOpen)
                        }}
                      
                      >
                        {ln.firstName + ' ' + ln.lastName}
                        <BsCheck className='w-7 h-7 font-bold absolute right-4 top-1  text-white '/>
                      </li>
                    </Link>
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

export default Form