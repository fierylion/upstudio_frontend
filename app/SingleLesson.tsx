import React, {FC} from 'react'

import { LessonTypes } from '@/lib/types'
import Image from 'next/image'
import { imageUrl } from '@/lib/utils'
import { formatNumberWithCommas, formatCourseDate, longWordWrapper } from '@/lib/utils'
import clsx from 'clsx'
import Button from '@/components/single/Button'
import Link from 'next/link'

interface Props{
  lesson:LessonTypes

}
const SingleLesson:FC<Props> = ({lesson}) => {
  const startDate = new Date(lesson.startAt)
  const endDate = new Date(lesson.endAt)
  const courseDate = formatCourseDate(startDate, endDate)
  const days = [0,1,2,3,4,5,6]
  const dayStr = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  


  return (
    <div className=' bg-white'>
      <div className='relative '>
        <Image
          src={imageUrl(lesson.course.thumbnail)}
          alt='Course Image'
          width={100}
          height={100}
          className=' mr-3 w-full h-40 shadow-lg'
        />
        <div className='absolute top-3 right-3 p-1 font-medium  bg-white rounded'>
          TZS {formatNumberWithCommas(lesson.course.price)}
        </div>
        <div className='absolute bottom-0 right-3 p-1 px-2 rounded-t  font-medium text-xs text-gray-500  bg-white rounded'>
          {lesson.course.lessons.length} Lessons
        </div>
      </div>
      <div className='flex flex-row justify-between px-3 pt-3 '>
        <h3 className='text-sm text-gray-500'>{courseDate.hours}</h3>
        <div>
          {courseDate.type === 'many' ? (
            ''
          ) : (
            <ul className='flex flex-row space-x-1'>
              {days.map((day, ind) => {
                const current = day === courseDate.dayNumber
                return (
                  <li
                    key={ind}
                    className={clsx(
                      'text-sm font-medium text-gray-500',
                      current && 'text-primary-600'
                    )}
                  >
                    {dayStr[day]}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className='font-medium  m-3 text-gray-700'>
        {longWordWrapper(lesson.course.title, 100)} ({courseDate.date})
      </div>
      <div className='flex flex-row justify-between mx-3 mb-3'>
        <h3 className='text-sm text-gray-500 capitalize'>
          {longWordWrapper(lesson.location, 23)}
        </h3>
        <Link href={`/lesson/${lesson._id}`}>
          <h3 className='text-sm text-primary-600 cursor-pointer'>
            View Details
          </h3>
        </Link>
      </div>
      <div className='flex flex-row justify-between p-3 border-t'>
        <div className='flex flex-row space-x-2 w-full'>
          <Image
            src={imageUrl(lesson.instructor.profileImage)}
            alt='Instructor Image'
            width={30}
            height={30}
            className=' w-10 h-10 rounded-full'
          />
          <div className='my-auto'>
            <h3 className='text-sm text-gray-500'>
              {lesson.instructor.firstName + ' ' + lesson.instructor.lastName}
            </h3>
          </div>
        </div>
        <Link href={`/lesson/${lesson._id}`}>
          <Button
            variant={'outline'}
            className='rounded bg-primary-700 font-medium px-4 cursor-pointer'
          >
            Book
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SingleLesson