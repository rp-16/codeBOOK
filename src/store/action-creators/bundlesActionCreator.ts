import { Dispatch } from 'redux'
import bundler from '../../utils/bundler/bundler'
import { Actions, ActionTypes } from '../types'

export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Actions>) => {
		dispatch({
			type: ActionTypes.BUNDLE_START,
			payload: { cellId },
		})

		const result = await bundler(input)

		dispatch({
			type: ActionTypes.BUNDLE_COMPLETE,
			payload: {
				cellId,
				output: { ...result },
			},
		})
	}
}
