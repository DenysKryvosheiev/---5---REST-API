import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error caught by middleware:', err);

  if (err instanceof CustomError) {
    return res.status(err.httpStatusCode || 500).json({
      success: false,
      statusCode: err.httpStatusCode,
      errorType: err.errorType,
      message: err.message,
      errors: err.errorsValidation || err.errors || null,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: err.stack,
  });
};
