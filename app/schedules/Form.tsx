'use client'
import React, { FC } from 'react'
import DropDownSelector from '@/components/DropDownSelector'
import { LearnerType } from '@/lib/types'
const Form: FC<{
  learners: LearnerType[]
  learnerID: string | null


}> = ({ learners, learnerID}) => {
  let currentSelected = learners.find((it) => it.studentID === learnerID)

  const displayValues = (item: LearnerType) => {
    return `${item.firstName} ${item.lastName}`
  }
  const obtainUrl = (item: LearnerType) => {
   if(!item) return `/schedules`

    return `/schedules?learnerID=${item.studentID}`
  }
  const isActive = (item: LearnerType) => {
    return item.studentID === learnerID
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
