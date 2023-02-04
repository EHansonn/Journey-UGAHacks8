import { User } from '@/pages/account';

interface Props {
	user: User;
}

const Bio: React.FC<Props> = ({ user }) => {
	return (
		<>
			<div className="text-black flex flex-col h-48 justify-around">
				{user.bio}
				<div>Job: placeholder</div>
				<div>Home: placeholder</div>
				<div>Hobbies: placeholder</div>
			</div>
		</>
	);
};

export default Bio;
