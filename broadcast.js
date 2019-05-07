const http = require("http");
const socketio = require('socket.io'); // paketi dahil ettik
const server = http.createServer((req, res) => {
    res.end('hey!');
});
server.listen(3000);

const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('Kullanıcı bağlandı!');

    socket.on('disconnect', () => {
        console.log('kullanıcı ayrıldı!');
    });

    socket.on('new-user', (data) => {
        socket.broadcast.emit('user', { name: data.name }); // broadcast.emit -> socket bağlantısını yapan diğer clientlara (o kullanıcı hariç) data gönderir
    });
});