import React, { useImperativeHandle, useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

interface Props {}
const { TextArea } = Input;

export interface EditBioRef {
	visible: boolean;
	showModal: (visible: boolean) => void;
	okay: () => void;
	cancel: () => void;
}

const EditBioModal: React.ForwardRefRenderFunction<EditBioRef, Props> = ({}, ref) => {
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
			<Modal title="User Settings" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item label="Bio" name="Bio" rules={[{ required: false, message: 'Please input your Bio!' }]}>
						<TextArea rows={4} />
					</Form.Item>

					<Form.Item label="Job" name="Job" rules={[{ required: false, message: 'Please input your job!' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Home"
						name="Home"
						rules={[{ required: false, message: 'Please input your home!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Hobbies"
						name="Hobbies"
						rules={[{ required: false, message: 'Please input your hobbies!' }]}
					>
						<TextArea rows={4} />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Save
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default React.forwardRef<EditBioRef, Props>(EditBioModal);
