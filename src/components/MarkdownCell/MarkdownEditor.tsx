import { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './MarkdownEditor.css'

const MarkdownEditor: React.FC = () => {
	const [input, setInput] = useState('# Hello World!')
	const [isEditing, setIsEditing] = useState(false)
	const editorRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (editorRef.current && event.target && editorRef.current.contains(event.target as Node)) {
				return
			}
			setIsEditing(false)
		}
		document.addEventListener('click', listener, { capture: true })

		return () => {
			document.removeEventListener('click', listener, { capture: true })
		}
	}, [isEditing])

	const modeToggleHandler = () => {
		setIsEditing((prevState) => !prevState)
	}

	const inputChangedHandler = (value: string | undefined) => {
		console.log(value)
		setInput(value!)
	}

	return (
		<>
			{isEditing && (
				<div className="MarkdownEditor" ref={editorRef}>
					<MDEditor value={input} onChange={inputChangedHandler} />
				</div>
			)}
			{!isEditing && (
				<div className="MarkdownEditor card" onClick={modeToggleHandler}>
					<div className="card-content">
						<MDEditor.Markdown source={input} />
					</div>
				</div>
			)}
		</>
	)
}

export default MarkdownEditor
