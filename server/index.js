import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import medicationRouter from './routes/medication.routes.js';
import usersRouter from './routes/user.routes.js';

const PORT = process.env.PORT || 3005;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/', usersRouter);
app.use('/', medicationRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
