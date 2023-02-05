import { User } from '@/pages/account';

interface Props {
	user: User;
}

const Bio: React.FC<Props> = ({ user }) => {
	return (
		<>
			<div className="text-white grid grid-cols-2 mx-3">
				<div className="col-span-2 mb-3">{user.bio}</div>
				<div className="justify-self-center w-20 text-end mb-2">Job:</div>
				<div>{user.job}</div>
				<div className="justify-self-center w-20 text-end mb-2">Home:</div>
				<div>Tamriel</div>
				<div className="justify-self-center w-20 text-end mb-2">Hobbies:</div>
				<div>{user.hobbies.join(', ')}</div>
			</div>
		</>
	);
};

export default Bio;
