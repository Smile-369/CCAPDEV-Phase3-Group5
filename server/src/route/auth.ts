import { Router, Request, Response } from 'express';
import {
	CheckEmail,
	CheckUsername,
	EditAccount,
	FindById,
	FindByUsername,
	LoginAccount,
	RegisterAccount,
} from '../controller/authentication.controller';
import { upload } from '../middleware/multer';

const route = Router();

route.get(
	'/user/userId/:userId',
	async ({ params }: Request, res: Response) => {
		const { userId } = params;
		const { statusCode, message, data } = await FindById(userId);
		return res.status(statusCode).json({ message, data });
	}
);

route.get('/refresh', async (req: Request, res: Response) => {
	const cookie = req.cookies;
	if (!cookie.id) return res.status(401).send();

	const id = cookie.id;

	const { statusCode, message, data } = await FindById(id);
	return res.status(statusCode).json({ message, data });
});

route.get(
	'/validate/email/:email',
	async ({ params }: Request, res: Response) => {
		const { email } = params;
		const { statusCode, message, data } = await CheckEmail(email);

		return res.status(statusCode).json({
			message,
			data,
		});
	}
);

route.get(
	'/validate/username/:username',
	async ({ params }: Request, res: Response) => {
		const { username } = params;
		const { statusCode, message, data } = await CheckUsername(username);
		return res.status(statusCode).json({
			message,
			data,
		});
	}
);

route.post('/register', async ({ body }: Request, res: Response) => {
	const { statusCode, message, data } = await RegisterAccount(body);
	return res.status(statusCode).json({ message, data });
});

route.get('/login', async (req: Request, res: Response) => {
	const { username, password } = req.query;
	const { statusCode, message, data } = await LoginAccount({
		username: username as string,
		password: password as string,
	});
	if (data?._id) {
		const store = data._id.toString();
		res.cookie('id', store, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
	}

	return res.status(statusCode).json({ message, data });
});

route.get(
	'/profile/username/:username',
	async ({ params }: Request, res: Response) => {
		const { username } = params;
		const { statusCode, message, data } = await FindByUsername(username);
		return res.status(statusCode).json({ message, data });
	}
);

route.put(
	'/edit-profile/id/:id',
	upload.single('profile'),
	async (req: Request, res: Response) => {
		const { name, bio } = req.body;
		const { id } = req.params;
		const imageBuffer = req.file?.buffer;
		const { statusCode, message, data } = await EditAccount({
			name,
			bio,
			profile: imageBuffer,
			id,
		});
		return res.status(statusCode).json({ message, data });
	}
);

export default route;
