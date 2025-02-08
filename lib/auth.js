// It is not possible to retrieve the original password from a bcrypt hash because bcrypt is designed to be a one-way function

import { compare, hash } from "bcryptjs";
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(enteredPassword, storedPassword) {
  const isValid = await compare(enteredPassword, storedPassword);
  return isValid;
}
