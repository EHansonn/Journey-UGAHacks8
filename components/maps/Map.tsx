import React from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
	width: '800px',
	height: '800px',
};

const center = {
	lat: 33.857007,
	lng: -83.390678,
};

const Map: React.FC = () => {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU',
		libraries: ['drawing', 'geometry', 'localContext', 'places', 'visualization'],
	});

	if (isLoaded) {
		return (
			// <LoadScript googleMapsApiKey="AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
				{/* Child components, such as markers, info windows, etc. */}
				<></>
			</GoogleMap>
			// </LoadScript>
		);
	}
	return <div>Loading</div>;
};

export default Map;
