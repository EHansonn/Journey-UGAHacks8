import { useEffect } from 'react';
import Link from 'next/link';
const Navbar = () => {
	return (
		<>
			<div className="sticky top-0 w-full left-0 bg-inherit flex justify-content: space-around; justify-around bg-indigo-900 p-4 border-b border-solid border-white  ">
				<h1 className="text-3xl select-none sm:text-6xl">
					<Link href="/">Home</Link>
				</h1>
				<h1 className="text-3xl select-none sm:text-6xl">
					<Link href="/connect">Connect</Link>
				</h1>
				<h1 className="text-3xl select-none sm:text-6xl">
					<Link href="/account">Account</Link>
				</h1>
				<h1 className="text-3xl select-none sm:text-6xl">
					<Link href="/api/auth/signin">Login</Link>
				</h1>

				<i className="fa-solid fa-user text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"></i>
			</div>
		</>
	);
};

export default Navbar;
