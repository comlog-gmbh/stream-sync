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
const Writable_1 = __importDefault(require("./Writable"));
const fs = __importStar(require("fs"));
const defaults = {
    flags: 'w',
    encoding: undefined,
    mode: 0o666,
    autoClose: true
};
class FileWriteStreamSync extends Writable_1.default {
    constructor(filepath, options) {
        super(Object.assign({}, defaults, options));
        this.pos = 0;
        this.destroyed = false;
        this.readable = false;
        this.options = defaults;
        this.fd = fs.openSync(filepath, this.options.flags, this.options.mode);
        let stat = fs.statSync(filepath);
        this.size = stat.size;
        this.readable = true;
    }
    destroy() {
        if (this.fd)
            fs.closeSync(this.fd);
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
        return fs.writeSync(this.fd, chunk) > 0;
        //return super.write(chunk, callback);
    }
}
exports.default = FileWriteStreamSync;
//# sourceMappingURL=FileWriteStreamSync.js.map