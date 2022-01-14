import { useEffect, useState } from 'react'
import Editor from './Editor'
import Preview from './Preview'
import Resizable from '../Resizable'
import bundler from '../../utils/bundler/bundler'
import 'bulmaswatch/superhero/bulmaswatch.min.css'

const CodeCell = () => {
	const [input, setInput] = useState('')
	const [code, setCode] = useState('')

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundler(input)
			console.log('output-', output)
			setCode(output)
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
	}, [input])

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<Editor
						initialValue="const welcome = 'Hello World';"
						onChangeHandler={(val) => setInput(val as string)}
					/>
				</Resizable>
				{/* <button onClick={submitHandler}>Submit</button> */}
				<Preview code={code} />
			</div>
		</Resizable>
	)
}

export default CodeCell
