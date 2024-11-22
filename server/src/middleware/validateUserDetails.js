import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
async function validateUserDetails(req, res, next) {
  const { firstName, lastName, emailAddress, password } = req.body;
  if (!firstName) {
    res.status(400).json({ message: "First Name is required" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ message: "Last Name is required" });
    return;
  }
  if (!emailAddress) {
    res.status(400).json({ message: "email is required" });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "password is required" });
    return;
  }
  const userEmail = await client.user.findFirst({
    where: { emailAddress: emailAddress },
  });
  if (userEmail) {
    res.status(400).json({ message: "Email already taken" });
    return;
  }
  next();
}
export default validateUserDetails;
