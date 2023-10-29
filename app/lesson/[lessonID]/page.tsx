import React, {FC} from 'react'
import { NavBar } from '@/components'
import { base } from '@/lib/apis'
import { AssigmentType, FeedbackType, LearnerType, LessonTypes, PaymentType } from '@/lib/types'
import Main from './Main'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
interface Props{
 params:{
   lessonID:string
 },
 searchParams:{
  learnerID:string | null
  payment:boolean |null
 }
}

async function getLessonDetails(lessonID:string, learnerID:string|null, token:string){

 try {
   const res = await base.get(`/lessons/${lessonID}?learnerID=${learnerID?learnerID:''}`, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    
   })

   return res.data
 } catch (err) {
   console.log(err)
   return null
 }

}
async function getLearnerFeedback(lessonID:string, learnerID:string, token:string){
  try {
    const res = await base.get(
      `/feedback/learner/${learnerID}/lesson/${lessonID}`,
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
async function getLearnerAssigments(
  lessonID: string,
  learnerID: string,
  token: string
) {
  try {
    const res = await base.get(
      `/feedback/assignment/learner/${learnerID}/lesson/${lessonID}`,
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
const page:FC<Props> = async ({params, searchParams}) => {
  const headerList= headers()
  const currentUrl = headerList.get('referer') 
 const {lessonID} = params
 const {learnerID, payment} = searchParams
 const session = await getServerSession(authOptions)


 const data = await getLessonDetails(lessonID, learnerID, session?.backendTokens.accessToken as string )
 if(!data) return <div>error</div>
 const lesson:LessonTypes= data.lesson
 const noLearners:number = data.noLearners
 const learnersPaidByParent:{learner:LearnerType, payment: PaymentType}[] = data.learnerPaidByParent
 const paidLearners = learnersPaidByParent?.find((lp) => {
   console.log(lp.learner.studentID, learnerID, 'fadfa')
   return lp.learner.studentID === learnerID
 })

 //feeback
  const feedbackData = paidLearners ?  await getLearnerFeedback(lessonID, learnerID as string, session?.backendTokens.accessToken as string):  []
  const assignmentData = paidLearners ?  await getLearnerAssigments(lessonID, learnerID as string, session?.backendTokens.accessToken as string):  []
  if(!feedbackData || !assignmentData) return <div>error</div>
  const feedbacks:FeedbackType[] = feedbackData.feedbacks?feedbackData.feedbacks:[]
  const assignments: AssigmentType[] = assignmentData.assignments?assignmentData.assignments:[]
  

 
  return (
   <>
   <header>
    <NavBar/>
   </header>
   <main className='mt-24 '>
  <Main lesson={lesson} lessonID={lessonID} learnerID={learnerID} payment={payment} currentUrl={currentUrl} noLearners={noLearners} learnersPaidByParent={learnersPaidByParent} assignments={assignments} feedbacks={feedbacks}/>

   </main>
   </>
  )
}

export default page