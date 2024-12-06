import express from "express";
import cors from "cors";
import { createServer } from "http";
import { SocketIOService } from "./app/services/sockets";
import { reCaptcha } from "./app/services/reCaptcha";
import router from "./app/app";
import { env } from "process";

export var status = "initialization";
export const PORT =  env.PORT ?? 6969;
const app = express();
const server = createServer(app);

app.use(cors())
app.use(express.static('./app/public'));
app.use(express.json());
app.use(express.text())
app.use("/", router);

app.get("/status", (_,res)=>{
    res.json({"success": status});
});

// Handle HTTP Requests
server.listen(PORT,async () => {
    console.log(`Server listening at : http://localhost:${PORT}`);
    // require('child_process').exec(`start http://localhost:${PORT}`);
    SocketIOService.initSockets(server);
    reCaptcha.initCaptchaSolver().then(()=>
        status = "Ready"
    );
}); 