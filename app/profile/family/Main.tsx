import { base } from '@/lib/apis'
import { getServerSession} from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import React from 'react'
import Image from 'next/image'
import FamilySvg from '@/public/svg/family.svg'
import { LearnerType } from '@/lib/types'
import { baseUrl } from '@/lib/apis'
import { BsFillBellFill } from 'react-icons/bs'
import LearnerCard from './LearnerCard'
import { getLearnerLevels } from '@/actions/learners/levels'
import { LevelType } from '@/lib/types'
import { getLevel } from '@/lib/utils'
async function getAllLearners(token:string){
 try{
 const res = await base.get('/learners', {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 })
 return res.data
 }catch(err){
  
 console.log(err)
 return null 
}

}

const  Main = async () => {
 const session = await getServerSession(authOptions)
 const token = session?.backendTokens?.accessToken as string
 const dataPromises= Promise.all( [getAllLearners(token), getLearnerLevels(token)])
 const data = await dataPromises
 if (!data[0] || !data[1]) {
 return <div>error</div>
 }
 const learners :LearnerType[]= data[0].learners
 const levels :LevelType[] = data[1].levels



  return (
    <div className=''>
      {learners.length <= 0 && (
        <div className=''>
          <Image
            src={FamilySvg}
            alt='Family'
            width={200}
            height={200}
            className='mx-auto '
          />
          <h1 className='text-center text-xl  font-medium text-gray-500'>
            You have no family members yet
          </h1>
        </div>
      )}
      {learners.length > 0 && (
        <div className='grid lg:grid-cols-2 gap-5  px-5 '>
          {learners.map((ln) =>{ 
            const level = getLevel( new Date(ln.birthdate), levels)
            return (
            <LearnerCard key={ln._id} learner={ln} level={level} />
          )})}
        </div>
      )}
    </div>
  )
}

export default  Main