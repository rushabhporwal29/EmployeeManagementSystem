import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { arrayUnion, doc, setDoc,getDocs, collection } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";

export default function AddAttendance(prop) {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [employees,setEmployees]=useState([]);
	const [date, setDate] = useState(	new Date().toLocaleDateString("en-GB"));
	const [time, setTime] = useState();
	const employeeCollectionRef= collection(db, 'Employee');
	const createAttendance = async (e) => {
		e.preventDefault();
		let finalTime= time?time:(new Date().toTimeString().split(" ")[0])
		let employeeName=await employees.filter((employee)=>{if(employee.ID==id)return employee.Name})[0].Name;
		let finalDate=date.split("/").reverse().join("-")
		let docID=id+"D"+finalDate.split("-").join("")
		console.log(
			id+" "+employeeName + " local " + docID+ "/" + finalTime
		);
		let attendanceRef=await doc(prop.attendanceCollectionRef,docID);
		console.log(attendanceRef);
		await setDoc(attendanceRef,{
			eid:id,
			name:employeeName,
			date:finalDate,
			time:arrayUnion(finalTime)
		},{merge:true})
		alert(employeeName+" "+finalTime+" "+finalDate+" added");
		setName("");
		setId("");
		// window.location.reload();
	};

	useEffect(()=>{
		const getEmployees=(async()=>{
			const data=await getDocs(employeeCollectionRef)
      setEmployees(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
		})
		getEmployees();
	},[])
	return (
		<div>
			<form className="form w-full max-w-lg mx-auto my-20 p-2 rounded-lg text-white">
				<h2 className="title-font text-2xl font-medium mx-auto mt-6 mb-6 text-center">
					Add Attendance
				</h2>
				<div className="flex flex-wrap -mx-auto mb-6">
					<div className="w-full md:w-1/3 px-3 mb-6 md:mb-6">
						<label
							className="block uppercase tracking-wide   text-xs font-bold mb-2"
							for="name"
						>
							Name
						</label>
						<select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="name" id="name" value={name} onChange={(e) => {setName(e.target.value);setId(e.target.value.split("_")[1]);}}>
						<option value="">Select Your Name</option>
							{employees.map((employee)=>{
								return(
								<option key={employee.ID} value={employee.Name+"_"+employee.ID}>{employee.Name}</option>
							)})}
						</select>
						{/* <input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							required
							id="name"
							type="text"
							placeholder="Enter Name"
							name="name"
							onChange={(e) => {
								setName(e.target.value);
							}}
						/> */}
					</div>
					<div className="w-full md:w-1/3 px-3 mb-6 md:mb-6">
						<label
							className="block uppercase tracking-wide   text-xs font-bold mb-2"
							for="id"
						>
							ID
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="id"
							name="id"
							type="text"
							placeholder="Enter ID"
							onChange={(e) => {
								setId(e.target.value);
							}}
							value={id}
						/>
					</div>
					<div className="w-full md:w-1/3 px-3 mb-6 md:mb-6">
						<label
							className="block uppercase tracking-wide   text-xs font-bold mb-2"
							for="date"
						>
							Date
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="date"
							name="date"
							type="date"
							placeholder="Enter Date"
							onChange={(e) => {
								setDate(e.target.value);
							}}
						/>
					</div>
					<div className="w-full md:w-1/3 px-3 mb-6 md:mb-6">
						<label
							className="block uppercase tracking-wide   text-xs font-bold mb-2"
							for="time"
						>
							Time
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="time"
							name="time"
							type="time"
							placeholder="Enter Time"
							onChange={(e) => {
								setTime(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-auto mb-6 text-center">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<button
							className="m-2  text-white bg-blue-500 border-2 border-white py-2 px-5 focus:outline-none hover:bg-blue-600 rounded"
							onClick={(e) => {
								createAttendance(e);
							}}
						>
							Submit
						</button>
					</div>
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<button className="m-2  text-black bg-white border-2 border-black py-2 px-5 focus:outline-none hover:bg-black hover:text-white rounded">
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
