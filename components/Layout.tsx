import type { NextPage } from 'next';
import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar';

interface Props {
	children: ReactNode;
}
const Layout: NextPage<Props> = ({ children }) => {
	//const { data: session, status } = useSession();

	return (
		<div className="flex flex-col min-h-screen relative bg-slate-900 text-white">
			<Navbar></Navbar>
			<main className="flex-1 flex flex-col p-4">{children}</main>
			<div className="text-blue-600"></div>
		</div>
	);
};

export default Layout;
