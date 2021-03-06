import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../../FirebaseConfig'

export default function Navbar() {
  function userSignOut(){
    window.location.replace('../')
    window.history.go(-(window.history.length - 1))
    signOut(auth)
  }
  return (
    <div>
      <header className="body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center mb-4 md:mb-0" href='/'>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg> */}
            <span className="ml-3 text-xl">Employee Management System</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center text-gray-300">
            <a className="mr-5 hover:text-gray-500" href='/employees'>Employees</a>
            <a className="mr-5 hover:text-gray-500" href='/attendance'>Attendance</a>
            <a className="mr-5 hover:text-gray-500" href='/'>Profile</a>
          </nav>
          <button className="inline-flex items-center bg-green-700 border-0 py-1 px-3 focus:outline-none hover:bg-green-900 rounded text-base mt-4 md:mt-0" onClick={()=>{userSignOut()}}>Sign Out</button>
        </div>
        <hr/>
      </header>
    </div>
  )
}
