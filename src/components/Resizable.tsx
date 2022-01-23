import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import './Resizable.css'

interface ResizableProps {
	direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const [innerHeight, setInnerHeight] = useState(window.innerHeight)
	const [resizeWidth, setResizeWidth] = useState(innerWidth * 0.6)

	useEffect(() => {
		let timer: any

		const listener = () => {
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				setInnerWidth(window.innerWidth)
				setInnerHeight(window.innerHeight)
				if (window.innerWidth * 0.75 < resizeWidth) {
					setResizeWidth(window.innerWidth * 0.75)
				} else if (window.innerWidth * 0.75 > resizeWidth) {
					setResizeWidth(window.innerWidth * 0.75)
				}
			}, 100)
		}

		window.addEventListener('resize', listener)

		return () => {
			window.removeEventListener('resize', listener)
		}
	}, [resizeWidth])

	let props: ResizableBoxProps
	if (direction === 'horizontal') {
		props = {
			className: 'resize-horizontal',
			width: resizeWidth,
			height: Infinity,
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			resizeHandles: ['e'],
			onResizeStop(_, data) {
				setResizeWidth(data.size.width)
			},
		}
	} else {
		props = {
			width: Infinity,
			height: 300,
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, innerHeight - 10], // or 95%
			resizeHandles: ['s'],
		}
	}

	return <ResizableBox {...props}>{children}</ResizableBox>
}

export default Resizable
