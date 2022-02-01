import { useEffect, useRef } from 'react'
import './Preview.css'

export interface PreviewText {
	code: string
	error: string
}

interface PreviewProps {
	text: PreviewText
}

const Preview: React.FC<PreviewProps> = ({ text }) => {
	const iframeRef = useRef<any>()

	const html = `
	<html>
	  <head>
      <style>html { background-color: white }</style>
    </head>
	  <body>
	    <div id="root"></div>
	    <script>
        const handleError = (error, type) => {
          const root = document.querySelector('#root')
          root.innerHTML = '<div style="color: red;"><h4>' + type + ' Error!</h4>' + error + '</div>'
          console.error(error)
        }

	      window.addEventListener('message', (event) => {
          const { code, error } = event.data
          try{
            if(error){
              handleError(error, 'Build')
              return
            }
            eval(code)
          } catch(error) {
            handleError(error, 'Runtime');
          }
        }, false)

        window.addEventListener('error', (event) => {
          event.preventDefault()
          handleError(event.error, 'Runtime')
        })
	    </script>
	  </body>
	</html>
	`
	useEffect(() => {
		iframeRef.current.srcdoc = html
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(text, '*')
		}, 50)
	}, [html, text])

	return (
		<div className="Preview">
			<iframe ref={iframeRef} sandbox="allow-scripts" title="preview" srcDoc={html} />
		</div>
	)
}

export default Preview
