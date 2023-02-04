import { RcFile } from 'antd/lib/upload';
/**
 * Convert an Antd upload file to a base64 string
 * @param file - Antd upload file
 * @returns base64 encoding of the file
 */
export const fileToBase64 = (file: RcFile) => {
	return new Promise<string>((res, rej) => {
		let r = new FileReader();
		r.onload = (e) => {
			console.log(e.target?.result);
			if (e.target?.result) {
				res(e.target.result.toString());
			}
		};
		r.onerror = (e) => {
			rej('Error encoding image.');
		};

		r.readAsDataURL(file);
	});
};
