let fs = require("fs");
const path = require('path');
const { stdin, stdout, exit } = process;
let input = path.join(__dirname, '/styles');
let file = path.resolve('/rss/builder/HTML-builder/05-merge-styles/project-dist', 'bundle.css');
const output = fs.createWriteStream(file);


fs.readdir(input, function (err, files) {
	if (err) {
		throw new Error(err);
	}
	let brr = [];

	for (let i = 0; i < files.length; i++) {
		let inr = path.resolve(input, files[i]);

		if (files[i].includes('.css')) {
			var readableStream = fs.createReadStream(inr, 'utf8')
			readableStream.on('data', function (chunk) {
				output.write(chunk)
			})
		}

	}


})