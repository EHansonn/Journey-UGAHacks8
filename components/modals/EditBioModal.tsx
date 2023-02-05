import React, { useEffect, useImperativeHandle, useState } from 'react';
import { UserBody, UserGetResponse } from '@/pages/api/user/[id]';
import { User } from '@/pages/account';
import { Button, Modal, Form, Input, Radio, Select } from 'antd';

interface Props {
	user: User;
	hobbies: string[];
	jobs: string[];
}

interface FormFields {
	bio: string;
	job: string;
	hobbies: string[];
}

const { TextArea } = Input;
const { Option } = Select;

export interface EditBioRef {
	visible: boolean;
	showModal: (visible: boolean) => void;
	okay: () => void;
	cancel: () => void;
}

const EditBioModal: React.ForwardRefRenderFunction<EditBioRef, Props> = ({ user, jobs, hobbies }, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm<FormFields>();

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
			body: JSON.stringify({}),
		});
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	console.log(jobs);
	const jobOptions = jobs.map((job) => ({ value: job, label: job }));
	const hobbyOptions = hobbies.map((hobby) => ({ value: hobby, label: hobby }));
	return (
		<>
			<Modal title="User Settings" onCancel={handleCancel} open={isModalOpen} footer={null}>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={({ bio, hobbies, job }) => {
						fetch(`http://localhost:3000/api/user/${user.id}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ bio, hobbies, job, id: user.id } as UserBody),
						});
					}}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					form={form}
				>
					<Form.Item label="Bio" name="bio" rules={[{ required: false, message: 'Please input your Bio!' }]}>
						<TextArea rows={4} defaultValue={user.bio} />
					</Form.Item>

					<Form.Item label="Job" name="job" rules={[{ required: false, message: 'Please input your job!' }]}>
						<Select defaultValue={user.job} options={jobOptions} />
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
						name="hobbies"
						rules={[{ required: false, message: 'Please input your hobbies!' }]}
					>
						<Select mode="multiple" options={hobbyOptions} defaultValue={user.hobbies} />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button className="text-black  shadow shadow-md shadow-2xl" onClick={handleCancel}>
							Cancel
						</Button>
						<Button className="text-black shadow shadow-md shadow-2xl " htmlType="submit">
							Save
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default React.forwardRef<EditBioRef, Props>(EditBioModal);
