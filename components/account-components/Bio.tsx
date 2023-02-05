import { User } from '@/pages/account';

interface Props {
	user: User;
}

const Bio: React.FC<Props> = ({ user }) => {
	return (
		<>
			<div className="text-white grid grid-cols-2">
				<div className="col-span-2 mb-3">{user.bio}</div>
				<div>Job:</div>
				<div>{user.job}</div>
				<div>Home:</div>
				<div>{user.home}</div>
				<div>Hobbies:</div>
				<div>{user.hobbies.join(', ')}</div>
			</div>
		</>
	);
};

export default Bio;
