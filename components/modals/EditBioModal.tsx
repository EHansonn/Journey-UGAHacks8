import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'antd';
import { UserGetResponse } from '@/pages/api/user/[id]';
import { User } from '@/pages/account';

interface Props {
	user: User;
}

export interface EditBioRef {
	visible: boolean;
	showModal: (visible: boolean) => void;
	okay: () => void;
	cancel: () => void;
}
const EditBioModal: React.ForwardRefRenderFunction<EditBioRef, Props> = ({ user }, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		visible: isModalOpen,
		cancel: handleCancel,
		okay: handleOk,
		showModal,
	}));

	const showModal = (visible: boolean) => {
		setIsModalOpen(visible);
	};

	const handleOk = async () => {
		setIsModalOpen(false);
		fetch(`http://localhost:3000/api/user/${user.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(''),
		});
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	);
};

export default React.forwardRef<EditBioRef, Props>(EditBioModal);
