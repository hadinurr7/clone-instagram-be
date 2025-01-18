import { hashPassword } from "../../lib/argon";
import { prisma } from "../../lib/prisma";

interface RegisterInput {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

export const registerService = async (body: RegisterInput) => {
  try {
    const { email, fullname, username, password } = body;

    // cek email
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already exists!");
    }

    // cek username 
    const existingUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUsername) {
      throw new Error("Username already taken!");
    }

    // hash pw
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        fullname,
        username,
        password: hashedPassword,
      },
    });

    const { password: pw, ...userWithoutPassword } = newUser;
    return userWithoutPassword;

  } catch (error) {
    throw error;
  }
};
