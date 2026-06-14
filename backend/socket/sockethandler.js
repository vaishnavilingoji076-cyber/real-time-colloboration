const roomUsers={};

const socketHandler=(io)=>{
    io.on("connection",(socket)=>{

        console.log(
            "User Connected:",
            socket.id
        );

        socket.on(
            "join-room",
            ({ roomId, username })=>{

                socket.join(roomId);

                socket.username=username;
                socket.roomId=roomId;

                if(!roomUsers[roomId]) {
                    roomUsers[roomId]=[];
                }

                roomUsers[roomId].push(
                    username
                );

                io.to(roomId).emit(
                    "user-list",
                    roomUsers[roomId]
                );
                io.to(roomId).emit(
                    "receive-message",
                    {
                        sender:"System",
                        text:
                        username + "joined room",
                    }
                );
            }
        );

        socket.on(
            "code-change",
            ({ roomId, code })=>{
                socket
                .to(roomId)
                .emit(
                    "receive-code",
                );
            }
        );

        socket.on(
            "send-message",
            ({ roomId, message })=>{
                io.to(roomId).emit(
                    "receive-message",
                    message
                );
            }
        );

        socket.on(
            "typing",
            ({ roomId, username })=>{
                socket
                .to(roomId)
                .emit(
                    "user-typing",
                    username
                );
            }
        );

        socket.on(
            "disconnect",
            ()=>{
                const roomId=socket.roomId;

                if(
                    roomId && roomUsers[roomId]
                ) {
                    roomUsers [roomId]=roomUsers[roomId].filter((user)=> user!==socket.username);

                    io.to(roomId).emit(
                        "user-list",
                        roomUsers[roomId]
                    );
                }
            }
        );
    });
};

module.exports=socketHandler;