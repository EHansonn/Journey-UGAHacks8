import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import ProfileSidebar from 'components/ProfileSidebar';
import { UserOutlined } from '@ant-design/icons';
const Account = () => {
	return (
		<div className="flex flex-row h-full  ">
			<div className="bg-red-100 flex content-center flex-col justify-center h-full items-center w-1/3    ">
				<div className="bg-slate-500 rounded-full h-[100px] w-[100px]"></div>
				<div className="text-black">Name</div>
				<div className="flex justify-around w-full text-black ">
					<div>Bio</div>
					<div>123</div>
					<div>534</div>
				</div>
			</div>
			<div className="bg-red-200 h-full w-2/3">2</div>
		</div>
	);
};
export default Account;
