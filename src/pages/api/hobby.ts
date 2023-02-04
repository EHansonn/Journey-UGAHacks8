import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export type HobbyGetResponse =
	| {
			hobby: string[];
	  }
	| { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const hobbies = await prisma.hobby.findMany({});
			const arr = hobbies.map((hobbie) => hobbie.value);

			return res.status(200).json({ hobby: arr });
		} catch (err) {
			return res.status(500).json(err);
		}
	}
}
