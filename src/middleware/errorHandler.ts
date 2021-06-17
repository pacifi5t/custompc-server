import { ApiError } from 'ApiError';
import { NextFunction, Request, Response } from 'express';

export default function (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    console.error(`API Error: ${err.status} - ${err.message}`);
    res.status(err.status).json({ message: err.message });
  }
  console.error(`Server Error: 500 - ${err.message}`);
  res.status(500).json({ message: err.message });
}
