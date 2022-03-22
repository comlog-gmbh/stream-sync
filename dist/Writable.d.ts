/// <reference types="node" />
import { EventEmitter } from 'events';
import WritableOptions from './WritableOptions';
declare class Writable extends EventEmitter {
    destroyed: boolean;
    writable: boolean;
    _writableState: WritableOptions;
    constructor(opts?: WritableOptions);
    destroy(): this;
    end(): this;
    write(chunk: any): boolean;
    _write(chunk: any, encoding?: BufferEncoding): void;
    setDefaultEncoding(encoding: BufferEncoding): void;
}
export default Writable;
