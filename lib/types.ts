export interface User {
 _id:string;
 firstName:string;
 lastName:string;
 email:string;
 mobile:string;
 relationship:string;


}

export interface LearnerType {
  _id: string
  studentID: string
  parent: string
  firstName: string
  lastName: string
  relationship: string
  profileImage: string
  birthdate: Date
  schoolYear: string
  schoolName: string
  learningStyle: string
  disabilities: string
  healthCondition: string
  pictureConsent: boolean
  details: {
    level: string
    noOfCourses: number
  }
}

//payment
export interface PaymentType {
  network: string
  amount: number
  phoneNumber: string
  reference: string
  createdAt: Date
  success: boolean
}
//category
export interface CategoryType {
  _id: string
  name: string
  description: string
slug:string
}
//courses
type SubLessonTypes = {
  title: string
  description: string
  weight: number
}
export interface CourseType {
  _id: string
  title: string
  description: string
  price: number
  thumbnail: string
  category: string[]
  lessons: SubLessonTypes[]
  learnerLevel: string
  complexity: 'Beginner' | 'Intermediate' | 'Advanced'
  slug: string
}
export interface InstructorType {
  _id: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  profileImage: string
  bio: string
  category: CategoryType[]
}
export interface LessonTypes {
  _id: string
  instructor: InstructorType
  course: CourseType
  startAt: Date
  endAt: Date
  location: string
  status: 'Approved' | 'Canceled'
  updatedAt: Date
}

export interface LevelType {
  level: number
  startAge: number
  endAge: number
  description: string
}
export interface SessionUser {
  userDetails: {
    _id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    relationship: string
  }
  backendTokens: {
    accessToken: string
    refreshToken: string
    accessExpiresIn: string
    refreshExpiresIn: string
  }
  error?: any
}
export interface FeedbackType {
  _id: string
  lessonSchedule: string
  assignedTo: string
  title: string
  description: string
  createdAt: Date
}
export interface AssigmentType {
  lessonSchedule: string
  assignedTo: string
  status: 'Not Attempted' | 'Pending' | 'Completed' | 'Canceled'
  title: string
  description: string
  createdAt: Date
  submittedAt: Date
}

export interface PaidScheduleType{
  _id:string
  learner:LearnerType,
  lessonSchedule:LessonTypes,
  paymentID:PaymentType,
  createdAt:Date

}