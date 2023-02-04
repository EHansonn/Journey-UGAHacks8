import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export interface UserBody {
	id: string;
	bio: string;
	name: string;
	// pfp: string;
	job: string;
	hobbies: string[];
}
interface UserApiRequest extends NextApiRequest {
	body: UserBody;
	query: {
		id: string;
	};
}

export type UserGetResponse =
	| {
			name: string;
			bio: string;
			pfp: string;
			id: string;
	  }
	| { error: string };

export type UserPostResponse = User | { [key: string]: any };

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
	// prisma.user.ge
	if (req.method === 'GET') {
		const { id } = req.query;
		try {
			const user = await prisma.user.findFirst({ where: { id: id ?? '' } });
			if (user) {
				res.status(200).json({
					name: user.name,
					bio: user.bio,
					pfp: user.pfp,
					id,
				});
			}
			return res.status(500).json({ error: `A user of id ${id} could not be found.` });
		} catch (err) {
			return res.status(500).json(err);
		}
	} else if (req.method === 'POST') {
		const { id, name, bio, job, hobbies } = req.body;
		try {
			console.log(req.body);
			await prisma.hobbiesOnUser.deleteMany({ where: { userId: id } });
			await prisma.hobbiesOnUser.createMany({ data: hobbies.map((hobby) => ({ hobbyName: hobby, userId: id })) });
			const user = await prisma.user.update({
				where: { id },
				data: { bio, name, jobName: job },
				include: { hobbies: true },
			});
			return res.status(200).json(user);
		} catch (err) {
			return res.status(500).json(err);
		}
	}
}
