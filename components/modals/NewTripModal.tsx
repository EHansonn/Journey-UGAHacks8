import React, { useImperativeHandle, useState } from 'react';
import {
	Button,
	Modal,
	Form,
	Input,
	Radio,
	Upload,
	DatePicker,
	DatePickerProps,
	TimeRangePickerProps,
	Space,
} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import LocationSearch from '../../components/maps/AutoComplete';

interface Props {}
const { TextArea } = Input;

export interface NewTripRef {
	visible: boolean;
	showModal: (visible: boolean) => void;
	okay: () => void;
	cancel: () => void;
}

const NewTripModal: React.ForwardRefRenderFunction<NewTripRef, Props> = ({}, ref) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const { RangePicker } = DatePicker;

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

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

	const onChange = (value, dateString) => {
		console.log('Selected Time: ', value);
		console.log('Formatted Selected Time: ', dateString);
	};

	const getBase64 = (file: RcFile): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	return (
		<>
			<Modal title="New Trip" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				{/* <LocationSearch></LocationSearch> */}
				<RangePicker onChange={onChange} />
				<Upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
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

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Save
						</Button>
					</Form.Item>
				</Form>
				<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</Modal>
		</>
	);
};

export default React.forwardRef<NewTripRef, Props>(NewTripModal);
