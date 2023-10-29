
import React from 'react'


import Main from './Main'
import RegistrationModal from './RegistrationModal'
const Family = () => {
 const members = null

 
  return (
    <div>
      <RegistrationModal/>
      <Main/>
      {/* { !members && <div className='my-28'>
<Image src={FamilySvg} alt='Family' width={200} height={200} className='mx-auto '/>
      <h1 className='text-center text-xl  font-medium text-gray-500'>
        You have no family members yet
      </h1>

      </div>

      } */}
    </div>
  )
}

export default Family