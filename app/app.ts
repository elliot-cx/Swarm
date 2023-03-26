import express from "express";
import room from "./routes/room";

const router = express.Router();

router.use("/room",room);

export default router;