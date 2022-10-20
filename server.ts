import { app } from "./app"
import dotenv from 'dotenv';
import DB from './Database';
import express, { Express, Request, Response } from 'express';
import path from 'path';

dotenv.config();

// if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const port = process.env.PORT;

if (process.env.NODE_ENV === 'production') {
	// app.use(express.static(path.join(__dirname, "./client/build")));

	// app.get('*', (req: Request, res: Response) => {
	// 	res.sendFile(path.resolve(__dirname, "./", 'client', 'build', 'index.html'));
	// });

	DB.authenticate().then(() => {
		console.log('connected to production database successfully!');
	}).catch(error => {
		console.log('DB connection for production failed');

	})
	console.log('prod');

} else {
	// app.use(express.static(path.join(__dirname, "..//client//build")));

	// app.get('*', (req: Request, res: Response) => {
	// 	res.sendFile(path.resolve(__dirname, "..//", 'client', 'build', 'index.html'));
	// });

	DB.authenticate().then(() => {
		console.log('connected to database successfully!');
	}).catch(error => {
		console.log('DB connection failed');

	})

}




app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});