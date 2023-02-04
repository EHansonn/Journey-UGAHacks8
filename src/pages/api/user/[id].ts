import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// prisma.user.ge
	if (req.method === 'GET') {
	} else if (req.method === 'POST') {
	}
	const { id } = req.query as { [key: string]: string };
	const user = await prisma.user.findFirst({ where: { id: id ?? '' } });
	if (user) {
		res.status(200).json({
			name: user.name,
			bio: user.bio,
			pfp: user.pfp,
		});
	}
}
