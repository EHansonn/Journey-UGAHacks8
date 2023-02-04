import Autocomplete from 'react-google-autocomplete';

<Autocomplete
	apiKey={"AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU"}
	onPlaceSelected={(place) => {
		console.log(place);
	}}
/>;
