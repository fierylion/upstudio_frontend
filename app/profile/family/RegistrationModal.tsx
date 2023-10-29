'use client'
import React, {useState} from 'react'
import Button from '@/components/single/Button'
import { IoIosAddCircle } from 'react-icons/io'
import RegisterNewModal from './RegisterNewModal'
const RegistrationModal = () => {
  const [isShowRegister, setIsShowRegister] = useState(false)
  return (
    <div>
      <Button
        className=' block  mx-auto my-10'
        onClick={() => setIsShowRegister(!isShowRegister)}
      >
        <div className='flex flex-row space-x-2 items-center'>
          <h1>Add</h1>
          <IoIosAddCircle />
        </div>
      </Button>
      {isShowRegister && (
        <RegisterNewModal setIsShowRegister={setIsShowRegister} />
      )}
     
    </div>
  )
}

export default RegistrationModal