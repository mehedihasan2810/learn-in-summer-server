import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Defining a custom type for JWT-enabled Request
type JWTRequest = Request & { decoded?: string | JwtPayload | undefined };

/*
 * Middleware: Verify JWT token in the Authorization header.
 * If token is valid, add decoded payload to the request object and call the next middleware.
 * If token is invalid or missing, respond with an unauthorized access error.
 */
export const verifyJWT = (
  req: JWTRequest,
  res: Response,
  next: NextFunction
) => {
  // Extracting the Authorization header
  const authorization = req.headers.authorization;

  // Responding with an unauthorized access error if Authorization header is missing
  if (!authorization) {
    return res
      .status(401)
      .json({ error: true, message: "unauthorized access" });
  }

  // Extracting the token from the Authorization header
  const token = authorization.split(" ")[1];

  // Verifying the token using the provided secret
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      // Responding with an unauthorized access error if token is invalid
      if (err) {
        return res
          .status(401)
          .send({ error: true, message: "unauthorized access" });
      }

      // Adding the decoded payload to the request object
      req.decoded = decoded;

      // Calling the next middleware
      next();
    }
  );
};
