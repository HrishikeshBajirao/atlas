export default function errorHandler(err, req, res, next){
    console.log(err);
    res.status(err.statusCode || 500).json({
        success: false,
        error: {
            code: err.code || "INTERNAL_SERVER_ERROR",
            message: err.message || "Interval Server Error",
        }
    })
}

export class BadRequestError extends Error{
    constructor(message = "Bad Request"){
        super(message);
        this.statusCode = 400;
        this.code = "INCORRECT_CREDENTIALS"
    }
}

export class UnauthorizedError extends Error{
    constructor(message = "Unauthorized"){
        super(message);
        this.statusCode = 401;
        this.code = "UNAUTHORIZED"
    }
}

export class ForbiddenError extends Error{
    constructor(message = "Forbidden"){
        super(message);
        this.statusCode = 403;
        this.code = "FORBIDDEN"
    }
}

export class NotFoundError extends Error{
    constructor(message = "Not Found"){
        super(message);
        this.statusCode = 404;
        this.code = "NOT_FOUND"
    }
}