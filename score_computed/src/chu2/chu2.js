import React, { RefObject } from 'react'
import {
	Space,
	Card,
	Form,
	Input,
	Button,
	Dialog,
	TextArea,
	DatePicker,
	Selector,
	Slider,
	Stepper,
	Switch
} from 'antd-mobile'
import dayjs from 'dayjs'
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker'
import { calculateFinalScore } from './computed'
import { genderOptions, gradeOptions } from '../App'
import './chu2.css'

export default ({ onFinish, onClose, baseInfo }) => {
	const handleFinish = (values: any) => {
		const finalScore = calculateFinalScore(values)
		console.log(finalScore)
		onFinish(finalScore) // 调用父组件传入的回调函数
	}

	const { grade, gender } = baseInfo

	console.log(grade, gender)

	// 找到匹配的年级和性别标签
	const gradeLabel = gradeOptions.find(option => option.value === grade)?.label || '未知年级'
	const genderLabel = genderOptions.find(option => option.value === gender)?.label || '未知性别'

	const formTitle = `${gradeLabel} ${genderLabel}学生 体测成绩填写`

	return (
		<Form
			layout="horizontal"
			title={'wtf?'}
			footer={
				<div
					style={{
						display: 'flex',
						gap: '8px'
					}}
				>
					<Button block type="submit" color="default" onClick={() => onClose()}>
						重选年级
					</Button>
					<Button block type="submit" color="primary">
						提交成绩
					</Button>
				</div>
			}
			mode="card"
			onFinish={handleFinish}
		>
			<Form.Header>{formTitle}</Form.Header>
			<Form.Item name="height" label="身高" rules={[{ required: true, message: '请输入身高' }]}>
				<Input placeholder="单位厘米" />
			</Form.Item>
			<Form.Item name="weight" label="体重" rules={[{ required: true, message: '请输入体重' }]}>
				<Input placeholder="单位千克" />
			</Form.Item>
			<Form.Item name="lungCapacity" label="肺活量" rules={[{ required: true, message: '请输入肺活量' }]}>
				<Input placeholder="单位毫升" />
			</Form.Item>
			<Form.Item name="fiftyMeter" label="50米" rules={[{ required: true, message: '请输入50米成绩' }]}>
				<Input placeholder="单位秒" />
			</Form.Item>
			<Form.Item name="thousandMeter" label="1000米" rules={[{ required: true, message: '请输入1000米成绩' }]}>
				<Input placeholder="单位分.秒" />
			</Form.Item>
			<Form.Item name="pullUps" label="引体向上" rules={[{ required: true, message: '请输入引体向上次数' }]}>
				<Input placeholder="单位次" />
			</Form.Item>
			<Form.Item name="sitAndReach" label="坐位体前屈" rules={[{ required: true, message: '请输入坐位体前屈成绩' }]}>
				<Input placeholder="单位厘米" />
			</Form.Item>
			<Form.Item name="standingLongJump" label="立定跳远" rules={[{ required: true, message: '请输入立定跳远成绩' }]}>
				<Input placeholder="单位厘米" />
			</Form.Item>
		</Form>
	)
}
