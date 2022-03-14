import {
	ActionTypes,
	CellMoveDirection,
	CellTypes,
	UpdateCellAction,
	DeleteCellAction,
	MoveCellAction,
	InsertCellAfterAction,
} from '../types'

export const updateCell = (cellId: string, content: string): UpdateCellAction => {
	return {
		type: ActionTypes.UPDATE_CELL,
		payload: { cellId, content },
	}
}
export const deleteCell = (cellId: string): DeleteCellAction => {
	return {
		type: ActionTypes.DELETE_CELL,
		payload: cellId,
	}
}
export const moveCell = (cellId: string, direction: CellMoveDirection): MoveCellAction => {
	return {
		type: ActionTypes.MOVE_CELL,
		payload: { cellId, direction },
	}
}
export const insertCellAfter = (
	cellId: string | null,
	cellType: CellTypes
): InsertCellAfterAction => {
	return {
		type: ActionTypes.INSERT_CELL_AFTER,
		payload: { cellId, cellType },
	}
}
