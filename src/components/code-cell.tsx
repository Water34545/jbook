import {useState, useEffect} from 'react'
import CodeEdetor from './code-editor'
import Preview from './preview'
import bundler from '../bundler'
import Resizable from './resizable'
import { Cell } from '../state'
import {useActions} from '../hooks/use-actions'

interface CodeCellPrors {
    cell: Cell
}

const CodeCell: React.FC<CodeCellPrors> = ({cell}) => {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const {updateCell} = useActions()

    useEffect(()=> {
        const timer = setTimeout(async ()=> {
            const output = await bundler(cell.content) 
            setCode(output.code)
            setError(output.error)
        }, 1000)

        return () => clearTimeout(timer)
    }, [cell.content])

    return <div>
        <Resizable direction='vertical'>
            <div style={{height:'100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction='horisontal'>
                    <CodeEdetor 
                        initialValue={cell.content}
                        onChange={value => updateCell(cell.id, value)}
                    />
                </Resizable>
                <Preview code={code} err={error}/>
            </div>
        </Resizable>
    </div>
}

export default CodeCell