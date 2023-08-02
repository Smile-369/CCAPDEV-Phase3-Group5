import { NextFunction, Request, Response } from 'express';
import { FindById } from '../controller/authentication.controller';

export const authorizedToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const idHeader = req.headers['authorization'];
	if (!idHeader)
		return res.status(401).json({
			message: 'Missing authorization header',
		});

	const id = idHeader.split(' ')[1];
	if (!id)
		return res.status(401).json({
			message: 'Missing access token',
		});

	try {
		const { data } = await FindById(id);

		if (data) {
			next();
		} else
			res.status(401).json({
				message: 'Invalid access token',
			});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Internal server error',
		});
	}
};
