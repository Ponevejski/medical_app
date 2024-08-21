import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your own secret
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET; // Replace with your own refresh token secret

export const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	// Check if password is a string
	if (typeof password !== 'string') {
		return res.status(400).json({ message: 'Password must be a string.' });
	}

	try {
		// Hash the password before storing it
		const saltRounds = 10; // Ensure this is a valid number
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = await db.query(
			`
          INSERT INTO "users" (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;
          `,
			[name, email, hashedPassword] // Use the hashed password
		);

		res.status(201).json(user.rows[0]);
	} catch (error) {
		console.error(error);

		if (error.code === '23505') {
			// Unique violation error code
			return res.status(409).json({ message: 'Email already exists.' });
		}

		res
			.status(500)
			.json({ message: 'An error occurred while creating the user.' });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await db.query(
			`
          SELECT * FROM "users" WHERE email = $1;
          `,
			[email]
		);

		if (user.rows.length === 0) {
			return res.status(401).json({ message: 'User does not exist.' });
		}

		const isMatch = await bcrypt.compare(password, user.rows[0].password); // Compare hashed password

		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid email or password.' });
		}

		// Generate session token
		const sessionToken = jwt.sign(
			{ id: user.rows[0].id, email: user.rows[0].email },
			JWT_SECRET,
			{ expiresIn: '15m' }
		); // Expires in 15 minutes

		// Generate refresh token
		const refreshToken = jwt.sign(
			{ id: user.rows[0].id, email: user.rows[0].email },
			REFRESH_TOKEN_SECRET,
			{ expiresIn: '7d' }
		); // Expires in 7 days

		// You may want to store the refresh token in your database for future validation

		// Send tokens back to the client
		res.json({
			message: 'Login successful',
			sessionToken,
			refreshToken,
			user: user.rows[0], // Optionally return user data
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred during login.' });
	}
};

export const getUser = async (req, res) => {
	const { id } = req.user;
	const user = await db.query(`SELECT * FROM "users" WHERE id = $1`, [id]);
	res.json(user.rows[0]);
};

export const refreshToken = async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token is required.' });
	}

	// Verify the refresh token
	jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid refresh token.' });
		}

		// Generate a new session token
		const sessionToken = jwt.sign(
			{ id: user.id, email: user.email },
			JWT_SECRET,
			{ expiresIn: '15m' }
		);

		res.json({ sessionToken });
	});
};
