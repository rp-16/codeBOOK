import { useEffect, useState } from 'react'
import Editor from './CodeEditor'
import Preview from './Preview'
import Resizable from '../Resizable'
import bundler from '../../utils/bundler/bundler'

export interface PreviewOutput {
	code: string
	error: string
}

const CodeCell = () => {
	const [input, setInput] = useState('')
	const [previewInput, setPreviewInput] = useState<PreviewOutput>({ code: '', error: '' })

	useEffect(() => {
		const timer = setTimeout(async () => {
			const bundlerOutput = await bundler(input)
			console.log(bundlerOutput)
			setPreviewInput(bundlerOutput as PreviewOutput)
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
				<Preview output={previewInput} />
			</div>
		</Resizable>
	)
}

export default CodeCell
