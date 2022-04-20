import { ActionTypes } from './actionTypes'
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
		cellId: string | null
		cellType: CellTypes
	}
}

export interface BundleStartAction {
	type: ActionTypes.BUNDLE_START
	payload: {
		cellId: string
	}
}

export interface BundleCompleteAction {
	type: ActionTypes.BUNDLE_COMPLETE
	payload: {
		cellId: string
		output: {
			code: string
			error: string
		}
	}
}

export type Actions =
	| UpdateCellAction
	| DeleteCellAction
	| MoveCellAction
	| InsertCellAfterAction
	| BundleStartAction
	| BundleCompleteAction
