'use client'
import './calendar.css'
import React from 'react'
import Calendar from 'react-calendar'

//charts
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
const ScheduleGraph = () => {
 type ValuePiece = Date |null
type Value = ValuePiece | [ValuePiece, ValuePiece]
 const [dateValue, setDateValue] = React.useState<Value>(new Date())


 //chart
 const data = {
  labels:['Completed', 'Not Completed'],
  datasets:[
   {
    label:'Progress',
    data:[80, 20],
    backgroundColor:[
     'green',
     'orange'
    ],
    borderColor:[
     'green', 'orange'
    ],
   borderWidth:0.1,
   }
  ]
 }
 // const options = {
 //   cutOutPercentage: 10,
 //   responsive: true,
 //   maintainAspectRatio: false,
 //   plugins: {
 //     legend: {
 //       display: true,
 //     },
 //   },
 // }
const options = {
  plugins: {
    tooltip: {
      enabled: true,
    },
  },
  cutout: '75%',
  responsive: true,
  maintainAspectRatio: false,
}
  return (
    <div className='w-full flex flex-col space-y-2 md:flex-row md:space-x-2 mx-auto'>
      <div className='p-2 rounded w-full md:w-1/2 shadow-lg flex justify-center items-center '>
        <div className='h-60 mx-auto'>
          <Doughnut data={data} options={options} />
        </div>
      </div>
      <div className='p-2 rounded w-full md:w-1/2 justify-end shadow-lg text-center'>
        <Calendar
          onChange={(value, event) => {
            console.log(value)
            setDateValue(value)
          }}
          value={dateValue}
          className={'p-2 rounded-lg  border-2 border-gray-500 mx-auto'}
        />
      </div>
    </div>
  )
}

export default ScheduleGraph