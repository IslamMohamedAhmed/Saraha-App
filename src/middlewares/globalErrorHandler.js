export const globalErrorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    if (process.env.MODE === "production") {

        res.status(err.statusCode).json({ error: err.message });
    }
    else {

        res.status(err.statusCode).json({ error: err.message, stack: err.stack });
    }
};
