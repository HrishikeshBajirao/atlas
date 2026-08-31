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