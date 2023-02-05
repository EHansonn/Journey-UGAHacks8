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
interface Props {
	users: User[];
}

const Connect: React.FC<Props> = ({ users }) => {
	const router = useRouter();
	console.log(users);
	return (
		<div className="flex-col flex space-y-4  ">
			<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
				{users.map((user, i) => (
					<Card key={i} title={user.name} className="" size="small">
						<div className="flex ">
							<img src={user.image} className=" bg-slate-500 rounded-full  h-[100px] w-[100px]" />
							<div className="flex justify-evenly  w-full">
								<div className="flex flex-col border-2 border-black ">
									About<div>{user.bio}</div>{' '}
								</div>
								<div className="flex flex-col ">
									Hobbies
									{user.hobbies.map((hobby, i) => (
										<div key={i}>{hobby.hobbyName}</div>
									))}
								</div>
								{/* <Link
									className="text-black flex justify-center  mr-10 no-underline"
									href={`/users/${user.id}`}
								>
									Connect
								</Link> */}
								<Button
									className="flex"
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
			</Space>
		</div>
	);
};
export default Connect;

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const users = await prisma?.user.findMany({
			select: {
				id: true,
				name: true,
				image: true,
				bio: true,
				hobbies: { include: { hobby: true } },
				jobName: true,
			},
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
