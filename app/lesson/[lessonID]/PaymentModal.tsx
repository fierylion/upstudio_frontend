'use client'
import React, { FC } from 'react'
import FullScreenModal from '@/components/FullScreenModal'
import { LearnerType, LessonTypes } from '@/lib/types'
import Form from './Form'
import { AiOutlineClose } from 'react-icons/ai'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { base } from '@/lib/apis'
import { Spinner } from '@/components'
import Input from '@/components/single/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import AirtelImage from '@/public/images/airtel.png'
import MpesaImage from '@/public/images/mpesa.jpeg'
import TigoImage from '@/public/images/tigo.png'
import AzamImage from '@/public/images/azam.jpg'
import {BsCheckCircle} from 'react-icons/bs'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { formatNumberWithCommas } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { baseWsUrl } from '@/lib/apis'
interface PaymentProps {
  mobile:string
  network:string

}
const schema = yup.object({
  mobile: yup
    .string()
    .required('Please mobile number ie 07xxxxxxxx')
    .min(10, 'Must be atlease 10 characters')
    .max(10, 'Cannot exceed 10 characters')
    .test('isNumber', 'Please provide a valid mobile number', (value) => {
      return parseInt(value) > 0
    }),
  network: yup.string().required('Please select a network'),
    
})
async function makePayment(data: PaymentProps, lessonID:string, learnerID:string, token:string) {
  const {mobile, network} = data
  try{
  const res = await base.post('/payments/create', {mobile, network, lessonID, learnerID}, {
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return res.data}catch(err){
    throw err
  }

}
// async function imitateCallback(data:any){
//   const {reference} = data;
//     try {
//       const res = await base.post(
//         '/payments/callback',
//         { reference:data.data.payment.reference }
//       )

//     } catch (err) {
//       console.log(err)
//     }
// }

const PaymentModal:FC<{learners:LearnerType[], learnerID:string|null, lesson:LessonTypes}> = ({learners, learnerID, lesson}) => {


  const { data: session, status } = useSession()

  const router = useRouter()
  const  pathname = usePathname()
  const query = useSearchParams().toString()
  // console.log(query)

  const removeQueryParam = (param:string) => {

    const params = new URLSearchParams(query)
    params.delete(param)
    router.replace(pathname+'?'+params.toString())
  }
  const { mutate, isLoading } = useMutation((data: PaymentProps) => makePayment(data, lesson._id, learnerID as string, session?.backendTokens.accessToken as string), {
    onMutate: () => {
      toast.loading('Generating Payment Link...', { id: 'loading-toast' })
    },
    onSuccess: (data) => {
      if(data.success){
        toast.loading('Please Confirm Payment...', { id: 'confirm-toast' } )

        // imitateCallback(data)
        const ws = new WebSocket(baseWsUrl)
        ws.addEventListener('open', () => {
          const message = {
            type: 'joinPaymentRoom',
            data: { reference: data.data.payment.reference },
          }

          ws.send(JSON.stringify(message))
        })
        ws.addEventListener('message', (event) => {
            try {
              const data = JSON.parse(event.data)

              if (data.type === 'paymentStatus') {
                // Handle the payment success message
                toast.success(data.message)
                 toast.remove('confirm-toast')
                removeQueryParam('payment')

              }
            } catch (error) {
              console.error('Invalid WebSocket message:', event.data)
            }
        })
      }
      
     
    },
    onError: (error: { response: { data: { error: string } } }) => {
      toast.error(` Error ${error?.response?.data?.error}`)
    },
    onSettled: () => {
      toast.remove('loading-toast')
    },
  })
   type provider = 'Airtel' | 'Tigo' | 'Halopesa' | 'Azampesa' | 'Mpesa' 

  const networks = [
    {label:'Tigo Pesa', name:'Tigo', Img:TigoImage},
    {label:'Airtel Money',name:'Airtel', Img:AirtelImage},
    {label:'Azam Pesa',name:'Azampesa', Img:AzamImage},
    {label:'Mpesa',name:'Mpesa', Img:MpesaImage},
    
  ]
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm<PaymentProps>({
      resolver: yupResolver(schema),
      mode: 'onChange',
    })
    const onSubmit = (data:PaymentProps)=>{
      if(!learnerID){
        toast.error('Please select a student')
        return
      }
      mutate(data)
    }
    const network = watch('network')
   
  return (
    <FullScreenModal>
      <div className='w-full flex justify-center pb-10 '>
        <div className='relative  mt-12  w-full md:w-3/4 lg:w-1/2 bg-white rounded mx-4 p-4 '>
          <Image
            src={Logo}
            alt='logo'
            width={100}
            height={100}
            className='mx-auto w-32'
          />
          <div>
            <Form
              learnerID={learnerID}
              learners={learners}
              lessonID={lesson._id}
              persistUrl={`${pathname}?${query.toString()}`}
            />
          </div>
          <div className='mt-2'>
            <h1 className='text-center text-primary-600 font-medium text-lg '>
              Amount: {formatNumberWithCommas(lesson.course.price)}/= Only
            </h1>
            <h3 className='my-3 font-medium '>Please choose payment option.</h3>
            {errors.network && (
              <span className='text-primary-500 text-xs font-medium mt-2'>
                {errors.network.message}
              </span>
            )}
            <div className='grid grid-cols-2 gap-4'>
              {networks.map((net) => {
                return (
                  <div
                    className={clsx(
                      'relative mx-auto',
                      net.name === network && 'z-50 transform scale-x-105'
                    )}
                    onClick={() => setValue('network', net.name)}
                  >
                    <Image
                      src={net.Img}
                      alt={net.label}
                      width={100}
                      height={100}
                      className='h-20 rounded-lg'
                    />
                    {net.name === network && (
                      <BsCheckCircle className='absolute top-2 right-2 w-6 h-6 text-white' />
                    )}
                  </div>
                )
              })}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
              <div className='w-full mx-3'>
                <div className='flex flex-col'>
                  <label htmlFor='mobile' className='mb-1 py-2 font-semibold  '>
                    Mobile Number
                  </label>
                  <Input
                    id='mobile'
                    placeholder={`Enter your ${network} number`}
                    {...register('mobile')}
                  />
                  {errors.mobile && (
                    <span className='text-primary-500 text-xs font-medium mt-2'>
                      {errors.mobile.message}
                    </span>
                  )}
                </div>
              </div>

              <div className='text-center my-3'>
                <motion.button
                  className='w-3/4 mx-auto mt-4 bg-primary-500 text-white rounded py-2 font-medium'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type='submit'
                >
                  {isLoading ? (
                    <Spinner className='mx-auto text-center' />
                  ) : (
                    'Make Payment'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
          <AiOutlineClose
            className='absolute top-4 right-2 text-black w-6 h-6 hover:text-primary-500 cursor-pointer'
            onClick={() => removeQueryParam('payment')}
          />
        </div>
      </div>
    </FullScreenModal>
  )
}

export default PaymentModal