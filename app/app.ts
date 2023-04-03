import express from "express";
import room from "./routes/room";
import auth from "./routes/auth";

const router = express.Router();

router.use("/room",room);
router.use("/auth",auth);

export default router;