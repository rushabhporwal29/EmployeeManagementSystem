import {React, useState, useEffect}  from 'react'
import { deleteDoc, getDocs, query, orderBy, doc, where  } from 'firebase/firestore'
import { db } from '../../../FirebaseConfig';


export default function ViewAttendance(prop) {

  const [searchID, setSearchID] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [attendances,setAttendances]=useState([]);
  
  const search=async (e)=>{
    await setAttendances(prop.attendances)
    console.log(attendances);
    let date=fromDate!==""?fromDate:new Date().toLocaleDateString('en-GB');
    date=await date.split("/").reverse().join("/");
    await setFromDate(date);
    date=toDate!==""?toDate:new Date().toLocaleDateString('en-GB');
    date=await date.split("/").reverse().join("/");
    await setToDate(date);
    // const attendanceQuery= query(prop.attendanceCollectionRef,where('eid','==',searchID),where('date','==',fromDate), where('date','==',toDate) );
    // const data=await getDocs(attendanceQuery);
    // setAttendances(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    console.log(attendances.filter((a)=>{
      return a.eid===searchID || a.date>=fromDate || a.date<=toDate
    }));
    setAttendances(attendances.filter((a)=>{
      return a.eid===searchID || (a.date>=fromDate && a.date<=toDate)
    }))
  }

  useEffect(()=>{

    const getAttendances=async()=>{
      const attendanceQuery= query(prop.attendanceCollectionRef, orderBy('date','desc'));
      const data=await getDocs(attendanceQuery);
      setAttendances(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    };
    getAttendances();
    console.log(attendances);
  },[]);

  
  const deleteAttendance= async (id)=>{
    await deleteDoc(doc(db,'Attendance', id));
    window.location.reload();
  }
  return (
    <div>
      <label className="uppercase tracking-wide text-sm font-bold mb-2 ml-6" for="sid">ID : </label>
      <input className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white" id="sid" type="text" placeholder="Enter ID" name="sid" onChange={(e)=>{setSearchID(e.target.value)}}/>
      
      <label className="uppercase tracking-wide text-sm font-bold mb-2 ml-6" for="fromDate">From : </label>
      <input className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white" id="fromDate" type="date" name="fromDate" onChange={(e)=>{setFromDate(e.target.value)}}/>            
      
      <label className="uppercase tracking-wide text-sm font-bold mb-2 ml-6" for="toDate">To : </label>
      <input className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white" id="toDate" type="date" name="toDate" onChange={(e)=>{setToDate(e.target.value)}}/>
      
      <button className="m-3 ml-6  text-white bg-blue-500 border-2 border-white py-1 px-3 focus:outline-none hover:bg-blue-600 rounded" onClick={(e)=>{search(e)}}>Submit</button>
      <table className="w-full" >
        <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Time</th>
              
            </tr>
        </thead>
        <tbody>
        {attendances.map((attendance)=>{
          return (
            <tr className="text-gray-700">
              <td className="px-4 py-3 text-sm border">
                  <a href={"/attendances/"+ attendance.id } className="text-yellow-400 hover:text-gray-100 mx-2" title="View And Edit Attendance">
                      <i className="fas fa-pencil-alt"></i>
                  </a>
                  <button className="text-red-400 hover:text-gray-100 ml-2" onClick={()=>{deleteAttendance(attendance.id)}} title="Delete Attendance">
                      <i className="fas fa-trash-alt"></i>                
                  </button>
              </td>
              <td className="px-4 py-3 text-ms font-semibold border">
                <p className="font-semibold text-white">{attendance.date}</p>
              </td>
              <td className="px-4 py-3 text-ms font-semibold border">
                <p className="font-semibold text-white">{attendance.eid}</p>
              </td>
              <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                  {/* <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                      <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                      <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div> */}
                  <div>
                      <p className="font-semibold text-white">{attendance.name}</p>
                  </div>
                  </div>
              </td>
              <td className="px-4 py-3 text-ms font-semibold border">
                <p className="font-semibold text-white">{attendance.time.join(', ')}</p>
              </td>              
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}
