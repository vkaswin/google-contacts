import { Response, Request, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

class CustomError extends Error {
  status!: number;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);
    this.status = status;
  }
}

const asyncHandler = <T>(
  cb: (req: Request, res: Response, next: NextFunction) => T
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      let status =
        error?.status ||
        (error instanceof JsonWebTokenError
          ? 401
          : error instanceof ZodError
          ? 400
          : 500);
      let message = error?.message || "Internal Server Error";

      res.status(status).send({ message });

      console.log("🚀 ~ file: asyncHandler.ts:19 ~ error:", error);
    }
  };
};

export { asyncHandler, CustomError };
