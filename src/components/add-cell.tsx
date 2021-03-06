import './add-cell.css'
import {useActions} from '../hooks/use-actions'

interface AddCellProps {
    nextCellId: string | null
    forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({forceVisible, nextCellId}) => {
    const {inserCellBefore} = useActions()
    return <div className={`add-cell ${forceVisible && 'add-cell-visible'}`}>
        <div className='add-buttons'>
            <button className='button is-rounded is-primary is-small' onClick={() => inserCellBefore(nextCellId, 'code')}>
                <span className='icon is-small'>
                    <i className='fas fa-plus'></i>
                </span>
                <span>Code</span>
            </button>
            <button className='button is-rounded is-primary is-small' onClick={() => inserCellBefore(nextCellId, 'text')}>
                <span className='icon is-small'>
                    <i className='fas fa-plus'></i> 
                </span>
                <span>Text</span>
            </button>
        </div>
        <div className='divider'></div>
    </div>
}

export default AddCell