import { Trip } from '@/pages/account';
import React from 'react';
interface Trips {
	trips: Trip[];
}
const Trips: React.FC<Trips> = ({ trips }) => {
	return (
		<div>
			{trips.map((trip) => (
				<div>{trip.location}</div>
			))}
		</div>
	);
};

export default Trips;
