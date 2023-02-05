import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export interface UserBody {
	id: string;
	bio: string;
	name: string;
	home: string;
	// pfp: string;
	job: string;
	hobbies: string[];
	homeLat: number;
	homeLon: number;
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
					pfp: user.image,
					id,
				});
			}
			return res.status(500).json({ error: `A user of id ${id} could not be found.` });
		} catch (err) {
			return res.status(500).json(err);
		}
	} else if (req.method === 'POST') {
		const { id, name, bio, job, hobbies, home, homeLat, homeLon } = req.body;
		try {
			console.log(
				'e9080918290381092389012839018309180918209381902849081902481902840912849021849018049819204819024890',
			);
			console.log(home);
			console.log(req.body);
			await prisma.hobbiesOnUser.deleteMany({ where: { userId: id } });
			await prisma.hobbiesOnUser.createMany({ data: hobbies.map((hobby) => ({ hobbyName: hobby, userId: id })) });
			const user = await prisma.user.update({
				where: { id },
				data: { bio, name, jobName: job, home, homeLat, homeLon },
				include: { hobbies: true },
			});
			console.log('IOIEWQUIOEUQIOWUEIOQWUIOEUQIOEUOQIWUIORUIOQURIOUQIOTUIQOTWUO');
			console.log(user);
			return res.status(200).json(user);
		} catch (err) {
			console.log('37198237981274891789547819275987895178957128975');
			console.log(err);
			return res.status(500).json(err);
		}
	}
}
