import Comment, { IComment } from '../model/Comment';

type IResponse = {
	statusCode: number;
	message?: string;
	data?: any;
};

export const AddComment = async (data: IComment): Promise<IResponse> => {
	try {
		const comment = new Comment(data);
		const savedComment = await comment.save();
		return {
			statusCode: 201,
			data: savedComment,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error adding comment',
		};
	}
};

export const GetComments = async (restaurantId: string): Promise<IResponse> => {
	try {
		const comments = await Comment.find({ restaurantId });
		return {
			statusCode: 201,
			data: comments,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error retrieving comments',
		};
	}
};
