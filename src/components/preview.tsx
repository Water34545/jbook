import './preview.css'
import {useEffect, useRef} from 'react'

interface PreviewProps {
    code: string,
    err: string,
}

const Preview: React.FC<PreviewProps> = ({code, err}) => {
    const iframe = useRef<any>()

    useEffect(()=> {
        iframe.current.srcdoc = html
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*')
        }, 50)
    }, [code])

    return (
        <div className='preview-wrapper'>
            <iframe 
                title='code preview' 
                ref={iframe} srcDoc={html} 
                sandbox='allow-scripts'
            />
            {err && <div className="preview-error">{err}</div>}
        </div>
    )
} 

const html = `
        <html>
            <head>
                <style>html {background-color:white}</style>
            </head>
            <body>
                <div id="root"></div>
            </body>
            <script>
                const handleError = (err) => {
                    const root = document.querySelector('#root')
                    root.innerHTML = '<div style="color: red"><h4>Runtime error: </h4>' + err + '</div>'
                    console.error(err)
                }
                window.addEventListener('error', (event) => {
                    event.preventDefault()
                    handleError(event.error)
                }, false)
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data)
                    } catch(err) {
                        handleError(err)
                    }
                }, false)
            </script>
        </html>
    `

export default Preview