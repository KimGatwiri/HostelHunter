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
export async function getProfile(req, res) {
  try {
    const userId = req.userId; // Extract `id` from verified JWT token

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the user profile from the database
    const user = await client.user.findUnique({
      where: { id: userId },
      
    });

    // Handle user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
