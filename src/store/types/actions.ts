import { ActionTypes } from './actionProps'
import { CellMoveDirection, CellTypes } from './cell'

export interface UpdateCellAction {
	type: ActionTypes.UPDATE_CELL
	payload: {
		cellId: string
		content: string
	}
}

export interface DeleteCellAction {
	type: ActionTypes.DELETE_CELL
	payload: string
}

export interface MoveCellAction {
	type: ActionTypes.MOVE_CELL
	payload: {
		cellId: string
		direction: CellMoveDirection
	}
}

export interface InsertCellAfterAction {
	type: ActionTypes.INSERT_CELL_AFTER
	payload: {
		cellId: string | null // to insert cell at very end
		cellType: CellTypes
	}
}

export type Actions = UpdateCellAction | DeleteCellAction | MoveCellAction | InsertCellAfterAction
