import { useEffect } from 'react'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Resizable from '../UI/Resizable'
import { useActions } from '../../hooks/useActions'
import { Cell } from '../../store/types'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import './CodeCell.css'

interface CodeCellProps {
	cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions()
	const bundle = useTypedSelector((state) => state.bundles[cell.id])

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cell.content)
			return
		}

		const timer = setTimeout(() => {
			createBundle(cell.id, cell.content)
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell.id, cell.content, createBundle])

	let preview: JSX.Element
	if (!bundle || bundle.bundling) {
		preview = (
			<div className="progress-bar">
				<progress className="progress is-primary is-small" max="100">
					Loading...
				</progress>
			</div>
		)
	} else {
		preview = <Preview outputObject={{ code: bundle.code, error: bundle.error }} />
	}

	return (
		<Resizable direction="vertical">
			<div className="CodeCell">
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content || 'const welcome = "Hello World";'}
						onChangeHandler={(val) => updateCell(cell.id, val as string)}
					/>
				</Resizable>
				<div className="background">{preview}</div>
			</div>
		</Resizable>
	)
}

export default CodeCell
