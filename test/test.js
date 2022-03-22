const syncStream = require('../');
/*
const fs = require("fs");
var wstream = fs.createWriteStream('test2.txt', {encoding: 'utf8'});
wstream.on('finish', function () {
	console.info('finish', arguments);
});
wstream.on('close', function () {
	console.info('close', arguments);
});
wstream.write("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.\n");
wstream.end();

var wstream2 = new syncStream.FileWriteStreamSync('test3.txt',  {encoding: 'utf8'});
wstream2.on('finish', function () {
	console.info('finish', arguments);
});
wstream2.on('close', function () {
	console.info('close', arguments);
});

wstream2.write("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.\n");
wstream2.end();
/**/

// Write file stream
const fs = require("fs");
//let wstream = new syncStream.FileWriteStreamSync('test3.txt', {encoding: 'ascii'});
let wstream = new syncStream.BufferWriteStreamSync({encoding: 'utf8'});

let rstream = fs.createReadStream('test.txt');
//let rstream = new syncStream.FileReadStreamSync('test.txt',  {encoding: 'ascii'});

rstream.pipe(wstream);

//rstream.destroy();
rstream.on('end', function () {
	console.info(wstream.toString());
})

console.info(wstream.toString());

/*
// Read line and write to async stream
const fs = require("fs");
let rstream = new syncStream.FileReadStreamSync('test.txt', {encoding: 'utf8'});
let wstream = fs.createWriteStream('test2.txt');
rstream.pipe(wstream);
/**/


/**
// Read line file stream
let rstream = new syncStream.FileReadStreamSync('test.txt', {encoding: 'utf8'});
var row = null;
while ((row = rstream.readLine()) !== null) {
	console.info(row);
}
/**/

/*
// Read file stream
let rstream = new syncStream.FileReadStreamSync('test.txt');
let wstream = new syncStream.BufferWriteStreamSync();
rstream.pipe(wstream);
console.info(wstream.toString());
/**/