import { LearnerType, LessonTypes, PaidScheduleType, PaymentType } from '@/lib/types'
import React, { FC } from 'react'
import Form from './Form'
import { base } from '@/lib/apis'
import SingleTransaction from './SingleTransaction'
import Image from 'next/image'
import TransactionSVG from '@/public/svg/transaction.svg'
interface Props{
 learnerID:string
 learners:LearnerType[]
 transactions:PaidScheduleType[]
}

const Main:FC<Props> =async ({learnerID, learners, transactions}) => {
 let currentLearner = learners.find(learner=>learner.studentID===learnerID)
  

 const randomTransactions =transactions.length>0 ?Array(10)
          .fill('')
          .map(
            (trn) =>
              transactions[Math.floor(Math.random() * transactions.length)]
          ): []
  return (
    <div className='mx-3'>
      <div className='m-3 my-5'>
        <Form currentStudent={currentLearner} learners={learners} />
      </div>
      {
        transactions.length===0 &&
        <div className='w-full h-full my-48  mx-auto flex flex-col justify-center items-center '>
          <Image src={TransactionSVG} alt='no transaction' width={200} height={200} />
          <h1 className='text-2xl font-semibold text-gray-500'>No transactions made</h1>
        </div>
      }
      { transactions.length>0 &&
      <div className='w-10/12 mx-auto'>
        {randomTransactions.map((transaction) => (
            <SingleTransaction
              key={transaction._id}
              transaction={transaction}
              learnerID={learnerID}
            />
          ))}
      </div>
}
    </div>
  )
}

export default Main