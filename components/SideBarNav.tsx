import React, {useEffect, FC, useRef, Ref} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import clsx from 'clsx';
interface Props {
 closeSideNav:()=>void;
 sections: string[];
 currentPage:string;
 handleNavClick:(page:string)=>void;

 
}

const SideBarNav: FC<Props>= ({closeSideNav, sections, currentPage, handleNavClick}) => {
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
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }
  return (
    <div ref={sidebarRef as React.MutableRefObject<HTMLDivElement>}>
      <AnimatePresence initial={false}>
        <motion.div
          className='fixed top-0 left-0 h-screen  w-44  bg-white z-50'
          variants={sidebarVariants}
          initial='closed'
          animate='open'
          exit='closed'
        >
          <div className='p-4 pt-14 space-y-5'>
            {sections.map((item, ind) => (
              <p
                className={clsx(
                  'hover:text-primary-600 cursor-pointer',
                  currentPage === item && 'text-primary-600'
                )}
                onClick={()=>handleNavClick(item)}
                key={ind}
              >
                {item}
              </p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SideBarNav