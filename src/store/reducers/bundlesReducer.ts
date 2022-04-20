import produce from 'immer'
import { Reducer } from 'redux'
import { Actions, ActionTypes, BundleState } from '../types'

const initialState: BundleState = {}

const bundlesReducer: Reducer<BundleState, Actions> = produce((state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.BUNDLE_START: {
			const { cellId } = action.payload
			state[cellId] = {
				bundling: true,
				code: '',
				error: '',
			}

			break
			// return state
		}
		case ActionTypes.BUNDLE_COMPLETE: {
			const {
				cellId,
				output: { code, error },
			} = action.payload

			state[cellId] = { bundling: false, code, error }

			break
			// return state
		}
		default:
			return state
	}
})

export default bundlesReducer
