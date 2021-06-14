import './text-editor.css'
import {useState, useEffect, useRef} from 'react'
import MDEditior from '@uiw/react-md-editor'
import { Cell } from '../state'
import {useActions} from '../hooks/use-actions'

interface TextEditirProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditirProps> = ({cell}) => {
    const [editing, setEditing] = useState(false)
    const {updateCell} = useActions()
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
                <MDEditior value={cell.content} onChange={(v)=>updateCell(cell.id, v || '')}/>
            </div>
        )
    }

    return (
        <div onClick={()=> setEditing(true)} className='text-editor card'>
            <div className='card-content'>
                <MDEditior.Markdown source={cell.content || 'Click to edit'}/>
            </div>
        </div>
    )
}

export default TextEditor