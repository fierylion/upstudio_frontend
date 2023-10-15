'use client'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { login } from '@/store/reducers/authReducer'
import {useTheme} from 'next-themes'
import { NavBar } from '@/components'
import LoadingBar from 'react-top-loading-bar'
export default function Home() {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main></main>
      {/* <LoadingBar color='#000000'  progress={30} height={7}/> */}
      
    </>
  )
}
