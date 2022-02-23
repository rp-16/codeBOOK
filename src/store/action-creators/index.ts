import { ActionTypes, CellMoveDirection, CellTypes } from '../types'

export const updateCell = (cellId: string, content: string) => {
	return {
		type: ActionTypes.UPDATE_CELL,
		payload: { cellId, content },
	}
}
export const deleteCell = (cellId: string) => {
	return {
		type: ActionTypes.DELETE_CELL,
		payload: cellId,
	}
}
export const moveCell = (cellId: string, direction: CellMoveDirection) => {
	return {
		type: ActionTypes.MOVE_CELL,
		payload: { cellId, direction },
	}
}
export const insertCellBefore = (cellId: string | null, cellType: CellTypes) => {
	return {
		type: ActionTypes.INSERT_CELL_BEFORE,
		payload: { cellId, cellType },
	}
}
