import express from "express";
import cors from "cors";
import { createServer } from "http";
import { SocketIOService } from "./app/services/sockets";
import router from "./app/app";

export const PORT = 6969;
const app = express();

const server = createServer(app);
SocketIOService.initSockets(server);

app.use(cors())
app.use(express.static('./app/public'));
app.use(express.json());
app.use("/", router);

// Handle HTTP Requests
server.listen(PORT, () => {
    console.log(`Server listening at : http://localhost:${PORT}`);
}); 