import React, { FC, useState } from 'react'
import FullScreenModal from '@/components/FullScreenModal'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import Input from '@/components/single/Input'
import { motion } from 'framer-motion'
import Link from 'next/link'  
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { base } from '@/lib/apis'
import { SessionUser, User } from '@/lib/types'
import { Spinner } from '@/components'
import {signIn} from 'next-auth/react'
interface LoginFieldTypes{
  email:string
  password:string
}
interface Props{
  closeModal: ()=>void
}
interface LoginFieldTypes{
  email:string
  password:string
}
const schema = yup.object({
  email: yup
    .string()
    .required('Please provide your email')
    .email('Please provide a valid email'),
  password: yup
    .string()
    .required('Please provide your password')
    .min(8, 'Must be atlease 8 characters')
    .max(50, 'Cannot exceed 50 characters'),
})
async function loginUser(data: LoginFieldTypes) {

}
const Login:FC<Props> = ({closeModal}) => {
    // const { mutate, isLoading } = useMutation(loginUser, {
    //   onMutate: () => {
    //     // toast.loading('Registering...', {id:'loading-toast'})
    //   },
    //   onSuccess: (data) => {
    //     const user: User = data.user
    //     toast.success(
    //       `Welcome ${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()} to upstudio`
    //     )
    //     closeModal()
    //   },
    //   onError: (error: { response: { data: { error: string } } }) => {
    //     toast.error(`Error: ${error.response.data.error}`)
    //   },
    //   onSettled: () => {
    //     // toast.remove('loading-toast')
    //   },
    // })
    const [isLoading, setIsLoading] = useState<boolean>(false)
   const onSubmit = async (data: LoginFieldTypes) => {
    setIsLoading(true)
   
    const response= await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
   
    
    if (response?.error) {
      console.log(response.error, response)
      toast.error(response.error)

    } else {
      console.log(response)
       toast.success(`Welcome to upstudio`)
      closeModal()
    }
    setIsLoading(false)
   }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFieldTypes>({
    resolver: yupResolver(schema),
    mode: 'onChange',
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
              Log in to your account
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
              <div className='grid grid-flow-col  gap-4 '>
                <div className='col-span-2 '>
                  <div className='flex flex-col py-4'>
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
                  <div className='col-span-2 '>
                    <div className='flex flex-col pb-4'>
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
                </div>
              </div>

              <div className='text-center'>
                <motion.button
                  className='w-3/4 mx-auto mt-4 bg-primary-500 text-white rounded py-2 font-medium'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type='submit'
                >
                  {isLoading ? <Spinner className='mx-auto text-center' /> : 'Login'}
                </motion.button>
              </div>
              <div className='text-center mt-4'>
                <Link
                  href='#'
                  className='text-primary-500 text-xs font-medium mt-2 underline'
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
          <AiOutlineClose
            className='absolute top-4 right-2 text-black w-6 h-6 hover:text-primary-500 cursor-pointer'
            onClick={closeModal}
          />
        </div>
      </div>
    </FullScreenModal>
  )
}

export default Login