import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IReview extends Document {
	userId: object;
	restaurantId: object;
	title: string;
	content: string;
	rating: number;
	upvote: object[];
	downvote: object[];
}

const reviewSchema: Schema<IReview> = new Schema({
	userId: {
		type: Types.ObjectId,
		required: true,
		ref: 'User',
	},
	restaurantId: {
		type: Types.ObjectId,
		required: true,
		ref: 'Restaurant',
	},
	title: {
		type: String,
	},
	content: {
		type: String,
	},
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
	},
	upvote: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
	downvote: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
});

const Review: Model<IReview> = model<IReview>('Review', reviewSchema);

export default Review;
