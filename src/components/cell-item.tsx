import './cell-item.css'
import { Cell } from '../state'
import CodeCell from './code-cell'
import TextEditor from './text-editor'
import ActionBar from './action-bar'

interface CellItemProps {
    cell: Cell
}

const CellItem:React.FC<CellItemProps> = ({cell}) => {
    let child: JSX.Element
    
    child = cell.type === 'code' ? 
    <>
        <div className='action-bar-wrapper'>
            <ActionBar id={cell.id}/>
        </div>
        <CodeCell cell={cell}/> 
    </>
    : 
    <>
        <TextEditor cell={cell}/>
        <ActionBar id={cell.id}/>
    </>

    return <div className='cell-item'>
            {child}
        </div>
}
   
export default CellItem