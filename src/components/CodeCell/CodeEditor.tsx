import { useRef, useState } from 'react'
import { editor } from 'monaco-editor'
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import './CodeEditor.css'

interface CodeEditorProps {
	initialValue: string
	onChangeHandler: OnChange
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor>()
	const [initialValue, setInitialValue] = useState(props.initialValue)

	const onMountHandler: OnMount = (editor) => {
		editorRef.current = editor
		editor.onDidFocusEditorText(() => {
			setInitialValue('')
		})
	}

	const formatHandler = () => {
		// get current code from editor
		const currentCode = editorRef.current!.getValue()

		// format the code
		const formattedCode = prettier
			.format(currentCode, {
				parser: 'babel',
				plugins: [parser],
				singleQuote: true,
			})
			.replace(/\n$/, '')

		// put formatted code back into the editor
		editorRef.current!.setValue(formattedCode)
	}
	// console.log(editorRef.current)
	return (
		<div className="CodeEditor">
			<button className="button button-format is-primary is-small" onClick={formatHandler}>
				Format
			</button>
			<MonacoEditor
				theme="vs-dark"
				language="javascript"
				value={initialValue}
				onChange={props.onChangeHandler}
				onMount={onMountHandler}
				height="100%"
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					fontSize: 16,
					tabSize: 2,
					renderWhitespace: 'boundary',
					// showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					scrollBeyondLastLine: false,
					scrollBeyondLastColumn: 0,
					automaticLayout: true,
				}}
			/>
		</div>
	)
}

export default CodeEditor
