export interface User {
 _id:string;
 firstName:string;
 lastName:string;
 email:string;
 mobile:string;
 relationship:string;


}
export interface SessionUser{
  user:User;
  backendTokens: {
   accessToken: string;
   refreshToken: string;
   accessExpiresIn: string;
   refreshExpiresIn: string;
  };
  error?:any;
 }
