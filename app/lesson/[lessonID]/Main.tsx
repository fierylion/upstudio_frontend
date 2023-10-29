import { AssigmentType, LearnerType, LessonTypes, FeedbackType } from '@/lib/types'
import { calculatePercentageDone, formatCourseDate, formatNumberWithCommas, imageUrl, singularPlural } from '@/lib/utils'
import Image from 'next/image'
import React, { FC } from 'react'
import { HiUserGroup } from 'react-icons/hi'
import clsx from 'clsx'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import DropDownSelector from '@/components/DropDownSelector'
import {base} from '@/lib/apis'
import Form from './Form'
import PaymentModal from './PaymentModal'
import Link from 'next/link'
import { PaymentType } from '@/lib/types'
import Button from '@/components/single/Button'
import ProgressBar from '@/components/single/ProgressBar'
import Feedback from './Feeback'
interface Props {
  lesson: LessonTypes
  learnerID: string | null
  payment: boolean | null
  currentUrl: string | null
  lessonID: string
  noLearners: number
  feedbacks: FeedbackType[]
  assignments:AssigmentType[]
  learnersPaidByParent?: { learner: LearnerType; payment: PaymentType }[]
}
async function getAllLearners(token: string) {
 try{
  const res = await base.get('/learners', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
 }
 catch(err){
  return null
 }
}
async function getLearnerCourseDetails(learnerID:string, lessonID:string,token:string){
 try{
  const res = await base.get(`/learners/${learnerID}/lessons/${lessonID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
 }catch(err){
  return null
 }
 }
const Main:FC<Props> = async ({lesson, learnerID, payment, currentUrl, lessonID, noLearners, learnersPaidByParent, feedbacks, assignments}) => {
  console.log(feedbacks, assignments)
  
 const courseDate = formatCourseDate(new Date(lesson.startAt), new Date(lesson.endAt))
  const days = [0, 1, 2, 3, 4, 5, 6]
  const dayStr = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const session= await getServerSession( authOptions)
  const token = session?.backendTokens?.accessToken as string
  let learners:LearnerType[] = [];
  if(token){
    const data = await getAllLearners(token)
    if(!data) return <div>error</div>
    learners = data.learners
  }
  const getPaymentUrl = ()=>{
    
    if(!currentUrl) return ''
    const mainPath = (new URL(currentUrl))
    const pathN = (mainPath.pathname==='/')? `/lesson/${lessonID}`: mainPath.pathname
   
    const fullPath = mainPath.origin+pathN

    const url = new URL(fullPath)
    if (learnerID) {
      console.log(learnerID)
      url.searchParams.set('learnerID', learnerID as string)
    }
    if(token){
    url.searchParams.set('payment', 'true')
    }else{
      url.searchParams.set('register', 'true')

    }
    return url.toString()
  }
  const subSubjectCompletionIndex = ()=>{
    const percentCompleted = calculatePercentageDone(lesson.startAt, lesson.endAt);
   
    const subCourses = lesson.course.lessons;
    let percentDone= 0;
    for(let i=0; i<subCourses.length; i++){
      percentDone += subCourses[i].weight;
      if(percentDone>=percentCompleted) return i

      
    }
    return subCourses.length-1

  }
const courseIndexCompleted = subSubjectCompletionIndex()
const paidLearners = learnersPaidByParent?.find((lp)=>{

 
  return lp.learner.studentID===learnerID})

  return (
    <div className='w-10/12 md:w-1/2 mx-auto'>
      {learners.length >= 1 && (
        <div>
          <Form
            learners={learners}
            learnerID={learnerID}
            lessonID={lesson._id}
          />
        </div>
      )}
      <div className='my-3'>
        {/* show progress */}
        {paidLearners && (
          <ProgressBar
            colorClass='bg-green-500'
            heightClass='h-4'
            progress={calculatePercentageDone(lesson.startAt, lesson.endAt)}
          />
        )}
      </div>
      <h3 className='font-semibold text-lg capitalize mt-8 '>
        {lesson.course.title}
      </h3>
      <div className='my-3   text-gray-500 z-10 text-sm font-medium'>
        {noLearners} {singularPlural('learner', noLearners)} enrolled in this
        course
      </div>
      <div className='flex flex-row justify-between my-2'>
        <h3 className='text-sm md:text-base'>
          {courseDate.type === 'many'
            ? courseDate.hours
            : `${courseDate.date} (${courseDate.hours})`}
        </h3>
        {courseDate.type === 'single' ? (
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
        ) : (
          <></>
        )}
      </div>
      <div className='relative'>
        <Image
          src={imageUrl(lesson.course.thumbnail)}
          width={100}
          height={100}
          alt='lesson image'
          className='h-72 w-full'
        />
        <div className='p-2 bg-white rounded absolute top-3 right-3 text-sm font-medium'>
          TZS {formatNumberWithCommas(lesson.course.price)}
        </div>
      </div>
      <div className='flex flex-row justify-between w-full my-4'>
        <div className='flex flex-row '>
          <Image
            src={imageUrl(lesson.instructor.profileImage)}
            width={35}
            height={35}
            alt='instructor image'
            className=' w-14 h-14 rounded-full '
          />
          <h3 className='my-auto ml-1 font-medium'>
            {lesson.instructor.firstName + ' ' + lesson.instructor.lastName}
          </h3>
        </div>
        {!paidLearners &&
        <Link href={getPaymentUrl()}>
          <Button variant={'outline'} className='font-bold my-auto'>
            Enroll Now
          </Button>
        </Link>
}
      </div>
      {paidLearners&&
      <div className='my-3'>
        <h1 className='font-semibold text-lg'>Instructor's Feedback</h1>
        <div>
        <Feedback assignments={assignments} feedbacks={feedbacks}/>
        </div>
      </div>
}
      <div className=' my-3'>
        <h1 className='font-semibold text-lg'>Description</h1>
        <p className='text-sm'>{lesson.course.description}</p>
      </div>
      <div>
        <h1 className='text-lg font-semibold'>Course Content </h1>
        <div>
          <ul>
            {lesson.course.lessons.map((lesson, index) => (
              <li
                key={index}
                className='text-sm p-4 border rounded-lg relative'
              >
                <div className=' flex flex-row justify-between'>
                  <div>
                    <div className='font-semibold'>
                      <span>{index + 1 + '. '}</span>
                      <span>{lesson.title}</span>
                    </div>
                    <p>{lesson.description}</p>
                  </div>
                  <div className='my-auto'>
                    <p>{lesson.weight * 100}%</p>
                  </div>
                </div>
                {index < courseIndexCompleted && (
                  <p className='text-xs absolute bottom-1 right-3 text-green-600 font-semibold'>
                    COMPLETED
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {payment && (
        <PaymentModal
          learners={learners}
          learnerID={learnerID}
          lesson={lesson}
        />
      )}
    </div>
  )
}

export default Main