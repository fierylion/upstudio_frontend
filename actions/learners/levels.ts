import { base } from "@/lib/apis"
export const getLearnerLevels = async (token:string)=>{
 try{
 const res = await base.get('/learners/levels/all', {
  headers:{
   Authorization: `Bearer ${token}`
  }
 })

 return res.data
 } catch(err){
  return null
 }

} 