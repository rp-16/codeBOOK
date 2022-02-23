import { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './MarkdownEditor.css'
import { useActions } from '../../hooks/useActions'
import { Cell } from '../../store/types'

interface MarkdownEditorProps {
	cell: Cell
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ cell }) => {
	const [isEditing, setIsEditing] = useState(false)
	const editorRef = useRef<HTMLDivElement | null>(null)

	const { updateCell } = useActions()

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

	return (
		<>
			{isEditing && (
				<div className="MarkdownEditor" ref={editorRef}>
					<MDEditor value={cell.content} onChange={(val) => updateCell(cell.id, val || '')} />
				</div>
			)}
			{!isEditing && (
				<div className="MarkdownEditor card" onClick={modeToggleHandler}>
					<div className="card-content">
						<MDEditor.Markdown source={cell.content || '### Click to edit!'} />
					</div>
				</div>
			)}
		</>
	)
}

export default MarkdownEditor
