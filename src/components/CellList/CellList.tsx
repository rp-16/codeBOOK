import { Fragment } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import AddCell from '../AddCell/AddCell'
import CellListItem from './CellListItem'

const CellList: React.FC = () => {
	const rawCells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]))

	const renderedCells = rawCells.map((cell) => (
		<Fragment key={cell.id}>
			<AddCell nextCellId={cell.id} />
			<CellListItem cell={cell} />
		</Fragment>
	))

	return (
		<div>
			{renderedCells}
			<AddCell forceVisible={rawCells.length === 0} nextCellId={null}></AddCell>
		</div>
	)
}

export default CellList
