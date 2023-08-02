import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	bio: string;
	password: string;
	profile: Buffer;
	isOwner: boolean;
	meta: {
		likes: object[];
		dislikes: object[];
	};
}

const userSchema: Schema<IUser> = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		unique: true,
	},
	bio: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	profile: { type: Buffer },
	isOwner: { type: Boolean, default: false },
	meta: {
		likes: [
			{
				type: Types.ObjectId,
				ref: 'Review',
			},
		],
		dislikes: [
			{
				type: Types.ObjectId,
				ref: 'Review',
			},
		],
	},
});


const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
