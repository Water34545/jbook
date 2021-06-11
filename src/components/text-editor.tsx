import './text-editor.css'
import {useState, useEffect, useRef} from 'react'
import MDEditior from '@uiw/react-md-editor'

const TextEditor = () => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState('# header')
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const listner = (event:MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) return
            setEditing(false)
        }
        document.addEventListener('click', listner, {capture:true})
        return () => {
            document.removeEventListener('click', listner, {capture:true})
        }
    }, [])

    if(editing) {
        return (
            <div ref={ref} className='text-editor'>
                <MDEditior onChange={(v)=>setValue(v || '')}/>
            </div>
        )
    }

    return (
        <div onClick={()=> setEditing(true)} className='text-editor card'>
            <div className='card-content'>
                <MDEditior.Markdown source={value}/>
            </div>
        </div>
    )
}

export default TextEditor