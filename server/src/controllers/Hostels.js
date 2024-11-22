import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function createHostel(req, res) {
  try {
    const { name, location, roomType, roomsCount, pricePerRoom, imageUrl } =
      req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }
    const newHostel = await prisma.hostel.create({
      data: {
        name,
        location,
        roomType,
        roomsCount,
        pricePerRoom,
        imageUrl,
        owner: userId,
      },
    });
    res.status(201).json(newHostel);
  } catch (error) {
    console.error("Error creating hostel:", error);
    res.status(500).json({ message: "Failed to create hostel" });
  }
}
export async function fetchSingleHostel(req, res) {
  try {
    const { id } = req.params;
    const hostel = await prisma.post.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!hostel) {
      return res.status(404).json({ message: "hostel not found" });
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: "something went wrong..." });
  }
}
