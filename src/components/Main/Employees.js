import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {db} from '../../FirebaseConfig';

import { useState, useEffect } from 'react';
import ViewEmployee from './Employee/ViewEmployee';
import AddEmployee from './Employee/AddEmployee';


export default function Employees(){
  const [toggle, settoggle] = useState(false);
  const [buttonText,setbuttonText]=useState('Add Employee');
  const employeeCollectionRef= collection(db, 'Employee');

  const [employees,setEmployees]=useState([]);;
  useEffect(()=>{
    const getEmployees=async()=>{
      const employeeQuery= query(employeeCollectionRef, orderBy('ID','desc'));
      const data=await getDocs(employeeQuery);
      setEmployees(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    };
    getEmployees();
  },[]);
  const toggleComponents=()=>{
    settoggle(toggle===true?false:true);
    setbuttonText(buttonText==='View Employee'?'Add Employee':'View Employee');
  }
  return (
    <div className='p-5'>
        <button className='my-5 inline-flex text-center items-center bg-green-700 border-0 py-1 px-3 focus:outline-none hover:bg-green-900 rounded text-base mt-4 md:mt-0' onClick={()=>{toggleComponents()}}>{buttonText}</button>
        {toggle===false?<ViewEmployee employees={employees}/>:<AddEmployee employeeCollectionRef={employeeCollectionRef} />}

    </div>
  );
}
