import { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const Navbar = () => {
	const { data: session } = useSession();
	return (
		<>
			<div className="top-0 w-full left-0 bg-inherit flex justify-start bg-indigo-900 p-4   ">
				{/* <h1 className="text-lg select-none "> */}
				<div className="mr-10">Traveligram</div>
				<div className="flex">
					<Link className="text-white mr-10 no-underline transition duration-300 hover:scale-125" href="/">
						Home
					</Link>

					{session === null ? (
						<Link
							className="text-white mr-10 no-underline transition duration-300 hover:scale-125"
							href="/api/auth/signin"
						>
							Login
						</Link>
					) : (
						<>
							<Link
								className="text-white mr-10 no-underline transition duration-300 hover:scale-125"
								href="/connect"
							>
								Connect
							</Link>
							<Link
								className="text-white mr-10 no-underline transition duration-300 hover:scale-125"
								href={`/users/${session?.user.id}`}
							>
								Your Account
							</Link>
							<Link
								className="text-white mr-10 no-underline transition duration-300 hover:scale-125"
								href="/api/auth/signout "
							>
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
