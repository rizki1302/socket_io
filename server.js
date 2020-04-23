var socket = require('socket.io');
var express = require('express');
const { tambahPengguna, hapusPengguna, ambilPengguna,  ambilPenggunaRuangan, ambilNamaPengguna } = require('./pengguna');
var app = express();
var server = require('http').createServer(app);
var io = socket.listen(server);
var port = process.env.PORT || 3000;

server.listen(port, function(){
    console.log('Server listening at port %d', port);
});

io.on('connection', function(socket){
   

    socket.on('join', (options, callback) => {
        const { error, pengguna_baru  } = tambahPengguna({ id: socket.id, ...options });

        if (error) {
           console.log(ambilPenggunaRuangan('pelayanan'));
           return false;
        }
    
        // socket.join(pengguna_baru.ruangan);

        io.emit('dataRuangan', {
            ruangan: pengguna_baru.ruangan,
            pengguna: ambilPenggunaRuangan(pengguna_baru.ruangan)
        });
       
        callback(ambilPenggunaRuangan(pengguna_baru.ruangan));
    })

    socket.on('new_message', function(data){
        socket.broadcast.emit('receive_message', {
            ...data, waktu: new Date().getTime()
        });
        
     
        // io.emit('receive_message', {...data, waktu: new Date().getTime()});
    });

    socket.on('disconnect', () => {
        const pengguna = hapusPengguna(socket.id)
        console.log(pengguna);
        if (pengguna) {
            // io.emit('receive_message', `1 pengguna telah pergi!`)
            io.emit('dataRuangan', {
                ruangan: pengguna.ruangan,
                pengguna: ambilPenggunaRuangan(pengguna.ruangan)
            })
           
        }
    })
   
});

