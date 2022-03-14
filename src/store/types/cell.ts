export type CellTypes = 'code' | 'markdown'

export type CellMoveDirection = 'up' | 'down'

export interface CellState {
	readonly loading: boolean
	readonly error: string | null
	readonly order: string[]
	readonly data: {
		[key: string]: Cell
	}
}

export interface Cell {
	id: string
	type: CellTypes
	content: string
}
