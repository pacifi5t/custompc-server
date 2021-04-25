import jwt from 'jsonwebtoken';

enum BuildType {
  Custom,
  Company
}

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string): ApiError {
    console.log(`API Error: 400 - ${message}`);
    return new ApiError(400, message);
  }

  static unauthorized(message: string): ApiError {
    console.log(`API Error: 401 - ${message}`);
    return new ApiError(401, message);
  }

  static forbidden(message: string): ApiError {
    console.log(`API Error: 403 - ${message}`);
    return new ApiError(403, message);
  }

  static notFound(message: string): ApiError {
    console.log(`API Error: 404 - ${message}`);
    return new ApiError(404, message);
  }

  static internal(message: string): ApiError {
    console.log(`API Error: 503 - ${message}`);
    return new ApiError(500, message);
  }
}

function generateJwt(id: string, role: string) {
  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new Error('Cannot generate JWT!');
  }
  return jwt.sign({ id, role }, secret, { expiresIn: '24h' });
}

export { ApiError, BuildType, generateJwt };
