import * as mkdirp from 'mkdirp';
import * as fs from 'fs';

class ApiController {
    async upload(file: any) {
        console.log("uploadFile controllers file: ", file);
        const fileName = file.name;
        const uploadPath = "./static";
        const flag = fs.existsSync(uploadPath);

        if (!flag) {
            mkdirp.sync(uploadPath);
        }
        const filePath = `${uploadPath}/${fileName}`;
        return new Promise((resolve, reject) => {
            const reader = fs.createReadStream(file.path);
            const upStream = fs.createWriteStream(filePath);

            upStream.on('finish', () => {
                resolve('ok');
            });

            upStream.on('error', function (err) {
                reject(err);
            });

            reader.pipe(upStream);
        });
    }
}

export default new ApiController();