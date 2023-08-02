import { Request, Response, Router } from 'express';
import { AddComment, GetComments } from '../controller/response.controller';
const route = Router();

route.post('/comment', async ({ body }: Request, res: Response) => {
	const { statusCode, message, data } = await AddComment(body);
	return res.status(statusCode).json({ message, data });
});

route.get('/comments', async ({ query }: Request, res: Response) => {
	const { restaurantId } = query;
	const { statusCode, message, data } = await GetComments(restaurantId as string);
	return res.status(statusCode).json({ message, data });
});

export default route;
