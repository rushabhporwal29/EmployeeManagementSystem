import React from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../FirebaseConfig';


export default function ViewEmployee(prop) {
  
  const deleteEmployee= async (id)=>{
    await deleteDoc(doc(db,'Employee', id));
    window.location.reload();
  }
  return (
    <table className="w-full" >
          <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Action</th>
              </tr>
          </thead>
          <tbody>
          {prop.employees.map((employee)=>{
            return (
              <tr className="text-gray-700">
                <td className="px-4 py-3 text-ms font-semibold border">
                  <p className="font-semibold text-white">{employee.ID}</p>
                </td>
                <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                    {/* <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div> */}
                    <div>
                        <p className="font-semibold text-white">{employee.Name}</p>
                    </div>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm border">
                    <a href={"/employees/"+ employee.id } className="text-yellow-400 hover:text-gray-100 mx-2" title="View And Edit employee">
                        <i className="fas fa-pencil-alt"></i>
                    </a>
                    <button className="text-red-400 hover:text-gray-100 ml-2" onClick={()=>{deleteEmployee(employee.id)}} title="Delete employee">
                        <i className="fas fa-trash-alt"></i>                
                    </button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
  )
}
