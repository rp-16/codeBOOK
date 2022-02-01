import { useTypedSelector } from '../../hooks/useTypedSelector'
import CellListItem from './CellListItem'

const CellList: React.FC = () => {
	const rawCells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]))

	const renderedCells = rawCells.map((cell) => <CellListItem key={cell.id} cell={cell} />)

	return <div>{renderedCells}</div>
}

export default CellList
