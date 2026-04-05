const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Middleware for JWT verification and role-based access control
const authMiddleware = (roles = []) => {
    // roles param can be a single role string (e.g. 'admin') or an array of roles (e.g. ['admin', 'editor'])
    return async (req, res, next) => {
        // Get token from headers
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        
        try {
            // Verify token
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            req.user = decoded;
            
            // Check for role authorization
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied. You do not have the right role.' });
            }
            
            next(); // Proceed to the next middleware/controller
        } catch (error) {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    };
};

module.exports = authMiddleware;