var users = ['ab', 'cd'];
var i = users.length;
module.exports = {
    configure: function (io) {
        io.sockets.on('connection', function (socket) {
            socket.on('new user', function (name, data) {
                console.log(name);
                return true;
                if (users.indexOf(name) != -1) {
                    data(false);
                } else {
                    data(true);
                    socket.id = name;
                    users[i] = name;
                    i++;
                    updateNickName();
                }
            });

            function updateNickName() {
                // Truyền danh sách người online đến client
                console.log(users);
                io.sockets.emit('usernames', users);
            }

            socket.on('open-chatbox', function (data) {
                socket.on('send message', function (msg, to) {
                    console.log(msg);
                    // lấy tất cả room mà socket đó join
                    let roomIds = socket.rooms;
                    console.log(to, data.to);
                    if (to === data.to) {
                        console.log(Object.values(roomIds)[0]);
                        socket.to(socket.id).emit('new message', msg)
                    }
                })
                // console.log('sendto', sendTo);
                // users[sendto].emit('new message', {msg: data, nick: socket.nickname, sendto: sendto});
                // users[socket.nickname].emit('new message', {msg: data, nick: socket.nickname, sendto: sendto});
                // console.log('open-chatbox', data);
            });

            socket.on('disconnect', function (data) {
                if (!socket.id) return;
                users.splice(users.indexOf(socket.id), 1);
                console.log('disconnect', data);
                i = users.length;
                updateNickName();
            });
        });

    }
};
