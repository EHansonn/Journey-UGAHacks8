import React from 'react';
import { Circle, GoogleMap, LoadScript, MarkerF, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Trip } from '@/pages/account';
import { User } from '@/pages/account';
import House from '../../public/house.png';
interface Props {
	trips: Trip[];
	user: User;
}
const Map: React.FC<Props> = ({ trips, user }) => {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU',
		libraries: ['drawing', 'geometry', 'localContext', 'places', 'visualization'],
	});

	const onLoad = (marker: any) => {
		console.log('marker: ', marker);
	};

	const center = {
		lat: 0,
		lng: -180,
	};

	const position = {
		lat: 37.772,
		lng: -122.214,
	};

	if (isLoaded) {
		return (
			// <LoadScript googleMapsApiKey="AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU">
			<GoogleMap
				mapContainerClassName=" w-screen h-full"
				id="circle-example"
				// mapContainerStyle={containerStyle}
				center={center}
				zoom={1.5}
			>
				<MarkerF
					onLoad={onLoad}
					icon={'https://cdn.discordapp.com/attachments/1071140153445331048/1071627727578337340/house2.png'}
					position={{ lat: user.homeLat, lng: user.homeLon }}
				/>
				{trips.map((trip, i) => (
					<MarkerF key={i} onLoad={onLoad} position={{ lat: trip.lat, lng: trip.lon }} />
				))}
			</GoogleMap>
			// </LoadScript>
		);
	}
	return <div>Loading</div>;
};

export default Map;
