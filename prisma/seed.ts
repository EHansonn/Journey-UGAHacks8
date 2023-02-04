import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
const prisma = new PrismaClient();
dotenv.config({ path: '../.env' });

async function main() {
	await prisma.job.createMany({
		data: [
			{ value: 'Programmer' },
			{ value: 'Engineer' },
			{ value: 'Teacher' },
			{ value: 'Doctor' },
			{ value: 'Student' },
			{ value: 'Athlete' },
			{ value: 'Lawyer' },
			{ value: 'Pilot' },
			{ value: 'Pokemon Master' },
		],
	});

	await prisma.hobby.createMany({
		data: [
			{ value: 'Hiking' },
			{ value: 'Gaming' },
			{ value: 'Reading' },
			{ value: 'Sports' },
			{ value: 'Theater' },
			{ value: 'Food' },
			{ value: 'TV' },
			{ value: 'Movies' },
			{ value: 'History' },
			{ value: 'Politics' },
		],
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect;
	});
