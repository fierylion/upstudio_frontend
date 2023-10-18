'use client'
import React, {useState} from 'react'
import Button from '@/components/single/Button'
import clsx from 'clsx'
import PaymentInfo from './PaymentInfo'
import ProfileInfo from './ProfileInfo'
import { AnimatePresence, motion } from 'framer-motion'
const Main = () => {
 const [currentSection, setCurrentSection ] = useState('My Profile')
 const sectionButtons = [
  {label:'My Profile'},
  {label:'Payment Source'},
  
 ]
  return (
    <div className=''>
      <div className='md:bg-white pt-2 md:shadow-lg'>
        <h4 className='text-center py-5 text-2xl font-medium text-gray-600'>
          Account
        </h4>
        <div className=' mx-1 flex flex-row space-x-2 justify-center '>
          {sectionButtons.map((item) => {
            const isCurrent = item.label === currentSection
            return (
              <Button
                className={clsx(
                  ' w-48 font-semibold text-gray-600 transition-all duration-500 hover:text-primary-600',
                  isCurrent &&
                    'text-primary-600 border-b-2 border-b-primary-600 ',
                  !isCurrent && 'opacity-75 '
                )}
                variant={'outline3'}
                onClick={() => {
                  setCurrentSection(item.label)
                }}
              >
                {item.label}
              </Button>
            )
          })}
        </div>
      </div>
      <AnimatePresence>
        <div className='overflow-y-scroll'>
          {currentSection === 'My Profile' && <ProfileInfo />}
          {currentSection === 'Payment Source' && <PaymentInfo />}
        </div>
      </AnimatePresence>
    </div>
  )
}

export default Main