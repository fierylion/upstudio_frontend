import React, {FC} from 'react'
import { LearnerType, LevelType } from '@/lib/types'
import Image from 'next/image'
import { baseUrl } from '@/lib/apis'
import { BsFillBellFill } from 'react-icons/bs'
import Link from 'next/link'

const LearnerCard:FC<{learner:LearnerType, level:LevelType}> = ({learner, level}) => {
  return (
    <div className=' p-3 shadow  rounded '>
      <div className='flex justify-between items-start mx-3'>
        <h3 className='font-medium text-blue-600 cursor-pointer hover:opacity-80 '>
          <Link href={`/profile/family/${learner.studentID}`}>View</Link>
        </h3>
        <Link href={`/profile/family/${learner.studentID}`}>
          <Image
            className='rounded-full mx-auto w-32 h-32 '
            src={baseUrl + learner.profileImage}
            alt={learner.firstName + ' ' + 'profile image'}
            width={100}
            height={100}
          />
        </Link>
        <div className='relative p-2'>
          <BsFillBellFill className='w-5 h-5' />
          <span className='absolute top-0 right-0 text-xs font-semibold rounded-full text-white  bg-primary w-4 h-4 text-center '>
            2
          </span>
        </div>
      </div>
      <div className='text-center pt-4 pl-3 mx-auto '>
        <ul className='space-y-1 z-50'>
          <li className='text-sm mx-auto text-center'>{learner.studentID}</li>
          <li className='font-semibold '>
            {learner.firstName + ' ' + learner.lastName}
          </li>
          <li className='text-sm font-medium text-gray-500'>
            {learner.schoolName}
          </li>
        </ul>
      </div>
      <div className=' flex justify-evenly items-center  w-72 mx-auto rounded-lg border-2 border-gray-300 shadow mt-3'>
        <div className='flex flex-col items-center px-2 space-y-1 my-1 w-1/2'>
          <h1 className='text-2xl font-semibold'>{level.level}</h1>
          <h1 className='text-sm font-medium text-gray-500'>{level.description}</h1>
        </div>
        <div className='flex flex-col items-center px-2 space-y-1 my-1 border-l-2 w-1/2'>
          <h1 className='text-2xl font-semibold'>4</h1>
          <h1 className='text-sm font-medium text-gray-500'>Courses</h1>
        </div>
      </div>
    </div>
  )
}

export default LearnerCard