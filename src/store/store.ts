import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { ActionTypes } from './types/actionProps'

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		cellId: null,
		cellType: 'code',
	},
})
store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		cellId: null,
		cellType: 'markdown',
	},
})

store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		cellId: null,
		cellType: 'code',
	},
})

store.dispatch({
	type: ActionTypes.INSERT_CELL_BEFORE,
	payload: {
		cellId: null,
		cellType: 'markdown',
	},
})
