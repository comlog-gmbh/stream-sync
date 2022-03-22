"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Readable_1 = __importDefault(require("./Readable"));
const fs = __importStar(require("fs"));
const defaults = {
    encoding: undefined,
    autoClose: true
};
class FileReadStreamSync extends Readable_1.default {
    constructor(filepath, options) {
        super(Object.assign({}, defaults, options || {}));
        this.pos = 0;
        this.destroyed = false;
        this.readable = false;
        this.flags = 'r';
        this.mode = 0o666;
        this.filepath = filepath;
        if (options) {
            if (options.flags)
                this.flags = options.flags;
            if (options.mode)
                this.mode = options.mode;
        }
        this.fd = fs.openSync(filepath, this.flags, this.mode);
        let stat = fs.statSync(filepath);
        this.size = stat.size;
        this.readable = true;
    }
    _autoclose() {
        if (this.fd && this.pos >= this.size) {
            if (this._readableState.autoDestroy)
                this.destroy();
            return true;
        }
        return false;
    }
    _destroy() {
        if (this.fd)
            fs.closeSync(this.fd);
        this.fd = null;
        super._destroy();
    }
    /**
     * Sync read line
     * @param [br] line break
     */
    readLine(br) {
        let size = 1;
        if (!this.fd) {
            if (this.destroyed)
                throw Error('File handler destroyed!');
            else
                throw Error('File handler not found!');
        }
        if (this._autoclose()) {
            this.emit('close', null);
            return null;
        }
        if (typeof br == 'undefined')
            br = "\n";
        let line = Buffer.alloc(0);
        let br_found = false;
        let file_end = false;
        let buf;
        do {
            if (this.pos + size > this.size)
                size = this.size - this.pos;
            buf = Buffer.alloc(size);
            if (this.pos >= this.size) {
                file_end = true;
                continue;
            }
            fs.readSync(this.fd, buf, { offset: 0, position: this.pos });
            this.pos += size;
            if (buf.indexOf(br) > -1) {
                br_found = true;
            }
            line = Buffer.concat([line, buf]);
        } while (!br_found && !file_end);
        if (line.length < 1)
            return null;
        if (this._readableState.encoding)
            return line.toString(this._readableState.encoding);
        return line;
    }
    /**
     * Sync read
     * @param size
     */
    _read(size, encoding) {
        if (!size)
            size = 4096;
        if (this.fd && this.pos >= this.size) {
            this.push(null);
            return null;
        }
        if (!this.fd) {
            this.push(null, encoding);
            //if (this.destroyed) throw Error('File handler destroyed!');
            //else throw Error('File handler not found!');
            return null;
        }
        if (this.pos + size > this.size)
            size = this.size - this.pos;
        let buf = Buffer.alloc(size);
        let cnt = fs.readSync(this.fd, buf, { offset: 0, position: this.pos });
        this.pos += cnt;
        buf = buf.slice(0, cnt);
        if (encoding)
            buf = buf.toString(encoding);
        this.push(buf, encoding);
        return buf;
    }
}
exports.default = FileReadStreamSync;
//# sourceMappingURL=FileReadStreamSync.js.map