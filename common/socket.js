var users = [];
module.exports = {
    configure: function (io) {
        io.sockets.on('connection', function (socket) {
            socket.on('new user', function (name, data) {
                console.log('name', name);
                if (name in users) {
                    console.log(name in users);
                    data(false);
                } else {
                    data(true);
                    users[name] = name;
                    updateNickName();
                }
            });

            function updateNickName() {
                console.log(users);
                io.sockets.emit('usernames', Object.values(users));
                console.log(Object.keys(users))
            }

            socket.on('open-chatbox', function (data, sendto) {
                users[sendto].emit('new message', {msg: data, nick: socket.nickname, sendto: sendto});
                users[socket.nickname].emit('new message', {msg: data, nick: socket.nickname, sendto: sendto});

                console.log('open-chatbox', data);
            });

            socket.on('disconnect', function (data) {
                if (!socket.nickname) return;
                delete users[socket.nickname];
                console.log('disconnect', data);
                updateNickName();
            });
        });

    }
};
