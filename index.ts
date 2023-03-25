import express from "express";
import { createServer } from "http";
import router from "./app/app";

const PORT = 8080;
const app = express();

app.use(express.static('./app/public'));
app.use(express.json());
app.use("/", router);

const server = createServer(app);
server.listen(PORT,()=>{
    console.log(`Server listening at : http://localhost:${PORT}`); 
});