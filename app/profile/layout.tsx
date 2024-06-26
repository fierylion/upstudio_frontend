'use client'
import React, {FC} from 'react'
import UserImage from '@/public/images/user.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { SessionUser } from '@/lib/types'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdLogout } from 'react-icons/md'
import { SectionType } from './types'
import {motion, AnimatePresence} from 'framer-motion'

import{FaXmark} from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useAppSelector } from '@/store/hooks'
import { imageUrl } from '@/lib/utils'
   const sections: SectionType[] = [
    {label:'Back Home', url:'/'},
     { label: 'My Account', url: '/profile' },
     { label: 'My Family', url: '/profile/family' },
     { label: 'Subscriptions', url: '/profile/subscriptions' },
     { label: 'Transactions', url: '/profile/transactions' },
   ]

const ProfileLayout:FC<{children:React.ReactNode}> = ({children}) => {
  const currentUrl = usePathname()
  const userDetails = useAppSelector(state=>state.userDetails.userDetails)
 

  return (
    <div className='md:flex relative'>
      {/* shown for large devices */}
      <aside className='hidden md:block  w-80 lg:w-1/3 h-screen  bg-gray-300 sticky top-0 '>
        <div className=''>
          {/* profile */}
          <div className='w-full flex flex-col items-center py-8 space-y-3'>
            <Image
              src={imageUrl(userDetails.img)}
              alt='Profile Picture'
              width={100}
              height={100}
              className='rounded-full w-24 h-24'
            />
            <h1 className='font-medium text-xl'>
              {userDetails.firstName + ' ' + userDetails.lastName}
            </h1>
          </div>
          {/* sections */}
          <div className='border-2  flex flex-col items-center py-8 '>
            <ul className='space-y-6 font-normal text-gray-800'>
              {sections.map((item, ind) => {
                const isCurrent = item.url === currentUrl
                return (
                  <li
                    key={ind}
                    className={clsx(
                      'hover:text-primary-600 ',
                      isCurrent && 'text-primary-600'
                    )}
                  >
                    <Link href={item.url}>{item.label}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
          {/* logout */}
          <div className='flex flex-row space-x-2 py-8 items-center justify-center'>
            <h1>Logout</h1>
            <MdLogout className='w-6 h-6 ' />
          </div>
        </div>
      </aside>

      {/* shown on small devices */}
      <div className='md:hidden w-full  h-14 bg-gray-300 '>
        <div className='flex flex-row justify-between my-auto items-center  h-full px-5'>
          <Image
            src={imageUrl(userDetails.img)}
            alt='user'
            width={40}
            height={40}
            className='self-center rounded-full w-10 h-10'
          />
          <AnimatePresence>
            <RightSideNav
              currentUrl={currentUrl}
              name={userDetails.firstName + ' ' + userDetails.lastName}
            />
          </AnimatePresence>
        </div>
      </div>

      <main className='w-full h-full flex-grow '>{children}</main>
    </div>
  )
}
const RightSideNav: FC<{
  name: string
  currentUrl:string

}> = ({ name, currentUrl }) => {


   const [smallOpenSideNav, setSmallOpenSideNav] = React.useState(false)
    const sidebarRef = React.useRef<HTMLDivElement | null>(null)
    React.useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          setSmallOpenSideNav(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])
    const sidebarVariants = {
      open: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 40,
        },
      },
      closed: {
        x: '100%',

        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 80,
        },
      },
    }
  return (
    <>
      <div className='relative'>
        {!smallOpenSideNav ? (
          <motion.div
          >
            <GiHamburgerMenu
              className='w-6 h-6 cursor-pointer '
              onClick={() => setSmallOpenSideNav(!smallOpenSideNav)}
            />
          </motion.div>
        ) : (
          <motion.div>
            <FaXmark
              className='w-6 h-6 cursor-pointer  '
              onClick={() => setSmallOpenSideNav(!smallOpenSideNav)}
            />
          </motion.div>
        )}
        {smallOpenSideNav && (
          <motion.div
            variants={sidebarVariants}
            initial='closed'
            animate='open'
            exit='closed'
            className=' fixed right-0 w-48 h-screen bg-gray-300 z-30'
            ref={sidebarRef}
          >
            <div>
              {/* profile */}
              <div className='w-full flex flex-col items-center py-8 space-y-3'>
                <h1 className='font-medium text-lg  pl-4'>{name}</h1>
              </div>
              {/* sections */}
              <div className='border-2  flex flex-col items-center py-8 '>
                <ul className='space-y-6 font-normal text-gray-800'>
                  {sections.map((item, ind) => {
                    const isCurrent = item.url===currentUrl
                    return (
                    <li key={ind} className={ clsx('hover:text-primary-600', isCurrent&& 'text-primary-600')}>
                      <Link href={item.url}>{item.label}</Link>
                    </li>
                  )})}
                </ul>
              </div>
              {/* logout */}
              <div className='flex flex-row space-x-2 py-8 items-center justify-center'>
                <h1>Logout</h1>
                <MdLogout className='w-6 h-6 ' />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}




export default ProfileLayout