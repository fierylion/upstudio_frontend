import React, { FC } from 'react'
import DropDownSelector from '@/components/DropDownSelector'
import { PaidScheduleType, LearnerType } from '@/lib/types'
import Form from './Form'
import SingleSchedule from './SingleSchedule'
import Image from 'next/image'
import BookSVG from '@/public/svg/book.svg'
interface Props{
  schedules: PaidScheduleType[]
  learners: LearnerType[]
  learnerID: string | null
}

const Main:FC<Props> = ({schedules, learners, learnerID}) => {
  
  return (
    <div className='md:w-10/12 w-11/12  mx-auto'>
      <div className=' '>
        <Form learnerID={learnerID} learners={learners} />
      </div>
      <div className=''>
        {schedules.length === 0 && (
          <div className='fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <Image
              src={BookSVG}
              width={100}
              height={100}
              alt='No Course Found'
              className='  w-72 h-72 mx-auto  '
            />
            <h3 className='font-medium text-gray-500 text-center '>
              No Schedule Available, Enroll a Course
            </h3>
          </div>
        )}

        <div className='md:pl-3 w-full  md:w-3/4  '>
          {Array(10)
            .fill(schedules)
            .flat()
            .map((it) => {
              return (
                <SingleSchedule
                  key={it._id}
                  schedule={it}
                  learnerID={learnerID}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Main