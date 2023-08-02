import { Document, model, Schema, Types } from 'mongoose';

interface IRestaurant extends Document {
	userId: object;
	name: string;
	bio: string;
	profile: Buffer;
	ratings: number;
	totalVotes: number;
	updateRatings(newVote: number): Promise<IRestaurant>;
}

const restaurantSchema: Schema<IRestaurant> = new Schema({
	name: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	userId: {
		type: Types.ObjectId,
	},
	profile: {
		type: Buffer,
		required: true,
	},
	ratings: {
		type: Number,
		default: 0,
		required: true,
	},
	totalVotes: {
		type: Number,
		default: 0,
	},
});

restaurantSchema.methods.updateRatings = function (
	this: IRestaurant,
	newVote: number
): Promise<IRestaurant> {
	if (newVote >= 0 && newVote <= 5) {
		const newTotalVotes = this.totalVotes + 1;
		const newTotalRatings = this.ratings * this.totalVotes + newVote;
		this.totalVotes = newTotalVotes;
		this.ratings = newTotalRatings / newTotalVotes;
		return this.save();
	} else {
		throw new Error('Invalid vote value. Vote must be between 0 and 5.');
	}
};

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;
