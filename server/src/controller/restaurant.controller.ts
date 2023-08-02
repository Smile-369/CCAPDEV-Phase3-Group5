import Comment from '../model/Comment';
import Restaurant from '../model/Restaurant';
import User from '../model/User';

type IResponse = {
	statusCode: number;
	message?: string;
	data?: any;
};

type IData = {
	id?: string;
	userId?: string;
	name?: string;
	bio?: string;
	profile?: Buffer;
};

export const CheckRestaurantName = async (name: string): Promise<IResponse> => {
	try {
		const restaurant = await Restaurant.find({ name }, { name: 1, _id: 0 });
		const isTaken = restaurant.length > 0;
		return {
			statusCode: 200,
			data: isTaken,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for restaurant',
		};
	}
};

export const GetAllRestaurant = async (): Promise<IResponse> => {
	try {
		const restaurant = await Restaurant.find({});
		return {
			statusCode: 200,
			data: restaurant,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for restaurant',
		};
	}
};

export const NewRestaurant = async (data: IData): Promise<IResponse> => {
	try {
		const restaurant = new Restaurant(data);
		const owner = await User.findById(data.userId);

		if (!owner) {
			return { statusCode: 404, message: 'user not found' };
		}
		const savedRestaurant = await restaurant.save();
		owner.isOwner = true;
		await owner.save();
		return {
			statusCode: 201,
			message: 'Resetaurant successfully registered',
			data: savedRestaurant,
		};
	} catch (err) {
		// console.log(err);
		return {
			statusCode: 500,
			message: 'Error registering the restaurant',
		};
	}
};

export const EditRestaurant = async ({
	id,
	bio,
	name,
	profile,
}: IData): Promise<IResponse> => {
	const restaurant = await Restaurant.findById(id);
	try {
		if (!restaurant) {
			return {
				statusCode: 404,
				message: 'Restaurant not found',
			};
		}
		if (profile) {
			restaurant.profile = profile;
		}
		if (bio) {
			restaurant.bio = bio;
		}
		if (name) {
			restaurant.name = name;
		}

		await restaurant.save();
		return {
			statusCode: 200,
			message: 'Success',
		};
	} catch (err) {
		return { statusCode: 500, message: 'An error occurred' };
	}
};

export const FindMyRestaurant = async (userId: string): Promise<IResponse> => {
	try {
		const restaurant = await Restaurant.findOne({ userId });
		return {
			statusCode: 200,
			data: restaurant,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a restaurant',
		};
	}
};

export const FindRestaurantByName = async (
	name: string
): Promise<IResponse> => {
	try {
		const restaurant = await Restaurant.findOne({ name: name });
		return {
			statusCode: 200,
			data: restaurant,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a restaurant',
		};
	}
};

export const FindRestaurantById = async (id: string): Promise<IResponse> => {
	try {
		const restaurant = await Restaurant.findById(id, { name: 1, userId: 1 });
		if (!restaurant)
			return {
				statusCode: 404,
				message: 'Restaurant not found',
			};

		const comments = await Comment.find({ restaurantId: restaurant._id });

		const data = { ...restaurant, comments };
		return {
			statusCode: 200,
			data: data,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error looking for a restaurant',
		};
	}
};
