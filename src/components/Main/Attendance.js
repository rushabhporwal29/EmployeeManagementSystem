import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {db} from '../../FirebaseConfig';

import { useState, useEffect } from 'react';
import ViewAttendance from './Attendance/ViewAttendance';
import AddAttendance from './Attendance/AddAttendance';


export default function Attendances(){
  const [toggle, settoggle] = useState(false);
  const [buttonText,setbuttonText]=useState('Add Attendance');
  const attendanceCollectionRef= collection(db, 'Attendance');

  const toggleComponents=()=>{
    settoggle(toggle===true?false:true);
    setbuttonText(buttonText==='View Attendance'?'Add Attendance':'View Attendance');
  }
  return (
    <div className='p-5'>
        <button className='my-5 inline-flex text-center items-center bg-green-700 border-0 py-1 px-3 focus:outline-none hover:bg-green-900 rounded text-base mt-4 md:mt-0' onClick={()=>{toggleComponents()}}>{buttonText}</button>
        {toggle===false?<ViewAttendance attendanceCollectionRef={attendanceCollectionRef}/>:<AddAttendance />}

    </div>
  );
}
