const http = require("http");
const socketio = require('socket.io'); // paketi dahil ettik
const server = http.createServer((req, res) => {
    res.end('hey!');
});
server.listen(3000);

const io = socketio.listen(server);

io.on('connection', (socket) => {
    console.log('Sunucuya biri bağlandı!');
    socket.on('joinRoom', (data) => {
        socket.join(data.name, () => { // 1.parametre ahangi odaya katılmak istediğimizi söyler. join methodu oda varsa katılır yoksa odayı oluşturur
            // let count = io.sockets.adapter.rooms[data.name].length; // data.name adlı odadaki datalara erişmek istiyorum. hangi datalar? length adlı data
            io.to(data.name).emit('new join', { count: getOnlineCount(io, data) }); // data.name burada oda adıdır. socket.to diyerek mesaj gönderebiliriz.
            socket.emit('log', { message: 'odaya girdiniz' });
        }); // socket.to diyerek aktif tcp bağlantısı olan hişi hariç herkese gönderecek ama io.to dersek aktif tcp olan da dahil herkese gönderecek
    });

    socket.on('leaveRoom', (data) => {
        socket.leave(data.name, () => {
            io.to(data.name).emit('leavedRoom', { count: getOnlineCount(io, data) });
            socket.emit('socket.leaved', { message: 'Odadan ayrıldınız' });
        });
    });
});

const getOnlineCount = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name];
    return room ? room.length : 0;
}  // online sayısını bulacak bir fonk yazdık