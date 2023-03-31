import express from "express";
import { createServer } from "http";
import { Sockets } from "./app/sockets/sockets";
import router from "./app/app";

const PORT = 8080;
const app = express();

const server = createServer(app);
Sockets.initSockets(server);

app.use(express.static('./app/public'));
app.use(express.json());
app.use("/", router);

// Handle HTTP Requests
server.listen(PORT, () => {
    console.log(`Server listening at : http://localhost:${PORT}`);
}); 