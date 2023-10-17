"use client"
import React, {useState, FC} from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import Button from './single/Button'
import clsx from 'clsx'
import {GiHamburgerMenu} from 'react-icons/gi'
import SideBarNav from './SideBarNav'
import Login from '@/app/_auth/login'
import Register from '@/app/_auth/register'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import toast from 'react-hot-toast'
import Link from 'next/link'
import {usePathname, useSearchParams} from 'next/navigation'
import UserProfile from './UserProfile'

// interface Props{
//   page?:string,
//   query?:{[key:string]:string}
// }
const NavBar:FC = () => {
  const page = usePathname()
  const query = useSearchParams()

  //authorize
  type SectionType = {
    label:string,
    url:string
  }
  let sections:SectionType[] = [{label:'Home', url:'/'}, {label:'Schedules', url:'/schedules'}, {label:'Message Us', url:'/contact'}, {label:'About Us', url:'/about'}]

  const { data: session, status } = useSession()
  if (status==='unauthenticated') {
    const sectionsToFilter = ['Schedules']
    const filteredSections = sections.filter(
      (item) => !sectionsToFilter.includes(item.label)
    )
    sections = filteredSections
  }
  
  const handleLogout = () => {
     toast.success('Goodbye!')
    signOut( )
   
  }


  const [openSideNav, setOpenSideNav] = useState<boolean>(false)
  //login & register states
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [openRegister, setOpenRegister] = useState<boolean>(false)
  //handler functions
  const closeSideNav = () => setOpenSideNav(false)
  // const handleNavClick = (item: string) => {
  //   setCurrentPage(item)
  // }
  const handleOpenLogin = () => {
    setOpenLogin(!openLogin)
  }
  const handleOpenRegister = () => {
    setOpenRegister(!openRegister)
  }
  return (
    <div className=' fixed top-0 inset-x-0'>
      {/* for large devices */}
      <div className='hidden md:block'>
        <div className='p-3 py-4 flex flex-row justify-between bg-white'>
          <div className='text-center flex flex-row  items-center'>
            <Image src={Logo} alt='logo' width={100} height={100} />

            <ul className='ml-2 flex flex-row space-x-4 '>
              {sections.map((items, ind) => (
                <li
                  key={ind}
                  className={clsx(
                    'hover:text-primary-600 cursor-pointer',
                    page === items.url && 'text-primary-600'
                  )}
                  // onClick={() => handleNavClick(items.label)}
                >
                  <Link href={items.url}>{items.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-row space-x-4 items-center'>
            {status === 'unauthenticated' ? (
              <>
                <Button className='' onClick={handleOpenLogin}>
                  Login
                </Button>
                <Button onClick={handleOpenRegister}>Create Account</Button>
              </>
            ) : (
              <UserProfile name={'Daniel Mawalla'} />
            )}
          </div>
        </div>
      </div>
      {/* for small devices */}
      <div className='md:hidden'>
        <div className='p-4 flex flex-row justify-between bg-white items-center '>
          <GiHamburgerMenu
            className='w-5 h-5 text-primary-600 hover:opacity-80'
            onClick={() => setOpenSideNav(true)}
          />
          <Image src={Logo} alt='logo' width={100} height={100} />
          <div className='flex flex-row space-x-4 items-center'>
            <div
              className=' text-primary-600 hover:opacity-75 cursor-pointer '
              onClick={
                status === 'unauthenticated' ? handleOpenLogin : () => {}
              }
            >
              {status === 'unauthenticated' ? (
                'Login'
              ) : (
                <UserProfile name='Daniel Mawalla' profileOnly={true} />
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openSideNav && (
          <SideBarNav
            closeSideNav={closeSideNav}
            sections={sections}
            currentPage={page}
            // handleNavClick={handleNavClick}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openLogin && <Login closeModal={handleOpenLogin} />}
        {openRegister && <Register closeModal={handleOpenRegister} />}
      </AnimatePresence>
    </div>
  )
}

export default NavBar
