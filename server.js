const express= require('express');
const http= require("http");
const mongoose= require('mongoose');
const path= require('path');
const app= express();
const server= http.createServer(app);
const io= require('socket.io')(server);
const {saveHighScore, sendHighest} = require("./controller/scoreController");

const PORT= process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/snakedb",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
)


app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

io.on("connection", socket => {
    console.log(socket.id);
    sendHighest(res => {
        socket.emit('highscores', res);
    })

    socket.on("score", data => {
        if (data.name !== null) {
            saveHighScore(data);
        }
    }) 
})

server.listen(PORT, () => console.log(`server listening on PORT: ${PORT}`));