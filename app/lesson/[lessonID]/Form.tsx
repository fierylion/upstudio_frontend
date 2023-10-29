 'use client'
import React, { FC } from 'react'
import DropDownSelector from '@/components/DropDownSelector'
import { LearnerType } from '@/lib/types'
const  Form:FC<{learners:LearnerType[], learnerID:string|null, lessonID:string, persistUrl?:string}> = ({learners, learnerID, lessonID, persistUrl}) => {
 let currentSelected = learners.find((it) => it.studentID === learnerID)
 
 const displayValues = (item: LearnerType) => {
  
  return `${item.firstName} ${item.lastName}`
 }
 const obtainUrl = (item: LearnerType) => {
  if(!item) return `/lesson/${lessonID}`
  if(persistUrl){
    const per = persistUrl.split('?')
    const rt = new URLSearchParams(per[1])
    rt.set('learnerID', item.studentID)
    const newRoute = per[0] + '?' + rt.toString()
return newRoute
    // return rt.href
  }

  return `/lesson/${lessonID}?learnerID=${item.studentID}`
 }
 const isActive = (item:LearnerType)=>{
  return item.studentID===learnerID
 }
  return (
   <div className='my-5'>
    <DropDownSelector
    defaultValue={'Select a student'}
     currentSelected={currentSelected}
     options={learners}
     displayValues={displayValues}
     obtainUrl={obtainUrl}
     isActive={isActive}
    />
   </div>
  )
}

export default Form