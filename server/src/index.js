import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSocketConnection } from "./sockethandler.js";
import validateUserDetails from "./middleware/validateUserDetails.js";
import { loginuser } from "./controllers/auth.js";
import verifyToken from "./middleware/verifyToken.js";
import { registeruser } from "./controllers/users.js";
import { createHostel, fetchSingleHostel } from "./controllers/Hostels.js";
import validateHostel from "./middleware/validateHostel.js";
import {
  fetchUserHostels,
  updateHostel,
  deletehostel,
  fetchAllhostels,
} from "./controllers/Hostels.js";
import { getProfile, updateProfile } from "./controllers/users.js";
import { createBooking, updateBookingStatus } from "./controllers/booking.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  }),
);
app.use(cookieParser());

app.post("/users", validateUserDetails, registeruser);
app.post("/auth/login", loginuser);
app.get("/Profile", verifyToken, getProfile);
app.put("/updateProfile", verifyToken, updateProfile);
app.post("/addHostel", verifyToken, validateHostel, createHostel);
app.get("/HostelDetails/:id", fetchSingleHostel);
app.get("/hostels", fetchAllhostels);
app.get("/hostels/user", verifyToken, fetchUserHostels);
app.delete("/hostels/:id", verifyToken, deletehostel);
app.post("/booking", verifyToken, createBooking);
app.patch("/booking/:bookingId/status", verifyToken, updateBookingStatus);
app.put("/hostels/:id", verifyToken, updateHostel);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", handleSocketConnection);

httpServer.listen(4000, () => {
  console.log(`Server is running on port 4000...`);
});
