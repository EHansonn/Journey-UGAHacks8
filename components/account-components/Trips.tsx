import { Trip } from '@/pages/account';
import React from 'react';
interface Trips {
	trips: Trip[];
}
const Trips: React.FC<Trips> = ({ trips }) => {
	return (
		<div className="flex-col flex">
			{trips.map((trip, i) => (
				<div key={i} className="flex">
					<div>{trip.location}</div>
					<div>{trip.date}</div>
					<div>{trip.desc}</div>
				</div>
			))}
		</div>
	);
};

export default Trips;
