var users = ['a', 'b'];
var i = users.length;
module.exports = {
    configure: function (io) {
        var roomName = 'roomA';
        io.on('connection', function (socket) {
            socket.on('new user', function (name, data) {

                // Khi join 1 room tại đây thì lấy được danh sách client trong room
                socket.join(roomName, () => {
                    showRooms = Object.keys(socket.rooms);
                    console.log(showRooms);
                    io.in(roomName).clients((err, clist) => {
                        console.log('list client : ', clist);
                    })
                });

                if (users.indexOf(x => x.name === name) != -1) {
                    data(false);
                } else {
                    data(true);
                    socket.id = name;

                    // id socket của người dùng
                    // console.log(socket.client.id);

                    user = {
                        id: socket.client.id,
                        name: name
                    };

                    users[i] = user;
                    updateNickName();
                    i++;
                }
            });

            socket.on('open-chatbox', function (data) {

                // Khi join 1 room tại đây thì danh sách client trong room trả về null
                // socket.join(roomName, () => {
                //     showRooms = Object.keys(socket.rooms);
                //     console.log(socket.rooms);
                //     io.in('roomA').clients((err, clist) => {
                //         console.log('list client : ', io.sockets.adapter);
                //     })
                // });

                socket.on('send message', function (msg, toUser) {

                    // lấy tất cả room mà socket đó join
                    // let roomIds = socket.rooms;

                    // gửi tin nhắn đến chnhs người dùng đấy
                    // socket.emit('new message', msg);

                    // gửi tin nhắn đến người dùng được chọn
                    // socket.to(toUser).emit('new message', {msg: msg, nick: socket.id});

                    // gửi tin nhắn đến phòng mà người gửi tham gia đang chọn
                    io.in(roomName).emit('new message', {msg: msg, nick: socket.id});
                })
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

            function updateNickName() {
                // Truyền danh sách người online đến client
                // console.log('users : ', users);
                io.sockets.emit('usernames', Object.values(users));
            }
        });

    }
};
/* data = {
      sendUser: {
          id: socket.id,
          name: nickNameCurrent
      },
      receiverUser: {
          id: toUserSid,
          name: nicknameReceiver
      }
  }; */
