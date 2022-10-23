const express = require('express')
const cors = require('cors')
const http = require('http')
const Socket  = require('socket.io')

const app = express();
app.use(cors());

const server= http.createServer(app);
const io = new Socket.Server(server,{
    cors:{
        origin: '*',        
    }
});




const users= [];

server.listen(5000, (err)=>{
    if (err) {
        console.log(err);
    }
    else
    console.log('server is connected to post 5000');
})

io.on('connection',(socket)=>{
    console.log('a user is connected');

    //adding user to userarray //handshake will have the data sent from client side
    users.push({user: socket.handshake.auth.username, id: socket.id})
    //send to client all list of users connected and this will trigger everytime new user is connected
    io.emit('users', users)

    socket.on('private message', ({ content, to }) => {
        // console.log('sending msg to ',to, 'from -', socket.handshake.auth.username)
        socket.to(to).emit('private message', {
          content: content,
          from: socket.handshake.auth.username,
        });
      });

})



io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });


 