import './resizable.css'
import {useEffect, useState} from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
    direction: 'horisontal' | 'vertical'
}

const Resizable:React.FC<ResizableProps> = ({direction, children}) => {
    const [innerWidth, setWidth] = useState(window.innerWidth)
    const [innerHeight, setHeight] = useState(window.innerHeight)
    const [codeWidth, setcodeWidth] = useState(window.innerWidth * 0.75)

    useEffect(() => {
        let timer:any
        const listner = () => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                setWidth(window.innerWidth)
                setHeight(window.innerHeight)
                if(codeWidth > window.innerWidth*0.75)
                    setcodeWidth(window.innerWidth * 0.75)
            }, 100)
        }
        window.addEventListener('resize', listner)
        return () => window.removeEventListener('resize', listner) 
    },)

    const resizableProps:ResizableBoxProps = direction === 'horisontal' ?
    {
        className: 'resize-horisontal',
        height:Infinity, 
        width: codeWidth,
        resizeHandles: ['e'],
        maxConstraints: [innerWidth * 0.75, Infinity],
        minConstraints: [innerWidth * 0.2, Infinity],
        onResizeStop: (event, data) => setcodeWidth(data.size.width)
    }
    :
    {
        height:300, 
        width: Infinity,
        resizeHandles: ['s'],
        maxConstraints: [Infinity, innerHeight * 0.9],
        minConstraints: [Infinity, 24],
    }

    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    )
}

export default Resizable