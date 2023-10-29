import React, { FC } from 'react'
import {LessonTypes, PaidScheduleType} from '@/lib/types'
import clsx from 'clsx'
import { formatNumberWithCommas, formatSingleDuration } from '@/lib/utils'
interface Props{
  transaction:PaidScheduleType
  learnerID:string
}
const SingleTransaction: FC<Props> = ({transaction, learnerID}) => {
  const status = transaction.paymentID.success
  return (
    <div className='w-full rounded p-2 flex flex-row justify-between text-gray-800 py-4 border-b'>
      <div>
        <h2 className='font-medium'>{transaction.lessonSchedule.course.title}</h2>

        {!learnerID &&
        <h3 className=' font-semibold text-primary-700 '>{transaction.learner.firstName + ' ' + transaction.learner.lastName}</h3>}
        <h3 className='text-sm font-medium text-gray-500 self-end'>{formatSingleDuration(transaction.paymentID.createdAt)}</h3>

      </div>
      <div className=''>
        <h1 className='font-semibold text-gray-700'>{formatNumberWithCommas( transaction.paymentID.amount)}</h1>
        <h1 className={clsx(status&&'text-green-700', 'font-semibold text-sm')}>{status?'SUCCESS':'FAILED'}</h1>

      </div>
      

    </div>

  )
}

export default SingleTransaction