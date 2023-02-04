import type { NextPage } from 'next';
import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar';

interface Props {
	children: ReactNode;
}
const Layout: NextPage<Props> = ({ children }) => {
	//const { data: session, status } = useSession();

	return (
		<div className="text-blue-600">
			<Navbar></Navbar>
			<main className="h-full">{children}</main>
			<div className="text-blue-600">Hello</div>
		</div>
	);
};

export default Layout;
