import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const client = new PrismaClient();
export const loginuser = async (req, res) => {
  try {
    //Read the email addresss and  plain password from the user
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    //check whether the user exist by querying db agaist email
    const user = await client.user.findFirst({
      where: { emailAddress: emailAddress },
    });
    //if they dot exist that is an authentication failure
    if (!user) {
      res.status(401).json({ message: "wrong email address or password" });
      return;
    }

    //if they exist compare the plain password agaist hashed password
    const passwordmatch = await bcrypt.compare(password, user.password);
    //if they dont authentication failure
    if (!passwordmatch) {
      res.status(401).json({ message: "Wrong email Address or password" });
      return;
    }
    //if they match generate a token and save id  and role there
    const Token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
    );

    //the send token to user as a cookie

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
          name: `${user.firstName} ${user.lastName}`, // Combine first and last name
          email: user.emailAddress,
        },
      });
  } catch (e) {
    res.status(500).json({ message: "INTERNAL", error: e.message });
  }
};
