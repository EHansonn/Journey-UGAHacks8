import { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const Navbar = () => {
	const { data: session } = useSession();
	return (
		<>
			<div className="sticky top-0 w-full left-0 bg-inherit flex justify-start bg-indigo-900 p-4   ">
				{/* <h1 className="text-lg select-none "> */}
				<div className="mr-10">Website name</div>
				<div className="flex">
					<Link className="text-white mr-10 no-underline" href="/">
						Home
					</Link>

					{session === null ? (
						<Link className="text-white mr-10 no-underline" href="/api/auth/signin">
							Login
						</Link>
					) : (
						<>
							<Link className="text-white mr-10 no-underline" href="/connect">
								Connect
							</Link>
							<Link className="text-white mr-10 no-underline" href="/account">
								Account
							</Link>
							<Link className="text-white mr-10 no-underline" href="/api/auth/signout">
								Signout
							</Link>
						</>
					)}
				</div>

				<i className="fa-solid fa-user text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"></i>
			</div>
		</>
	);
};

export default Navbar;
