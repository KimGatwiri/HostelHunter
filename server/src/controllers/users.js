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
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function updateProfile(req, res) {
  const { firstName, lastName, emailAddress, password } = req.body;
  const userId = req.userId; 
  try {
   
    const user = await client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); 
    }

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { firstName, lastName, emailAddress, password: hashedPassword },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        emailAddress: true,
        
        
      }, 
    });

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err); // Log detailed error
    if (err.code === 'P2002') { // Unique constraint violation (e.g., email already taken)
      return res.status(400).json({ error: 'Email address already in use' });
    }
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
}
