import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { store } from './store'
import 'bulmaswatch/darkly/bulmaswatch.min.css'

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)
