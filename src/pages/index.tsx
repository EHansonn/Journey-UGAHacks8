import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
const inter = Inter({ subsets: ['latin'] });
export default function Home() {
	const backgroundImageStyle = {
		backgroundImage: `url("https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80")`,
		backgroundSize: 'cover',
	};
	return (
		<div className="flex flex-col grow-[1] ">
			<Head>
				<title>Journey</title>
				<meta name="Save your traps, and connect with others" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="App ">
				<div className=" text-white " style={backgroundImageStyle}>
					<div className="bg-gradient-to-r from-black px-8 py-16">
						<div className=" max-w-xl grid grid-cols-1 gap-8">
							<div className="w-12"></div>
							<h2 className="text-xl uppercase font-bold">Upload your travels</h2>
							<h1 className="text-6xl font-bold">Connect with others who have been to similar places</h1>
							<p className="text-lg">
								Instead of uploading all of your travel pictures to Instagram, use this dedicated tool
								to upload and track all of the places you{"'"}ve been.
							</p>
						</div>
					</div>
				</div>

				<div className="px-8 py-16">
					<div className="max-w-md mb-16"></div>

					<div className="grid grid-cols-2 gap-4 text-slate-600">
						<div>
							<h3 className="text-2xl font-bold mb-2">A UGAHacks 8 Project</h3>
							<p className="text-lg">Created by Evan Hanson and Nicolas Newman</p>
						</div>

						<div>
							<h3 className="text-2xl font-bold mb-2">Behind the project</h3>
							<p className="text-lg">Powered by TypeScript, NextJS, Prisma, AWS and more.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
