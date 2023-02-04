import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Bio from 'components/account-components/Bio';
import Settings from 'components/account-components/Settings';
import Trips from 'components/account-components/Trips';
import RenderMap from '../../components/maps/Map';
import { useSession } from 'next-auth/react';
import LocationSearch from 'components/maps/AutoComplete';

const Account = () => {
	const [displayedInfo, selectDisplayedInfo] = useState('Bio');
	const { data: session } = useSession();
	useEffect(() => {
		fetch(`http://localhost:3000/api/user/${session?.user.id}`)
			.then(async (data) => {
				console.log(await data.json());
			})
			.catch((err) => {
				console.error(err);
			});
	}, [session?.user.id]);
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
				<LocationSearch />
				<RenderMap />;
			</div>
		</div>
	);
};
export default Account;
//	<RenderMap />
