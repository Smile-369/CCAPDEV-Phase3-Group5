import { Request, Response, Router } from 'express';

import {
	AddReview,
	DislikeReview,
	FindReviewById,
	FindReviewByIdAndDelete,
	FindReviewByIdAndEdit,
	GetAllReviews,
	GetReviews,
	LikeReview,
} from '../controller/review.controller';
const route = Router();

route.post('/new/post', async ({ body }: Request, res: Response) => {
	const { statusCode, message, data } = await AddReview(body);
	return res.status(statusCode).json({ message, data });
});

route.get('/all-reviews', async (req: Request, res: Response) => {
	const { statusCode, message, data } = await GetAllReviews();
	return res.status(statusCode).json({ message, data });
});

route.get('/posts', async (req: Request, res: Response) => {
	const { statusCode, message, data } = await GetReviews();
	return res.status(statusCode).json({ message, data });
});

route.get(
	'/review/postId/:postId',
	async ({ params }: Request, res: Response) => {
		const { postId } = params;
		const { statusCode, data, message } = await FindReviewById(postId);
		return res.status(statusCode).json({ message, data });
	}
);

route.put(
	'/review/edit/postId/:postId',
	async ({ params, body }: Request, res: Response) => {
		const { postId } = params;
		const { statusCode, data, message } = await FindReviewByIdAndEdit(
			postId,
			body
		);
		return res.status(statusCode).json({ message, data });
	}
);

route.delete(
	'/reviews/delete/postId/:postId',
	async ({ params }: Request, res: Response) => {
		const { postId } = params;
		const { statusCode, message } = await FindReviewByIdAndDelete(postId);
		return res.status(statusCode).json({ message });
	}
);

route.put('/review/like', async ({ body }: Request, res: Response) => {
	const { postId, userId } = body; 
	const { statusCode, message } = await LikeReview(postId, userId);
	return res.status(statusCode).json({ message });
});

route.put('/review/dislike', async ({ body }: Request, res: Response) => {
	const { postId, userId } = body;
	const { statusCode, message } = await DislikeReview(postId, userId);
	return res.status(statusCode).json({ message });
});

export default route;
