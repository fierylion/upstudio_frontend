import React, {FC, useState, useRef, useEffect} from 'react'
import UserIcon from '@/public/images/user.png'
import Image from 'next/image'
import {FiChevronDown, FiUser} from 'react-icons/fi'
import {MdLogout} from 'react-icons/md'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import {signOut} from 'next-auth/react'

interface Props{
 name:string
 profileOnly?:boolean
}
interface SectionsTypes{
  label:string
  Img:typeof FiUser
  url:string
}

const UserProfile:FC<Props> = ({name, profileOnly=false}) => {
 const [openProfile, setOpenProfile] = useState<boolean>(false)
 const [isOpenSideNav, setIsOpenSideNav] = useState<boolean>(false)
 const sections: SectionsTypes[] = [
   { label: 'View Profile', Img: FiUser, url: '/profile' },
   {
     label: 'WhatsApp Us',
     Img: AiOutlineQuestionCircle,
     url: 'https://chat.whatsapp.com/K4G0tHCJ6h5EmSo6YgeTzs',
   },
   { label: 'Logout', Img: MdLogout, url: '#' },
 ]
  return (
    <div
      className=' relative cursor-pointer '
      onClick={()=>{
        if(isOpenSideNav) return
        if(profileOnly){
          setIsOpenSideNav(!isOpenSideNav)  }
      }}
      onMouseEnter={() => {
        !profileOnly && setOpenProfile(true)
      }}
      onMouseLeave={() => {
        !profileOnly && setOpenProfile(false)
      }}
    >
      <div className='flex flex-row  space-x-4 items-center'>
        <Image src={UserIcon} alt='user' width={30} height={30} />
        {!profileOnly && (
          <div className=' flex flex-row items-center'>
            <p className='text-sm font-semibold opacity-90'>{name}</p>
            <FiChevronDown className='w-6 h-6 opacity-90 ' />
          </div>
        )}
      </div>
      <AnimatePresence>
        {openProfile && !profileOnly && (
          <motion.div 
          initial={{opacity:0 , y:-10, }}
          animate={{opacity:1, y:0, }}
          exit={{opacity:0, y:-10, }}
          className='absolute right-3 w-full bg-white pt-2 px-3 rounded  '>
            {sections.map((item) =>{
              
              return (
                <Link
                href={item.url}
                key={item.label}
                target={item.label === 'WhatsApp Us' ? '_blank' : '_self'}
                onClick={()=>{
                  if(item.label === 'Logout'){
                    signOut()
                  }
                }}
                >
                  <div className='flex flex-row items-center space-x-2 border-b py-4  hover:opacity-80'>
                    <item.Img className='w-4 h-4 text-gray-700' />
                    <h4 className='text-sm font-light  text-gray-700'>
                      {item.label}
                    </h4>
                  </div>
                </Link>
              )})}
          </motion.div>
        )}
        {
          isOpenSideNav&& profileOnly && <RightSideNav sections={sections} closeSideNav={()=>setIsOpenSideNav(false)} />
        }
      </AnimatePresence>
    </div>
  )
}

const RightSideNav: FC<{sections:SectionsTypes[],closeSideNav:()=>void}> = ({ sections, closeSideNav}) => {
  const sidebarRef = useRef<HTMLDivElement | null>()
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSideNav()
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
    <div ref={sidebarRef as React.MutableRefObject<HTMLDivElement>}>
      <motion.div
        className='fixed right-0 mt-6 h-screen  w-44  bg-white'
        variants={sidebarVariants}
        initial='closed'
        animate='open'
        exit='closed'
      >
        <div className='p-4 pt-0  '>
          {sections.map((item, ind) => (
            <Link
              href={item.url}
              key={item.label}
              target={item.label === 'WhatsApp Us' ? '_blank' : '_self'}
              onClick={() => {
                if (item.label === 'Logout') {
                  signOut()
                }
              }}
            >
              <div className='flex flex-row items-center space-x-2 border-b py-4  hover:opacity-80'>
                <item.Img className='w-4 h-4 text-gray-700' />
                <h4 className='text-sm font-light  text-gray-700'>
                  {item.label}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}





export default UserProfile