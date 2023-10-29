import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { login } from '@/store/reducers/authReducer'
import {useTheme} from 'next-themes'
import { NavBar } from '@/components'
import { CourseType } from '@/lib/types'
import { base } from '@/lib/apis'
import { LessonTypes } from '@/lib/types'
import Main from './Main'
import { FC } from 'react'
async function getAllLessons(category:string|null, level:string|null) {
  try {
    const res = await base.get(`/lessons?category=${category?category:''}&level=${level?level:''}`)
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}
interface Props {
  searchParams: {
    category:string|null
    level:string|null
  }
}

export default  async function Home({searchParams}:Props) {
  const {category, level} = searchParams

  const data= await getAllLessons(category, level)
  if(!data) return <div>error</div>

  const lessons:LessonTypes[] = data.lessons 


  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className='mx-auto mt-28'>
        <Main lessons={lessons.length>0? Array(20).fill(null).map((_)=>{ 
          return lessons[Math.floor(Math.random() * lessons.length)]
        }):[]} category={category?category:''} level={level?parseInt(level):0}/>

      </main>
      {/* <LoadingBar color='#000000'  progress={30} height={7}/> */}
      
    </>
  )
}
