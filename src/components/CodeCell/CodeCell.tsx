import { useEffect, useState } from 'react'
import CodeEditor from './CodeEditor'
import Preview, { PreviewText } from './Preview'
import Resizable from '../Resizable'
import bundler from '../../utils/bundler/bundler'
import { useActions } from '../../hooks/useActions'
import { Cell } from '../../store/types'

interface CodeCellProps {
	cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const [previewInput, setPreviewInput] = useState<PreviewText>({ code: '', error: '' })

	const { updateCell } = useActions()

	useEffect(() => {
		const timer = setTimeout(async () => {
			const bundlerOutput = await bundler(cell.content)
			console.log(bundlerOutput)
			setPreviewInput(bundlerOutput as PreviewText)
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
	}, [cell.content])

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content || 'const welcome = "Hello World";'}
						onChangeHandler={(val) => updateCell(cell.id, val as string)}
					/>
				</Resizable>
				{/* <button onClick={submitHandler}>Submit</button> */}
				<Preview text={previewInput} />
			</div>
		</Resizable>
	)
}

export default CodeCell
