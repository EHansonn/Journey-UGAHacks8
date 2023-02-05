import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Card, Space, Col, Row, Button } from 'antd';
import Link from 'next/link';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import Trips from '../../components/account-components/Trips';

interface Props {
	users: User[];
	currentUser: User;
}

const Connect: React.FC<Props> = ({ users, currentUser }) => {
	const router = useRouter();
	return (
		<div className="flex flex-row">
			<div className="flex-col flex ">
				{/* <Space direction="vertical" size="middle" style={{ display: 'flex' }}> */}
				{users.map((user, i) => (
					<Card key={i} title={user.name} className="" size="small">
						<div className="flex ">
							<img
								src={user.image ?? ''}
								className=" bg-slate-500 rounded-full  h-[100px] w-[100px] mr-3"
							/>
							<div className="flex flex-col justify-evenly">
								<div>{user.bio}</div>
								<div className="">
									Hobbies: {user.hobbies.map((hobby, i) => hobby.hobbyName).join(', ')}
								</div>
								<div className="">Job: {user.jobName}</div>
								<Button
									className="w-32"
									onClick={() => {
										router.push(`/users/${user.id}`);
									}}
									type="primary"
								>
									Connect
								</Button>
							</div>
						</div>
					</Card>
				))}
				{/* </Space> */}
			</div>
		</div>
	);
};
export default Connect;

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const currentUser = await prisma?.user.findUnique({
			where: { id: session.user.id },
			select: {
				id: true,
				name: true,
				image: true,
				bio: true,
				hobbies: { select: { hobby: true } },
				jobName: true,
				trips: { select: { location: true, date: true } },
			},
		});

		const users = await prisma?.user.findMany({
			select: {
				id: true,
				name: true,
				image: true,
				bio: true,
				hobbies: { include: { hobby: true } },
				jobName: true,
				home: true,
			},
		});

		if (users && currentUser) {
			const now = new Date(Date.now());
			const tripLocations: string[] = [];
			currentUser?.trips.forEach((trip) => {
				if (trip.date > now) {
					tripLocations.push(trip.location);
				}
			});
			currentUser.trips = [];
			console.log('potato');
			const filtered = users.filter((user) => tripLocations.includes(user.home ?? ''));
			return {
				props: {
					users: filtered,
					currentUser,
				},
			};
		}
	}
	return { props: { error: 'Failed to load user info' } };
};
