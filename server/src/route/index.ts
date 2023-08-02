import { Request, Response, Router } from 'express';
import { GetAllAccounts } from '../controller/authentication.controller';

import authRoute from './auth';
import restaurantRoute from './restaurant';
import reviewRoute from './reviews';
import commentRoute from './comment';

const route = Router();

route.get('/', async (req: Request, res: Response) => {
	const { data } = await GetAllAccounts();
	return res.send(data);
});

route.use('/', authRoute);	//Routes for authentication
route.use('/', restaurantRoute);	//Routes for restaurant
route.use('/', reviewRoute);	//Routes for reviews
route.use('/', commentRoute);	//Routes for comments

export default route;
