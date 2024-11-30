import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const client = new PrismaClient();
export const loginuser = async (req, res) => {
  try {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

    const user = await client.user.findFirst({
      where: { emailAddress: emailAddress },
    });

    if (!user) {
      res.status(401).json({ message: "wrong email address or password" });
      return;
    }

    const passwordmatch = await bcrypt.compare(password, user.password);

    if (!passwordmatch) {
      res.status(401).json({ message: "Wrong email Address or password" });
      return;
    }

    const Token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
    );

    res
      .status(200)
      .cookie("authToken", Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        token: Token,
        role: user.role,
        user: {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailAddress,
        },
      });
  } catch (e) {
    res.status(500).json({ message: "INTERNAL", error: e.message });
  }
};
