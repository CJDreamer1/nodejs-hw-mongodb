import { isHttpError } from 'http-errors';

function errorHandler(error, _req, res, _next) {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: 'Something went wrong',
      data: error.message,
    });
  }
}
export { errorHandler };
