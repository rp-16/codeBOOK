import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../store'

export const useActions = () => {
	const dispatchFn = useDispatch()

	return bindActionCreators(actionCreators, dispatchFn)
}
