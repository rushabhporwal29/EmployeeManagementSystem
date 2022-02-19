import React from 'react'
import { useEffect, useState } from 'react'

export default function WorkHours(prop) {
  const [workHour,setworkHour]=useState();
  useEffect(()=>{
    const calWorkHour=async (attendance)=>{
      const convertToMinutes=async (time)=>{
        const [hours,minutes,seconds]=await(time.split(":"));
        return await(parseInt(hours)*60+parseInt(minutes));
      }
      
      // let len=attendance.time.length%2===0?attendance.time.length:attendance.time.length-1;
      // let i=0;
      let workHrs=await attendance.time.map(async(a,index)=>{
        if(index%2!==0){
          const start=convertToMinutes(a);
          const end=convertToMinutes(attendance.time[index-1]);
          // workHrs+=await(end-start);
          // console.log("1",end-start);
          Promise.all([end,start]).then((res)=>{
            console.log("1",res,res[0]-res[1]);
            return res[0]-res[1];
          });
          
        }
        else{
          console.log("1#",0);
          return 0;
        }
        
      }).reduce((totalTime,time)=>{
          console.log("2",totalTime+time);
          return totalTime+time;
        },0)
      Promise.all(workHrs).then(workHours=>{
        console.log("3",workHours);
        workHours=workHours/60+":"+workHours%60;
        setworkHour(workHours);
      })
    };
    calWorkHour(prop.attendance);
    

  },[])
  return (
    <>
      {workHour}
    </>
  )
}
