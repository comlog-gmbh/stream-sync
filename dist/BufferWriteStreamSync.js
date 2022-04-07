"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferWriteStreamSync = void 0;
const Writable_1 = require("./Writable");
class BufferWriteStreamSync extends Writable_1.Writable {
    constructor(data) {
        super();
        this.data = Buffer.alloc(0);
        this.length = this.data.length;
        if (data)
            this.write(data);
    }
    writeJSON(obj) {
        this.write(JSON.stringify(obj));
    }
    _write(chunk, encoding) {
        if (typeof chunk == 'string')
            chunk = Buffer.from(chunk, encoding);
        this.data = Buffer.concat([this.data, chunk]);
        this.length = this.data.length;
        return chunk.length > 0;
    }
    toString(encoding, start, end) {
        return this.data.toString(encoding, start, end);
    }
    toBuffer() { return this.data; }
    clear() {
        this.data = Buffer.alloc(0);
        this.length = 0;
    }
    splice(start, deleteCount = 0, ...items) {
        var append = [];
        append.push(this.data.slice(0, start));
        let res = this.data.slice(start, start + deleteCount);
        if (items.length > 0) {
            items.map((val) => {
                if (typeof val == 'string')
                    val = Buffer.from(val);
                else if (typeof val == 'number')
                    val = Buffer.from([val]);
                append.push(val);
            });
        }
        append.push(this.data.slice(start + deleteCount));
        this.data = Buffer.concat(append);
        this.length = this.data.length;
        return res;
    }
    sliceBuffer(start, end) {
        if (!end)
            end = this.data.length;
        return this.data.slice(start, end);
    }
    byteAt(pos) {
        if (pos > this.data.length || pos < 0)
            return null;
        return this.data[pos];
    }
    writeError(err) {
        this.writeJSON({
            name: err.name,
            message: err.message,
            stack: err.stack
        });
    }
}
exports.BufferWriteStreamSync = BufferWriteStreamSync;
//# sourceMappingURL=BufferWriteStreamSync.js.map