const fs = require('fs');
const path = require('path');
let input = path.join(__dirname, 'text.txt');



var readableStream = fs.createReadStream(input, 'utf8')

readableStream.on('data', async function (chunk) {
	console.log(chunk);
})


