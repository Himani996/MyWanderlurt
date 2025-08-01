class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // ✅ calls parent Error class
        this.statusCode = statusCode;
    }
}

// module.exports = ExpressError;