"use client"
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { login } from '@/store/reducers/authReducer'
import {useTheme} from 'next-themes'
export default function Home() {

  return (
    <main className="">
      <h1 className='text-center'>Up Studio</h1>

    </main>
  )
}
