const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid todo id";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
    }

    if (err instanceof SyntaxError && "body" in err) {
        statusCode = 400;
        message = "Invalid JSON payload";
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;
