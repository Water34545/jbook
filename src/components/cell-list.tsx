import {Fragment} from 'react'
import {useTypedSelector} from '../hooks/use-typed-selector'
import CellItem from './cell-item'
import AddCell from './add-cell'

const CellList:React.FC = () => {
    const cells = useTypedSelector(({cells}) => 
        cells && cells.order.map(id => cells.data[id])
    )

    const renderedCells = cells && cells.map(cell => 
        <Fragment key={cell.id}>
            <AddCell nextCellId={cell.id}/>
            <CellItem cell={cell}/>
        </Fragment>
    )

    return <div>
            {renderedCells}
            <AddCell forceVisible={cells?.length === 0} nextCellId={null}/>
        </div>
}

export default CellList