const express = require('express');
const http = require('http')
const { Server } = require('socket.io')
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
var bodyParser = require("body-parser");
app.use(bodyParser());

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.get('/', function (req, res) {
  res.send('Hello from the server!')
})

//Complier 



app.post('/compile', (req, res) => {
  const { code, language } = req.body;
  let output = ''; // This will store the compilation output
  let error = null; // This will store any compilation errors

  if (language === 'c_cpp') {
    // Example: Compile C or c++ using Node.js
    var envData = { OS : "windows" , cmd : "g++"};;
    compiler.compileCPP(envData , code , function (data)  {
      
    console.log("Output should be" , data.output);
    if (data.error) {
      res.send(data.error);
    } else {
      res.send(data.output);
    }
    });
  } else if (language === 'python') {
    // Compile Python using the python command
    var envData = { OS : "windows"}; 
    compiler.compilePython( envData , code , function(data){
    // if (data.error) {
    //   res.send(data.error);
    // } else {
      res.send(data.output);
    // }
    });
  } else {
    // Implement compilation logic for other languages
  }

  res.json({ output, error });
});

const socketID_to_Users_Map = {}
const roomID_to_Code_Map = {}

async function getUsersinRoom(roomId, io) {
  const socketList = await io.in(roomId).allSockets()
  const userslist = []
  socketList.forEach((each => {
    (each in socketID_to_Users_Map) && userslist.push(socketID_to_Users_Map[each].username)
  }))

  return userslist
}

async function updateUserslistAndCodeMap(io, socket, roomId) {
  socket.in(roomId).emit("member left", { username: socketID_to_Users_Map[socket.id].username } , socket.id)

  // update the user list
  delete socketID_to_Users_Map[socket.id]
  const userslist = await getUsersinRoom(roomId, io)
  socket.in(roomId).emit("updating client list", { userslist: userslist })

  userslist.length === 0 && delete roomID_to_Code_Map[roomId]
}

//Get username
function getUsername(socketId) {
  return socketID_to_Users_Map[socketId] ? socketID_to_Users_Map[socketId].username : null;
}


//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected', socket.id)

  socket.on("when a user joins", async ({ roomId, username }) => {
    console.log("username: ", username)
    socketID_to_Users_Map[socket.id] = { username }
    socket.join(roomId)

    const userslist = await getUsersinRoom(roomId, io)

    // for other users, updating the client list
    socket.in(roomId).emit("updating client list", { userslist: userslist })

    // for this user, updating the client list
    io.to(socket.id).emit("updating client list", { userslist: userslist })

    // send the latest code changes to this user when joined to existing room
    if (roomId in roomID_to_Code_Map) {
      io.to(socket.id).emit("on language change", { languageUsed: roomID_to_Code_Map[roomId].languageUsed })
      io.to(socket.id).emit("on code change", { code: roomID_to_Code_Map[roomId].code })
    }

    // alerting other users in room that new user joined
    socket.in(roomId).emit("new member joined", {
      username
    })
  })

  // for other users in room to view the changes
  socket.on("update language", ({ roomId, languageUsed }) => {
    if (roomId in roomID_to_Code_Map) {
      roomID_to_Code_Map[roomId]['languageUsed'] = languageUsed
    } else {
      roomID_to_Code_Map[roomId] = { languageUsed }
    }
  })

  // for user editing the code to reflect on his/her screen
  socket.on("syncing the language", ({ roomId }) => {
    if (roomId in roomID_to_Code_Map) {
      socket.in(roomId).emit("on language change", { languageUsed: roomID_to_Code_Map[roomId].languageUsed })
    }
  })

  // for other users in room to view the changes
  socket.on("update code", ({ roomId, code }) => {
    if (roomId in roomID_to_Code_Map) {
      roomID_to_Code_Map[roomId]['code'] = code
    } else {
      roomID_to_Code_Map[roomId] = { code }
    }
  })

  // for user editing the code to reflect on his/her screen
  socket.on("syncing the code", ({ roomId }) => {
    if (roomId in roomID_to_Code_Map) {
      socket.in(roomId).emit("on code change", { code: roomID_to_Code_Map[roomId].code })
    }
  })

  //traking the movement of the mouse
  socket.on('mousemove' , event => {
    event.id = socket.id;
    event.username = getUsername(socket.id);
    io.emit('mousemove' , event);
  });

  // Add a new socket event to handle sending feedback
  socket.on("send feedback", ({ roomId, feedback }) => {
    if (roomId in roomID_to_Code_Map) {
      // Assuming feedback is an object with "text" and "username" properties
      const feedbackWithUsername = {
        text: feedback.text,
        username: socketID_to_Users_Map[socket.id].username
      };
      roomID_to_Code_Map[roomId]["feedback"] = feedbackWithUsername;
      io.in(roomId).emit("feedback updated", { feedback: feedbackWithUsername });
    }
  });

  //When a use left
  socket.on("leave room", ({ roomId }) => {
    socket.leave(roomId)
    updateUserslistAndCodeMap(io, socket, roomId)

    io.emit('user disconnected', { id: socket.id });
  })

  socket.on("disconnecting", (reason) => {
    socket.rooms.forEach(eachRoom => {
      if (eachRoom in roomID_to_Code_Map) {
        updateUserslistAndCodeMap(io, socket, eachRoom)
      }
    })

    io.emit('user disconnected', { id: socket.id });
  })

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect' , function (){
    console.log('A user disconnected')
  })
})

//you can store your port number in a dotenv file, fetch it from there and store it in PORT
//we have hard coded the port number here just for convenience
const PORT = process.env.PORT || 5000

server.listen(PORT, function () {
  console.log(`listening on port : ${PORT}`)
})

compiler.flush(function () {
  console.log("All temporary files flushed !");
  });