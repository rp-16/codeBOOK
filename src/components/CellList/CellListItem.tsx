import { Cell } from '../../store/types'
import ActionBar from '../ActionBar/ActionBar'
import CodeCell from '../CodeCell/CodeCell'
import MarkdownEditor from '../MarkdownCell/MarkdownEditor'
import './CellListItem.css'

interface CellListItemProps {
	cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let item: JSX.Element

	if (cell.type === 'code') {
		item = (
			<>
				<div className="action-bar-wrapper">
					<ActionBar cellId={cell.id} />
				</div>
				<CodeCell cell={cell} />
			</>
		)
	} else {
		item = (
			<>
				<MarkdownEditor cell={cell} />
				<ActionBar cellId={cell.id} />
			</>
		)
	}

	return <div className="CellListItem">{item}</div>
}

export default CellListItem
