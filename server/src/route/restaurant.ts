import { Router, Request, Response } from 'express';
import { upload } from '../middleware/multer';
import {
	CheckRestaurantName,
	EditRestaurant,
	FindMyRestaurant,
	FindRestaurantById,
	FindRestaurantByName,
	GetAllRestaurant,
	NewRestaurant,
} from '../controller/restaurant.controller';

const route = Router();

route.put(
	'/edit-restaurant/id/:id',
	upload.single('profile'),
	async (req: Request, res: Response) => {
		const { name, bio } = req.body;
		const { id } = req.params;
		const imageBuffer = req.file?.buffer;
		const { statusCode, message, data } = await EditRestaurant({
			name,
			bio,
			profile: imageBuffer,
			id,
		});
		return res.status(statusCode).json({ message, data });
	}
);

route.post(
	'/restaurant/register',
	upload.single('profile'),
	async ({ body, file }: Request, res: Response) => {
		const profile = file?.buffer;
		const { statusCode, message, data } = await NewRestaurant({
			profile,
			...body,
		});

		return res.status(statusCode).json({ message, data });
	}
);

route.get('/all-restaurants', async (req: Request, res: Response) => {
	const { statusCode, message, data } = await GetAllRestaurant();
	return res.status(statusCode).json({
		message,
		data,
	});
});

route.get(
	'/restaurant/validate/name/:name',
	async ({ params }: Request, res: Response) => {
		const { name } = params;
		const { statusCode, message, data } = await CheckRestaurantName(name);
		return res.status(statusCode).json({
			message,
			data,
		});
	}
);

route.get(
	'/restaurant/userId/:userId',
	async ({ params }: Request, res: Response) => {
		const { userId } = params;
		const { statusCode, message, data } = await FindMyRestaurant(userId);
		return res.status(statusCode).json({ message, data });
	}
);

route.get(
	'/restaurant/restaurantId/:restaurantId',
	async ({ params }: Request, res: Response) => {
		const { restaurantId } = params;
		const { statusCode, message, data } = await FindRestaurantById(
			restaurantId
		);
		return res.status(statusCode).json({ message, data });
	}
);

route.get(
	'/restaurants/name/:name',
	async ({ params }: Request, res: Response) => {
		const { name } = params;
		const { statusCode, message, data } = await FindRestaurantByName(name);
		return res.status(statusCode).json({ message, data });
	}
);

export default route;
