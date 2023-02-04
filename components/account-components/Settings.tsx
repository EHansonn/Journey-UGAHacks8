import EditBioModal from 'components/modals/EditBioModal';
import { Fragment, useState } from 'react';
import { Button, Space } from 'antd';
import { UserGetResponse } from '@/pages/api/user/[id]';

interface Props {
	user: UserGetResponse;
}
const Settings: React.FC<Props> = ({ user }) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button type="primary">Primary Button</Button>
			<div className="text-black">Edit profile</div>
		</>
	);
};

export default Settings;
