import axios from 'axios'
const getBackendUrl = () => {
if(process.env.NEXT_PUBLIC_BACKEND_URL){
 return process.env.NEXT_PUBLIC_BACKEND_URL
}
throw new Error('NEXT_PUBLIC_BACKEND_URL is not set')
}
const version = '/api/v1'
export const base = axios.create({
 baseURL:getBackendUrl()  + version,

})

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
export const baseWsUrl = `wss://${baseUrl?.split('://')[1]}/ws/`