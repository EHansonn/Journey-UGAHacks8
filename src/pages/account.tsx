import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import ProfileSidebar from 'components/ProfileSidebar';
import { Button, Space } from 'antd';
const Account = () => {
	return (
		<div className="flex  h-full">
			<div className="bg-red-100 flex-grow h-full w-1/3">1</div>
			<div className="bg-red-200   h-full w-2/3">2</div>
		</div>
	);
};
export default Account;
