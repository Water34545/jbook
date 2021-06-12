import { stat } from 'fs'
import {produce} from 'immer'
import { ActionTypes } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'

interface CellState {
    loading: boolean
    error: string | null
    order: string[]
    data: {
        [key:string]: Cell
    }
}

const initialState:CellState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const cellsReducer = produce((state:CellState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CELL: 
            const {id, content} = action.payload   
            state.data[id].content=content
            return state

        case ActionTypes.DELETE_CELL:
            delete state.data[action.payload]
            state.order = state.order.filter(id => id !== action.payload)
            return state

        case ActionTypes.MOVE_CELL:
            const {direction} = action.payload
            const index = state.order.findIndex(id => id === action.payload.id)
            const targetIndex = direction === 'up' ? index-1 : index+1

            if (targetIndex < 0 || targetIndex > state.order.length-1) return

            state.order[index] = state.order[targetIndex]
            state.order[targetIndex] = action.payload.id
            return state

        case ActionTypes.INSERT_CELL_BEFORE:
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            }
            state.data[cell.id] = cell

            const currentIndex = state.order.findIndex(id => id === action.payload.id)
            if(currentIndex<0) {
                state.order.push(cell.id)
            } else {
                state.order.splice(currentIndex, 0, cell.id)
            }
            return state
            
        default:   
            return state
    }
})

const randomId = () => {
    return Math.random().toString(36).substr(2,5)
}

export default cellsReducer