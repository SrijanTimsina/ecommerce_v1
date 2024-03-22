const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.get("x-auth-token") || req.body.token;
	// console.log(token);
	// If no token
	const cookie = req.cookies;
	// console.log(cookie);
	if (!token) {
		return res
			.status(401)
			.json({ errors: [{ msg: "Invalid token, not logged in" }] });
	}
	// Verify token
	try {
		const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(verifiedToken);
		req.user = verifiedToken.user;
		next();
	} catch (err) {
		res.status(401).json({ errors: [{ msg: "Invalid token" }] });
	}
};
