import Readable from "./Readable";
import Writable from "./Writable";
import FileReadStreamSync from "./FileReadStreamSync";
import BufferReadStreamSync from "./BufferReadStreamSync";
import BufferWriteStreamSync from "./BufferWriteStreamSync";
import FileWriteStreamSync from "./FileWriteStreamSync";
import stream from "stream";

export = {
	Readable: Readable,
	FileReadStreamSync: FileReadStreamSync,
	BufferReadStreamSync: BufferReadStreamSync,
	Writable: Writable,
	FileWriteStreamSync: FileWriteStreamSync,
	BufferWriteStreamSync: BufferWriteStreamSync,
}