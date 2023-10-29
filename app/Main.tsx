import React, { FC } from 'react'
import { CategoryType, LessonTypes, LevelType } from '@/lib/types'
import SingleLesson from './SingleLesson'
import AsideNav from './AsideNav'
import {base} from '@/lib/apis'
import BookSVG from '@/public/svg/book.svg'
import Image from 'next/image'
import { IoFilterSharp } from 'react-icons/io5'
import SmallScreenNav from './SmallScreenNav'

interface Props {
  lessons: LessonTypes[]
  category:string
  level:number

}
async function fetchLevels() {
  try{
    const response = await base.get('/utilities/levels')
    return response.data
  }catch(err){
    return null


  }
}
async function fetchCategories (){
  try{
    const response = await base.get('/utilities/categories')
    return response.data
  }
  catch(err){
    return null
  }
  
}
const Main:FC<Props> = async ({lessons, level, category}) => {
  console.log('fadfaf')
  const lvls =  await fetchLevels();
 const cat  = await fetchCategories();
 const levels:LevelType[]|null = lvls?.levels
 const categories:CategoryType[]|null = cat?.categories


  return (
    <div className='flex flex-row justify-center'>
      <div className='md:hidden'>
        <SmallScreenNav
          levels={levels as LevelType[]}
          categories={categories as CategoryType[]}
          level={level}
          category={category}
        />
      </div>
      <div className='hidden md:block  md:w-1/4 fixed top-32 left-0'>
        {levels && categories && (
          <AsideNav
            levels={levels}
            categories={categories}
            level={level}
            category={category}
          />
        )}
      </div>
      <div className='hidden md:block  md:w-1/4 '></div>
      <div className=' w-10/12 md:w-[70%]  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 '>
        {lessons.length === 0 && (
          <div className='fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <Image
              src={BookSVG}
              width={100}
              height={100}
              alt='No Course Found'
              className='  w-72 h-72 mx-auto  '
            />
            <h3 className='font-medium text-gray-500 text-center '>
              No Course Available, Try Again Later
            </h3>
          </div>
        )}

        {lessons.map((lesson, ind) => (
          <SingleLesson key={ind} lesson={lesson} />
        ))}
      </div>
    </div>
  )
}

export default Main