import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { hostelId, roomsCount, pricePerRoom } = req.body;

    if (!userId || !hostelId || !roomsCount || !pricePerRoom) {
      return res
        .status(400)
        .json({ error: "Missing required booking details." });
    }

    const totalPrice = roomsCount * pricePerRoom;

    const newBooking = await prisma.booking.create({
      data: {
        userId,
        hostelId,
        roomsCount,
        totalPrice,
        status: "pending",
      },
      include: {
        user: true,
        hostel: {
          include: {
            user: true,
          },
        },
      },
    });

    const tenantNotification = `Hi ${newBooking.user.firstName}, your booking request for ${newBooking.hostel.name} is pending. Please wait for the landlord's response.`;
    const landlordNotification = `Hi ${newBooking.hostel.user.firstName}, a new booking request has been made for ${newBooking.hostel.name}.`;

    if (req.io) {
      console.log("Emitting notification to tenant:", newBooking.user.id);
      console.log(
        "Emitting notification to landlord:",
        newBooking.hostel.user.id,
      );
      req.io.to(newBooking.user.id).emit("notification", tenantNotification);
      req.io
        .to(newBooking.hostel.user.id)
        .emit("notification", landlordNotification);
    }

    res
      .status(201)
      .json({ message: "Booking created successfully.", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the booking." });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!status || !["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        user: true,
        hostel: {
          include: {
            user: true,
          },
        },
      },
    });

    let tenantNotification;
    if (status === "accepted") {
      tenantNotification = `Congratulations ${updatedBooking.user.firstName}, your booking for ${updatedBooking.hostel.name} has been accepted!`;
    } else {
      tenantNotification = `Sorry ${updatedBooking.user.firstName}, the booking for ${updatedBooking.hostel.name} was rejected as rooms are full.`;
    }

    if (req.io) {
      req.io
        .to(updatedBooking.user.id)
        .emit("notification", tenantNotification);
      req.io
        .to(updatedBooking.hostel.user.id)
        .emit("notification", `Booking ${bookingId} has been ${status}.`);
    }

    res.status(200).json({
      message: `Booking status updated to ${status}.`,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the booking status." });
  }
};
