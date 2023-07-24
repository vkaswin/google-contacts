import { sign } from "jsonwebtoken";

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
