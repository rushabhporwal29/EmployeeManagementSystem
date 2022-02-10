import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar from './components/Main/partials/Navbar'
import Footer from './components/Main/partials/Footer'

import Employees from './components/Main/Employees'
import Attendance from './components/Main/Attendance'
import EmployeeDetails from './components/Main/Employee/EmployeeDetails';
import AttendanceDetails from './components/Main/Attendance/AttendanceDetails';

export default function Main() {
  return (
    <div>
      <Navbar/>
      <div className="content">
        <Router>
          <Routes>
              <Route path="/employees" element={<Employees/>}/>
              <Route path="/attendance" element={<Attendance/>}/>
              <Route path="/employees/:employeeID" element={<EmployeeDetails/>}></Route>
              <Route path="/attendances/:attendanceID" element={<AttendanceDetails/>}></Route>
          </Routes>
        </Router>
      </div>
      <Footer/>
    </div>
  )
}

// function page(){
//   return(
//     <div>
//       <h1>Main</h1>
//       <button onClick={()=>signOut(auth)} >Sign Out</button>
//     </div>
//   )
// }
