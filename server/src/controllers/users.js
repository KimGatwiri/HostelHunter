import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const client = new PrismaClient();
export const registeruser = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 8);
    if (!["Tenant", "Landlord"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Invalid role. Must be Tenant or Lanlord." });
    }
    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        password: hashedpassword,
        role,
      },
    });
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
