module.exports = (err, req, res, next) => {
  err.message = err.message ?? 'something went wrong'
  err.statusCode = err.statusCode ?? 500

  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.statusCode,
  })
}
