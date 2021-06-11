import {useState, useEffect} from 'react'
import CodeEdetor from './code-editor'
import Preview from './preview'
import bundler from '../bundler'
import Resizable from './resizable'

const CodeCell = () => {
    const [code, setCode] = useState('')
    const [input, setInput] = useState('')

    useEffect(()=> {
        const timer = setTimeout(async ()=> {
            const output = await bundler(input)
            setCode(output)  
        }, 1000)

        return () => clearTimeout(timer)
    }, [input])

    return <div>
        <Resizable direction='vertical'>
            <div style={{height:'100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction='horisontal'>
                    <CodeEdetor 
                        initialValue="import React from 'react'"
                        onChange={value => setInput(value)}
                    />
                </Resizable>
                <Preview code={code}/>
            </div>
        </Resizable>
    </div>
}

export default CodeCell