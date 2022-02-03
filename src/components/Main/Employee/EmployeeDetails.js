import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {doc,getDoc, updateDoc} from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';

export default function EmployeeDetails(props) {
  const employeeID=useParams().employeeID;
  const [name,setName]=useState('');
  const [contact,setContact]=useState('');
  const [gender,setGender]=useState('');
  const [city,setCity]=useState('');
  const [address,setAddress]=useState('');
  const employeeRef=doc(db,'Employee',employeeID);
  useEffect(()=>{
    const getEmployee=async()=>{
      console.log(employeeID);
      const data=await getDoc(employeeRef);
      const Employee=data.data();
      console.log(Employee);
      setName(Employee.Name);
      setContact(Employee.Contact);
      setGender(Employee.Gender);
      setAddress(Employee.Address);
      setCity(Employee.City)
    
    };
    getEmployee();
  },[]);

  const updateEmployee=async (e)=>{
    e.preventDefault()
    await updateDoc(employeeRef,{
      Name:name,
      Contact: contact,
      Address:address,
      City:city,
      Gender: gender
    })
    window.location.reload()
  }
  return (
    <div>
        <form className="form w-full max-w-lg mx-auto my-20 p-2 rounded-lg text-white">
          <h2 className="title-font text-2xl font-medium mx-auto mt-6 mb-6 text-center">View/Update Employee Details</h2>
          <div className="flex flex-wrap -mx-auto mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="name">
              Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" required id="name" type="text" placeholder="Enter Name" name="name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="contact">
              Contact
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="contact" name="contact" type="text" placeholder="Enter Mobile No." onChange={(e)=>{setContact(e.target.value)}} value={contact}/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="city">
              City
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required id="city" name="city" type="text" placeholder="Enter City" onChange={(e)=>{setCity(e.target.value)}} value={city}/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="address">
              Address
              </label>
              <textarea className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' name="address" id="address" cols="30" rows="10" onChange={(e)=>{setAddress(e.target.value)}} value={address}/>           
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
              <label className="block uppercase tracking-wide   text-xs font-bold mb-2" for="gender">
              Gender
              </label>
              <select className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required id="gender"  name="gender" onChange={(e)=>{setGender(e.target.value)}} value={gender}>
                <option value="" >Enter Gender</option>
                <option value="M" >Male</option>
                <option value="F"  >Female</option>
              </select>            
            </div>
          </div>
          <div className="flex flex-wrap -mx-auto mb-6 text-center">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button className="m-2  text-white bg-blue-500 border-2 border-white py-2 px-5 focus:outline-none hover:bg-blue-600 rounded" onClick={(e)=>{updateEmployee(e)}}>Submit</button>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button className="m-2  text-black bg-white border-2 border-black py-2 px-5 focus:outline-none hover:bg-black hover:text-white rounded">Cancel</button>     
            </div>
          </div>
      </form>
      </div>
  )
}
