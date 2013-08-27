"use strict"


jQuery(document).ready(function () {

    var socket = io.connect('http://206.214.164.229');

    socket.on('message', function (data) {
        in_list.add_message(data);
       // $.event.trigger(data.message.eventType,data.message.payload);   
    });  
    
    var emit_msg = function(msg_payload){                
        socket.emit('message', { eventType: 'moveUser', payload: msg_payload });
        out_list.add_message(msg_payload);
    };

    var out_list = new wdgts.message_list('send_list')

    $('#outgoing').append(out_list);
    
    var in_list = new wdgts.message_list('message_list')

    $('#incoming').append(in_list);
    
    for (var search in searches){
        var go_button= new wdgts.search_button(searches[search],emit_msg);
        var new_li = $('<li>').attr('class','list-group-item').append(go_button);
        $('#search_list').append(new_li);
    }

});