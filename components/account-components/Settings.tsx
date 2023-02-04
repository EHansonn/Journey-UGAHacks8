import EditBioModal from 'components/modals/EditBioModal';
import { Fragment, useState } from 'react';
import { Button, Space } from 'antd';
const Settings = () => {
    const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button type="primary">Primary Button</Button>
			<div className="text-black">Edit profile</div>
		</>
	);
};

export default Settings;
