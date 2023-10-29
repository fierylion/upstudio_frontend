import React,{FC} from 'react'
import { CourseType } from '@/lib/types'
import Image from 'next/image'
import { imageUrl, formatDuration } from '@/lib/utils'
import { HiUserGroup } from 'react-icons/hi'
import { GiBookPile } from 'react-icons/gi'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import { PaidScheduleType } from '@/lib/types'
import ProgressBar from '@/components/single/ProgressBar'
import Link from 'next/link'
import { calculatePercentageDone } from '@/lib/utils'
interface Props{
  course:PaidScheduleType
  learnerID:string
}
const Course:FC<Props> = ({course, learnerID}) => {
  return (
    <div>
      {/* for small devices */}
      <div className='lg:hidden w-80  mx-auto p-3   '>
        <div className='flex flex-col flex-1'>
          <Link
            href={`/lesson/${course.lessonSchedule._id}?learnerID=${learnerID}`}
          >
            <div className='cursor-pointer'>
              <div className='relative pb-3.5'>
                <Image
                  src={imageUrl('/static/samples/course.jpg')}
                  alt='Course Image'
                  width={100}
                  height={100}
                  className='rounded mr-3 w-full h-48 shadow-lg'
                />
                <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 p-1 text-white bg-primary rounded-xl text-sm font-medium tracking-wider '>
                  {calculatePercentageDone(
                    course.lessonSchedule.startAt,
                    course.lessonSchedule.endAt
                  )}
                  %
                </div>
              </div>

              <div className=' mt-3 ml-2'>
                <h1 className='font-semibold text-sm'>
                  {course.lessonSchedule.course.title}
                </h1>
                <div className='flex flex-row justify-between my-1'>
                  <h2 className='text-sm text-gray-500'>Instructor: </h2>
                  <Image
                    src={imageUrl(
                      course.lessonSchedule.instructor.profileImage
                    )}
                    alt='Course Image'
                    width={20}
                    height={20}
                    className='rounded-lg'
                  />
                  <h2 className='text-sm font-medium'>{`${course.lessonSchedule.instructor.firstName} ${course.lessonSchedule.instructor.lastName}`}</h2>
                </div>
              </div>
            </div>
          </Link>
          <div className='w-28 space-y-1 mt-3 ml-2'>
            <h3 className='text-xs font-medium'>
              {formatDuration(
                new Date(course.lessonSchedule.startAt),
                new Date(course.lessonSchedule.endAt)
              )}
            </h3>
          </div>
          <div className=' flex flex-row align-center space-x-4 mt-3 ml-2'>
            <div className='flex flex-row space-x-2 items-center'>
              <HiUserGroup className='w-5 h-5' />
              <h3 className='text-xs font-medium'>{2}</h3>
            </div>
            <div className='flex flex-row space-x-2 items-center'>
              <GiBookPile className='w-5 h-5' />
              <h3 className='text-xs font-medium'>
                {course.lessonSchedule.course.lessons.length}
              </h3>
            </div>
            <div className='flex flex-row space-x-2 items-center'>
              <BsFillPlayCircleFill className='w-5 h-5' />
              <h3 className='text-xs font-medium text-orange-600'>
                {course.lessonSchedule.course.complexity}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* for larger devices */}
      <div className='hidden lg:block'>
        <div className=' flex flex-row justify-between w-full border rounded-2xl p-2'>
          <Link
            href={`/lesson/${course.lessonSchedule._id}?learnerID=${learnerID}`}
          >
            <div className='flex flex-row cursor-pointer'>
              <Image
                src={imageUrl(course.lessonSchedule.course.thumbnail)}
                alt='Course Image'
                width={70}
                height={70}
                className='rounded mr-3'
              />
              <div className='w-52'>
                <h1 className='font-semibold text-sm'>
                  {course.lessonSchedule.course.title}
                </h1>
                <div className='flex flex-row justify-between my-1'>
                  <h2 className='text-sm text-gray-500'>Instructor: </h2>
                  <Image
                    src={imageUrl(
                      course.lessonSchedule.instructor.profileImage
                    )}
                    alt='Course Image'
                    width={20}
                    height={20}
                    className='rounded-lg'
                  />
                  <h2 className='text-sm font-medium'>{`${course.lessonSchedule.instructor.firstName} ${course.lessonSchedule.instructor.lastName}`}</h2>
                </div>
              </div>
            </div>
          </Link>
          <div className='w-28 space-y-1'>
            <h2>Duration</h2>
            <h3 className='text-xs font-medium'>
              {formatDuration(
                new Date(course.lessonSchedule.startAt),
                new Date(course.lessonSchedule.endAt)
              )}
            </h3>
          </div>
          <div className='flex flex-row space-x-2 items-center w-36'>
            <ProgressBar
              colorClass='bg-primary'
              heightClass='h-4'
              progress={calculatePercentageDone(
                course.lessonSchedule.startAt,
                course.lessonSchedule.endAt
              )}
            />
          </div>
          <div className=' flex flex-row align-center space-x-4'>
            <div className='flex flex-row space-x-2 items-center'>
              <HiUserGroup className='w-5 h-5' />
              <h3 className='text-xs font-medium'>{10}</h3>
            </div>
            <div className='flex flex-row space-x-2 items-center'>
              <GiBookPile className='w-5 h-5' />
              <h3 className='text-xs font-medium'>
                {course.lessonSchedule.course.lessons.length}
              </h3>
            </div>
            <div className='flex flex-row space-x-2 items-center'>
              <BsFillPlayCircleFill className='w-5 h-5' />
              <h3 className='text-xs font-medium text-orange-600'>
                {course.lessonSchedule.course.complexity}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course