import React, {FC} from 'react'
import { base } from '@/lib/apis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Main from './Main'
import { LearnerType, LessonTypes, PaidScheduleType } from '@/lib/types'

interface Props {
  searchParams: {
    learnerID: string
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
async function getAllTransactions(token: string, learnerID: string | null) {
  try {
    const res = await base.get(
      `/transactions?learnerID=${learnerID ? learnerID : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}
const Transactions:FC<Props> = async ({searchParams}) => {
  const {learnerID} = searchParams
  const session = await getServerSession(authOptions)
  const token = session?.backendTokens?.accessToken as string
  if (!token) return <div> error</div>
  const lnrs = await getAllLearners(token)

  if (!lnrs) return <div>error</div>
  const learners:LearnerType[] = lnrs.learners
  const trns = await getAllTransactions(token, learnerID)
  if (!trns) return <div>error</div>
  const transactions:PaidScheduleType[] = trns.transactions
  return (
    <>
    <Main learners={learners} learnerID={learnerID} transactions={transactions}/>
    </>
  )
}

export default Transactions