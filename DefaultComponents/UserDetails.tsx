'use client'
import React from 'react'
import { base } from '@/lib/apis'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useAppDispatch } from '@/store/hooks'
import { setUserDetails } from '@/store/reducers/userDetailsReducer'
import toast from 'react-hot-toast'
async function getUserDetails(token: string ) {
  try {
    const res = await base.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    throw err
  }

}

const UserDetails = () => {
  const dispatch = useAppDispatch()
  const {data:session, status} = useSession()

  const {mutate, isLoading} = useMutation(getUserDetails, {
    onSuccess:(data)=>{
     console.log(data)
      dispatch(setUserDetails({type:'USER_DETAILS', data:data.user}))
    },
    onError:(err:any)=>{
      toast.error(err?.response?.data?.error || 'Something went wrong')
    }
  })
  React.useEffect(()=>{
    if (status==='authenticated') {
      mutate(session?.backendTokens?.accessToken as string)
    }
  }, [session])



  return (
    <div></div>
  )
}

export default UserDetails