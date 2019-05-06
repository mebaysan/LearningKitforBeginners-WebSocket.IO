const http = require("http");
const socketio = require('socket.io'); // paketi dahil ettik
const server = http.createServer((req, res) => {
    res.end('hey!');
});
server.listen(3000);

const io = socketio.listen(server); // socketio tarafında 3000 portuna gelecek olan istekleri dinlemek için

io.sockets.on('connection',(socket)=>{ // connection event'i emitlendiğinde; ve socket adında bir parametre laır bağlanan client'in socket datasını içerir
    console.log('Kullanıcı bağlandı');

    socket.on('disconnect',()=>{ // socket'in disconnect eventi tetiklenirse bu kod bloğu çalışacak
        console.log('Kullanıcı ayrıldı!');
    });
}); 

