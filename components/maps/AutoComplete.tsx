import { useJsApiLoader } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';

const LocationSearch: React.FC = () => {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU',
		libraries: ['drawing', 'geometry', 'localContext', 'places', 'visualization'],
	});
	if (isLoaded) {
		return (
			<Autocomplete
				// apiKey={'AIzaSyD5ph5jOFo5DH0hYD9CQVjz9kCwZOHvYK4'}
				onPlaceSelected={(place) => {
					console.log(place);
				}}
			/>
		);
	} else {
		return <div>Loading</div>;
	}
};

export default LocationSearch;
