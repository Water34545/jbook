export interface CellTypes {
    type: 'code' | 'text'
}

export interface Cell {
    id: string
    type: CellTypes
    content: string
}