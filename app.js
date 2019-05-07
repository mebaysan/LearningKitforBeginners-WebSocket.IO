const http = require("http");
const socketio = require('socket.io'); // paketi dahil ettik
const server = http.createServer((req, res) => {
    res.end('hey!');
});
server.listen(3000);

const io = socketio.listen(server); // socketio tarafında 3000 portuna gelecek olan istekleri dinlemek için

io.sockets.on('connection',(socket)=>{ // connection event'i emitlendiğinde; ve socket adında bir parametre laır bağlanan client'in socket datasını içerir
    console.log('Kullanıcı bağlandı');

    socket.on('selamVer',(data)=>{ // client tarafında(index.html) selamVer event'i oluşturduk ve burada sunucu tarafında bu event tetiklenirse ne olsun dedik, index.html'de yazdığımız o eventi burda karşıladık
        console.log(`selam ${data.name}`); // parametre alabiliriz. client tarafında buraya emit yaparken bir obje yolladık ve karşıladığımızda bu objeyi aldık
    });

    setTimeout((data)=>{
        socket.emit('merhabaDe',{name:'Yusuf'}); // socket emit ile burdan oraya mesaj yollayacağız dedik, emit -> yollarken   on -> karşılarken kullanılır
    },2000); // sadece karşılarken değil aynı zamanda gönderirken de parametre alabiliriz

    socket.on('disconnect',()=>{ // socket'in disconnect eventi tetiklenirse bu kod bloğu çalışacak
        console.log('Kullanıcı ayrıldı!');
    });
}); 

