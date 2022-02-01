import { Cell } from './cell'

export interface CellState {
	readonly loading: boolean
	readonly error: string | null
	readonly order: string[]
	readonly data: {
		[key: string]: Cell
	}
}
