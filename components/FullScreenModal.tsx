'use client'
import React, {FC, useEffect, useRef} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props{
 children: React.ReactNode
 closeModal?:()=>void
}
const FullScreenModal:FC<Props> = ({children, closeModal}) => {
 const modalRef = useRef<HTMLDivElement |null>(null)
 useEffect(() => {
   // Function to handle clicks outside the children
   if (!closeModal) return
   const handleClickOutside = (event: MouseEvent) => {
     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
       closeModal() // Close the modal when clicked outside
     }
   }

   // Add event listener to the document
   document.addEventListener('mousedown', handleClickOutside)

   // Clean up the event listener when the component unmounts
   return () => {
     document.removeEventListener('mousedown', handleClickOutside)
   }
 }, [closeModal])


  return (
    
   <motion.div 
   

   initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}

   
   className=' absolute w-full h-screen overflow-y-scroll inset-0 bg-black bg-opacity-50 ' ref={modalRef}>
    {children}
   </motion.div>

  )
}

export default FullScreenModal