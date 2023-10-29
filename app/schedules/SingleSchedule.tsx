import { PaidScheduleType } from '@/lib/types'
import React, { FC } from 'react'
import { format } from 'date-fns'
import Button from '@/components/single/Button'
import Link from 'next/link'
interface Props{
 schedule:PaidScheduleType,
 learnerID:string | null
 
}

function formatDateAndTime(inputDate:Date) {
  const formattedDate = format(inputDate, 'E, MMM d, y')
  const formattedTime = format(inputDate, 'h:mm a')

  return { dt: formattedDate, tm: formattedTime }
}
const SingleSchedule:FC<Props> = ({schedule, learnerID}) => {
 const dateTime = formatDateAndTime(new Date(schedule.createdAt))
 const { dt, tm } = dateTime

  return (
    <div className='flex flex-row justify-between'>
      <div className='font-medium text-center  text-xs md:text-sm text-gray-500'>
        <div>{dt}</div>
        <div className='font-normal'>{tm}</div>
        <div className='h-36 bg-gray-200 mx-auto w-[1%]'></div>
      </div>
      <div className='pt-3 text-xs md:text-sm font-medium text-gray-600 px-1'>
        <h1 className='capitalize '>{schedule.lessonSchedule.course.title}</h1>
        <h3 className='mt-4 capitalize text-gray-500'>
          {schedule.lessonSchedule.location}
        </h3>
      </div>
      <div className='pt-3'>
        <Link href={`/lesson/${schedule.lessonSchedule._id}${learnerID? `?learnerID=${learnerID}`:''}`}>
          <Button
            variant={'outline'}
            size={'medium'}
            className='bg-inherit  text-primary border-2 border-primary-500 text-sm font-medium'
          >
            Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SingleSchedule