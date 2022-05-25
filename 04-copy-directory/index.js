const fs = require('fs');
const path = require('path');
let input = path.join(__dirname, '/files');
let file = path.join(__dirname, '/files-copy');



fs.mkdir(file, { recursive: true }, err => {
	if (err) throw err;


});


async function copyAssets(input, file) {

	await fs.promises.rm(file, { force: true, recursive: true });
	await fs.promises.mkdir(file, { recursive: true });

	let files = await fs.promises.readdir(input, { withFileTypes: true });

	for (let i = 0; i < files.length; i++) {

		let ass1 = path.join(input, files[i].name);
		let assCopy = path.join(file, files[i].name);


		await fs.promises.copyFile(ass1, assCopy);
		console.log(`Файл ${files[i].name} успешно скопирован`)

	}
}

copyAssets(input, file);

