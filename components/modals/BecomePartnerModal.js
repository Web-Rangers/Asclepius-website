import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import { ReactSVG } from 'react-svg';

import styles from '../../styles/components/modals/becomePartner.module.css';

export default function BecomePartnerModal({ open, hideModal, becomePartner }) {
	const layout = {
		labelCol: {
			span: 16,
		},
		wrapperCol: {
			span: { sm: 24, md: 16, lg: 12 },
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

	const onFinish = (values) => {
		console.log(values);
	};

	return (
		<Modal
			title={
				<div className={styles.modalHeader}>
					<span>{becomePartner ? 'გახდი პარტნიორი' : 'რეკლამა პირველზე'}</span>
				</div>
			}
			open={open}
			onOk={hideModal}
			onCancel={hideModal}
			className={styles.modalContent}
			wrapClassName={styles.modalContainer}
			footer={null}
			closeIcon={
				<ReactSVG
					className={styles.closeBtnIcon}
					src='/modalclosebtn.svg'
				/>
			}
			bodyStyle={{ padding: ' 20px 32px 8px 32px', borderRadius: 16 }}
		>
			<Form
				{...layout}
				name='nest-messages'
				onFinish={onFinish}
				validateMessages={validateMessages}
			>
				<Form.Item
					name={['company name']}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input
						placeholder='კომპანიის დასახელება'
						style={{
							width: 573,
							minHeight: 52,
							paddingTop: 15.5,
							paddingBottom: 15.5,
							paddingLeft: 24,
						}}
						className={styles.Input}
					/>
				</Form.Item>
				<div className={styles.nameSurnameConatiner}>
					<Form.Item
						name={['name']}
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input
							style={{
								minWidth: 275,
								minHeight: 52,
								paddingTop: 15.5,
								paddingBottom: 15.5,
								paddingLeft: 24,
							}}
							placeholder='გამომგზავნის სახელი'
							className={styles.Input}
						/>
					</Form.Item>
					<Form.Item
						name={['username']}
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input
							style={{
								minWidth: 275,
								minHeight: 52,
								paddingTop: 15.5,
								paddingBottom: 15.5,
								paddingLeft: 24,
							}}
							className={styles.Input}
							placeholder='გამომგზავნის გვარი'
						/>
					</Form.Item>
				</div>
				<Form.Item
					name={['email']}
					rules={[
						{
							type: 'email',
						},
					]}
				>
					<Input
						style={{
							width: 573,
							minHeight: 52,
							paddingTop: 15.5,
							paddingBottom: 15.5,
							paddingLeft: 24,
						}}
						className={styles.Input}
						placeholder='გამომგზვნის მეილი'
					/>
				</Form.Item>
				<Form.Item
					name={['phone number']}
					rules={[
						{
							type: 'number',
							min: 0,
							max: 99,
						},
					]}
				>
					<Input
						style={{
							width: 573,
							minHeight: 52,
							paddingTop: 15.5,
							paddingBottom: 15.5,
							paddingLeft: 24,
						}}
						className={styles.Input}
						placeholder='გამომგზავნის ტელეფონის ნომერი'
					/>
				</Form.Item>

				<Form.Item name={['text']}>
					<Input.TextArea
						style={{
							width: 573,
							minHeight: 150,
							paddingTop: 15.5,
							paddingBottom: 15.5,
							paddingLeft: 24,
						}}
						className={styles.Input}
						placeholder='ტექსტის ჩასაწერი ბოქსი'
					/>
				</Form.Item>
				<Form.Item
					wrapperCol={{
						...layout.wrapperCol,
						offset: -1,
					}}
				>
					<Button
						type='primary'
						htmlType='submit'
						className={styles.sendBtn}
					>
						გაგზავნა
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
