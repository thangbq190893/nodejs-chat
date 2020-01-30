var users = new Array();
// var user = {
//     id: String,
//     name: String
// };
// var rooms = ['roomA', 'roomB'];
var i = users.length;
module.exports = {
    configure: function (io) {
        io.on('connection', function (socket) {
            socket.on('new user', function (name, data) {
                var showRooms;
                socket.join('roomA', () => {
                    showRooms = Object.keys(socket.rooms);
                    // console.log(showRooms);
                    io.in('roomA').clients((err, clist) => {
                        // console.log(clist);
                    })
                });

                if (users.indexOf(x => x.name === name) != -1) {
                    data(false);
                } else {
                    data(true);
                    socket.id = name;
                    console.log(socket.client.id);
                    const user = {
                        id: socket.client.id,
                        name: name
                    };
                    // user.id = socket.client.id;
                    // user.name = name;
                    // users[i].id = socket.client.id;
                    console.log(i);
                    users[i] = user;
                    updateNickName();
                    i++;
                }
            });

            function updateNickName() {
                // Truyền danh sách người online đến client
                console.log('users : ', users);
                // console.log(io.sockets.adapter.rooms[rooms[0]]);
                io.sockets.emit('usernames', Object.values(users));
            }

            socket.on('open-chatbox', function (data) {
                // var showRooms;
                // socket.join('roomA', () => {
                //     showRooms = Object.keys(socket.rooms);
                //     // console.log(showRooms);
                // });
                // console.log(io.sockets.adapter.rooms[rooms[0]]);
                // io.sockets.clients();
                socket.on('send message', function (msg, to) {
                    // console.log(showRooms);
                    // lấy tất cả room mà socket đó join
                    // let roomIds = socket.rooms;
                    console.log('đã nhận được tin nhắn từ client');
                    // socket.emit('new message', msg);
                    io.in("roomA").emit('new message', {msg: msg, nick: socket.id});
                    // if (to === data.to) {
                    //
                    //     // console.log(Object.values(socket.rooms)[0]);
                    //     io.in(rooms[0]).emit('new message', msg)
                    //     // io.sockets.emit('new message', msg)
                    // }
                })

                // users[sendto].emit('new message', {msg: data, nick: socket.nickname, sendto: sendto});
                // users[socket.nickname].emit('new message', {msg: data, nick: socket.nickname, sendto: sendto});

            });

            socket.on('disconnect', function (data) {
                console.log('socket.id :    ', socket.id)
                if (!socket.id) return;
                let indexUser = users.findIndex(x => x.name == socket.id);
                if (indexUser !== -1) {
                    users.splice(users.findIndex(x => x.name == socket.id), 1);
                }
                // console.log('indexxxxx :  ',users.findIndex(x => x.name == socket.id));

                console.log('disconnect', data);
                i = users.length;
                updateNickName();
            });
        });

    }
};
