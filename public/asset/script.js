var nickNameCurrent;
$(document).ready(function(){
    // connect socket
    var socket = io();
    // sockt id of this client is socket.id
    // const socket = io('http://localhost')(4200);
    $('#set-nick').submit(function(e){
        // get username login
        var nickName = $('#nick-name').val().trim();
        nickNameCurrent = nickName;
        // preventDefault không gọi đến submit action form
        	e.preventDefault();
        	// Nếu username trống thì thông báo lỗi chưa điền thông tin tài khoản
        if (nickName == null || nickName === ''){
        	$('#nick-error').html('Ban chua nhap tai khoan');
        }else{
            /* Thông qua socket truyền dữ liệu đi với message 'new user'
         và nhận lại data từ server trả về */
            socket.emit('new user', nickName, function(data){
                if (data){
                    console.log(data);
                    // ẩn form login đi
                    $('#nick-wrap').hide();
                    // hiển thị danh sách chat
                    $('.chat_box').show();
                    $('.msg_wrap').display = 'block';
                    $('#username').show();
                    $('#username').text(nickNameCurrent)
                }else{
                    $('#nick-error').html('Tai khoan da duoc su dung. Vui long dien tai khoan khac');
                }
            });
            $('#nick-name').val('');
        }
        return false;
    });

// Mở to, thu nhỏ danh sách chat
    $('.chat_head').click(function(){
        $('.chat_body').slideToggle('slow');
    });
    // Mở to thu nhỏ khung chat
    $('.msg_head').click(function(){
        $('.msg_wrap').slideToggle('slow');
    });
    // Đóng khung chat
    $('.close').click(function(){
        $('.msg_box').hide();
    });


    function usernameClick(){
        $('.user').click(function(){
            // console.log('Hello');
            // $(this) chính là $('.user')
            console.log($(this).text()); // User name
            $('.msg_box').show();
            $('#box_name').text($(this).text());
            socket.emit('open-chatbox', {from: nickNameCurrent, to: $(this).attr('name')});
            console.log($(this).attr('name'))
        });
    }
    // usernameClick();
    //

    // Nhận danh sách các nickname đang online từ server
    socket.on('usernames', function(data){
        // console.log(nickNameCurrent);
        console.log('user: ', data, socket.id);
        indexCurrentUser = data.findIndex(x => x.id === socket.id);
        console.log(indexCurrentUser);
        data.splice(indexCurrentUser, 1);
        var html = '';
        for (i=0; i<data.length; i++){
            html +='<div class="user" name="'+ data[i].id+'">'+ data[i].name+'</div>';
        }

        // console.log(html);
        $('.chat_body').html(html);
        usernameClick();
    });
    // socket.on('openbox', function(data){
    //     $('.msg_box').show();
    //     $('#box_name').html(data.nick);


// 		$('body').append('
// 				<div class="msg_box" style="right:290px; display:none">
// 	<div class="msg_head">
// 	<span id="box_name" name="'+ data.nick+'">'+ data.nick+'</span>
// 	<div class="close">x</div>
// 	</div>
// 	<div class="msg_wrap">
// 		<div class="msg_body">
// 			<div class="msg_push"></div>
// 		</div>
// 	<div class="msg_footer"><textarea class="msg_input" rows="4"></textarea></div>
// </div>
// </div>
// 			');

    // });
    $('.msg_input').keypress(function(e){
        // e.preventDefault();

        if (e.keyCode == 13) {
            var msg = $(this).val();
            $(this).val('');
            socket.emit('send message', msg);
            // console.log('okokokokokok')
        }
    });
    //
    socket.on('new message', function(data){

        console.log('tin nhắn từ server về');
        console.log('Gui tu '+data.nick);
        if (data.nick == $('#box_name').text() ){
            $('<div class="msg_b"><b>'+data.nick+': </b>'+data.msg+'</div>').insertBefore('.msg_push');
            $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        }else{
            $('<div class="msg_a"><b>'+data.nick+': </b>'+data.msg+'</div>').insertBefore('.msg_push');
            $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        }
        console.log(data);
    });

});
