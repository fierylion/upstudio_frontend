import React, { FC } from 'react'
import ScheduleGraph from './ScheduleGraph'
import { FiChevronDown } from 'react-icons/fi'
import { CgSearch } from 'react-icons/cg'
import { MdAddCircle } from 'react-icons/md'
import Course from './Course'
import { CourseType } from '@/lib/types'
import {base} from '@/lib/apis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { LearnerType, PaidScheduleType } from '@/lib/types'
import BookSVG from '@/public/svg/book.svg'
import Image from 'next/image'

async function getLearnerSchedule(learnerID: string | null, token: string) {
  try {
    const res = await base.get(
      `/lessons/schedules/all?learnerID=${learnerID ? learnerID : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res.data
  } catch (err) {
    return null
  }
}
const Main:FC<{learnerID:string}>=async ({learnerID}) => {
  const session =await  getServerSession(authOptions)
  const token = session?.backendTokens?.accessToken as string
  if(!token) return <div> error</div>
  const sched = await getLearnerSchedule(learnerID, token)
 
  if(!sched) return <div>error</div>

  const paidSchedules: PaidScheduleType[] = sched.allPaidScheduleByParent

 

//  const courses:CourseType[] = [
//    {
//      title: 'Web Development from Zero ',
//      instructor: 'John Doe',
//      instructorImg: '/static/user.png',
//      startDate: '2021-08-01',
//      endDate: '2021-08-30',
//      progress: 80,
//      noMemmbers: 20,
//      subTopics: 10,
//      complexity: 'ADV',
//    },
//    {
//      title: 'Web Development from Zero ',
//      instructor: 'John Doe',
//      instructorImg: '/static/user.png',
//      startDate: '2021-08-01',
//      endDate: '2021-08-30',
//      progress: 80,
//      noMemmbers: 20,
//      subTopics: 10,
//      complexity: 'ADV',
//    },
//    {
//      title: 'Web Development from Zero ',
//      instructor: 'John Doe',
//      instructorImg: '/static/user.png',
//      startDate: '2021-08-01',
//      endDate: '2021-08-30',
//      progress: 80,
//      noMemmbers: 20,
//      subTopics: 10,
//      complexity: 'ADV',
//    },
//    {
//      title: 'Web Development from Zero ',
//      instructor: 'John Doe',
//      instructorImg: '/static/user.png',
//      startDate: '2021-08-01',
//      endDate: '2021-08-30',
//      progress: 80,
//      noMemmbers: 20,
//      subTopics: 10,
//      complexity: 'ADV',
//    },
//  ]
  return (
    <div className='mx-3'>
      <ScheduleGraph />
      <div>
        <div className='flex flex-row justify-between my-5 '>
          <h1>Courses</h1>
          <div className='space-x-3 flex flex-row items-center'>
            <div className='flex flex-row space-x-1 items-center'>
              <span className='text-sm'>Active</span>
              <FiChevronDown className='w-6 h-6' />
            </div>
            <CgSearch className='w-6 h-6 p-1 mx-auto text-center rounded-full text-primary-500 bg-primary-100' />
            <MdAddCircle className='w-6 h-6 text-primary-500' />
          </div>
        </div>
      </div>
      <div>
        {paidSchedules.length === 0 && (
          <div className=''>
            <div>
              <Image
                src={BookSVG}
                alt='book'
                height={100}
                width={100}
                className='w-1/4 h-1/4 mx-auto '
              />
              <h2 className='font-medium text-gray-500 text-center'>Learner isn't enrolled in any course</h2>
            </div>
          </div>
        )}
        <div className='space-y-4'>
          {paidSchedules.map((sched) => (
            <Course course={sched} learnerID={learnerID} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main