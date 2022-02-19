import { React, useState, useLayoutEffect, useEffect } from "react";
import { deleteDoc, getDocs, query, orderBy, doc } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";
import WorkHours from "./WorkHours";

export default function ViewAttendance(prop) {
	const [searchID, setSearchID] = useState("");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [attendances, setAttendances] = useState([]);

	const [totalHours, setTotalHours] = useState('');

	const search = async (e) => {
		console.log(attendances);
		let date =
			fromDate !== "" ? fromDate : new Date().toLocaleDateString("en-GB");
		date = await date.split("/").reverse().join("/");
		await setFromDate(date);
		date = toDate !== "" ? toDate : new Date().toLocaleDateString("en-GB");
		date = await date.split("/").reverse().join("/");
		await setToDate(date);
		// const attendanceQuery= query(prop.attendanceCollectionRef,where('eid','==',searchID),where('date','==',fromDate), where('date','==',toDate) );
		// const data=await getDocs(attendanceQuery);
		// setAttendances(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
		console.log(
			attendances.filter((a) => {
				return (
					a.eid === searchID || a.date >= fromDate || a.date <= toDate
				);
			})
		);
		setAttendances(
			attendances.filter((a) => {
				return (
					a.eid === searchID ||
					(a.date >= fromDate && a.date <= toDate)
				);
			})
		);
	};

	const convertToMinutes = (time) => {
		const [hours, minutes, seconds] = time.split(":");
		return parseInt(hours) * 60 + parseInt(minutes);
	};

	useLayoutEffect(() => {
		const calWorkHour = (attendance) => {
			// let len=attendance.time.length%2===0?attendance.time.length:attendance.time.length-1;
			// let i=0;
			let workHrs = attendance.time
				.map((a, index) => {
					if (index % 2 !== 0) {
						const end = convertToMinutes(a);
						const start = convertToMinutes(
							attendance.time[index - 1]
						);
						// workHrs+=await(end-start);
						// console.log("1",end-start);
						// Promise.all([end, start]).then((res) => {
						console.log("1", end - start);
						return end - start;
						// });
					} else {
						console.log("1#", 0);
						return 0;
					}
				})
				.reduce((totalTime, time) => {
					console.log("2", totalTime + time);
					return totalTime + time;
				}, 0);
			// Promise.all(workHrs).then((workHours) => {
			console.log("3", workHrs);
			workHrs = parseInt(workHrs / 60) + ":" + (String(workHrs % 60).padStart(2, "0"));
			return workHrs;
			// });
		};

		const getAttendances = async () => {
			const attendanceQuery = query(
				prop.attendanceCollectionRef,
				orderBy("date", "desc")
			);
			const data = await getDocs(attendanceQuery);
			await setAttendances(
				data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
					workHrs: calWorkHour(doc.data()),
				}))
			);
		};

		getAttendances();
	}, []);

	useEffect(() => {
		if (attendances.length) {
			const totalHour = attendances.map(data => data.workHrs).reduce((sum, curr) => {
        console.log(sum, curr);
				return sum + convertToMinutes(curr);
			}, 0);

			console.log(`${totalHour / 60}:${totalHour % 60}`);
      setTotalHours(`${parseInt(totalHour / 60)}:${String(totalHour % 60).padStart(2, '0')}`);
		}
	}, [attendances]);

	const deleteAttendance = async (id) => {
		await deleteDoc(doc(db, "Attendance", id));
		window.location.reload();
	};
	return (
		<div>
			<label
				className="uppercase tracking-wide text-sm font-bold mb-2 ml-6"
				for="sid"
			>
				ID :{" "}
			</label>
			<input
				className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white"
				id="sid"
				type="text"
				placeholder="Enter ID"
				name="sid"
				onChange={(e) => {
					setSearchID(e.target.value);
				}}
			/>

			<label
				className="uppercase tracking-wide text-sm font-bold mb-2 ml-6"
				for="fromDate"
			>
				From :{" "}
			</label>
			<input
				className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white"
				id="fromDate"
				type="date"
				name="fromDate"
				onChange={(e) => {
					setFromDate(e.target.value);
				}}
			/>

			<label
				className="uppercase tracking-wide text-sm font-bold mb-2 ml-6"
				for="toDate"
			>
				To :{" "}
			</label>
			<input
				className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white"
				id="toDate"
				type="date"
				name="toDate"
				onChange={(e) => {
					setToDate(e.target.value);
				}}
			/>

			<button
				className="m-3 ml-6  text-white bg-blue-500 border-2 border-white py-1 px-3 focus:outline-none hover:bg-blue-600 rounded"
				onClick={(e) => {
					search(e);
				}}
			>
				Submit
			</button>
			<button
				className="m-3 ml-6  text-white bg-yellow-500 border-2 border-white py-1 px-3 focus:outline-none hover:bg-yellow-600 rounded"
				onClick={(e) => {
					window.location.reload();
				}}
			>
				Clear
			</button>
			<table className="w-full">
				<thead>
					<tr className="text-md font-semibold text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
						<th className="px-4 py-3">Date</th>
						<th className="px-4 py-3">ID</th>
						<th className="px-4 py-3">Name</th>
						<th className="px-4 py-3">Work Hours</th>
						<th className="px-4 py-3">Time</th>
						<th className="px-4 py-3">Action</th>
					</tr>
				</thead>
				<tbody>
					{attendances.map((attendance, index) => {
						return (
							<tr className="text-gray-700">
								<td className="px-4 py-3 text-ms font-semibold border">
									<p className="font-semibold text-white">
										{attendance.date}
									</p>
								</td>
								<td className="px-4 py-3 text-ms font-semibold border">
									<p
										key={attendance.id}
										className="font-semibold text-white"
									>
										{attendance.eid}
									</p>
								</td>
								<td className="px-4 py-3 border">
									<p
										key={attendance.id}
										className="font-semibold text-white"
									>
										{attendance.name}
									</p>
								</td>
								<td className="px-4 py-3 border">
									{/* <p key={attendance.id} className="font-semibold text-white">{<WorkHours attendance={attendance} />}</p>           */}
									<p
										key={attendance.id}
										className="font-semibold text-white"
									>
										{attendance.workHrs}
									</p>
								</td>
								<td className="px-4 py-3 text-ms border">
									<p
										key={attendance.id}
										className="font-semibold text-white"
									>
										{attendance.time.join(", ")}
									</p>
								</td>
								<td className="px-4 py-3 text-sm border">
									<a
										key={attendance._id}
										href={"/attendances/" + attendance.id}
										className="text-yellow-400 hover:text-gray-100 mx-2"
										title="View And Edit Attendance"
									>
										<i className="fas fa-pencil-alt"></i>
									</a>
									<button
										key={attendance._id}
										className="text-red-400 hover:text-gray-100 ml-2"
										onClick={() => {
											deleteAttendance(attendance.id);
										}}
										title="Delete Attendance"
									>
										<i className="fas fa-trash-alt"></i>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
      Total Hours: {totalHours}
		</div>
	);
}
