import { genSalt, hash, compare } from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
};

export { hashPassword, verifyPassword };
