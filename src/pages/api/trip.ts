import { User } from '@prisma/client';
import { uploadImages } from 'lib/aws';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export interface TripBody {
	userId: string;
	location: string;
	desc: string;
	date: string;
	lat: number;
	lon: number;
	urls: { name: string; body: string }[];
}
interface UserApiRequest extends NextApiRequest {
	body: TripBody;
	query: {
		id: string;
	};
}

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
	// prisma.user.ge
	if (req.method === 'POST') {
		const { userId, location, desc, lat, lon, date, urls } = req.body;
		try {
			const result = await uploadImages(urls);
			const trip = await prisma.trip.create({
				data: { userId, location, desc, date, lat, lon },
			});
			const pictures = urls.map((url) => ({
				tripId: trip.id,
				desc: '',
				url: `https://uga-hacks-8.s3.us-east-1.amazonaws.com/${url.name}`,
				userId,
			}));
			await prisma.picture.createMany({ data: pictures });
			return res.status(200).json(trip);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb', // Set desired value here
		},
	},
};
