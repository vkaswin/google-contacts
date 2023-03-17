import bcrypt from "bcryptjs";
import User from "../models/user";
import { asyncHandler, CustomError } from "../utils/asyncHandler";
import { RegisterSchema, LoginSchema } from "../schema/user";
import { generateJwtToken } from "../utils";

const signUp = asyncHandler(async (req, res) => {
  let { email, name, password } = RegisterSchema.parse(req.body);

  let isExist = await User.findOne({ email });

  if (isExist)
    throw new CustomError({ message: "User already exists", status: 400 });

  let salt = await bcrypt.genSalt();
  let hashPassword = await bcrypt.hash(password, salt);

  let user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  let token = generateJwtToken({
    _id: user._id,
    name: user.name,
    email: user.email,
  });

  res.status(200).send({
    token,
  });
});

const signIn = asyncHandler(async (req, res) => {
  let { email, password } = LoginSchema.parse(req.body);

  let user = await User.findOne({ email });

  if (!user) throw new CustomError({ message: "User not exist", status: 400 });

  let isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched)
    throw new CustomError({ message: "Wrong Password", status: 400 });

  let token = generateJwtToken({
    _id: user._id,
    name: user.name,
    email: user.email,
  });

  res.status(200).send({
    token,
  });
});

export { signIn, signUp };
