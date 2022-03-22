# sync-stream
**Synchronous streams for NodeJS. Compatible with default node stream.**

Contains:
 - FileReadStreamSync (includes readLine function for big Files)
 - FileWriteStreamSync
 - BufferReadStreamSync (string or buffer stream reader)
 - BufferWriteStreamSync (string or buffer stream writer)
 
## Installation
```batch
npm install sync-stream
```

## Usage
### Read file to String
```javascript
const syncStream = require('sync-stream');
let rstream = new syncStream.FileReadStreamSync('test.txt');
let wstream = new syncStream.BufferWriteStreamSync({encoding: 'utf8'});
rstream.pipe(wstream);
console.info(wstream.toString());
```

### Read file async to String
```javascript
const syncStream = require('sync-stream');
let rstream = fs.createReadStream('test.txt');
let wstream = new syncStream.BufferWriteStreamSync({encoding: 'utf8'});
rstream.pipe(wstream);
rstream.on('end', function () {
	console.info(wstream.toString());
});
```

### Read file
```javascript
const syncStream = require('sync-stream');
let rstream = new syncStream.FileReadStreamSync('test.txt', {encoding: 'utf8'});
var chunk = null;
while ((chunk = rstream.read()) !== null) {
	console.info(chunk);
}
```

### Read-Line file
```javascript
const syncStream = require('sync-stream');
let rstream = new syncStream.FileReadStreamSync('test.txt', {encoding: 'utf8'});
var line = null;
while ((row = rstream.readLine()) !== null) {
	console.info(line);
}
```

### Copy file
```javascript
const syncStream = require('sync-stream');
let rstream = new syncStream.FileReadStreamSync('test.txt', {encoding: 'utf8'});
let wstream = new syncStream.FileWriteStreamSync('test2.txt', {encoding: 'utf8'});
rstream.pipe(wstream);
```