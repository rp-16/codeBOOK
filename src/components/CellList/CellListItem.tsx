import { Cell } from '../../store/types'
import CodeCell from '../CodeCell/CodeCell'
import MarkdownEditor from '../MarkdownCell/MarkdownEditor'

interface CellListItemProps {
	cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let item: JSX.Element

	if (cell.type === 'code') {
		item = <CodeCell cell={cell} />
	} else {
		item = <MarkdownEditor cell={cell} />
	}

	return <div>{item}</div>
}

export default CellListItem
