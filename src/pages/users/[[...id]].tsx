import { useState } from 'react';
import Bio from 'components/account-components/Bio';
import Settings from 'components/account-components/Settings';
import Trips from 'components/account-components/Trips';
import RenderMap from '../../../components/maps/Map';
import { useSession } from 'next-auth/react';
import LocationSearch from 'components/maps/AutoComplete';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { MinusOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FriendBody } from '../api/friend';
import Friends from 'components/account-components/Friends';

export type User = {
	id: string;
	bio: string;
	pfp: string;
	name: string;
	job: string;
	hobbies: string[];
	home: string;
	homeLat: number;
	homeLon: number;
	friends: { name: string; image: string; id: string }[];
	friendedBy: { name: string; image: string; id: string }[];
};
export type Trip = {
	desc: string;
	location: string;
	date: string;
	lat: number;
	lon: number;
	urls: string[];
};
interface Props {
	user?: User;
	jobs?: string[];
	hobbies?: string[];
	trips?: Trip[];
	error?: string;
}

const Account: NextPage<Props> = ({ user, error, hobbies, jobs, trips }) => {
	const [displayedInfo, selectDisplayedInfo] = useState<'Bio' | 'Trips' | 'Settings' | 'Friends'>('Bio');
	const { data: session } = useSession();
	const isAccount = session?.user.id === user?.id;
	console.log(user);
	const friendIds = user?.friendedBy.map((friend) => friend.id);
	if (error) {
		return <div>Error go brrrrrr {error}</div>;
	}
	if (!user || !jobs || !hobbies || !trips) {
		return <div>Oh no no user!</div>;
	}
	return (
		<div className="flex flex-row  bg-blue-900 rounded-md h-full   ">
			<div className="overflow-y-scroll bg-blue-1000 rounded-md  flex content-center  flex-col   items-center w-1/3    ">
				<div className="relative">
					<img src={user.pfp} className="mt-3 bg-slate-500 rounded-full h-[100px] w-[100px]" />
					{isAccount === false ? (
						<div
							onClick={() => {
								console.log('click');
								if (friendIds?.includes(session?.user.id ?? '')) {
									fetch('http://localhost:3000/api/friend', {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											userId: session?.user.id ?? '',
											friendId: user.id,
											mode: 'unfriend',
										} as FriendBody),
									});
								} else {
									fetch('http://localhost:3000/api/friend', {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											userId: session?.user.id ?? '',
											friendId: user.id,
											mode: 'friend',
										} as FriendBody),
									});
								}
							}}
							className="absolute bottom-1 right-1 bg-black/50 rounded-full text-white hover:text-green-500 active:scale-125 transition text-lg leading-none p-1"
						>
							{friendIds?.includes(session?.user.id ?? '') ? <MinusOutlined /> : <PlusOutlined />}
						</div>
					) : (
						''
					)}
				</div>
				<div className="text-white text-2xl  mb-3">{user.name}</div>
				<div className="flex justify-around w-full min-h-[35px] items-center bg-blue-800 text- mb-4 ">
					<div
						className={`cursor-pointer ${
							displayedInfo === 'Bio'
								? 'border-b-2 border-x-0 border-t-0 border-white border-solid transition duration-150 hover:scale-125'
								: ''
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
								? 'border-b-2 border-x-0 border-t-0 border-white border-solid transition duration-150 hover:scale-125'
								: ''
						}`}
						onClick={() => selectDisplayedInfo('Trips')}
					>
						Trips
					</div>
					{isAccount && (
						<>
							<div
								className={`cursor-pointer ${
									displayedInfo === 'Settings'
										? 'border-b-2 border-x-0 border-t-0 border-white border-solid transition duration-150 hover:scale-125'
										: ''
								}`}
								onClick={() => selectDisplayedInfo('Settings')}
							>
								Profile
							</div>
							<div
								className={`cursor-pointer ${
									displayedInfo === 'Friends'
										? 'border-b-2 border-x-0 border-t-0 border-white border-solid transition duration-150 hover:scale-125'
										: ''
								}`}
								onClick={() => selectDisplayedInfo('Friends')}
							>
								Friends
							</div>
						</>
					)}
				</div>
				{displayedInfo === 'Bio' && <Bio user={user} />}
				{displayedInfo === 'Trips' && <Trips trips={trips} />}
				{displayedInfo === 'Settings' && isAccount && <Settings user={user} jobs={jobs} hobbies={hobbies} />}
				{displayedInfo === 'Friends' && isAccount && <Friends user={user} />}
			</div>
			<div className="bg-indigo-800  w-full rounded-md flex h-full w-2/3 overflow-x-hidden">
				{/* <LocationSearch /> */}
				<RenderMap user={user} trips={trips} />;
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, query }) => {
	let userId = query.id?.[0] as string | null | undefined;
	if (!userId) {
		const session = await getServerSession(req, res, authOptions);
		userId = session?.user.id;
	}

	if (userId) {
		const u = prisma?.user.findFirst({
			where: { id: userId },
			include: { hobbies: true, friended: true, friendedBy: true },
		});
		const j = prisma?.job.findMany({});
		const h = prisma?.hobby.findMany({});
		const t = prisma?.trip.findMany({ where: { userId: userId }, include: { pictures: true } });
		const [user, jobs, hobbies, trips] = await Promise.all([u, j, h, t]);
		console.log(user);
		if (user && jobs && hobbies && trips) {
			return {
				props: {
					user: {
						id: user.id,
						bio: user.bio ?? '',
						pfp: user.image ?? '',
						name: user.name ?? '',
						job: user.jobName ?? '',
						hobbies: user.hobbies.map((hobby) => hobby.hobbyName),
						home: user.home ?? '',
						homeLat: user.homeLat ?? 0,
						homeLon: user.homeLon ?? 0,
						friends: user.friended.map((friend) => ({
							name: friend.name ?? '',
							id: friend.id,
							image: friend.image ?? '',
						})),
						friendedBy:
							user.friendedBy.map((friend) => ({
								name: friend.name ?? '',
								id: friend.id,
								image: friend.image ?? '',
							})) ?? [],
					},
					jobs: jobs.map((job) => job.value),
					hobbies: hobbies.map((hobby) => hobby.value),
					trips: trips.map((trip) => ({
						date: trip.date.toLocaleDateString('en-us'),
						desc: trip.desc,
						location: trip.location,
						lat: trip.lat,
						lon: trip.lon,
						urls: trip.pictures.map((pic) => pic.url),
					})),
				},
			};
		}
	}
	return { props: { error: 'Failed to load user info' } };
};

export default Account;
