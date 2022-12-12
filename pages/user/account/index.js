import React, { useState } from 'react';
import {
	Button,
	Form,
	Input,
	InputNumber,
	Select,
	DatePicker,
	Option,
	Space,
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import s from '../../../styles/pages/account.module.css';
import { height } from '@mui/system';

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};
/* eslint-enable no-template-curly-in-string */

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};
const config = {
	rules: [
		{
			type: 'object',
			required: true,
			message: 'Please select time!',
		},
	],
};

const Account = () => {
	const onFinish = (values) => {
		console.log(values);
	};

	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);

	const prefixSelector = (
		<Form.Item
			name='prefix'
			noStyle
		>
			<Select
				style={{
					width: 70,
				}}
			>
				<Select.Option value='86'>+86</Select.Option>
				<Select.Option value='87'>+87</Select.Option>
			</Select>
		</Form.Item>
	);

	return (
		<div className={s.accountContainer}>
			<div className={s.leftSideContainer}>
				<span className={s.accountContainerTitile}>Account settings</span>
				<Upload
					name='avatar'
					listType='picture-card'
					className='avatar-uploader'
					showUploadList={false}
					action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
					beforeUpload={beforeUpload}
					onChange={handleChange}
				>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt='avatar'
							style={{
								width: '100%',
							}}
						/>
					) : (
						uploadButton
					)}
				</Upload>
			</div>
			<div>
				<Form
					{...layout}
					layout={'vertical'}
					name='nest-messages'
					onFinish={onFinish}
					className={'accountForm'}
					validateMessages={validateMessages}
				>
					<div className={s.formContainer}>
						<div>
							<Form.Item
								name={['user', 'name']}
								label='Name'
								rules={[
									{
										required: true,
									},
								]}
							>
								<Input
									placeholder='Enter Name'
									className={s.inputStyle}
								/>
							</Form.Item>

							<Form.Item label='InputNumber'>
								<InputNumber
									disabled
									className={s.inputStyle}
								/>
							</Form.Item>

							<Form.Item
								name='phone'
								label='Phone Number'
								rules={[
									{
										required: true,
										message: 'Please input your phone number!',
									},
								]}
							>
								<Input
									className={s.inputStyle}
									placeholder='Enter phone number'
									addonBefore={prefixSelector}
									style={{ border: 'none', width: '340px' }}
								/>
							</Form.Item>
							<Form.Item label='City'>
								<Select
									placeholder='Enter city'
									style={{ width: '340px' }}
								>
									<Select.Option value='demo'>Demo</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								name={['user', 'name']}
								label='Address'
								rules={[
									{
										required: true,
									},
								]}
							>
								<Input
									placeholder='Enter address'
									className={s.inputStyle}
								/>
							</Form.Item>
						</div>
						<div>
							<Form.Item
								name={['user', 'surName']}
								label='Surname'
								rules={[
									{
										required: true,
									},
								]}
							>
								<Input
									placeholder='Enter surname'
									className={s.inputStyle}
								/>
							</Form.Item>
							<Form.Item
								name={['user', 'email']}
								label='Email'
								rules={[
									{
										type: 'email',
									},
								]}
							>
								<Input
									placeholder='Enter E-mail'
									className={s.inputStyle}
								/>
							</Form.Item>
							<Form.Item
								name='date-picker'
								label='DatePicker'
								{...config}
							>
								<DatePicker className={s.inputStyle} />
							</Form.Item>

							<Form.Item
								name='gender'
								label='Gender'
								rules={[
									{
										required: true,
										message: 'Please select gender!',
									},
								]}
							>
								<Select
									placeholder='Choose gender'
									style={{ width: '340px' }}
								>
									<Select.Option value='male'>Male</Select.Option>
									<Select.Option value='female'>Female</Select.Option>
								</Select>
							</Form.Item>
						</div>
					</div>
					<span className={s.changePasTitile}>Change password</span>
					<div className={s.bottomFormContainer}>
						<div style={{ width: '100%' }}>
							<Form.Item
								label='Current password'
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password
									placeholder='Enter current password'
									className={s.inputStyle}
								/>
							</Form.Item>
						</div>
						<div style={{ width: '100%' }}>
							<Form.Item
								label='New password'
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password
									placeholder='Enter New password'
									className={s.inputStyle}
								/>
							</Form.Item>
							<Form.Item
								label='Repeat password'
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password
									placeholder='Repeat password'
									className={s.inputStyle}
								/>
							</Form.Item>
							<Form.Item

							// wrapperCol={{
							// 	...layout.wrapperCol,
							// 	offset: 8,
							// }}
							>
								<Button
									type='primary'
									htmlType='submit'
									style={{
										width: '171px',
										height: '52px',
										background: '#3A74D2',
										borderRadius: '5px',
									}}
								>
									Save
								</Button>
							</Form.Item>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};
export default Account;
