import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function createHostel(req, res) {
  try {
    const {
      name,
      location,
      roomType,
      roomsCount,
      pricePerRoom,
      imageUrl,
      amenities,
    } = req.body;
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
        amenities: {
          create: amenities.map((amenity) => ({ name: amenity })),
        },
        owner: userId,
      },
      include: {
        amenities: true,
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
    const hostel = await prisma.hostel.findUnique({
      where: { id },
      include: {
        user: true,
        amenities: true,
      },
    });
    if (!hostel) {
      return res.status(404).json({ message: "hostel not found" });
    }
    res.status(200).json(hostel);
  } catch (e) {
    console.log("Error fetching hostel:", e);
    res.status(500).json({ message: "something went wrong..." });
  }
}
export async function fetchUserHostels(req, res) {
  const UserId = req.userId;
  const hostels = await prisma.hostel.findMany({
    where: {
      owner: UserId,
    },
  });
  res.status(200).json(hostels);
}
export async function deletehostel(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId.id;

    const hostel = await prisma.hostel.findFirst({
      where: {
        id: id,
        owner: userId,
      },
    });

    if (!hostel) {
      return res.status(404).json({
        message: "hostel not found or you're not authorized to delete it.",
      });
    }

    await prisma.hostel.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "hostel deleted successfully" });
  } catch (e) {
    console.error("Error deleting post:", e);
    res.status(500).json({ message: e.message });
  }
}
export async function fetchAllhostels(req, res) {
  try {
    const hostels = await prisma.hostel.findMany({
      where: {},
      include: {
        user: true,
        amenities: true,
      },
    });
    res.status(200).json(hostels);
  } catch (e) {
    res.status(500).json({ message: "something went wrong..." });
  }
}
export async function updateHostel(req, res) {
  try {
    const { id } = req.params;
    const { name, location, roomType, roomsCount, pricePerRoom } = req.body;
    const UserId = req.userId;

    const hostel = await prisma.hostel.update({
      where: {
        id: id,
        owner: UserId,
      },
      data: { name, location, roomType, roomsCount, pricePerRoom },
    });

    res.status(200).json(hostel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
