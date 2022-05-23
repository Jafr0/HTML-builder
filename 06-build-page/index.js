let fs = require("fs");
const path = require('path');
let filetemp = path.join(__dirname, 'template.html');
let readTemp = fs.createReadStream(filetemp, 'utf8')
let components = path.join(__dirname, 'components');
let input = path.join(__dirname, '/styles');
let fileSteel = path.join(__dirname + '/project-dist/', 'style.css');
const output = fs.createWriteStream(fileSteel);
let assets = path.join(__dirname, '/assets');
let assetsPrj = path.join(__dirname, '/project-dist', '/assets');

fs.mkdir(path.join(__dirname, '/project-dist'), { recursive: true }, err => {
	if (err) throw err;

});


async function index(components) {

	let filesCopm = await fs.promises.readdir(components, { withFileTypes: true });
	let data = '';
	readTemp.on('data', chunk => data += chunk);

	readTemp.on('end', async () => {

		filesCopm.forEach(file => {
			if (file.isFile() === true) {

				const readComp = fs.ReadStream(path.join(components, file.name), 'utf-8');

				let name = path.basename(file.name.substring(0, file.name.indexOf('.html')))

				let chunkComp = '';

				readComp.on('data', chunk => chunkComp += chunk);
				readComp.on('end', () => {
					data = data.replace(`{{${name}}}`, chunkComp);

					let fileIndex = path.join(__dirname + '/project-dist', 'index.html')

					const outputIndex = fs.createWriteStream(fileIndex);
					outputIndex.write(data);
				});
			}
		});
	});
}

index(components);


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


async function copyAssets(assets, assetsPrj) {

	await fs.promises.rm(assetsPrj, { force: true, recursive: true });
	await fs.promises.mkdir(assetsPrj, { recursive: true });

	let files = await fs.promises.readdir(assets, { withFileTypes: true });

	for (let i = 0; i < files.length; i++) {

		let ass1 = path.join(assets, files[i].name);
		let assCopy = path.join(assetsPrj, files[i].name);

		if (files[i].isDirectory()) {
			copyAssets(ass1, assCopy);
		} else {
			await fs.promises.copyFile(ass1, assCopy);
		}
	}
}

copyAssets(assets, assetsPrj);



