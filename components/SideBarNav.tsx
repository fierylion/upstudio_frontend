import React, {useEffect, FC, useRef, Ref} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import clsx from 'clsx';
import Link from 'next/link'
  type SectionType = {
    label: string
    url: string
  }
interface Props {
 closeSideNav:()=>void;
 sections: SectionType[];
 currentPage:string;
//  handleNavClick:(page:string)=>void;

 
}

const SideBarNav: FC<Props>= ({closeSideNav, sections, currentPage}) => {
 const sidebarRef = useRef<HTMLDivElement|null>()
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
     
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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
        className='fixed top-0 left-0 h-screen  w-44  bg-white z-50'
        variants={sidebarVariants}
        initial='closed'
        animate='open'
        exit='closed'
      >
        <div className='p-4 pt-14 space-y-5'>
          {sections.map((item, ind) => (
            <Link
            href={item.url}
            >
              <p
                className={clsx(
                  'hover:text-primary-600 cursor-pointer',
                  currentPage === item.url && 'text-primary-600'
                )}
                onClick={() => {
                  // handleNavClick(item.label)
                  closeSideNav()
                }}
                key={ind}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SideBarNav