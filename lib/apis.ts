import axios from 'axios'

export const base = axios.create({
 baseURL:process.env.NEXT_PUBLIC_BACKEND_URL,

})