const fs = require('fs');
const path = require('path');
let input = path.join(__dirname, '/files');
let file = path.join(__dirname, '/files-copy');



fs.mkdir(file, { recursive: true }, err => {
	if (err) throw err;


});


fs.readdir(file, (err, name) => {
	if (err) throw err;
	for (const i of name) {

		fs.unlink(path.join(file, i), err => {
			if (err) throw err;
		});
	}
});



fs.readdir(input, function (err, files) {
	if (err) {
		throw new Error(err);
	}
	files.forEach(function (name) {
		let source = path.join(input, name);
		let output = path.join(file, name);

		fs.copyFile(source, output, err => {
			if (err) throw err;
			console.log(`Файл ${name} успешно скопирован`);
		})

	})

})
