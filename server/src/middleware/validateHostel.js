function validateHostel(req, res, next) {
  const {
    name,
    location,
    roomType,
    roomsCount,
    pricePerRoom,
    imageUrl,
    amenities,
  } = req.body;
  if (!name) return res.status(400).json({ message: "name is required" });
  // if (!featuredImage)
  //   return res.status(400).json({ message: "featured Image is required" });
  if (!location)
    return res.status(400).json({ message: "location is required" });
  if (!roomType)
    return res.status(400).json({ message: "roomtype is required" });
  if (!roomsCount)
    return res.status(400).json({ message: "roomcount is required" });
  if (!pricePerRoom)
    return res.status(400).json({ message: "rent is required" });

  if (!amenities) return res.status(400).json({ message: "image is required" });
  if (!imageUrl) return res.status(400).json({ message: "image is required" });
  if (
    !imageUrl ||
    !name ||
    !location ||
    !roomType ||
    !roomsCount ||
    !pricePerRoom
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }
  next();
}
export default validateHostel;
