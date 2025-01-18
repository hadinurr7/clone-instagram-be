import { sign } from "jsonwebtoken";
import { comparePassword } from "../../lib/argon";
import { prisma } from "../../lib/prisma";
import { JWT_SECRET } from "../../config";

interface LoginInput {
    usernameOrEmail: string;
    password: string;
}

export const loginService = async (body: LoginInput) => {
    try {
        const { usernameOrEmail, password } = body;

        // login bisa pake email atau usernmae
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: usernameOrEmail }, //ubah nama jadi usernameOrEmail disesuaikan dengam fe
              { username: usernameOrEmail },   
            ],
          },
        });

    if (!user) {
      throw new Error("Invalid email or username!");
    }

    // cek pw
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password!");
    }

    // hash pw
    const { password: pw, ...userWithoutPassword } = user;

    // token user
    const token = sign({ id: user.id }, JWT_SECRET!, { expiresIn: "2h" });

    return { ...userWithoutPassword, token };
  } catch (error) {
    throw error;
  }
};
