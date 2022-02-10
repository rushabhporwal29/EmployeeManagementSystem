import React, { useRef } from "react";
import { useState } from "react";
import { addDoc, arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";

export default function AddAttendance(prop) {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [date, setDate] = useState(	new Date()
  .toLocaleDateString("en-GB")
  .split("/")
  .reverse()
  .join("/"));
	const [time, setTime] = useState(new Date().toTimeString().split(" ")[0]);
	const dateRef = useRef("");
	dateRef.current = date;
	const timeRef = useRef("");
	timeRef.current = time;

	const createAttendance = async (e) => {
		e.preventDefault();

		console.log(
			name + " local " + id + "-" + date + "-" + time
		);
		if (id !== "") {
			await setDoc(
				doc(
					prop.attendanceCollectionRef,
					date.split("/").join("-") + " " + id
				),
				{
					time: arrayUnion(time),
				},
				{ merge: true }
			);
		}
		// await addDoc(prop.employeeCollectionRef,{
		//   Name:name,
		//   Contact:contact,
		//   City:city,
		//   Address:address,
		//   Gender:gender,
		//   ID: prop.lastID+1
		// });
		// window.location.reload();
	};
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
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							required
							id="name"
							type="text"
							placeholder="Enter Name"
							name="name"
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						{name}
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
					{date}
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
					{time}
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
