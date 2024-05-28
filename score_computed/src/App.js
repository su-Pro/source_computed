import React, { useState } from 'react'
import './App.css'
import Chu2 from './chu2/chu2'
import { LikeOutline } from 'antd-mobile-icons'
import { ResultPage, Image, Button, Popup, Form, Selector, Card } from 'antd-mobile'
import exampleImage from './chu2/chu2.png'

function Result({ result, onClose, scoreImageSrc = exampleImage, qrCodeContent = exampleImage }) {
	const [showConsultation, setShowConsultation] = useState(false)

	return (
		<ResultPage
			icon={<LikeOutline />}
			status="success"
			title={`总成绩 ${result} 分`}
			description="具体计算规则，请参考下方《国家体质健康测试》评分标准"
			primaryButtonText={'提分咨询'}
			secondaryButtonText={'重新计算'}
			onPrimaryButtonClick={() => setShowConsultation(true)}
			onSecondaryButtonClick={() => onClose()}
		>
			<div>
				<Image src={scoreImageSrc} />
			</div>
			<Popup
				visible={showConsultation}
				onMaskClick={() => setShowConsultation(false)}
				bodyStyle={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', minHeight: '40vh' }}
			>
				<Image src={qrCodeContent} />
			</Popup>
		</ResultPage>
	)
}

export const gradeOptions = [
	{ label: '四年级', value: '4' },
	{ label: '六年级', value: '6' },
	{ label: '八年级', value: '8' }
]

export const genderOptions = [
	{ label: '男', value: 'male' },
	{ label: '女', value: 'female' }
]

const App = () => {
	const [showResult, setShowResult] = useState(false)
	const [showCalculate, setShowCalculate] = useState(false)
	const [result, setResult] = useState(68)
	const [form, setForm] = useState({ grade: ['8'], gender: ['male'] })

	const handleFinish = result => {
		setResult(result)
		setShowResult(true)
		setShowCalculate(false)
	}

	const handleFormChange = (name, value) => {
		console.log(name, value)
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = () => {
		if (form.grade && form.gender) {
			setShowCalculate(true)
		} else {
			alert('请完整填写信息')
		}
	}

	return (
		<div>
			{!showResult && !showCalculate ? (
				<Form mode="card">
					<Form.Header>请选择要查询的学生信息</Form.Header>
					<Form.Item label="年级">
						<Selector
							placeholder="请选择年级"
							options={gradeOptions}
							value={form.grade}
							onChange={value => handleFormChange('grade', value)}
						/>
					</Form.Item>
					<Form.Item label="性别">
						<Selector
							placeholder="请选择性别"
							options={genderOptions}
							value={form.gender}
							onChange={value => handleFormChange('gender', value)}
						/>
					</Form.Item>
					<Button color="primary" block onClick={handleSubmit}>
						填写成绩
					</Button>
				</Form>
			) : showCalculate ? (
				<Chu2
					onFinish={handleFinish}
					onClose={() => {
						setShowResult(false)
						setShowCalculate(false)
					}}
					baseInfo={{
						grade: form.grade[0],
						gender: form.gender[0]
					}}
				/>
			) : (
				<Result
					result={result}
					onClose={() => {
						setShowCalculate(false)
						setShowResult(false)
					}}
				/>
			)}
		</div>
	)
}

export default App
