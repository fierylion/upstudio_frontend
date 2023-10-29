import React, { FC, ReactNode } from 'react'

interface Props {
  radius: number
  progress: number
  color: string
  strokeWidth:number
  children?: ReactNode
}

const CircularProgressBar: FC<Props> = ({
  radius,
  progress,
  strokeWidth, 
  color,
  children,
}) => {
  const normalizedRadius = radius - 10
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className='relative'>
     <p className='absolute transform -translate-x-1/2 '>20%</p>
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          fill='transparent'
          stroke='#e0e0e0'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + 'px'}
          strokeDashoffset='0'
        ></circle>
        <circle
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeDashoffset={strokeDashoffset + 'px'}
          fill='transparent'
          strokeDasharray={circumference + 'px'}
        ></circle>
        
      </svg>
    </div>
  )
}

export default CircularProgressBar
