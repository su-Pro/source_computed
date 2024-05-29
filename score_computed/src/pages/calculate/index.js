import { gradeOptions, genderOptions } from '../../config/index'
import { Form, Input, Button } from 'antd-mobile'
import { useMemo } from 'react'
import { calculateFinalScore } from './chu2/computed'

export default function Calculate({ onFinish, onClose, baseInfo }) {
	const { grade, gender } = baseInfo

	// 找到匹配的年级和性别标签
	const gradeLabel = gradeOptions.find(option => option.value === grade)?.label || '未知年级'
	const genderLabel = genderOptions.find(option => option.value === gender)?.label || '未知性别'

	const formTitle = `${gradeLabel} ${genderLabel}学生 体测成绩填写`

	const handleFinish = (values: any) => {
		const finalScore = calculateFinalScore(values)
		console.log(finalScore)
		onFinish(finalScore) // 调用父组件传入的回调函数
	}

	// 根据不同的年级和性别，动态生成不同的表单项
	const differentGradeItems = useMemo(() => {
		// 四年级
		if (grade === '4') {
			return (
				<>
					<Form.Item name="fiftyMeter" label="50米" rules={[{ required: true, message: '请输入50米成绩' }]}>
						<Input placeholder="单位秒" />
					</Form.Item>
					<Form.Item
						name="sitAndReach"
						label="坐位体前屈"
						rules={[{ required: true, message: '请输入坐位体前屈成绩' }]}
					>
						<Input placeholder="单位厘米" />
					</Form.Item>
					{/* 一分钟跳绳 */}
					<Form.Item name="jumpRope" label="一分钟跳绳" rules={[{ required: true, message: '请输入一分钟跳绳次数' }]}>
						<Input placeholder="单位次" />
					</Form.Item>
					{/* 一分钟仰卧起坐 */}
					<Form.Item
						name="sitUps"
						label="一分钟仰卧起坐"
						rules={[{ required: true, message: '请输入一分钟仰卧起坐次数' }]}
					>
						<Input placeholder="单位次" />
					</Form.Item>
				</>
			)
		}

		// 六年级
		if (grade === '6') {
			return (
				<>
					<Form.Item name="fiftyMeter" label="50米" rules={[{ required: true, message: '请输入50米成绩' }]}>
						<Input placeholder="单位秒" />
					</Form.Item>
					<Form.Item
						name="sitAndReach"
						label="坐位体前屈"
						rules={[{ required: true, message: '请输入坐位体前屈成绩' }]}
					>
						<Input placeholder="单位厘米" />
					</Form.Item>
					{/* 一分钟跳绳 */}
					<Form.Item name="jumpRope" label="一分钟跳绳" rules={[{ required: true, message: '请输入一分钟跳绳次数' }]}>
						<Input placeholder="单位次" />
					</Form.Item>
					{/* 一分钟仰卧起坐 */}
					<Form.Item
						name="sitUps"
						label="一分钟仰卧起坐"
						rules={[{ required: true, message: '请输入一分钟仰卧起坐次数' }]}
					>
						<Input placeholder="单位次" />
					</Form.Item>
					{/* 50米 x 8 折返跑 */}
					<Form.Item
						name="eightTimesFiftyMeter"
						label="50米x8折返跑"
						rules={[{ required: true, message: '请输入50米 x 8 折返跑成绩' }]}
					>
						<Input placeholder="单位分.秒" />
					</Form.Item>
				</>
			)
		}

		// 八年级
		if (grade === '8') {
			return (
				<>
					<Form.Item name="fiftyMeter" label="50米" rules={[{ required: true, message: '请输入50米成绩' }]}>
						<Input placeholder="单位秒" />
					</Form.Item>
					{
						// 如果是男生，就是1000米跑，女生是800米跑
						gender === 'male' ? (
							<Form.Item
								name="oneThousandMeter"
								label="1000米跑"
								rules={[{ required: true, message: '请输入1000米跑成绩' }]}
							>
								<Input placeholder="单位分.秒" />
							</Form.Item>
						) : (
							<Form.Item
								name="eightHundredMeter"
								label="800米跑"
								rules={[{ required: true, message: '请输入800米跑成绩' }]}
							>
								<Input placeholder="单位分.秒" />
							</Form.Item>
						)
					}
					{
						// 如果是男生，就是引体向上，女生是仰卧起坐
						gender === 'male' ? (
							<Form.Item name="pullUp" label="引体向上" rules={[{ required: true, message: '请输入引体向上成绩' }]}>
								<Input placeholder="单位次" />
							</Form.Item>
						) : (
							<Form.Item name="sitUps" label="仰卧起坐" rules={[{ required: true, message: '请输入仰卧起坐成绩' }]}>
								<Input placeholder="单位次" />
							</Form.Item>
						)
					}
					<Form.Item
						name="standingLongJump"
						label="立定跳远"
						rules={[{ required: true, message: '请输入立定跳远成绩' }]}
					>
						<Input placeholder="单位厘米" />
					</Form.Item>
				</>
			)
		}
		return <></>
	}, [gender, grade])

	return (
		<Form
			layout="horizontal"
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
			{differentGradeItems}
		</Form>
	)
}
