import React, { FC, Suspense } from 'react'
import { NavBar } from '@/components'
import Main from './Main'
import {base} from '@/lib/apis'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { LearnerType, PaidScheduleType } from '@/lib/types'
async function getAllLearners(token: string) {
  try {
    const res = await base.get('/learners', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    return null
  }
}
async function getLearnerSchedule(learnerID: string|null, token: string) {
  try {
    const res = await base.get(`/lessons/schedules/all?learnerID=${learnerID? learnerID: ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    return null
  }
}
const page:FC<{searchParams:{learnerID:string|null}}> =async ({searchParams}) => {
  const { learnerID } = searchParams
  const session =await  getServerSession(authOptions)
  const token = session?.backendTokens?.accessToken as string
  if(!token) return <div> error</div>
  const data = await getAllLearners(token)
  if(!data) return <div>error</div>
  const learners:LearnerType[] = data.learners
  const sched = await getLearnerSchedule(learnerID, token)
  console.log(sched)
  if(!sched) return <div>error</div>
  const paidSchedules: PaidScheduleType[] = sched.allPaidScheduleByParent



  return (
    <>
      <header>
        <NavBar />
        <div>page</div>
      </header>
      <main className='mt-16'>
        <Suspense fallback={<div>Loading...</div>}>
          <Main schedules={paidSchedules} learners={learners} learnerID = {learnerID} />
        </Suspense>
      </main>
    </>
  )
}

export default page