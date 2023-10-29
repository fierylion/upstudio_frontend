import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LevelType } from "./types";
import { baseUrl } from "./apis";
import {format} from 'date-fns';
type courseDateType = {
  type: string
  hours: string
  day?: string
  dayNumber?: number
  date: string
}
export function formatCourseDate(startDate:Date, endDate:Date): courseDateType{
  const timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (endDate.getTime() - startDate.getTime() < 24 * 60 * 60 * 1000) {
    const startHour = timeFormat.format(startDate)
    const endHour = timeFormat.format(endDate)
    const day = format(startDate, 'E')
    const dayNumber = format(startDate, 'i')
    const date = format(startDate, 'dd MMM')

    const result = {
      type: 'single',
      hours: `${startHour} - ${endHour}`,
      day: day.charAt(0), // Get the first letter of the day
      dayNumber: parseInt(dayNumber, 10), // Parse the day number to an integer
      date,
    }
    return result
  } else {
    const startInterval = format(startDate, 'dd MMM')
    const endInterval = format(endDate, 'dd MMM')
    const startDateFormatted = format(startDate, 'dd MMM')

    const result = {
      type: 'many',
      hours: `${startInterval} - ${endInterval}`,
      date: startDateFormatted,
    }

  return result
  }
}

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}





//long words wrapper
export function longWordWrapper(word:string, length:number){
  if(word.length>length){
    return word.substring(0,length)+'...';
  }
  return word;
}

//singular plural word
export function singularPlural(word:string, number:number){
  if(number>1){
    return word+'s';
  }
  return word;
}

export function imageUrl(url:string) {
  return baseUrl+ url
}


//percentage done
export function calculatePercentageDone(startDate:Date, endDate:Date) {
  const today = new Date()

  // Ensure startDate and endDate are valid Date objects
  startDate = new Date(startDate)
  endDate = new Date(endDate)

  

  // Calculate the total duration in milliseconds
  const totalDuration = endDate.getTime() - startDate.getTime()

  // Calculate the elapsed duration in milliseconds
  const elapsedDuration = today.getTime() - startDate.getTime()

  // Calculate the percentage done
  const percentageDone = (elapsedDuration / totalDuration) * 100

  // Ensure the percentage done is within the 0-100 range
  return Math.min(Math.max(percentageDone, 0), 100)
}

//returns the correct level
export function getLevel(birthdate:Date, levels:LevelType[]){
  const age =  new Date().getFullYear() - birthdate.getFullYear();
  for(let lv of levels){
    if(age>=lv.startAge && age<=lv.endAge){
      return lv;
    }

  }
  return levels[levels.length-1];
}


//format money
 export function formatNumberWithCommas(number:number) {
   // Convert the number to a string and split it into parts
   const parts = number.toString().split('.')

   // Format the integer part with commas
   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

   // Join the integer and decimal parts (if any)
   return parts.join('.')
 }
export function formatDuration(startDate:Date, endDate:Date) {
  const millisecondsInHour = 60 * 60 * 1000;
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  const durationInMilliseconds = endDate.getTime() - startDate.getTime();

  if (durationInMilliseconds < millisecondsInDay) {
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    const startMinute = startDate.getMinutes();
    const endMinute = endDate.getMinutes();

    return `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')} - ${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}, ${startDate.getDate()}th ${startDate.toLocaleString('default', { month: 'short' })}`;
  } else {
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    return `${startDay}th ${startDate.toLocaleString('default', { month: 'short' })} - ${endDay}th ${endDate.toLocaleString('default', { month: 'short' })}`;
  }
}

export function formatSingleDuration(dt:Date){
  const providedDate = new Date(dt)
const startDay = providedDate.getDate();
return `${startDay}th ${providedDate.toLocaleString('default', { month: 'short' })} `

}

export function generateArray(arr:any[], size:number){
  if (arr.length===0) return [];
return Array(size).fill(arr).flat();
}

// // Example usage for hours difference:
// const startDate1 = new Date('2023-03-12 14:00:00');
// const endDate1 = new Date('2023-03-12 16:00:00');
// const formattedDuration1 = formatDuration(startDate1, endDate1);
// console.log(formattedDuration1);

// // Example usage for days difference:
// const startDate2 = new Date('2023-03-12 14:00:00');
// const endDate2 = new Date('2023-03-14 16:00:00');
// const formattedDuration2 = formatDuration(startDate2, endDate2);
// console.log(formattedDuration2);

// VM2521:26 14:00 - 16:00, 12th Mar
// VM2521:32 12th Mar - 14th Mar