import React, { useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'antd';

interface Props {
	visible: boolean,
}

export interface EditBioRef {
	visible: boolean;
	showModal: (visible: boolean) => void;
	okay: () => void;
	cancel: () => void;
}
const EditBioModal: React.ForwardRefRenderFunction<EditBioRef,Props> = ({visible},ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	useImperativeHandle(ref, () => ({
		 visible: isModalOpen,
		 cancel: handleCancel,
		 okay: handleOk,
		 showModal,

	}))



	const showModal = (visible: boolean) => {
		setIsModalOpen(visible);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal title="Basic Modal" open={visible} onOk={handleOk} onCancel={handleCancel}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	);
};

export default React.forwardRef<EditBioRef,Props>(EditBioModal);
