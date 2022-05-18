let fs = require("fs");
const path = require('path');
const { stdin, stdout, exit } = process;
let file = path.resolve('/rss/builder/HTML-builder/02-write-file/', 'output.txt');

const output = fs.createWriteStream(file);



stdin.on('data', function (chunk) {
	let str = chunk.toString()
	output.write(str)

	if (str.trim() === 'exit') {

		process.exit()
	}


})


process.on('exit', () => stdout.write('\nЗапись завершена!\n'));
process.on('SIGINT', exit);