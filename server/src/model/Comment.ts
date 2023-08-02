import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IComment extends Document {
	postId?: object;
	restaurantId?: object;
	content?: string;
}

const commentSchema: Schema<IComment> = new Schema({
	postId: {
		type: Types.ObjectId,
		ref: 'Review',
	},
	restaurantId: {
		type: Types.ObjectId,
		ref: 'Restaurant',
	},
	content: {
		type: String,
		required: true,
	},
});

const Comment: Model<IComment> = model<IComment>('Comment', commentSchema);

export default Comment;
