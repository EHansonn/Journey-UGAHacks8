import AWS from 'aws-sdk';

export const uploadImages = (files: { name: string; body: string }[]) => {
	return new Promise<AWS.S3.PutObjectOutput>((res, rej) => {
		files.forEach((file) => {
			const b64Data = Buffer.from(file.body.replace(/^data:image\/\w+;base64,/, ''), 'base64');
			const type = file.body.split(';')[0].split('/')[1];
			new AWS.S3().putObject(
				{
					Bucket: 'uga-hacks-8',
					Key: file.name,
					Body: b64Data,
					ContentEncoding: 'base64',
					ContentType: `image/${type}`,
				},
				function (err, data) {
					if (err) rej(err);
					else res(data);
				},
			);
		});
	});
};
