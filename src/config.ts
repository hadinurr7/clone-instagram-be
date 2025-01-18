import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRET_FORGOT_PASSWORD= process.env.JWT_SECRET_FORGOT_PASSWORD

