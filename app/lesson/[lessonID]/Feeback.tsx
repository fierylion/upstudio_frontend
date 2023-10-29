'use client'
import { AssigmentType, FeedbackType } from '@/lib/types'
import React, { FC } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { AnimatePresence,motion } from 'framer-motion'
import { formatCourseDate, formatSingleDuration, generateArray } from '@/lib/utils'
import clsx from 'clsx'
interface Props{
assignments:AssigmentType[],
feedbacks: FeedbackType[]  
}
const Feeback:FC<Props> = ({assignments, feedbacks}) => {
 const [showFeedback, setShowFeedback] = React.useState(false)
 const [showAssignments, setShowAssignments] = React.useState(false)
 const motionVariants = {
  hidden:{
    opacity:0,
    y:-20
  },
  visible:{
    opacity:1,
    y:0,
    transition:{
      duration:0.2
    }
  }
}
  return (
    <div>
      <div>
        <div
          className='p-2 rounded border flex items-center justify-between shadow'
          onClick={() => setShowFeedback(!showFeedback)}
        >
          <h3 className='font-medium  '>Feedbacks</h3>
          <AnimatePresence>
            {!showFeedback ? (
              <motion.div>
                <AiOutlinePlusCircle className='w-6 h-6 text-primary-600' />
              </motion.div>
            ) : (
              <motion.div
                variants={motionVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
              >
                <AiOutlineMinusCircle className='w-6 h-6 text-primary-600' />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {showFeedback && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='rounded-lg border-l-2 border-gray-500 pl-2'
            >
              {generateArray(feedbacks, 10).map((feedback) => (
                <motion.li key={feedback._id} className='my-2'>
                  <div>
                    <div className='flex flex-row space-x-2'>
                      <p className='font-medium'>{feedback.title}</p>
                      <p className='text-xs font-semibold text-gray-800 my-auto'>
                        ({formatSingleDuration(feedback.createdAt)})
                      </p>
                    </div>

                    <p className='text-sm text-gray-800'>
                      {feedback.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <div>
        <div
          className='p-2 rounded border flex items-center justify-between shadow'
          onClick={() => setShowAssignments(!showAssignments)}
        >
          <h3 className='font-medium  '>Assignments</h3>
          {!showAssignments ? (
            <motion.div>
              <AiOutlinePlusCircle className='w-6 h-6 text-primary-600' />
            </motion.div>
          ) : (
            <motion.div>
              <AiOutlineMinusCircle className='w-6 h-6 text-primary-600' />
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {showAssignments && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='rounded-lg border-l-2 border-gray-500 pl-2'
            >
              {generateArray(assignments, 10).map((assignment) => (
                <motion.li key={assignment._id} className='my-2'>
                  <div>
                    <div className='flex flex-row justify-between'>
                      <div className='flex flex-row space-x-2'>
                        <p className='font-medium'>{assignment.title}</p>
                        <p className='text-xs font-semibold text-gray-800 my-auto'>
                          ({formatSingleDuration(assignment.createdAt)})
                        </p>
                      </div>
                      <div className={clsx('p-1 text-xs rounded  text-white', assignment.status.toUpperCase()==='COMPLETED'&& 'bg-green-800')}>
                       {assignment.status}
                      </div>
                    </div>

                    <p className='text-sm text-gray-800'>
                      {assignment.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Feeback