import axios from 'axios'
console.log(process.env.BASE_URL)
export const base = axios.create({
 baseURL:process.env.NEXT_PUBLIC_BACKEND_URL,

})