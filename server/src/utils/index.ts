import { Response, Request, NextFunction } from "express";
import { JsonWebTokenError, sign } from "jsonwebtoken";

const colors = [
  "#EF4770",
  "#6F6F6F",
  "#DCB604",
  "#199393",
  "#029ACD",
  "#11C1DA",
  "#3B8FFC",
  "#18C6A0",
  "#B387FF",
  "#F75334",
  "#805AD4",
  "#E38072",
  "#3D3029",
  "#F3D39B",
  "#51CE71",
  "#273A33",
  "#743966",
  "#DAA3F5",
  "#B7EF8F",
  "#3C804F",
  "#D17B56",
  "#673FA2",
  "#D4595B",
  "#48ABC7",
];

export const generateJwtToken = (payload: string | object | Buffer) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const getRandomColorCode = () => {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

export const getPagination = <T>({
  list,
  limit,
  page,
  total,
}: {
  list: T;
  page: number;
  limit: number;
  total: number;
}) => {
  return {
    pageMeta: {
      limit,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    },
    list,
  };
};

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
        error?.status || (error instanceof JsonWebTokenError ? 401 : 500);
      let message = error?.message || "Internal Server Error";

      res.status(status).send({ message });

      console.log("🚀 ~ file: asyncHandler.ts:19 ~ error:", error);
    }
  };
};

export { asyncHandler, CustomError };
