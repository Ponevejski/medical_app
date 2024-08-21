// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Unauthorized access. Token is missing.' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token.' });
		}
		req.user = user; // Attach user info to request
		next(); // Proceed to the next middleware or route handler
	});
};
