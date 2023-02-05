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
	const cumulativeCode = useTypedSelector((state) => {
		const { data, order } = state.cells
		const orderedCells = order.map((id) => data[id])

		const cumulativeCode = []
		for (let c of orderedCells) {
			if (c.type === 'code') {
				cumulativeCode.push(c.content)
			}
			if (c.id === cell.id) {
				break
			}
		}

		return cumulativeCode.join('\n')
	})

	console.log(cumulativeCode)

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cumulativeCode)
			return
		}

		const timer = setTimeout(() => {
			createBundle(cell.id, cumulativeCode)
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell.id, cumulativeCode, createBundle])

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
