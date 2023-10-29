'use client'
import React, { FC, useState } from 'react'
import FullScreenModal from '@/components/FullScreenModal'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'
import { motion } from 'framer-motion'
import Input from '@/components/single/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { base } from '@/lib/apis'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { User } from '@/lib/types'
import { Spinner } from '@/components'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { PiUserCirclePlusDuotone } from 'react-icons/pi'
import CustomSelect from '@/components/single/CustomSelect'
import { useRouter } from 'next/navigation'
interface Props {
  setIsShowRegister: (isShow:boolean) => void
}

//registration schema
interface RegisterFieldTypes {

  firstName: string
  lastName: string
  relationship:string
  profileImage: string,
  birthdate: Date,
  schoolYear: string,
  schoolName: string,
  learningStyle: string,
  disabilities: string,
  healthCondition: string,
  pictureConsent?: boolean | undefined,

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
     profileImage: yup.string().required('Please provide your profile image'),
    relationship: yup.string().required('Please provide your relationship'),
    birthdate:  yup.date().required('Please provide your birthdate').test('valid birthdate', 'You should be 4 years old and above', (value) => {
      return (new Date().getFullYear() -  new Date(value).getFullYear()) >= 4   
      }),
    schoolYear: yup.string().required('Please provide your school year'),
    schoolName: yup.string().required('Please provide your school name'),
    learningStyle: yup.string().required('Please provide your learning style'),
    disabilities: yup.string().required('If your child has any disabilities, please provide it here'),
    healthCondition: yup.string().required('If your child has any allergies or health condition, please provide it here'),
    pictureConsent: yup.boolean().test('consent', 'Please give your consent to continue',(value)=>{
      return value
    } ),

  })
  .required()



