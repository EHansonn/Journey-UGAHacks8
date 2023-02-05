import { useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useEffect, useRef } from 'react';
import { useImperativeHandle, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

export interface AutoCompleteRef {
	location: google.maps.places.PlaceResult | null;
}

interface Props {
	getThing: (props: any) => void;
}

const LocationSearch: React.FC<Props> = (props) => {
	const [someState, setSomeState] = useState(false);
	//@ts-ignore
	const onPlaceSelected = React.forwardRef(() => undefined);
	onPlaceSelected.displayName = 'onPlaceSelected';

	const toggleState = useCallback(() => {
		const newState = !someState;
		setSomeState(newState);
		console.log('new state is', newState);
	}, [someState]);

	// "onPlaceSelected" is assinged a new function everytime "toggleState" changes
	useEffect(() => {
		//@ts-ignore
		onPlaceSelected.current = (place) => {
			//console.log(place);
			//@ts-ignore
			//console.log();
			props.getThing(place);
			toggleState();
		};
	}, [toggleState]);

	return (
		<Autocomplete
			apiKey={'AIzaSyD5ph5jOFo5DH0hYD9CQVjz9kCwZOHvYK4'}
			onPlaceSelected={(places) => {
				//@ts-ignore
				onPlaceSelected.current(places);
			}}
		/>
	);
};

// // apiKey={'AIzaSyD5ph5jOFo5DH0hYD9CQVjz9kCwZOHvYK4'}
// 				onPlaceSelected={(place) => {
// 					d('dumb');
// 					console.log('poopy');
// 					selectSelectedState(place);
// 					console.log(place);
export default LocationSearch;
