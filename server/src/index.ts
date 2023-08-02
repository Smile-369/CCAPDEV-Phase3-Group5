import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import route from './route';
import cookieparser from 'cookie-parser';

import { allowedOrigins, credentials } from './middleware/credentials';

const app: Express = express();
const port = process.env.PORT || 8080;

// const password = process.env.PASS || '66DCvZz6UCDhHbpX';
const password = process.env.PASS || 'ndjWNB0MFif5QNXY';

// const uri = `mongodb+srv://user:${password}@restaurant.ot5v5rm.mongodb.net/?retryWrites=true&w=majority`;
const uri =`mongodb+srv://Restaurant:${password}@cluster0.ibpuctm.mongodb.net/?retryWrites=true&w=majority`;
//Connects the server to the database
mongoose.connect(uri);
const db = mongoose.connection;

db.on('connected', () => {
	console.log('⚡️[database]: Mongoose is connected');
});

//Middlewares: handle the initialization of server to shorten our codes and make it secure and simple at the same time
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(cookieparser());

//this shows up when we visit the http://localhost:8080/
app.get('/', (req: Request, res: Response) => {
	res.send('This is restaurant API!');
});

//Handles all the route / api requests.
//Our app uses REST. this handles the communications between the server and the client side.
app.use('/api', route);


app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
