import { useState } from 'react';
import Bio from 'components/account-components/Bio';
import Settings from 'components/account-components/Settings';
import Trips from 'components/account-components/Trips';
import RenderMap from '../../components/maps/Map';
import { useSession } from 'next-auth/react';
import LocationSearch from 'components/maps/AutoComplete';
import { UserGetResponse } from './api/user/[id]';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export type User = {
	id: string;
	bio: string;
	pfp: string;
	name: string;
};
interface Props {
	user?: User;
	error?: string;
}

const Account: NextPage<Props> = ({ user, error }) => {
	const [displayedInfo, selectDisplayedInfo] = useState('Bio');
	if (error) {
		return <div>Error go brrrrrr {error}</div>;
	}
	if (!user) {
		return <div>Oh no no user!</div>;
	}
	console.log(user);
	return (
		<div className="flex flex-row h-full  ">
			<div className="bg-red-100 flex content-center flex-col justify-center h-full items-center w-1/3    ">
				<div className="bg-slate-500 rounded-full h-[100px] w-[100px]"></div>
				<div className="text-black">{user.name}</div>
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
				{displayedInfo === 'Bio' && <Bio user={user} />}
				{displayedInfo === 'Trips' && <Trips />}
				{displayedInfo === 'Settings' && <Settings user={user} />}
			</div>
			<div className="bg-red-200 h-full w-2/3">
				<LocationSearch />
				<RenderMap />;
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const user = await prisma?.user.findFirst({ where: { id: session.user.id } });
		if (user) {
			return {
				props: { user: { id: user.id, bio: user.bio ?? '', pfp: user.pfp ?? '', name: user.name ?? '' } },
			};
		}
	}
	return { props: { error: 'Failed to load user info' } };
};

export default Account;
