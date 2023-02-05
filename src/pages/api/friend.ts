import { User } from '@prisma/client';
import { uploadImages } from 'lib/aws';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export interface FriendBody {
	userId: string;
	friendId: string;
	mode: 'friend' | 'unfriend';
}
interface UserApiRequest extends NextApiRequest {
	body: FriendBody;
	query: {
		id: string;
	};
}

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
	// prisma.user.ge
	if (req.method === 'POST') {
		const { userId, friendId, mode } = req.body;
		try {
			if (mode === 'friend') {
				const response = await prisma.user.update({
					where: { id: userId },
					data: { friended: { connect: [{ id: friendId }] } },
				});
				await prisma.user.update({
					where: { id: friendId },
					data: { friendedBy: { connect: [{ id: userId }] } },
				});
				return res.status(200).json(response);
			} else {
				const response = await prisma.user.update({
					where: { id: userId },
					data: { friended: { disconnect: [{ id: friendId }] } },
				});
				await prisma.user.update({
					where: { id: friendId },
					data: { friendedBy: { disconnect: [{ id: userId }] } },
				});
				return res.status(200).json(response);
			}
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	}
}