const Register: FC<Props> = ({ setIsShowRegister }) => {
  const router = useRouter()
   const { data: session, status } = useSession()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFieldTypes>({
    resolver: yupResolver(shema),
    mode: 'onChange',
  })
  //@ts-ignore
  const profileImage: FileList = watch('profileImage')
  const schoolName = watch('schoolName')

     
   async function registerLearner(data: RegisterFieldTypes) {
     const formData = new FormData()
     for (const key in data) {
       if (key === 'profileImage') {
        
         formData.append(key, profileImage[0])
       } else {
         formData.append(key, data[key as keyof RegisterFieldTypes] as string)
       }
     }

     try {
       const response = await base.post('learners/register', formData, {
         headers: {
           Authorization: `Bearer ${session?.backendTokens.accessToken}`,
           'Content-Type': 'multipart/form-data',
         },
       })
       return response.data
     } catch (error) {
       throw error
     }
   }
   const { mutate, isLoading } = useMutation(registerLearner, {
     onMutate: () => {
       // toast.loading('Signing In...', {id:'loading-toast'})
     },
     onSuccess: (data) => {
       const learner = data.learner
       toast.success(`Welcome ${learner.firstName} ${learner.lastName}`)
       setIsShowRegister(false)
       router.refresh()
     },
     onError: (error: { response: { data: { error: string } } }) => {
       toast.error(`Error: ${error.response.data.error}`)
     },
     onSettled: () => {
       // toast.remove('loading-toast')
     },
   })

  const onSubmit = async (data: RegisterFieldTypes) => {
    
    mutate(data)
    console.log(data, profileImage)
  }
  const schools = ['St Ann', 'St Mary', 'St  Trains', 'Libermann']
  const relatives = ['Father', 'Mother', 'Sister', 'Brother', 'Cousin', 'Aunt', 'Others']
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
            <h3 className='my-4 font-medium text-center'>
              Learner's Information
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
              <div className='grid grid-flow-col space-y-3'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='mx-auto relative'>
                    <div
                      onClick={() => {
                        document.getElementById('fileInput')?.click()
                      }}
                    >
                      {profileImage?.length > 0 ? (
                        <Image
                          src={URL.createObjectURL(profileImage[0])}
                          alt='profile'
                          width={100}
                          height={100}
                          className='rounded-full'
                        />
                      ) : (
                        <PiUserCirclePlusDuotone className=' w-32 h-32 text-gray-500 cursor-pointer' />
                      )}
                    </div>
                    <input
                      type='file'
                      id='fileInput'
                      accept='image/*'
                      {...register('profileImage')}
                      className='hidden'
                    />
                    {errors.profileImage && (
                      <span className='text-primary-500 text-xs font-medium mt-2'>
                        {errors.profileImage.message}
                      </span>
                    )}
                  </div>
                  <div className=' space-y-2'>
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
                  </div>

                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='email' className='mb-2  font-light'>
                        Relationship to Learner(s)
                      </label>
                    <CustomSelect
                    placeholder='Select your relationship to learner'
                    items={relatives}

                  setValue={(it) => {
                    setValue('relationship', it)
                    }}
                  value={watch('relationship')}

                    />
                      {errors.relationship && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.relationship.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='mobile' className='mb-2  font-light'>
                        Date of Birth *
                      </label>
                      <Input
                        id='birthdate'
                        type='date'
                        className=' placeholder:gray-300'
                        placeholder='Enter learner date of birth'
                        {...register('birthdate')}
                      />
                      {errors.birthdate && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.birthdate.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='password' className='mb-2  font-light'>
                        School year/Grade *
                      </label>
                      <Input
                        id='grade'
                        type='text'
                        placeholder="Learner's school year/grade  "
                        {...register('schoolYear')}
                      />
                      {errors.schoolYear && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.schoolYear.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='verifyPassword'
                        className='mb-2 font-light'
                      >
                        School Name *
                      </label>
                      <CustomSelect
                        value={schoolName}
                        setValue={(it) => {
                          setValue('schoolName', it)
                        }}
                        items={schools}
                        placeholder='Select your school'
                      />
                      {errors.schoolName && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.schoolName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='verifyPassword'
                        className='mb-2 font-light'
                      >
                        School Name *
                      </label>
                      <Input
                        id='school'
                        type='text'
                        placeholder='Learner school name'
                        {...register('schoolName')}
                      />
                      {errors.schoolName && (
                        <span className='text-primary-500 text-xs font-medium mt-2'>
                          {errors.schoolName.message}
                        </span>
                      )}
                    </div>
                  </div> */}
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='learningStyle'
                        className='mb-2 font-light'
                      >
                        What is your child's learning style preference? *
                      </label>
                      <Input
                        id='learningStyle'
                        placeholder='Learning Style'
                        {...register('learningStyle')}
                      />
                      {errors.learningStyle && (
                        <span className='text-primary-500 text-xs font-medium mt-2 '>
                          {errors.learningStyle.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='disabilities'
                        className='mb-2  font-light'
                      >
                        Does the learner have any learning or other
                        disabilities? *
                      </label>
                      <Input
                        id='disabilities'
                        placeholder='Disabilities'
                        {...register('disabilities')}
                      />
                      {errors.disabilities && (
                        <span className='text-primary-500 text-xs font-medium mt-2 '>
                          {errors.disabilities.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='health' className='mb-2  font-light'>
                        Does the learner have any allergies or health
                        conditions? *
                      </label>
                      <Input
                        id='health'
                        placeholder='health / allergies'
                        {...register('healthCondition')}
                      />
                      {errors.healthCondition && (
                        <span className='text-primary-500 text-xs font-medium mt-2 '>
                          {errors.healthCondition.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-span-2 flex flex-row space-x-5 mx-3'>
                    <Input
                      id='consent'
                      placeholder='consent'
                      type='checkbox'
                      className='w-7 h-7'
                      {...register('pictureConsent')}
                    />

                    <h3 className='text-xs md:text-sm items-start  text-gray-600'>
                      UpStudio Africa is allowed to take pictures and videos of
                      learners and parents during Studios for publications,
                      promotions and other marketing-related platforms *
                    </h3>
                  </div>
                  {errors.pictureConsent && (
                    <span className='text-primary-500 text-xs font-medium mt-2'>
                      {errors.pictureConsent.message}
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
                    'Register'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
          <AiOutlineClose
            className='absolute top-2 right-4  text-gray-500 w-6 h-6 hover:text-primary-500 cursor-pointer'
            onClick={() => setIsShowRegister(false)}
          />
        </div>
      </div>
    </FullScreenModal>
  )
}

export default Register
