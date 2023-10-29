import React,{FC} from 'react'
import {base} from '@/lib/apis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { LearnerType, LevelType } from '@/lib/types'
import { getLearnerLevels } from '@/actions/learners/levels'
import { getLevel } from '@/lib/utils'
import Image from 'next/image'
import { imageUrl } from '@/lib/utils'
import Form from './Form'
import Main from './Main'
interface Props{
  params:{
    studentID:string
  
  }
  // searchParams:{
  //   studentID:string
  // }
}
async function getAllLearners(token: string) {
  try {
    const res = await base.get('/learners', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

const page:FC<Props> = async ({params}) => {
  const {studentID} = params
  const session = await getServerSession(authOptions)
  const token = session?.backendTokens?.accessToken as string
  const dataPromises = Promise.all([
    getAllLearners(token),
    getLearnerLevels(token),
  ])
  const data = await dataPromises
  if (!data[0] || !data[1]) {
    return <div>error</div>
  }
  const learners: LearnerType[] = data[0].learners
  const levels: LevelType[] = data[1].levels
  const learner = learners.find((it) => it.studentID === studentID) 
  if (!learner) {
    return <div>error</div>
  }
  const learnerLevel = getLevel(new Date(learner.birthdate), levels)




  return (
    <div className='mx-4'>
      <div className='m-3 my-5'>
        <Form currentStudent={learner} learners={learners} />
      </div>
      <div className='md:flex md:flex-row space-x-3 p-4 rounded-lg shadow m-3'>
        <Image
          src={imageUrl(learner.profileImage)}
          alt={learner.firstName + ' ' + 'profile image'}
          width={100}
          height={100}
          className='rounded-full '
        />
        <div className='w-full md:px-3'>
          <h1 className='capitalize font-semibold text-lg'>
            {learner.firstName + ' ' + learner.lastName}
          </h1>
          <div className='flex flex-row justify-between mt-3  mr-3 md:w-80'>
            <div>
              <h3 className='font-medium text-gray-500'>Student ID</h3>
              <h1 className='font-medium z-50 text-sm '>{learner.studentID}</h1>
            </div>
            <div className='text-center'>
              <h2 className='font-medium text-gray-500 text-sm'>Level</h2>
              <h1 className=' font-medium z-50'>{learnerLevel.level}</h1>
            </div>
            <div className='text-center'>
              <h2 className='font-medium text-gray-500 text-sm'>Courses</h2>
              <h1 className=' font-medium z-50'>0</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
       <Main learnerID={studentID} />
      </div>
    </div>
  )
}

export default page