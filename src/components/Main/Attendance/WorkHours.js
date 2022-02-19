import React from "react";
import { useEffect, useState } from "react";

export default function WorkHours(prop) {
	const [workHour, setworkHour] = useState();
	useEffect(() => {
		const calWorkHour = (attendance) => {
			const convertToMinutes = (time) => {
				const [hours, minutes, seconds] = time.split(":");
				return parseInt(hours) * 60 + parseInt(minutes);
			};

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
				workHrs = parseInt(workHrs / 60) + ":" + (workHrs % 60);
				setworkHour(workHrs);
			// });
		};
    console.log('attendance' , prop.attendance);
		calWorkHour(prop.attendance);
	}, []);
	return <>{workHour}</>;
}
