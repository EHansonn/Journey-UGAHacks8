import { User } from '@/pages/account';
import { Card } from 'antd';

interface Props {
	user: User;
}

const Bio: React.FC<Props> = ({ user }) => {
	return (
		<>
			<Card className="  w-full " title="About">
				<p>{user.bio}</p>
				<p>Job: {user.job}</p>
				<p>From: {user.home}</p>
				<p>Hobbies: {user.hobbies.join(', ')}</p>
			</Card>
		</>
	);
};

export default Bio;
