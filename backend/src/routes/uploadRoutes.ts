import path from 'path';
import express from 'express';
import multer, { FileFilterCallback } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb: DestinationCallback) {
		const uploadPath = path.resolve(__dirname, '..', '..', '..', 'uploads');
		console.log('Uploading to:', uploadPath);

		cb(null, uploadPath);
	},
	filename(req, file, cb: FileNameCallback) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
	const filetypes = /jpg|jpeg|png/;

	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb(new Error('Images only!'));
	}
}

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});

router.post('/', upload.single('image'), (req, res): void => {
	if (!req.file) {
		res.status(400).json({ message: 'No file uploaded' });
		return;
	}

	const imageUrl = `/uploads/${req.file.filename}`;

	res.send({
		message: 'Image Uploaded',
		image: imageUrl,
	});
});

export default router;
