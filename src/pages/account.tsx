import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import ProfileSidebar from 'components/ProfileSidebar';
import { UserOutlined } from '@ant-design/icons';
import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Bio from 'components/account-components/Bio';
import Settings from 'components/account-components/Settings';
import Trips from 'components/account-components/Trips';
import RenderMap from '../../components/maps/renderMap';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const Account = () => {
	const [displayedInfo, selectDisplayedInfo] = useState('Bio');
	// const ref = useRef<SearchRef>(null);
	// useEffect(() => {
	// 	console.log(ref.current?.location);
	// }, [ref.current?.location]);
	return (
		<div className="flex flex-row h-full  ">
			<div className="bg-red-100 flex content-center flex-col justify-center h-full items-center w-1/3    ">
				<div className="bg-slate-500 rounded-full h-[100px] w-[100px]"></div>
				<div className="text-black">Name</div>
				<div className="flex justify-around w-full text-black ">
					<div
						onClick={() => {
							selectDisplayedInfo('Bio');
						}}
					>
						Bio
					</div>
					<div onClick={() => selectDisplayedInfo('Trips')}>Trips</div>
					<div onClick={() => selectDisplayedInfo('Settings')}>Settings</div>
				</div>
				{displayedInfo === 'Bio' && <Bio></Bio>}
				{displayedInfo === 'Trips' && <Trips></Trips>}
				{displayedInfo === 'Settings' && <Settings></Settings>}
			</div>
			<div className="bg-red-200 h-full w-2/3">
				{/* <ReactGoogleAutocomplete
					apiKey={'AIzaSyBmL0gukE5saXobjQNHTXDgKwUegl4ikMU'}
					onPlaceSelected={(place: any) => {
						console.log(place);
					}}
				/> */}
				<RenderMap />;
			</div>
		</div>
	);
};
export default Account;
//	<RenderMap />
