import NextAuth from 'next-auth'
import { SessionUser } from './types';
declare module 'next-auth' {
 interface Session extends SessionUser {}
  
}
import {JWT} from "next-auth/jwt"
declare module 'next-auth/jwt' {
 interface JWT extends SessionUser {}
}