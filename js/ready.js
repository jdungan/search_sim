"use strict"
jQuery(document).ready(function () {

    var socket = io.connect('http://206.214.164.229');

    socket.on('message', function (data) {
        msgs_recvd.add_message(data);
    });  
    
    var emit_msg = function(msg_payload){                
        socket.emit('message', { eventType: 'moveUser', payload: msg_payload });
        msgs_sent.add_message(msg_payload);
    };

    var msgs_sent = new wdgts.message_list('msgs_sent')

    $('#outgoing').append(msgs_sent);
    
    var msgs_recvd = new wdgts.message_list('msgs_recvd')

    $('#incoming').append(msgs_recvd);
    
    for (var search in searches){
        var go_button= new wdgts.search_button(emit_msg,searches[search]);
        var new_li = $('<li>').attr('class','list-group-item').append(go_button);
        $('#search_list').append(new_li);
    }

});