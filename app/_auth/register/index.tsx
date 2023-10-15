'use client'
import React, { FC, useState } from 'react'
import FullScreenModal from '@/components/FullScreenModal'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'
import { motion } from 'framer-motion'
import Input from '@/components/single/Input'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { base } from '@/lib/apis'
import {useMutation} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { User } from '@/lib/types'
import { Spinner } from '@/components'
import { signIn } from 'next-auth/react'
interface Props{
  closeModal: ()=>void
}

//registration schema
interface RegisterFieldTypes{
 firstName:string
 lastName:string
 email:string
 mobile:string,
 password:string
 verifyPassword:string
 relationship:string
}
const shema = yup.object(
 {
  firstName: yup.string().required('Please provide your first name')
  .min(3, 'Must be atlease 3 characters')
  .max(50, 'Cannot exceed 50 characters'),
  lastName:yup.string()
  .required('Please provide last name')
  .min(3, 'Must be atlease 3 characters')
  .max(50, 'Cannot exceed 50 characters'),
  email:yup.string()
  .required('Please provide your email')
  .email('Please provide a valid email'),
  mobile:yup.string() 
  .required('Please mobile number ie 07xxxxxxxx')
  .min(10, 'Must be atlease 10 characters')
  .max(10, 'Cannot exceed 10 characters').test(
    'isNumber',
    'Please provide a valid mobile number',
    (value) => {
      return parseInt(value) > 0
    }
  )
  ,
  password:yup.string()
  .required('Please provide your password')
  .min(8, 'Must be atlease 8 characters')
  .max(50, 'Cannot exceed 50 characters'),
  verifyPassword:yup.string()
  .required('Please provide your password')
  .min(8, 'Must be atlease 8 characters')
  .max(50, 'Cannot exceed 50 characters')
  .oneOf([yup.ref('password')], 'Passwords must match'),
  relationship:yup.string()
  .required('Please provide your relationship to learner') }
).required()

async function registerUser(data:RegisterFieldTypes) {
  try {
    const response = await base.post('auth/register', data)
    return response.data
  } catch (error) {
    throw error
  }
}
const Register:FC<Props> = ({closeModal}) => {
  // const {mutate, isLoading} = useMutation(registerUser, {
  //   onMutate:()=>{
  //     // toast.loading('Signing In...', {id:'loading-toast'})
  //   },
  //   onSuccess: (data) => {
  //     const user:User = data.user
  //     toast.success(`Welcome ${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()} to upstudio`)
  //     closeModal()
  //   },
  //   onError: (error : {response:{data:{error:string}}}) => {
  //     toast.error(`Error: ${error.response.data.error}`)
  //   },
  //   onSettled: () => {
  //     // toast.remove('loading-toast')
  //   }
  // })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onSubmit = async (data:RegisterFieldTypes)=>{
    setIsLoading(true)
       try {
         const registerUser = await base.post('auth/register', data)

       } catch (error:any) {
         toast.error(`Error: ${error?.response?.data?.error}` )
         setIsLoading(false)
          return
       }

    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (response?.error) {
      console.log(response.error, response)
      toast.error('There is something wrong, please try again')
    } else {
      console.log(response)
      toast.success(`Welcome to upstudio`)
      closeModal()
    }
    setIsLoading(false)
  }
  const {register, handleSubmit, formState:{errors}} = useForm<RegisterFieldTypes>({
    resolver:yupResolver(shema),
    mode:'onChange'
  })
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
          <div className='mt-2'>
            <h3 className='my-3 font-medium text-center'>
              Create your Account
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
              <div className='grid grid-flow-col'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <div className='flex flex-col'>
                      <label htmlFor='firstName' className='mb-1  font-light'>
                        First Name
                      </label>
                      <Input
                        id='firstName'
                        placeholder='Enter your first name'
                        {...register('firstName')}
                      />
                      {errors.firstName && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className='flex flex-col'>
                      <label htmlFor='lastName' className='mb-1  font-light'>
                        Last Name
                      </label>
                      <Input
                        id='lastName'
                        placeholder='Enter your last name'
                        {...register('lastName')}
                      />
                      {errors.lastName && (
                        <span className=' text-primary-500 text-xs font-medium mt-2'>
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='email' className='mb-1  font-light'>
                        Email
                      </label>
                      <Input
                        id='email'
                        placeholder='Enter your email'
                        {...register('email')}
                      />
                      {errors.email && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-1'>
                    <div className='flex flex-col'>
                      <label htmlFor='mobile' className='mb-1  font-light'>
                        Mobile Number
                      </label>
                      <Input
                        id='mobile'
                        placeholder='Enter your mobile number'
                        {...register('mobile')}
                      />
                      {errors.mobile && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.mobile.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='password' className='mb-1  font-light'>
                        Password
                      </label>
                      <Input
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        {...register('password')}
                      />
                      {errors.password && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='verifyPassword'
                        className='mb-1  font-light'
                      >
                        Verify Password
                      </label>
                      <Input
                        id='verifyPassword'
                        type='password'
                        placeholder='Re-enter your password'
                        {...register('verifyPassword')}
                      />
                      {errors.verifyPassword && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.verifyPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='relationship'
                        className='mb-1  font-light'
                      >
                        Relationship to Learner
                      </label>
                      <Input
                        id='relationship'
                        placeholder='Enter your relationship to learner'
                        {...register('relationship')}
                      />
                      {errors.relationship && (
                        <span className='text-primary-500 text-xs font-medium mt-2 '>
                          {errors.relationship.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <motion.button
                  className='w-3/4 mx-auto mt-4 bg-primary-500 text-white rounded py-2 font-medium'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type='submit'
                >
                  {isLoading ? (
                    <Spinner className='mx-auto text-center'/>
                  ) : (
                    'Register'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
          <AiOutlineClose
            className='absolute top-2 right-4  text-gray-500 w-6 h-6 hover:text-primary-500 cursor-pointer'
            onClick={closeModal}
          />
        </div>
      </div>
    </FullScreenModal>
  )
}

export default Register