import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {doc,getDoc, updateDoc} from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';

export default function AttendanceDetails() {
  const AttendanceID=useParams().attendanceID;
  const [name,setName]=useState('');
  const [eid,setEid]=useState('');
  const [date,setDate]=useState('');
  const [Time,setTime]=useState([]);
  const attendanceRef=doc(db,'Attendance',AttendanceID);
  useEffect(()=>{
    const getAttendance=async()=>{
      console.log(AttendanceID);
      const data=await getDoc(attendanceRef);
      const Attendance=data.data();
      console.log(Attendance);
      setName(Attendance.name);
      setEid(Attendance.eid);
      setDate(Attendance.date+'');
      setTime(Attendance.attendance);
      
    };
    getAttendance();
  },[]);

  const updateAttendance=async (e)=>{
    e.preventDefault()
    const result = await updateDoc(attendanceRef,{
      Name:name,
      eid: eid,
      date: date,
      attendance: Time
    })
    console.log(result);
    window.location.reload()
  }

  const updateTime=async (i,timing)=>{
    let newTime=[...Time];
    newTime[i]=timing;
    console.log(newTime);
    setTime(newTime);
    
  }
  return (
    <div>
        <form className="form w-full max-w-lg mx-auto my-20 p-2 rounded-lg text-white">
          <h2 className="title-font text-2xl font-medium mx-auto mt-6 mb-6 text-center">Add Attendance</h2>
          <div className="flex flex-wrap -mx-auto mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="name">
              Name
              </label>
              <input disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" name="name" value={name} />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="id">
              ID
              </label>
              <input disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="id" name="id" type="text" value={eid}/>
            </div>
            <div className="w-full md:w-1/1 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="date">
              Date
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="date" name="date" type="date" placeholder="Enter Date" onChange={(e)=>{setDate(e.target.value)}} value={date}/>
            </div>
            {Time.map((timing,index)=>(
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
                <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="time">
                Time {index+1}
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="time" name="time" type="time" onChange={(e)=>{updateTime(index,e.target.value)}} value={timing}/>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap -mx-auto mb-6 text-center">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button className="m-2  text-white bg-blue-500 border-2 border-white py-2 px-5 focus:outline-none hover:bg-blue-600 rounded" onClick={(e)=>{updateAttendance(e)}}>Submit</button>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
              <button className="m-2  text-black bg-white border-2 border-black py-2 px-5 focus:outline-none hover:bg-black hover:text-white rounded" onClick={(e)=>{e.preventDefault()}}>Cancel</button>     
            </div>
          </div>
      </form>
      </div>
  )
}
