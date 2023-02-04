import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

interface Props {}
const Connect = () => {
	return <h1>Connect123</h1>;
};
export default Connect;

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const users = await prisma?.user.findMany({
			select: { name: true, image: true, bio: true, hobbies: { include: { hobby: true } }, jobName: true },
		});

		if (users) {
			return {
				props: {
					users,
				},
			};
		}
	}
	return { props: { error: 'Failed to load user info' } };
};
