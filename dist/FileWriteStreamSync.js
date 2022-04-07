"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriteStreamSync = void 0;
const Writable_1 = require("./Writable");
const fs_1 = __importDefault(require("fs"));
const defaults = {
    flags: 'w',
    encoding: undefined,
    mode: 0o666,
    autoClose: true
};
class FileWriteStreamSync extends Writable_1.Writable {
    constructor(filepath, options) {
        super(Object.assign({}, defaults, (options || {})));
        this.pos = 0;
        this.destroyed = false;
        this.readable = false;
        this.options = defaults;
        this.fd = fs_1.default.openSync(filepath, this.options.flags, this.options.mode);
        let stat = fs_1.default.statSync(filepath);
        this.size = stat.size;
        this.readable = true;
    }
    destroy() {
        if (this.fd)
            fs_1.default.closeSync(this.fd);
        this.fd = undefined;
        return super.destroy();
    }
    write(chunk) {
        if (!this.fd) {
            if (this.destroyed)
                throw Error('File handler destroyed!');
            else
                throw Error('File handler not found!');
        }
        if (typeof chunk == 'string')
            chunk = Buffer.from(chunk);
        return fs_1.default.writeSync(this.fd, chunk) > 0;
        //return super.write(chunk, callback);
    }
}
exports.FileWriteStreamSync = FileWriteStreamSync;
//# sourceMappingURL=FileWriteStreamSync.js.map