const fs = require('fs');

const path = require('path');

//перенес из функци ^
let input = path.join(__dirname, '/secret-folder');


function fil(input) {


	fs.readdir(input, function (err, files) {
		if (err) {
			throw new Error(err);
		}
		files.forEach(function (name) {
			var path1 = path.join(input, name);
			fs.stat(path1, function (err, stats) {
				if (err) {
					throw new Error(err);
				}
				if (stats.isFile()) {
					console.log(name, stats.size / 1000 + ' КБ');
				} else if (stats.isDirectory()) {
					fil(path1);
				}
			})

		});
	});
}

fil(input);