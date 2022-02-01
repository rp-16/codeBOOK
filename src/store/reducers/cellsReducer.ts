import produce from 'immer'
import { Reducer } from 'redux'
import { Actions, ActionTypes, Cell, CellState } from '../types'

const initialState: CellState = {
	loading: false,
	error: null,
	order: [],
	data: {},
}

const cellsReducer: Reducer<CellState, Actions> = produce((state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_CELL: {
			const { cellId, content } = action.payload
			state.data[cellId].content = content
			return state
		}

		case ActionTypes.DELETE_CELL: {
			state.order = state.order.filter((id) => id !== action.payload)
			return state
		}

		case ActionTypes.MOVE_CELL: {
			const { cellId, direction } = action.payload
			const idx = state.order.findIndex((id) => id === cellId)
			const targetIdx = direction === 'up' ? idx - 1 : idx + 1

			if (targetIdx < 0 || targetIdx > state.order.length - 1) {
				return state
			}

			state.order[idx] = state.order[targetIdx]
			state.order[targetIdx] = cellId

			return state
		}

		case ActionTypes.INSERT_CELL_BEFORE: {
			const { cellId, cellType } = action.payload
			const newCell: Cell = {
				id: randomId(),
				type: cellType,
				content: '',
			}
			state.data[newCell.id] = newCell
			const idx = state.order.findIndex((id) => id === cellId)

			if (idx === -1) {
				state.order.push(newCell.id)
			} else {
				state.order.splice(idx, 0, newCell.id)
			}

			return state
		}

		default:
			return state
	}
})

const randomId = () => {
	return Math.random().toString(36).substring(2)
}

export default cellsReducer
