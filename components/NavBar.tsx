"use client"
import React, {useState} from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import Button from './single/Button'
import clsx from 'clsx'
import {GiHamburgerMenu} from 'react-icons/gi'
import SideBarNav from './SideBarNav'

const sections = ["Home", "Schedules", "Message Us"] ;
const NavBar = () => {
 const [currentPage, setCurrentPage] = useState<string>("Home")
 const [openSideNav, setOpenSideNav] = useState<boolean>(false)
 const closeSideNav = ()=>setOpenSideNav(false)
 const handleNavClick = (item: string)=>{
  setCurrentPage(item)
 }
 return (
   <div className=''>
     {/* for large devices */}
     <div className='hidden md:block'>
       <div className='p-3 py-4 flex flex-row justify-between bg-white'>
         <div className='text-center flex flex-row  items-center'>
           <Image src={Logo} alt='logo' width={100} height={100} />
           <ul className='ml-2 flex flex-row space-x-4 '>
             {sections.map((items) => (
               <li
                 className={clsx(
                   'hover:text-primary-600 cursor-pointer',
                   currentPage === items && 'text-primary-600'
                 )}
                 onClick={() => handleNavClick(items)}
               >
                 {items}
               </li>
             ))}
           </ul>
         </div>
         <div className='flex flex-row space-x-4 items-center'>
           <Button className=''>Login</Button>
           <Button>Create Account</Button>
         </div>
       </div>
     </div>
     {/* for small devices */}
     <div className='md:hidden'>
       <div className='p-4 flex flex-row justify-between bg-white items-center '>
         <GiHamburgerMenu className='w-5 h-5 text-primary-600' onClick={()=>setOpenSideNav(true)} />
         <Image src={Logo} alt='logo' width={100} height={100} />
         <div className='flex flex-row space-x-4 items-center'>
           <p className=' text-primary-600 '>Login</p>
         </div>
       </div>
     </div>
     {openSideNav &&
     <SideBarNav closeSideNav={closeSideNav} sections={sections} currentPage={currentPage} handleNavClick={handleNavClick} />
}
   </div>
 )
}

export default NavBar
