import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import validateUserDetails from "./middleware/validateUserDetails.js";
import { loginuser } from "./controllers/auth.js";
import verifyToken from "./middleware/verifyToken.js";
import { registeruser } from "./controllers/users.js";
import { createHostel, fetchSingleHostel } from "./controllers/Hostels.js";
import validateHostel from "./middleware/validateHostel.js";
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
app.post("/addHostel", verifyToken, validateHostel, createHostel);
app.get("/postDetails/:id", fetchSingleHostel);
app.listen(4000, () => {
  console.log(`server is running on port 4000...`);
});
