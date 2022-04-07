"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Readable = void 0;
const stream_1 = __importDefault(require("stream"));
class Readable extends stream_1.default.Readable {
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
    setEncoding(encoding) {
        this._readableState.encoding = encoding;
        try {
            super.setEncoding(encoding);
        }
        catch (e) { }
        ;
        return this;
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
            destination.write(buf);
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
exports.Readable = Readable;
//# sourceMappingURL=Readable.js.map