import * as esbuild from 'esbuild-wasm'
import {unpackagePlagin} from './plugins/unpackage-plagin'
import {fetchPlugin} from './plugins/fetch-plugin'

let service: esbuild.Service

const bundler = async (rewCode:string) => {
    if(!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }

    try {
        const result = await service.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpackagePlagin(),
                fetchPlugin(rewCode)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        })
        return {
            code: result.outputFiles[0].text,
            error: ''
        }
    } catch(err) {
        return {
            code: '',
            error: err.message,
        } 
    }
}

export default bundler 