import { User } from '@/pages/account';

interface Props {
	user: User;
}

const Bio: React.FC<Props> = ({ user }) => {
	return (
		<>
			<div className="text-black flex flex-col h-48 justify-around">
				{user.bio}
				<div>Job: {user.job}</div>
				<div>Home: placeholder</div>
				<div>Hobbies: {user.hobbies.join(', ')}</div>
			</div>
		</>
	);
};

export default Bio;
