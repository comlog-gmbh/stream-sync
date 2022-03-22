"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Writable_1 = __importDefault(require("./Writable"));
class BufferWriteStreamSync extends Writable_1.default {
    constructor() {
        super();
        this.data = Buffer.alloc(0);
        this.length = this.data.length;
    }
    writeJSON(obj) {
        this.write(JSON.stringify(obj));
    }
    write(chunk) {
        if (typeof chunk == 'string')
            chunk = Buffer.from(chunk);
        this.data = Buffer.concat([this.data, chunk]);
        this.length = this.data.length;
        return chunk.length > 0;
    }
    toString(encoding, start, end) {
        return this.data.toString(encoding, start, end);
    }
    toBuffer() { return this.data; }
}
module.exports = BufferWriteStreamSync;
//# sourceMappingURL=BufferWriteStreamSync.js.map