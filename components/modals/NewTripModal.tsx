import React, { useImperativeHandle, useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

interface Props {}
const { TextArea } = Input;

export interface NewTripRef {
	visible: boolean;
	showModal: (visible: boolean) => void;
	okay: () => void;
	cancel: () => void;
}

const NewTripModal: React.ForwardRefRenderFunction<NewTripRef, Props> = ({}, ref) => {
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

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<>
			<Modal title="User Settings" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}></Modal>
		</>
	);
};

export default React.forwardRef<NewTripRef, Props>(NewTripModal);
