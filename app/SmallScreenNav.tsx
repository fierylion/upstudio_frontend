'use client'
import React, { FC } from 'react'
import AsideNav from './AsideNav'
import AsideFilterNav from './AsideFilterNav'
import {IoFilterSharp } from 'react-icons/io5'
import { CategoryType, LevelType } from '@/lib/types'
import { AnimatePresence } from 'framer-motion'
interface Props {
  levels: LevelType[]
  categories: CategoryType[]
  category: string
  level: number

}
const SmallScreenNav:FC<Props> = ({ levels, level, categories, category}) => {
 const [showAsideNav, setShowAsideNav] = React.useState<boolean>(false)
 const closeSideNav = () => {
  setShowAsideNav(false)
 }

  return (
    <div>
      <div className='fixed bottom-14 z-10 bg-gray-100  left-7 p-2 px-4 rounded-3xl shadow-3xl flex flex-row space-x-2' onClick={()=>setShowAsideNav(true)}>
        <IoFilterSharp className='w-7 h-7'  />
        <h2 className='text-lg font-medium'>Filter</h2>
      </div>
      <AnimatePresence>
        {showAsideNav && (
          <AsideFilterNav closeSideNav={closeSideNav as ()=>void}>
            <AsideNav
              level={level}
              levels={levels}
              categories={categories}
              category={category}
              closeSideNav={closeSideNav}
            />
          </AsideFilterNav>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SmallScreenNav