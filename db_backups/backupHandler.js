const { execute } = require('@getvim/execute');
const fs = require('fs');
const compress = require('gzipme');
const cron = require('node-cron');
const moment = require('moment');

// const axios = require('axios');
// const FormData = require('form-data');

const dotenv = require('dotenv');
dotenv.config();

const TOP_AMOUNT_BACKUP_FILES = 15;

const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const password = process.env.PGPASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;





async function backup() {
	// Generate filename
	const currentDate = await moment().format('YYYYMMDD.HHMMSS');
	const fileName = `./files/db_backups-${database}-${currentDate}.tar`;

	// connect to Postgres instance inside docker and execute the pg_dump
	execute(`docker exec -e PGPASSWORD=${password} events-agency-db pg_dump -U ${username} -h ${host} -p ${port} -d ${database} > ${fileName}`)
		.then(async () => {
			// generate the compressed tar.gz file and delete the .tar file
			await compress(fileName, {});
			await fs.unlinkSync(fileName);

			// now a list all the files in the folder of backups, sorted by old first
			const fileList = await sortFolderFiles();
			// if they exceed the top amount
			if (fileList.length > TOP_AMOUNT_BACKUP_FILES) {

				// delete the old ones
				for(let i = 0; i < (fileList.length - TOP_AMOUNT_BACKUP_FILES); ++i){
					// TODO: this could be improved, no hardcode folder "./files"
					await fs.unlinkSync(`./files/${fileList[i]}`);
				}
			}

			console.log(`## File was created successfully`)
		})
		.catch((err) => {
			console.log(err);
		});
}



function startSchedule() {
	cron.schedule(
		'*/1 * * * *',
		() => {
			backup();
			//const fileNameGzip = `${fileName}.tar.gz`;
			//sendToBackupServer(fileNameGzip);
		},
		{},
	);
}

/* function sendToBackupServer(fileName = fileNameGzip) {
	const form = new FormData();
	form.append('file', fileName);
	axios
		.post('http://my.backupserver.org/private', form, {
			headers: form.getHeaders(),
		})
		.then((result) => {
			console.log(result.data);
			fs.unlinkSync(fileNameGzip);
		})
		.catch((err) => {
			console.error(err);
		});
} */


const sortFolderFiles = async (dir = "./files") => {
	const files = await fs.promises.readdir(dir);

	// fetch the files inside the "dir" folder
	// get time of modification and sort based on that
	// set the old ones first
	// return filenames only
    return files
        .map(fileName => ({
            name: fileName,
            time: fs.statSync(`${dir}/${fileName}`).mtime.getTime(),
        }))
        .sort((a, b) => a.time - b.time)
        .map(file => file.name);
};



module.exports = {
	startSchedule,
};
