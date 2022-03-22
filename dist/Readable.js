"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Readable extends events_1.EventEmitter {
    constructor(opts) {
        super();
        this.destroyed = false;
        this.readable = false;
        this._readableState = {
            encoding: undefined,
            emitClose: true,
            autoDestroy: true,
            buffer: null
        };
        this._readableState = Object.assign({}, this._readableState, opts || {});
        this.destroyed = false;
        this.readable = true;
    }
    _read(size, encoding) {
        this.push(null, encoding);
    }
    push(chunk, encoding) {
        this._readableState.buffer = { chunk: chunk, encoding: encoding };
        if (chunk !== null)
            this.emit('data', chunk, encoding);
        else {
            this.emit('end');
            if (this._readableState.emitClose) {
                this.emit('close');
            }
            if (this._readableState.autoDestroy) {
                this.destroy();
            }
        }
        return true;
    }
    read(size) {
        if (!size)
            size = 4096;
        this._readableState.buffer = null;
        this._read(size, this._readableState.encoding);
        let buffer = this._readableState.buffer;
        let data = buffer && buffer.chunk ? buffer.chunk : null;
        if (data && buffer.encoding)
            data = data.toString(buffer.encoding);
        return data;
    }
    pipe(destination, options) {
        let buf;
        while ((buf = this.read()) !== null) {
            if (this._readableState && this._readableState.encoding) {
                // @ts-ignore
                destination.write(buf, this._readableState.encoding);
            }
            else {
                // @ts-ignore
                destination.write(buf);
            }
        }
        return destination;
    }
    _destroy() { }
    destroy() {
        delete this._readableState.buffer;
        this.destroyed = true;
        this.readable = false;
        if (!this.destroyed)
            this._destroy();
        return this;
    }
}
exports.default = Readable;
//# sourceMappingURL=Readable.js.map