let fs = require("fs");
const path = require('path');
const { stdin, stdout, exit } = process;
let file = path.join(__dirname, 'output.txt');

const output = fs.createWriteStream(file);



stdin.on('data', function (chunk) {
	let str = chunk.toString()


	if (str.trim() === 'exit') {

		process.exit()
	}

	output.write(str)
})


process.on('exit', () => stdout.write('\nЗапись завершена!\n'));
process.on('SIGINT', exit);