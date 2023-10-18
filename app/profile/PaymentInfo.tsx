import React from 'react'
import {motion} from 'framer-motion'
import {IoIosAddCircle} from 'react-icons/io'
import Button from '@/components/single/Button'
const PaymentInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='w-full h-full '
    >
      <Button className=' block  mx-auto mt-8'>
        <div className='flex flex-row space-x-2 items-center'>
          <h1>Add</h1>
          <IoIosAddCircle />
        </div>
      </Button>
    </motion.div>
  )
}

export default PaymentInfo