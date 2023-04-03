const socket = io();
const roomInput = document.getElementById("room");
const joinButton = document.getElementById("join");
joinButton.addEventListener("click",() => {
    socket.emit("join",roomInput.value);
});

socket.on("connect",()=>{
    console.log("Connected");
});

socket.on("status",(status,data)=>{
    console.log(status);
});