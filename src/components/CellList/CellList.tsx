import { Fragment } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import AddCell from '../AddCell/AddCell'
import CellListItem from './CellListItem'

const CellList: React.FC = () => {
	const rawCells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]))

	const renderedCells = rawCells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell prevCellId={cell.id} />
		</Fragment>
	))

	return (
		<div>
			<AddCell forceVisible={rawCells.length === 0} prevCellId={null}></AddCell>
			{renderedCells}
		</div>
	)
}

export default CellList
