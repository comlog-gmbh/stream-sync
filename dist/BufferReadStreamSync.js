"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferReadStreamSync = void 0;
const Readable_1 = require("./Readable");
class BufferReadStreamSync extends Readable_1.Readable {
    constructor(data, options) {
        super(options);
        this.destroyed = false;
        this.readable = false;
        this.data = Buffer.from(data);
        this.readable = true;
    }
    _autoclose() {
        if (this.data && this.data.length < 1) {
            if (this._readableState.autoDestroy)
                this.destroy();
            return true;
        }
        return false;
    }
    destroy() {
        if (this.data)
            this.data = Buffer.alloc(0);
        this.destroyed = true;
        this.readable = false;
        return this;
    }
    read(size) {
        if (this.data.length < 1) {
            if (this.destroyed)
                throw Error('Buffer data destroyed!');
            else
                return null;
        }
        if (!size)
            size = 4096;
        if (size > this.data.length)
            size = this.data.length;
        if (this._autoclose()) {
            this.emit('end');
            return null;
        }
        let res = this.data.slice(0, size);
        this.data = this.data.slice(size);
        return res;
    }
    toString(encoding, start, end) {
        return this.data.toString(encoding, start, end);
    }
    toBuffer() { return this.data; }
}
exports.BufferReadStreamSync = BufferReadStreamSync;
//# sourceMappingURL=BufferReadStreamSync.js.map