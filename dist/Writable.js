"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Writable extends events_1.EventEmitter {
    constructor(opts) {
        super();
        this.destroyed = true;
        this.writable = false;
        this._writableState = {
            encoding: undefined,
            emitClose: true,
            autoDestroy: true
        };
        this._writableState = Object.assign({}, this._writableState, opts || {});
        this.destroyed = false;
        this.writable = true;
    }
    destroy() {
        this.destroyed = true;
        this.writable = false;
        return this;
    }
    end() {
        this.emit('finish');
        if (this._writableState.emitClose)
            this.emit('close');
        if (this._writableState.autoDestroy)
            this.destroy();
        return this;
    }
    write(chunk) {
        this._write(chunk, this._writableState.encoding);
        return true;
    }
    _write(chunk, encoding) {
        console.info("Append _write function to class!");
    }
    setDefaultEncoding(encoding) {
        this._writableState.encoding = encoding;
    }
}
exports.default = Writable;
//# sourceMappingURL=Writable.js.map