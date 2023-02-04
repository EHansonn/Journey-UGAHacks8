import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export interface TripBody {
	userId: string;
	location: string;
	lat: number;
	lon: number;
	desc: string;
	date: string;
}
interface UserApiRequest extends NextApiRequest {
	body: TripBody;
	query: {
		id: string;
	};
}

export type UserPostResponse = User | { [key: string]: any };

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
	// prisma.user.ge
	if (req.method === 'POST') {
		const { userId, location, lat, lon, desc, date } = req.body;
		try {
			console.log(req.body);
			const user = await prisma.trip.create({
				data: { userId, location, lat, lon,desc, date },
			});
			return res.status(200).json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	}
}
