"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Readable_1 = __importDefault(require("./Readable"));
const Writable_1 = __importDefault(require("./Writable"));
const FileReadStreamSync_1 = __importDefault(require("./FileReadStreamSync"));
const BufferReadStreamSync_1 = __importDefault(require("./BufferReadStreamSync"));
const BufferWriteStreamSync_1 = __importDefault(require("./BufferWriteStreamSync"));
const FileWriteStreamSync_1 = __importDefault(require("./FileWriteStreamSync"));
module.exports = {
    Readable: Readable_1.default,
    FileReadStreamSync: FileReadStreamSync_1.default,
    BufferReadStreamSync: BufferReadStreamSync_1.default,
    Writable: Writable_1.default,
    FileWriteStreamSync: FileWriteStreamSync_1.default,
    BufferWriteStreamSync: BufferWriteStreamSync_1.default,
};
//# sourceMappingURL=main.js.map