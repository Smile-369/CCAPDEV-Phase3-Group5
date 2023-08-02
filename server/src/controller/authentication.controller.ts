import User, { IUser } from '../model/User';
import bcrypt from 'bcrypt';

type IResponse = {
	statusCode: number;
	message?: string;
	data?: any;
};

type IData = {
	id?: string;
	name?: string;
	bio?: string;
	profile?: Buffer;
	username?: string;
	email?: string;
	password?: string;
};

export const RegisterAccount = async (data: IData): Promise<IResponse> => {
	if (!data.password) {
		return {
			statusCode: 400,
			message: 'Password is required',
		};
	}
	
	try {
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const user = new User({ ...data, password: hashedPassword });
		const savedUser = await user.save();
		return {
			statusCode: 201,
			message: 'Account successfully registered',
			data: savedUser,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error registering the account',
		};
	}
};


export const LoginAccount = async (data: {
	username: string;
	password: string;
}): Promise<IResponse> => {
	try {
		const user: IUser | null = await User.findOne(
			{ username: data.username },
			{ username: 1, password: 1, name: 1, profile: 1, isOwner: 1, meta: 1 }
		);
		if (!user) {
			return {
				statusCode: 404,
				message: 'User not found',
			};
		}
		
		const isMatch = await bcrypt.compare(data.password, user.password);
		
		if (!isMatch) {
			return { statusCode: 404, message: 'Invalid password' };
		}
		
		return { statusCode: 200, data: user };
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error registering the account',
		};
	}
};


export const CheckEmail = async (email: string): Promise<IResponse> => {
	try {
		const users = await User.find({ email }, { email: 1, _id: 0 });
		const isTaken = users.length > 0;
		return {
			statusCode: 200,
			data: isTaken,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error retrieving usernames',
		};
	}
};

export const CheckUsername = async (username: string): Promise<IResponse> => {
	try {
		const users = await User.find({ username }, { username: 1, _id: 0 });
		const isTaken = users.length > 0;
		return {
			statusCode: 200,
			data: isTaken,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error retrieving usernames',
		};
	}
};

export const EditAccount = async ({
	id,
	bio,
	name,
	profile,
}: IData): Promise<IResponse> => {
	const user = await User.findById(id);
	try {
		if (!user) {
			return {
				statusCode: 404,
				message: 'An error occurred',
			};
		}
		if (profile) {
			user.profile = profile;
		}
		if (bio) {
			user.bio = bio;
		}
		if (name) {
			user.name = name;
		}
		await user.save();
		return {
			statusCode: 200,
			message: 'Success',
		};
	} catch (err) {
		return { statusCode: 500, message: 'An error occurred' };
	}
};

export const GetAllAccounts = async (): Promise<IResponse> => {
	const users = await User.find({});
	return {
		statusCode: 200,
		message: 'Accounts',
		data: users,
	};
};

export const FindById = async (id: string): Promise<IResponse> => {
	try {
		const user = await User.findById(id);
		if (!user) {
			return { statusCode: 404, message: 'User not found' };
		}
		return {
			statusCode: 200,
			data: user,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error retrieving usernames',
		};
	}
};

export const FindByUsername = async (username: string): Promise<IResponse> => {
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return { statusCode: 404, message: 'User not found' };
		}
		return {
			statusCode: 200,
			data: user,
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			message: 'Error retrieving usernames',
		};
	}
};
