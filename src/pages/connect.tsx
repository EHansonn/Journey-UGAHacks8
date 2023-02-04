import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Card, Space, Col, Row, Button } from 'antd';
interface Props {
	users: User[];
}
const Connect = ({ users }) => {
	console.log(users);
	return (
		<div className="flex-col flex space-y-4 ">
			<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
				{users.map((user, i) => (
					<Card title={user.name} className="" size="small">
						<div className="flex ">
							<img src={user.image} className="mt-3 bg-slate-500 rounded-full  h-[100px] w-[100px]" />
							<div className="flex justify-evenly w-full">
								<div className="flex flex-col">Bio: {user.bio}</div>
								<div className="flex flex-col">
									Hobbies:
									{user.hobbies.map((hobby) => (
										<div>{hobby.hobbyName}</div>
									))}
								</div>
								<Button className="content-center" type="primary">
									Connect
								</Button>
							</div>
						</div>
					</Card>
				))}
			</Space>
		</div>
	);
};
export default Connect;

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const users = await prisma?.user.findMany({
			select: { name: true, image: true, bio: true, hobbies: { include: { hobby: true } }, jobName: true },
		});

		if (users) {
			console.log('potato');
			return {
				props: {
					users,
				},
			};
		}
	}
	return { props: { error: 'Failed to load user info' } };
};
