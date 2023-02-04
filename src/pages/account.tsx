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
	job: string;
	hobbies: string[];
};
export type Trip = {
	desc: string;
	location: string;
	date: string;
	lat: number;
	lon: number;
};
interface Props {
	user?: User;
	jobs?: string[];
	hobbies?: string[];
	trips?: Trip[];
	error?: string;
}

const Account: NextPage<Props> = ({ user, error, hobbies, jobs, trips }) => {
	const [displayedInfo, selectDisplayedInfo] = useState<'Bio' | 'Trips' | 'Settings'>('Bio');
	if (error) {
		return <div>Error go brrrrrr {error}</div>;
	}
	if (!user || !jobs || !hobbies || !trips) {
		return <div>Oh no no user!</div>;
	}
	console.log(user);
	return (
		<div className="flex flex-row h-full  ">
			<div className="bg-sky-800 flex content-center flex-col justify-center h-full items-center w-1/3    ">
				<div className="bg-slate-500 rounded-full h-[100px] w-[100px]"></div>
				<div className="text-white text-2xl mb-3">{user.name}</div>
				<div className="flex justify-around w-full text-white mb-4">
					<div
						className={`cursor-pointer ${
							displayedInfo === 'Bio' ? 'border-b-2 border-x-0 border-t-0 border-white border-solid' : ''
						}`}
						onClick={() => {
							selectDisplayedInfo('Bio');
						}}
					>
						Bio
					</div>
					<div
						className={`cursor-pointer ${
							displayedInfo === 'Trips'
								? 'border-b-2 border-x-0 border-t-0 border-white border-solid'
								: ''
						}`}
						onClick={() => selectDisplayedInfo('Trips')}
					>
						Trips
					</div>
					<div
						className={`cursor-pointer ${
							displayedInfo === 'Settings'
								? 'border-b-2 border-x-0 border-t-0 border-white border-solid'
								: ''
						}`}
						onClick={() => selectDisplayedInfo('Settings')}
					>
						Settings
					</div>
				</div>
				{displayedInfo === 'Bio' && <Bio user={user} />}
				{displayedInfo === 'Trips' && <Trips trips={trips} />}
				{displayedInfo === 'Settings' && <Settings user={user} jobs={jobs} hobbies={hobbies} />}
			</div>
			<div className="bg-indigo-800 h-full w-2/3">
				{/* <LocationSearch /> */}
				<RenderMap trips={trips} />;
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const u = prisma?.user.findFirst({ where: { id: session.user.id }, include: { hobbies: true } });
		const j = prisma?.job.findMany({});
		const h = prisma?.hobby.findMany({});
		const t = prisma?.trip.findMany({ where: { userId: session.user.id } });

		const [user, jobs, hobbies, trips] = await Promise.all([u, j, h, t]);
		if (user && jobs && hobbies && trips) {
			return {
				props: {
					user: {
						id: user.id,
						bio: user.bio ?? '',
						pfp: user.pfp ?? '',
						name: user.name ?? '',
						job: user.jobName ?? '',
						hobbies: user.hobbies.map((hobby) => hobby.hobbyName),
					},
					jobs: jobs.map((job) => job.value),
					hobbies: hobbies.map((hobby) => hobby.value),
					trips: trips.map((trip) => ({
						date: trip.date.getFullYear().toString(),
						desc: trip.desc,
						location: trip.location,
						lat: trip.lat,
						lon: trip.lon,
					})),
				},
			};
		}
	}
	return { props: { error: 'Failed to load user info' } };
};

export default Account;
