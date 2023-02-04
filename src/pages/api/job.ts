import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export type JobGetResponse =
	| {
			jobs: string[];
	  }
	| { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const jobs = await prisma.job.findMany({});
			const arr = jobs.map((job) => job.value);

			return res.status(200).json({ jobs: arr });
		} catch (err) {
			return res.status(500).json(err);
		}
	}
}
