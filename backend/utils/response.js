const sendSuccess = (res, data, message = 'Successo', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const sendError = (res, message = 'Errore', statusCode = 400, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

module.exports = { sendSuccess, sendError };
