import { FaPlus } from 'react-icons/fa'
import { useActions } from '../../hooks/useActions'
import './AddCell.css'

interface AddCellProps {
	prevCellId: string | null
	forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, prevCellId }) => {
	const { insertCellAfter } = useActions()

	const classNames = ['AddCell']
	if (forceVisible) {
		classNames.push('force-visible')
	}

	return (
		<div className={classNames.join(' ')}>
			<div className="add-buttons">
				<button
					className="button is-primary is-rounded is-small"
					onClick={() => insertCellAfter(prevCellId, 'code')}
				>
					<span className="icon">
						<FaPlus />
					</span>
					<span className="text">Code</span>
				</button>
				<button
					className="button is-primary is-rounded is-small"
					onClick={() => insertCellAfter(prevCellId, 'markdown')}
				>
					<span className="icon">
						<FaPlus />
					</span>
					<span className="text">Markdown</span>
				</button>
			</div>
			<div className="divider"></div>
		</div>
	)
}

export default AddCell
