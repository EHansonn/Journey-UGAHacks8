import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
	width: '800px',
	height: '800px',
};

const center = {
	lat: 33.857007,
	lng: -83.390678,
};

function MyComponent() {
	return (
		<LoadScript googleMapsApiKey="AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
				{/* Child components, such as markers, info windows, etc. */}
				<></>
			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(MyComponent);
