export { default } from 'next-auth/middleware'

export const config = { matcher: ['/schedules/:path*','/profile/:path*'] }
