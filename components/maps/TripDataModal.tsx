import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'antd';
import Trips from 'components/account-components/Trips';
import { Trip } from '@/pages/account';

export interface TripDataRef {
	showModal: (visible: boolean, trip: Trip) => void;
}
interface Props {
	trips: Trips;
	whichMarkerClicked: number;
}

const TripDataModal: React.ForwardRefRenderFunction<TripDataRef, Props> = ({ trips, whichMarkerClicked }, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [trip, setTrip] = useState<Trip | null>(null);
	useImperativeHandle(ref, () => ({
		showModal,
	}));
	const showModal = (visible: boolean, trip: Trip) => {
		setIsModalOpen(visible);
		setTrip(trip);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	// console.log('haiii1412414 mom');
	// console.log(trip);
	return (
		<Modal title="Trip" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
			<p>{trip?.date}</p>
			<p>{trip?.location}</p>
			<p>{trip?.desc}</p>
		</Modal>
	);
};

export default React.forwardRef<TripDataRef>(TripDataModal);
