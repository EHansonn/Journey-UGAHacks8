import React, { useRef, useState } from 'react';
import { Circle, GoogleMap, LoadScript, MarkerF, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Trip } from '@/pages/account';
import { User } from '@/pages/account';
import House from '../../public/house.png';
import TripDataModal, { TripDataRef } from './TripDataModal';
interface Props {
	trips: Trip[];
	user: User;
}
const Map: React.FC<Props> = ({ trips, user }) => {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU',
		libraries: ['drawing', 'geometry', 'localContext', 'places', 'visualization'],
	});

	let whichMarkerClicked = 0;

	const onLoad = (marker: any) => {
		console.log('marker: ', marker);
	};

	const center = {
		lat: 30,
		lng: 30,
	};

	const position = {
		lat: 37.772,
		lng: -122.214,
	};

	const TripDataRef = useRef<TripDataRef>(null);
	console.log('918391283123');
	console.log(trips);
	if (isLoaded) {
		return (
			// <LoadScript googleMapsApiKey="AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU">
			<div>
				<TripDataModal ref={TripDataRef} />
				<GoogleMap
					mapContainerClassName=" w-screen h-full"
					id="circle-example"
					// mapContainerStyle={containerStyle}
					center={center}
					zoom={2.5}
				>
					{user.homeLat !== 0 && (
						<MarkerF
							onLoad={onLoad}
							icon={
								'https://cdn.discordapp.com/attachments/1071140153445331048/1071638696148861038/house2.png'
							}
							position={{ lat: user.homeLat, lng: user.homeLon }}
						/>
					)}

					{trips.map((trip, i) => (
						<div key={i + 'hi mom'}>
							<MarkerF
								onClick={() => {
									console.log('hi');
									TripDataRef?.current?.showModal(true, trip);
								}}
								key={i}
								onLoad={onLoad}
								position={{ lat: trip.lat, lng: trip.lon }}
							/>
						</div>
					))}
				</GoogleMap>
			</div>

			// </LoadScript>
		);
	}
	return <div>Loading</div>;
};

export default Map;
