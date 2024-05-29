import React, { useState } from 'react'
import './App.css'
import Result from './pages/result/index'
import Calculate from './pages/calculate/index'
import { gradeOptions, genderOptions } from './config'
import { ResultPage, Image, Button, Popup, Form, Selector, Card } from 'antd-mobile'

const App = () => {
	const [showResult, setShowResult] = useState(false)
	const [showCalculate, setShowCalculate] = useState(false)
	// 最终得分成绩 score
	const [score, setScore] = useState(0)
	const [form, setForm] = useState({ grade: ['8'], gender: ['male'] })

	const handleFinish = result => {
		setScore(result)
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
				<Calculate
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
					result={score}
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
