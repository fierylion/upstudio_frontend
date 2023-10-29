'use client'
import React, { useEffect, FC, useRef, Ref } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import Link from 'next/link'
type SectionType = {
  label: string
  url: string
}



interface Props {
  closeSideNav: () => void
 children?:React.ReactNode
}

const SideBarNav: FC<Props> = ({ closeSideNav, children}) => {
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
      x: '-100%',

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
        className='fixed top-0 left-0 h-screen  w-52  bg-white z-50'
        variants={sidebarVariants}
        initial='closed'
        animate='open'
        exit='closed'
      >
        <div className='pt-14 space-y-5'>
         {children}
        </div>
      </motion.div>
    </div>
  )
}

export default SideBarNav
