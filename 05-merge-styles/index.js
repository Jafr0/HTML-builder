let fs = require("fs");
const path = require('path');
let input = path.join(__dirname, '/styles');
let file = path.join(__dirname + '/project-dist/', 'bundle.css');
const output = fs.createWriteStream(file);


fs.readdir(input, function (err, files) {
	if (err) {
		throw new Error(err);
	}


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