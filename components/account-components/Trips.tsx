import { Trip } from '@/pages/account';
import { Card, Collapse } from 'antd';
import React from 'react';
interface Trips {
	trips: Trip[];
}
const { Panel } = Collapse;

const monthToString = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const Trips: React.FC<Trips> = ({ trips }) => {
	const dateFields = (date: string) => {
		const fields = date.split('/').map((f) => parseInt(f));
		return {
			month: fields[0],
			day: fields[1],
			year: fields[2],
		};
	};
	const now = dateFields(new Date(Date.now()).toLocaleDateString('en-us'));
	const tabs = trips.reduce<{ [key: string]: { [key: string]: Trip[] } }>(
		(prev, curr) => {
			const date = dateFields(curr.date);
			if (date.year >= now.year && date.month >= now.month && date.day > now.day) {
				if (!prev['Upcoming'][date.year]) prev['Upcoming'][date.year] = [];
				prev['Upcoming'][date.year].push(curr);
			} else {
				if (!prev[date.year]) prev[date.year] = {};
				if (!prev[date.year][date.month]) prev[date.year][date.month] = [];
				prev[date.year][date.month].push(curr);
			}
			return prev;
		},
		{ Upcoming: {} },
	);
	return (
		<div className="flex-col flex  w-full">
			<Collapse defaultActiveKey={['2023', '2022', '2021', '2020', 'Upcoming']} ghost>
				{Object.entries(tabs)
					.reverse()
					.map(([year, months]) => (
						<Panel className="bg-blue-100 rounded-xl mb-4 mx-2" header={year} key={year}>
							<Collapse ghost>
								{Object.entries(months)
									.reverse()
									.map(([month, trips]) => (
										<Panel header={monthToString[parseInt(month) - 1] ?? month} key={month}>
											{trips.reverse().map((trip, i1) => (
												//= <div className="text-white">
												// 	<div>{trip.location}</div>
												// 	<div>{trip.desc}</div>
												// </div>
												<Card title={trip.location} key={i1}>
													<div>{trip.date}</div>
													<div>{trip.desc}</div>
													<ul className="flex flex-wrap list-none m-0 p-0">
														{trip.urls.map((url, i2) => (
															<li
																key={i2}
																className="h-[20vh] flex-grow m-1 overflow-x-hidden"
															>
																<img
																	className="max-h-full min-w-full  object-cover align-bottom"
																	src={url}
																/>
															</li>
														))}
													</ul>
													{/* <div className="columns-2 leading-none gap-2">
														{trip.urls.map((url) => (
															<img className="w-full h-auto mb-2" src={url} />
														))}
													</div> */}
												</Card>
											))}
										</Panel>
									))}
							</Collapse>
						</Panel>
					))}
			</Collapse>
		</div>
	);
};

export default Trips;
