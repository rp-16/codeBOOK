import { useActions } from '../../hooks/useActions'
import { MdDeleteForever } from 'react-icons/md'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'
import './ActionBar.css'

interface ActionBarProps {
	cellId: string
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
	const { moveCell, deleteCell } = useActions()
	return (
		<div className="ActionBar">
			<button className="button is-primary is-small" onClick={() => moveCell(cellId, 'up')}>
				<GoArrowUp size="1.4em" />
			</button>
			<button className="button is-primary is-small" onClick={() => moveCell(cellId, 'down')}>
				<GoArrowDown size="1.4em" />
			</button>
			<button className="button is-primary is-small" onClick={() => deleteCell(cellId)}>
				<MdDeleteForever size="1.3em" />
			</button>
		</div>
	)
}

export default ActionBar
