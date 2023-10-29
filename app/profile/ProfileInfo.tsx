'use client'
import React, { useEffect } from 'react'
import UserImage from '@/public/images/user.png'
import Button from '@/components/single/Button'
import Image from 'next/image'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { base } from '@/lib/apis'
import Input from '@/components/single/Input'
import { Spinner } from '@/components'
import toast from 'react-hot-toast'
import { User } from '@/lib/types'
import { useSession } from 'next-auth/react'
import {motion} from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { imageUrl } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { setUserDetails } from '@/store/reducers/userDetailsReducer'
interface ProfileFieldTypes {
  firstName: string
  lastName: string
  email: string
  mobile: string
 
  relationship: string
}
const shema = yup
  .object({
    firstName: yup
      .string()
      .required('Please provide your first name')
      .min(3, 'Must be atlease 3 characters')
      .max(50, 'Cannot exceed 50 characters'),
    lastName: yup
      .string()
      .required('Please provide last name')
      .min(3, 'Must be atlease 3 characters')
      .max(50, 'Cannot exceed 50 characters'),
    email: yup
      .string()
      .required('Please provide your email')
      .email('Please provide a valid email'),
    mobile: yup
      .string()
      .required('Please mobile number ie 07xxxxxxxx')
      .min(10, 'Must be atlease 10 characters')
      .max(10, 'Cannot exceed 10 characters')
      .test('isNumber', 'Please provide a valid mobile number', (value) => {
        return parseInt(value) > 0
      }),
    relationship: yup
      .string()
      .required('Please provide your relationship to learner'),
  })
  .required()
  async function changeUserDetails(data: ProfileFieldTypes, token:string) {
    try {
      const response = await base.patch('user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

async function updateUserImage(img:File, token:string){
  try {
    const formData = new FormData()
    formData.append('img', img)
    const response = await base.post('/user/image', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    
    })
    return response.data
  } catch (error:any) {
    
    toast.error(error?.response?.data?.error || 'Something went wrong')
    return null
  }
}
const ProfileInfo = () => {
   const dispatch = useAppDispatch()
 
const { data: session, status } = useSession()
  const {mutate, isLoading} = useMutation( (data:ProfileFieldTypes)=>changeUserDetails(data, session?.backendTokens.accessToken as string), {
    onMutate:()=>{
      // toast.loading('Updating Details', {id:'loading-toast'})
    },
    onSuccess: (data) => {
      const user:User = data.user
      dispatch(setUserDetails({type:'USER_DETAILS', data:user}))
      // toast.success(`Success!!!`)
    
    },
    onError: (error : {response:{data:{error:string}}}) => {
      toast.error(`Error: ${error.response.data.error}`)
    },
    onSettled: () => {
      // toast.remove('loading-toast')
    }
  })

  //submit
  const onSubmit = (data: ProfileFieldTypes) => {
  console.log(data)
  mutate(data)

  }
  const userDetails = useAppSelector(state=>state.userDetails.userDetails)
 

  const defaultValues = {
   firstName:userDetails.firstName,
   lastName: userDetails.lastName,
   email: userDetails.email,
   mobile:userDetails.mobile,
   relationship:userDetails.relationship
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFieldTypes>({
    resolver: yupResolver(shema),
    mode: 'onChange',
    defaultValues
  })

   React.useEffect(() => {
     if (session) {

       // Use the setValue function to set default values asynchronously
       setValue('firstName', userDetails.firstName)
       setValue('lastName', userDetails.lastName)
       setValue('email', userDetails.email)
       setValue('mobile', userDetails.mobile)
       setValue('relationship', userDetails.relationship)
     }
   }, [session, setValue, userDetails])

   const router = useRouter()
  const uploadImage =async (image:File)=>{
    // toast.loading('Uploading Image...', {id:'loading-image-toast'})
    const val = await updateUserImage(image, session?.backendTokens.accessToken as string)

    // toast.remove('loading-image-toast')
    // val && toast.success('Image Uploaded')
    dispatch(setUserDetails({type:'USER_DETAILS', data:val.user}))
    
  }
  const uploadRef = React.useRef<HTMLInputElement|null>(null)



  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.3}}
    
    className=' mx-auto w-full '>
      <div className='mt-10 w-fit mx-auto'>
        <Image
          src={imageUrl(userDetails.img)}
          alt='Profile Picture'
          width={100}
          height={100}
          className='mb-2 w-24 h-24 rounded-full'
        />
        <div className='flex flex-col items-center'>
          <input
            type='file'
            id='fileInput'
            accept='image/*'
            onChange={(e) => {
              if (e.target.files) {
                uploadImage(e.target.files[0])
              }
            }}
            ref={uploadRef}
            className='hidden'
          
          />
          <label htmlFor='fileInput' className='mt-2'>
            <Button variant={'outline'}  onClick={()=>{
             uploadRef.current?.click()
            }}>Upload</Button>
          </label>
        </div>
      </div>
      <div className='mx-10 mt-5'>
        <form className='w-full ' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-flow-col'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='flex flex-col'>
                  <label htmlFor='firstName' className='mb-1  font-light'>
                    First Name
                  </label>
                  <Input
                    variant={'search'}
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
                    variant={'search'}
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
                    variant={'search'}
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
              <div className='col-span-2'>
                <div className='flex flex-col'>
                  <label htmlFor='mobile' className='mb-1  font-light'>
                    Mobile Number
                  </label>
                  <Input
                    variant={'search'}
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
                  <label htmlFor='relationship' className='mb-1  font-light'>
                    Relationship to Learner(s) *
                  </label>
                  <Input
                    variant={'search'}
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
          <div className='text-center py-5'>
            <Button variant={'outline'} className=''>
              {isLoading ? (
                <Spinner className='mx-auto text-center' />
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default ProfileInfo