import Restaurant from '../model/Restaurant';
import Review, { IReview } from '../model/Review';
import User, { IUser } from '../model/User';

type IResponse = {
	statusCode: number;
	message?: string;
	data?: any;
};

type IData = {
	userId: string;
	restaurantId: string;
	title: string;
	content: string;
	rating: number;
};

// Function to add a new review
export const AddReview = async (data: IData): Promise<IResponse> => {
	try {
		const newReview: IReview = new Review(data);

		const savedReview: IReview = await newReview.save();
		const restaurant = await Restaurant.findById(savedReview.restaurantId);
		if (!restaurant) {
			return {
				statusCode: 404,
				message: 'restaurant not found',
			};
		}
		restaurant.updateRatings(savedReview.rating);

		return {
			statusCode: 201,
			message: 'Review successfully added',
			data: savedReview,
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 500,
			message: 'Error adding the review',
		};
	}
};

export const GetAllReviews = async (): Promise<IResponse> => {
	try {
		const reviews = await Review.find({});

		return {
			statusCode: 200,
			data: reviews,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error loading reviews',
		};
	}
};

export const GetReviews = async (): Promise<IResponse> => {
	try {
		const reviews = await Review.find({}).sort({ upvote: -1 }).limit(5).exec();

		return {
			statusCode: 200,
			data: reviews,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error loading reviews',
		};
	}
};

export const FindReviewById = async (id: string): Promise<IResponse> => {
	try {
		const review = await Review.findById(id);
		if (!review) {
			return {
				statusCode: 404,
				message: 'Review not found',
			};
		}
		return {
			statusCode: 200,
			data: review,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a review',
		};
	}
};

export const FindReviewByIdAndEdit = async (
	id: string,
	{ title, content }: IData
): Promise<IResponse> => {
	try {
		const review = await Review.findById(id);
		if (!review) return { statusCode: 404, message: 'Not Found' };
		if (title) review.title = title;
		if (content) review.content = content;
		await review.save();
		return {
			statusCode: 200,
			message: 'Edit successful',
			data: review,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a review',
		};
	}
};

export const FindReviewByIdAndDelete = async (
	id: string
): Promise<IResponse> => {
	try {
		await Review.findByIdAndDelete(id);
		return {
			statusCode: 200,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a review',
		};
	}
};

export const LikeReview = async (
	postId: string,
	userId: string
): Promise<IResponse> => {
	try {
		const review: IReview | null = await Review.findById(postId);
		const user: IUser | null = await User.findById(userId);
		if (!review || !user) {
			return {
				statusCode: 404,
				message: 'Something went wrong',
			};
		}

		if (
			review.upvote.includes(user._id) &&
			user.meta.likes.includes(review._id)
		) {
			review.upvote = review.upvote.filter((id) => {
				id !== user._id;
			});
			user.meta.likes = user.meta.likes.filter((id) => {
				id !== review._id;
			});
		} else {
			review.upvote.push(user._id);
			user.meta.likes.push(review._id);
		}

		if (
			review.downvote.includes(user._id) &&
			user.meta.dislikes.includes(review._id)
		) {
			review.downvote = review.downvote.filter((id) => {
				id !== user._id;
			});
			user.meta.dislikes = user.meta.dislikes.filter((id) => {
				id !== review._id;
			});
		}


		await review.save();
		await user.save();

		return {
			statusCode: 200,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a review',
		};
	}
};

export const DislikeReview = async (
	postId: string,
	userId: string
): Promise<IResponse> => {
	try {
		const review: IReview | null = await Review.findById(postId);
		const user: IUser | null = await User.findById(userId);
		if (!review || !user) {
			return {
				statusCode: 404,
				message: 'Something went wrong',
			};
		}

		if (
			review.downvote.includes(user._id) &&
			user.meta.dislikes.includes(review._id)
		) {
			review.downvote = review.downvote.filter((id) => {
				id !== user._id;
			});
			user.meta.dislikes = user.meta.dislikes.filter((id) => {
				id !== review._id;
			});
		} else {
			review.downvote.push(user._id);
			user.meta.dislikes.push(review._id);
		}

		
		if (
			review.upvote.includes(user._id) &&
			user.meta.likes.includes(review._id)
		) {
			review.upvote = review.upvote.filter((id) => {
				id !== user._id;
			});
			user.meta.likes = user.meta.likes.filter((id) => {
				id !== review._id;
			});
		}

		await review.save();
		await user.save();

		await review.save();
		await user.save();

		return {
			statusCode: 200,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a review',
		};
	}
};
