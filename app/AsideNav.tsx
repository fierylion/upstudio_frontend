'use client'
import Button from '@/components/single/Button'
import { CategoryType, LevelType } from '@/lib/types'
import React, { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
interface Props{
 levels:LevelType[]
 categories: CategoryType[]
 category:string
 level:number
 closeSideNav?:()=>void
}
const AsideNav:FC<Props> = ({levels, categories, category, level, closeSideNav}) => {
 const router = useRouter()
 const params = useSearchParams()
 const [catValue, setCatValue] = React.useState<string>(category)
 const [levValue, setLevValue] = React.useState<number>(level)
 const handleLevelChange = (lvl:LevelType) => {
  setLevValue(lvl.level)
 }
 const handleCategoryChange = (cat:CategoryType) => {
  setCatValue(cat.slug)
 }
 const handleClearAll = () => {
   setCatValue('')
   setLevValue(0)
  const newParams = new URLSearchParams(params.toString())
  newParams.delete('category')
  newParams.delete('level')
  router.push(`/?${newParams.toString()}`)
  closeSideNav && closeSideNav()
 
 
 }
 const handleApplyFilters = () => {
  const newParams = new URLSearchParams(params.toString())
  if(catValue){
   newParams.delete('category')
    newParams.set('category', catValue)
  }
  if(levValue){
   newParams.delete('level')
    newParams.set('level', levValue.toString())
  }
  router.push(`/?${newParams.toString()}`)
  closeSideNav && closeSideNav()

 }

  return (
    <div className='lg:w-1/2 md:w-3/4 ml-7 space-y-14'>
      <div className='flex flex-row justify-between  '>
        <div
          className='my-auto text-gray-400 font-medium text-sm cursor-pointer '
          onClick={handleClearAll}
        >
          CLEAR ALL
        </div>
        <Button
          size={'small'}
          className='w-16 text-xs '
          onClick={handleApplyFilters}
        >
          APPLY
        </Button>
      </div>
      <div>
        <h2 className='text-sm font-medium mt-2 text-gray-500'>AGE GROUP</h2>
        <div className='ml-4 mt-3 text-sm space-y-3'>
          {levels.map((it, ind) => (
            <div
              className='flex flex-row cursor-pointer'
              onClick={() => handleLevelChange(it)}
            >
              <input
                type='checkbox'
                className='mr-3 w-4 h-4'
                checked={it.level === levValue ? true : false}
              />
              <label htmlFor='age my-auto'>
                {it.description}({`${it.startAge} - ${it.endAge}`})
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-sm font-medium mt-2 text-gray-500'>COURSE AREA</h2>
        <div className='ml-4 mt-3 text-sm space-y-3'>
          {categories.map((it, ind) => (
            <div
              className='flex flex-row cursor-pointer'
              onClick={() => handleCategoryChange(it)}
            >
              <input
                type='checkbox'
                className='mr-3 w-4 h-4'
                checked={it.slug === catValue ? true : false}
              />
              <label htmlFor='age my-auto'>{it.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const RadioSelect:FC<{value:string, setValue:()=>void}> = () => {
 return (
   <div className='flex flex-row '>
     <input type="radio" name="age" id="age" value="age" className='mr-2' />
     <label htmlFor="age my-auto">Age</label>
     
   </div>
 )
}


export default AsideNav