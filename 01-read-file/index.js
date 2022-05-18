const fs = require('fs');
const path = require('path');
let input = path.resolve('/rss/builder/HTML-builder/01-read-file/', 'text.txt');

console.log(input)

var readableStream = fs.createReadStream(input, 'utf8')

readableStream.on('data', function (chunk) {
	console.log(chunk);
})


