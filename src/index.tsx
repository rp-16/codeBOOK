import { render } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'
// import App from './app.tsx'

const App = () => {
	const [input, setInput] = useState('')
	const [code, setCode] = useState('')
	const serviceRef = useRef<any>()

	const startService = async () => {
		serviceRef.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		})
	}

	useEffect(() => {
		startService()
	}, [])

	const submitHandler = async () => {
		if (!serviceRef.current) {
			return
		}

		const result = await serviceRef.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"', // '"production"' ???
				global: 'window',
			},
		})

		// console.log(result)
		setCode(result.outputFiles[0].text)
	}

	return (
		<div>
			<textarea
				rows={20}
				cols={80}
				onChange={(e) => setInput(e.target.value)}
				value={input}
			></textarea>
			<button onClick={submitHandler}>Submit</button>
			<pre>{code}</pre>
		</div>
	)
}

render(<App />, document.querySelector('#root'))
