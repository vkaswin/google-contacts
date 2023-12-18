import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import User from "../models/user";
import { CustomError, asyncHandler, generateJwtToken } from "../utils";

const signIn = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });

  if (!user) {
    throw new CustomError({ message: "User not found", status: 400 });
  }

  let verify = await bcrypt.compare(password, user.dataValues.password);

  if (!verify) {
    throw new CustomError({ message: "Invalid password", status: 400 });
  }

  let token = generateJwtToken({
    id: user.dataValues.id,
    name: user.get("name"),
    email: user.dataValues.email,
    colorCode: user.dataValues.colorCode,
  });

  res.status(200).send({ data: { token }, message: "Success" });
});

const signUp = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  let user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });

  if (user) {
    throw new CustomError({ message: "User already exists", status: 400 });
  }

  let salt = await bcrypt.genSalt();
  let hasPassword = await bcrypt.hash(password, salt);

  user = await User.create({ ...req.body, password: hasPassword });

  let token = generateJwtToken({
    id: user.dataValues.id,
    name: user.dataValues.name,
    email: user.dataValues.email,
    colorCode: user.dataValues.colorCode,
  });

  res.status(200).send({ data: { token }, message: "Success" });
});

export default { signIn, signUp };
