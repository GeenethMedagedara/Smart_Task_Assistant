const rateLimit = require("express-rate-limit");

// General API Rate Limiting (e.g., 100 requests per 15 minutes)
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    headers: true, // Send RateLimit headers
});

// Login & Register Limiting (Prevent Brute Force)
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 login/register attempts per windowMs
    message: "Too many failed login attempts. Try again later.",
});

module.exports = { generalLimiter, authLimiter };