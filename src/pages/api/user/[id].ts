import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

interface UserApiRequest extends NextApiRequest {
	body: {
		id: string;
		bio: string;
		name: string;
		pfp: string;
	};
	query: {
		id: string;
	};
}
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
				});
			}
			return res.status(500).json({ error: `A user of id ${id} could not be found.` });
		} catch (err) {
			return res.status(500).json(err);
		}
	} else if (req.method === 'POST') {
		const { id, name, bio, pfp } = req.body;
		try {
			const user = await prisma.user.update({ where: { id }, data: { bio, name, pfp } });
			return res.status(200).json(user);
		} catch (err) {
			return res.status(500).json(err);
		}
	}
}
