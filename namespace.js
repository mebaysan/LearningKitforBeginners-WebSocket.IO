const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('hey');
});

server.listen(3000);
const io = socketio.listen(server);
const nsp = io.of('/baysan'); // -> namespace oluşturduk. /baysan diyerek istediğimiz namespace oluşturabiliriz. of methodu sayesinde
nsp.on('connection', (socket) => {
    console.log('User connected');
    socket.on('isim yaz', () => { // 'isim yaz' eventi karşıla
        nsp.emit('herkese gönder', { name: "Baysan" }); // herkese gönder diye bir event yolla 
    });
});