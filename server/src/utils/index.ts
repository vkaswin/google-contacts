import { sign } from "jsonwebtoken";

let generateJwtToken = (payload: string | object | Buffer) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const getPagination = <T>({
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

export { generateJwtToken, getPagination };
